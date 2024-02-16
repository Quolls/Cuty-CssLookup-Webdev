export function removeCSSClass(ele, cls) {
  const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
  ele.className = ele.className.replace(reg, " ");
}

export function addCSSClass(ele, cls) {
  ele.classList.add(cls);
}

export const removeAnswere = (addAns) => {
  localStorage.setItem('answer', JSON.stringify([addAns?.[0]]))
}

export const toAbsoluteUrl = pathname => process.env.PUBLIC_URL + pathname;
