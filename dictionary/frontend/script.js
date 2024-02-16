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

  Object.entries(groupedByFileName).forEach(([fileName, results], index) => {
    const isExpanded = 'false' // 默认所有都是关闭的
    const displayStyle = 'none' // 默认所有内容都不显示

    // const isExpanded = index === 0 ? 'true' : 'false' // 只展开第一个
    // const displayStyle = index === 0 ? 'block' : 'none' // 只显示第一个

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
                          .replace(
                            /(important)/gi,
                            '<span style="background-color: yellow;">$1</span>'
                          )
                          .replace(
                            /([^{}]*\{)/g,
                            '<span style="font-weight: bold; color: #2e294e;">$1</span>'
                          )
                        return `
                            <div class="result-item" style="border: ${borderWidth} solid ${borderColor}; padding: 10px; margin-bottom: 20px;">
                                <h1 style="color: #1b998b; text-align: center;">${result.capital}</h1>
                                <p style="color: #f46036; text-align: center;"><strong>${result.css_name}</strong></p>
                                <pre style="text-align: justify; white-space: pre-wrap; word-wrap: break-word;">${highlightedContent}</pre>
                            </div>`
                      })
                      .join('')}
                </div>
            </div>`
    resultsContainer.insertAdjacentHTML('beforeend', groupHTML)
  })
}

function toggleDropdown (element) {
  const content = element.nextElementSibling
  const isExpanded = element.getAttribute('aria-expanded') === 'true'
  element.setAttribute('aria-expanded', !isExpanded)
  content.style.display = isExpanded ? 'none' : 'block'
}

// function displayResults (results) {
//   wrapper.classList.add('active')
//   const resultsContainer = document.querySelector('.results')
//   resultsContainer.innerHTML = '' // 清空之前的结果

//   // 按照 result.capital 排序
//   results.sort((a, b) => a.capital.localeCompare(b.capital))

//   results.forEach(result => {
//     const borderColor = result.contains_important ? 'red' : 'blue'
//     const borderWidth = result.contains_important ? '3px' : '1px'
//     // 检查 result.content 是否包含 "important"，并相应地高亮显示
//     const highlightedContent = result.content
//       .replace(
//         /(important)/gi,
//         '<span style="background-color: yellow;">$1</span>'
//       )
//       .replace(
//         /([^{}]*\{)/g,
//         '<span style="font-weight: bold; color: #2e294e;">$1</span>'
//       )

//     const resultHTML = `
//             <div class="result-item" style="border: ${borderWidth} solid ${borderColor}; padding: 10px; margin-bottom: 20px;">
//                 <h1 style="color: #1b998b; text-align: center;">${result.capital}</h1>
//                 <h4 style="color: #f46036; text-align: center;">${result.file_name}</h4>
//                 <br>
//                 <pre style="text-align: justify; white-space: pre-wrap; word-wrap: break-word;">${highlightedContent}</pre>
//             </div>`
//     resultsContainer.insertAdjacentHTML('beforeend', resultHTML)
//   })
// }

function search (word) {
  fetchApi(word)
  searchInput.value = word
}

function fetchApi (word) {
  wrapper.classList.remove('active')
  infoText.style.color = '#000'
  infoText.innerHTML = `Searching for CSS rules that match <span>"${word}"</span>`
  let url = `https://111.229.182.252:5123/search_css` // 更新为你的 Flask 应用的新路由
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
