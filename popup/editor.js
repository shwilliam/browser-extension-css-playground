let cachedStylesheet
const inputEl = document.getElementById('__css_playground_editor_input__')
const clearEl = document.getElementById('__css_playground_editor_clear__')
const toggleEl = document.getElementById('__css_playground_editor_toggle__')
const toggleLabelOn = 'Hide custom styles'
const toggleLabelOff = 'Preview custom styles'

inputEl.addEventListener('keydown', e => {
  const styles = e.target.value

  if (toggleEl.innerText === toggleLabelOn) {
    browser.tabs.removeCSS({code: cachedStylesheet})
    browser.tabs.insertCSS({code: styles})
    cachedStylesheet = styles
  }
})

clearEl.addEventListener('click', () => {
  inputEl.value = ''
})

toggleEl.addEventListener('click', () => {
  if (cachedStylesheet) {
    // hide custom styles
    browser.tabs.removeCSS({code: cachedStylesheet})
    cachedStylesheet = null
    toggleEl.innerText = toggleLabelOff
  } else {
    // show custom styles
    const styles = inputEl.value
    cachedStylesheet = styles
    browser.tabs.insertCSS({code: styles})
    toggleEl.innerText = toggleLabelOn
  }
})
