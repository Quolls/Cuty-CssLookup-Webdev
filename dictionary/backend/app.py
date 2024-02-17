import glob
import os
import re
from collections import defaultdict
import json
import pymongo
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS  # 导入 CORS
import requests


app = Flask(__name__)
CORS(app)  # 启用 CORS 支持

# 加载环境变量
load_dotenv()

# MongoDB 连接
mongo_uri = os.getenv("MONGO_URI")
client = pymongo.MongoClient(mongo_uri)
db = client["css_database"]
collection = db["css_collection"]


def process_css_files(folder_path):
    css_files = glob.glob(f"{folder_path}/**/*.css", recursive=True)  # 修改这里
    css_rules_dict = defaultdict(list)

    for css_file in css_files:
        with open(css_file, "r", encoding="utf-8") as file:
            content = file.read()
            pattern = r"(@media[^\{]+\{(?:[^\{\}]*\{[^\{\}]*\})+[^\}]*\})|((?:\.[\w\-\_\.]+|\w+\.[\w\-\_\.]+|\w+[\s\w\-\._:#>]+)\s*\{[^\}]*\})"
            rules = re.findall(pattern, content)
            cleaned_rules = [m[0] if m[0] else m[1] for m in rules]

            for rule in cleaned_rules:
                css_name = re.search(r"[^{]+", rule).group().strip()
                contains_important = "important" in rule
                first_letter_match = re.search(r"[a-zA-Z]", css_name)
                if first_letter_match:
                    capital = first_letter_match.group().upper()
                else:
                    capital = "N/A"  # 如果没有找到字母，可以分配一个默认值
                css_rules_dict[css_file.split("/")[-1]].append(
                    {
                        "css_name": css_name,
                        "content": rule,
                        "contains_important": contains_important,
                        "capital": capital,  # 添加“capital”属性
                    }
                )
    return css_rules_dict


def clear_and_upload_css(folder_path):
    # 清空数据库
    collection.delete_many({})
    css_rules_dict = process_css_files(folder_path)
    for file_name, rules in css_rules_dict.items():
        for rule in rules:
            rule["file_name"] = file_name
            result = collection.insert_one(rule)
            if result.acknowledged:
                print(f"Rule from '{file_name}' saved to database successfully.")
            else:
                print("Failed to save the rule to database.")


# 在应用启动时处理 CSS 文件
folder_path = "./algorx"  # 更改为你的 CSS 文件夹路径
# ****************************************************************
# first loading, add data to database
# ****************************************************************
# clear_and_upload_css(folder_path)


@app.route("/get_css_data", methods=["GET"])
def get_css_data():
    results = list(collection.find({}, {"_id": 0}))
    return jsonify(results)


@app.route("/search_css", methods=["POST"])
def search_css():
    # 从请求体中获取 word
    data = request.json
    word = data.get("word", "")

    # 使用正则表达式进行不区分大小写的搜索
    regex = re.compile(f".*{re.escape(word)}.*", re.IGNORECASE)
    results = list(collection.find({"css_name": regex}, {"_id": 0}))

    if results:
        return jsonify(results), 200
    else:
        return jsonify({"message": "No CSS rules found matching your query."}), 404

def gpt_ok(comment):
    print(f"the input is: {comment}")
    print("generating...")
    # Your existing API endpoint and authentication headers
    url = "https://api.aiwe.io/v1/chat/completions"
    headers = {
        "Content-Type": "application/json",
        # "Authorization": "Bearer sk-pIUuoefsKsPZ8HAkC73036B315E5406a9dE42fE1C80eB4C3",
        "Authorization": "Bearer sk-JZalSJ6G62V3CAjS7cE3F481E71d4a9a86DcB5C4F4B9E0Ba",
    }
    prompt = f"""
    what can be the following css style do? Provide the detailed explanations. Using some fancy color to address the content and the thing you think is important. Your answer should in a html format. No more than 100 words. using bullet points. directly give the html content without using "```html ```" as a wrapper.
    for example:
    <ul>
    <li><span style="color: #FF5733;">font-family:</span> Sets the font to 'Inter' and a fallback of sans-serif.</li>
    <li><span style="color: #FF5733;">font-style:</span> Sets the font style to normal.</li>
    <li><span style="color: #FF5733;">font-weight:</span> Sets the font weight to 500 (medium).</li>
    <li><span style="color: #FF5733;">font-size:</span> Sets the font size to 14 pixels.</li>
    <li><span style="color: #FF5733;">line-height:</span> Sets the line height to 17 pixels.</li>
    <li><span style="color: #FF5733;">display:</span> Makes the element a flex container.</li>
    <li><span style="color: #FF5733;">align-items:</span> Centers the content vertically.</li>
    <li><span style="color: #FF5733;">letter-spacing:</span> Adds spacing between letters.</li>
    <li><span style="color: #FF5733;">margin:</span> Sets margin top and bottom to 5 pixels.</li>
    <li><span style="color: #FF5733;">color:</span> Sets the text color to #18181e.</li>
    </ul>

    The css style that you need to answer is the following:
    ```{comment}```
    """

    # Build the payload for the API request
    payload = {
        # "model": "gpt-4-gizmo-g-IAptGSWut",
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                "role": "system",
                "content": "",
            },
            {"role": "user", "content": prompt},
        ],
    }

    # Send the POST request
    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 200:
        response_data = json.loads(response.text)
        res = response_data["choices"][0]["message"]["content"]
    else:
        print(f"Request failed with status code {response.status_code}")
        print("Error message:", response.text)
    
    print(res)
    return f"<html><body>{res}</body></html>"

@app.route('/get_css_content', methods=['POST'])
def get_css_content():
    data = request.json
    css_name = data.get('css_name', '')
    
    result = collection.find_one({"css_name": css_name}, {'_id': 0, 'content': 1, 'function': 1})
    
    if result:
        if 'function' in result:
            return jsonify({"content": result['function']}), 200
        else:
            # 调用 gpt_ok 函数处理 content
            processed_content = gpt_ok(result['content'])
            return jsonify({"content": processed_content}), 200
    else:
        return jsonify({"message": "No CSS content found for the provided name."}), 404


@app.route('/save_css_function', methods=['POST'])
def save_css_function():
    data = request.json
    css_name = data.get('css_name')
    function_content = data.get('function')

    # 查找并更新对应的CSS规则
    result = collection.update_one(
        {"css_name": css_name},
        {"$set": {"function": function_content}}
    )
    
    if result.modified_count > 0:
        return jsonify({"message": "CSS function saved successfully."}), 200
    else:
        return jsonify({"message": "No CSS rule updated."}), 404



if __name__ == "__main__":
    app.run(debug=True, port=5201)
