const loadHTML = (response) => {
  let code = document.createElement('code')
  code.innerHTML = response
  return code
}

