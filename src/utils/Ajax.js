import { API_URL, DOMAIN_URL, TYPE_HTTP } from '../Settings';
/*
Пример использования:
ajax('auth/login')
.then(data => {Обрабатываем данные})
.catch((error) => { Обрабатываем ошибку })
*/
// options = method, headers, body, mode, credentials, cache, redirect

export default function ajax(path, params) {
  const options = Object.assign({}, params);
  const typeContent = 'application/json';
  options.method = options.method || 'POST';
  options.headers = options.headers || {
    Accept: typeContent,
    'Content-Type': typeContent,
  };
  if (options.body) {
    options.body = JSON.stringify(options.body);
  }
  return fetch(TYPE_HTTP + DOMAIN_URL + API_URL + path, options)
    .then((response) => {
      const contentType = response.headers.get('content-type');
      const isJson = contentType && contentType.indexOf('application/json') !== -1;
      if (!response.ok) {
        if (isJson) {
          throw response.json();
        }
        throw Object({ error: response.status, message: response.statusText });
      }
      if (response.ok && isJson) {
        return response.json();
      }
      return response.text();
    });
}
