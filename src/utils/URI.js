/* eslint-disable no-loops/no-loops,no-plusplus,prefer-destructuring */
// Возвращает массив GET параметров из URL содержащих только буквы и цифры
export default function getParamsURI() {
  let query = window.location.search.slice(1);
  const params = {};
  if (query) {
    query = decodeURIComponent(query);
    query = query.split('#')[0];
    const arr = query.split('&');

    for (let i = 0; i < arr.length; i++) {
      const a = arr[i].split('=');
      if (!!a[1] && /^\w+$/.test(a[0]) && /^[\w/]+$/.test(a[1])) params[a[0]] = a[1];
    }
  }
  return params;
}
