import glob
import re
from collections import defaultdict
from tqdm import tqdm
import requests
import json
from concurrent.futures import ThreadPoolExecutor, as_completed


def process_single_css_file(css_file_name, rules, file_index):
    output_file_name = f"{css_file_name}.txt"  # Create an independent output file for each CSS file
    with open(output_file_name, 'w', encoding="utf-8") as file, tqdm(rules, desc=f"Processing {css_file_name}", position=file_index) as progress:
        file.write("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%"+"\n")
        print("\\hdashrule[0.5ex][x]{\\linewidth}{0.5pt}{1.5mm}")
        file.write("\subsection*"+"{"+css_file_name+f" ({css_file_name})"+"}"+"\n")
        for rule in progress:
            latex_version = gpts_answer(rule)  # Convert each rule
            latex_version = latex_version.replace("```latex", "").replace("```", "")
            file.write(f"{latex_version}")  # Write in the order of conversion
            file.flush()  # Make sure that it is written immediately after each processing


def process_css_files(folder_path):
    css_files = glob.glob(f'{folder_path}/*.css')  # Read all CSS files
    css_rules_dict = defaultdict(list)  # Create a default dictionary to store results

    for css_file in css_files:
        with open(css_file, 'r', encoding="utf-8") as file:
            content = file.read()
            # 匹配媒体查询和其他样式规则
            pattern = r'(@media[^\{]+\{(?:[^\{\}]*\{[^\{\}]*\})+[^\}]*\})|((?:\.[\w\-\_\.]+|\w+\.[\w\-\_\.]+|\w+[\s\w\-\._:#>]+)\s*\{[^\}]*\})'
            rules = re.findall(pattern, content)
            # 清理匹配结果并合并媒体查询和其他规则
            cleaned_rules = [m[0] if m[0] else m[1] for m in rules]
            # 定义排序键
            def sort_key(x):
                # 如果选择器以.开头，移除.后排序；否则按整体排序
                if x.startswith('.'):
                    return re.sub(r'^\.', '', x).lower()  # 移除.后的选择器名用于排序
                return x.lower()  # 直接返回选择器名用于排序
            # 按照规则的选择器排序
            sorted_rules = sorted(cleaned_rules, key=lambda x: sort_key(re.search(r'[^{]+', x).group()))
            # 存储处理后的结果
            css_rules_dict[css_file.split('/')[-1]] = sorted_rules

    return css_rules_dict

# 假设你的CSS文件存放在'./cssfiles'文件夹
folder_path = './cssfiles'
css_rules_dict = process_css_files(folder_path)

def gpts_answer(comment):
    # Your existing API endpoint and authentication headers
    url = "https://api.aiwe.io/v1/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer sk-pIUuoefsKsPZ8HAkC73036B315E5406a9dE42fE1C80eB4C3",
    }
    prompt = f"""
    ```{comment}```
    """

    # Build the payload for the API request
    payload = {
        "model": "gpt-4-gizmo-g-IAptGSWut",
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
        sentiment = response_data["choices"][0]["message"]["content"]
    else:
        print(f"Request failed with status code {response.status_code}")
        print("Error message:", response.text)

    return sentiment

# 使用ThreadPoolExecutor并行处理
with ThreadPoolExecutor() as executor:
    # 提交所有文件到线程池，并记录每个任务的Future
    futures = {executor.submit(process_single_css_file, file_name, rules, idx): file_name for idx, (file_name, rules) in enumerate(css_rules_dict.items())}
    # 等待所有任务完成
    for future in as_completed(futures):
        file_name = futures[future]
        try:
            future.result()  # 获取任务结果，如果有异常会在这里抛出
        except Exception as e:
            print(f"Error processing {file_name}: {e}")

