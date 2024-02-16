const wrapper = document.querySelector('.wrapper'),
  searchInput = wrapper.querySelector('input'),
  infoText = wrapper.querySelector('.info-text'),
  resultsContainer = wrapper.querySelector('.results'),
  removeIcon = wrapper.querySelector('.search span')

function displayResults (results) {
  wrapper.classList.add('active')
  resultsContainer.innerHTML = '' // 清空之前的结果
  if (results.length > 0) {
    results.forEach(result => {
      const resultHTML = `
        <div class="result-item">
          <p class="css-name"><strong>CSS Name:</strong> ${result.css_name}</p>
          <p class="content"><strong>Content:</strong> ${result.content}</p>
          <p class="important"><strong>Contains Important:</strong> ${
            result.contains_important ? 'Yes' : 'No'
          }</p>
          <p class="capital"><strong>Capital:</strong> ${result.capital}</p>
          <p class="file-name"><strong>File Name:</strong> ${
            result.file_name
          }</p>
        </div>`
      resultsContainer.insertAdjacentHTML('beforeend', resultHTML)
    })
  } else {
    infoText.innerHTML = `Can't find the CSS rule for <span>"${searchInput.value}"</span>. Please, try to search for another word.`
  }
}

function search (word) {
  fetchApi(word)
  searchInput.value = word
}

function fetchApi (word) {
  wrapper.classList.remove('active')
  infoText.style.color = '#000'
  infoText.innerHTML = `Searching for CSS rules that match <span>"${word}"</span>`
  let url = `http://localhost:5201/search_css` // 更新为你的 Flask 应用的新路由
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
