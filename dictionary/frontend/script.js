const wrapper = document.querySelector('.wrapper'),
  searchInput = wrapper.querySelector('input'),
  infoText = wrapper.querySelector('.info-text'),
  resultsContainer = wrapper.querySelector('.results'),
  removeIcon = wrapper.querySelector('.search span')

function displayResults (results) {
  wrapper.classList.add('active')
  const resultsContainer = document.querySelector('.results')
  resultsContainer.innerHTML = '' // 清空之前的结果

  // 按 file_name 分组结果
  const groupedByFileName = results.reduce((acc, result) => {
    ;(acc[result.file_name] = acc[result.file_name] || []).push(result)
    return acc
  }, {})

  // 对分组的文件名进行字母顺序排序
  Object.entries(groupedByFileName)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .forEach(([fileName, results], index) => {
      const isExpanded = 'false' // 默认所有都是关闭的
      const displayStyle = 'none' // 默认所有内容都不显示

      // const isExpanded = index === 0 ? 'true' : 'false' // 只展开第一个
      // const displayStyle = index === 0 ? 'block' : 'none' // 只显示第一个

      // 对 results 按 capital 字段进行字母排序
      results.sort((a, b) => a.capital.localeCompare(b.capital))

      const groupHTML = `
          <div class="file-group">
              <button class="dropdown-btn" onclick="toggleDropdown(this)" aria-expanded="${isExpanded}">${fileName}</button>
              <div class="dropdown-content" style="display: ${displayStyle};">
                  ${results
                    .map(result => {
                      const borderColor = result.contains_important
                        ? 'red'
                        : 'blue'
                      const borderWidth = result.contains_important
                        ? '3px'
                        : '1px'
                      const highlightedContent = result.content
                        // 首先高亮大括号外的选择器部分
                        .replace(
                          /([^{}]*\{)/g,
                          '<span style="font-weight: bold; color: #2e294e;">$1</span>'
                        )
                        // 然后处理大括号内的属性名，以应用颜色 #8338ec
                        .replace(/(\{[^}]*\})/g, function (match) {
                          // 在这些内容中高亮CSS属性名
                          return match.replace(
                            /([a-z-]+)(?=:)/g,
                            '<span style="color: #8338ec;">$1</span>'
                          )
                        })
                        // 最后处理 important 关键字，以应用背景颜色 yellow
                        .replace(
                          /(important)/gi,
                          '<span style="background-color: yellow;">$1</span>'
                        )
                      // 修改生成结果项的HTML，为css_name添加onclick事件
                      return `
                          <div class="result-item" style="border: ${borderWidth} solid ${borderColor}; padding: 10px; margin-bottom: 20px;">
                              <h1 style="color: #1b998b; text-align: center;">${result.capital}</h1>
                              <p style="color: #f46036; cursor: pointer; text-align: center;" onclick="addFunctionText(this)"><strong>${result.css_name}</strong></p>
                              <pre style="text-align: justify; white-space: pre-wrap; word-wrap: break-word;">${highlightedContent}</pre>
                          </div>`
                    })
                    .join('')}
              </div>
          </div>`
      resultsContainer.insertAdjacentHTML('beforeend', groupHTML)
    })
}

// gpt function
function addFunctionText (element) {
  const cssName = element.textContent.trim()
  const resultItem = element.closest('.result-item')

  // 创建并显示加载图标
  const loader = document.createElement('div')
  loader.className = 'loader'
  resultItem.appendChild(loader)

  fetch('https://111.229.182.252:5123/get_css_content', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ css_name: cssName })
  })
    .then(response => response.json())
    .then(data => {
      // 移除加载图标
      resultItem.removeChild(loader)

      const content = data.content || 'No content found.'
      // const resultItem = element.closest('.result-item')

      const functionText = document.createElement('p')
      functionText.innerHTML = `${content}` // 处理 HTML 格式内容
      functionText.style.border = '1px solid #2a9d8f'
      functionText.style.padding = '5px'
      functionText.style.marginTop = '5px'
      // 设置高度和溢出行为以启用内联滚动条
      functionText.style.height = '160px' // 可根据需要调整高度
      functionText.style.overflowY = 'auto' // 当内容超出指定高度时显示垂直滚动条
      resultItem.appendChild(functionText)

      // 创建并添加样式化的Save按钮
      const saveButton = document.createElement('button')
      saveButton.textContent = 'Keep it!'
      saveButton.style.padding = '10px 20px'
      saveButton.style.fontSize = '16px'
      saveButton.style.backgroundColor = '#2a9d8f'
      saveButton.style.color = 'white'
      saveButton.style.border = 'none'
      saveButton.style.borderRadius = '5px'
      saveButton.style.cursor = 'pointer'
      saveButton.style.display = 'block'
      saveButton.style.margin = '10px auto'
      resultItem.appendChild(saveButton)

      saveButton.onclick = function () {
        fetch('https://111.229.182.252:5123/save_css_function', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ css_name: cssName, function: content })
        })
          .then(response => response.json())
          .then(data => alert(data.message))
          .catch(error => console.error('Error:', error))
      }
    })
    .catch(error => {
      console.error('Error:', error)
      // 移除加载图标并可能显示错误信息
      resultItem.removeChild(loader)
    })
}

function toggleDropdown (element) {
  const content = element.nextElementSibling
  const isExpanded = element.getAttribute('aria-expanded') === 'true'
  element.setAttribute('aria-expanded', !isExpanded)
  content.style.display = isExpanded ? 'none' : 'block'
}

function search (word) {
  fetchApi(word)
  searchInput.value = word
}

function fetchApi (word) {
  wrapper.classList.remove('active')
  infoText.style.color = '#000'
  infoText.innerHTML = `Searching for CSS rules that match <span>"${word}"</span>`
  let url = `https://111.229.182.252:5123/search_css` // 更新为你的 Flask 应用的新路由
  // let url = 'http://localhost:5201/search_css'
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ word: word }) // 发送 word 作为请求体
  })
    .then(response => response.json())
    .then(result => displayResults(result))
    .catch(() => {
      infoText.innerHTML = `Can't find the CSS rule for <span>"${word}"</span>. Please, try to search for another word.`
    })
}

searchInput.addEventListener('keyup', e => {
  let word = e.target.value.replace(/\s+/g, ' ').trim()
  if (e.key === 'Enter' && word) {
    fetchApi(word)
  }
})

removeIcon.addEventListener('click', () => {
  searchInput.value = ''
  searchInput.focus()
  wrapper.classList.remove('active')
  infoText.style.color = '#9A9A9A'
  infoText.innerHTML = 'Type any CSS rule name and press enter to get details.'
})
