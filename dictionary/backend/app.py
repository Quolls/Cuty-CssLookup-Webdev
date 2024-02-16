from flask import Flask, jsonify, request
from flask_cors import CORS  # 导入 CORS
from dotenv import load_dotenv
import os
import pymongo
import glob
import re
from collections import defaultdict

app = Flask(__name__)
CORS(app)  # 启用 CORS 支持

# 加载环境变量
load_dotenv()

# MongoDB 连接
mongo_uri = os.getenv("MONGO_URI")
client = pymongo.MongoClient(mongo_uri)
db = client['css_database']
collection = db['css_collection']

def process_css_files(folder_path):
    css_files = glob.glob(f'{folder_path}/**/*.css', recursive=True)  # 修改这里
    css_rules_dict = defaultdict(list)

    for css_file in css_files:
        with open(css_file, 'r', encoding="utf-8") as file:
            content = file.read()
            pattern = r'(@media[^\{]+\{(?:[^\{\}]*\{[^\{\}]*\})+[^\}]*\})|((?:\.[\w\-\_\.]+|\w+\.[\w\-\_\.]+|\w+[\s\w\-\._:#>]+)\s*\{[^\}]*\})'
            rules = re.findall(pattern, content)
            cleaned_rules = [m[0] if m[0] else m[1] for m in rules]

            for rule in cleaned_rules:
                css_name = re.search(r'[^{]+', rule).group().strip()
                contains_important = "important" in rule
                first_letter_match = re.search(r'[a-zA-Z]', css_name)
                if first_letter_match:
                    capital = first_letter_match.group().upper()
                else:
                    capital = "N/A"  # 如果没有找到字母，可以分配一个默认值
                css_rules_dict[css_file.split('/')[-1]].append({
                    "css_name": css_name,
                    "content": rule,
                    "contains_important": contains_important,
                    "capital": capital  # 添加“capital”属性
                })
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
folder_path = './cssfiles'  # 更改为你的 CSS 文件夹路径
# ****************************************************************
# first loading, add data to database
# ****************************************************************
# clear_and_upload_css(folder_path)

@app.route('/get_css_data', methods=['GET'])
def get_css_data():
    results = list(collection.find({}, {'_id': 0}))
    return jsonify(results)

@app.route('/search_css', methods=['POST'])
def search_css():
    # 从请求体中获取 word
    data = request.json
    word = data.get('word', '')
    
    # 使用正则表达式进行不区分大小写的搜索
    regex = re.compile(f'.*{re.escape(word)}.*', re.IGNORECASE)
    results = list(collection.find({"css_name": regex}, {'_id': 0}))
    
    if results:
        return jsonify(results), 200
    else:
        return jsonify({"message": "No CSS rules found matching your query."}), 404


if __name__ == '__main__':
    app.run(debug=True, port=5201)

