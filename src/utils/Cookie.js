/* eslint-disable no-loops/no-loops,no-restricted-syntax */

// возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
  const matches = document.cookie.match(new RegExp(
    `(?:^|; )${name.replace(/([$()*+./?[\\\]^{|}])/g, '\\$1')}=([^;]*)`,
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// устанавливает cookie с именем name и значением value
// options - объект с свойствами cookie (expires, path, domain, secure)
function setCookie(name, val, params) {
  const value = encodeURIComponent(val);
  const options = Object.assign({}, params);
  let expires = options.expires;

  if (typeof expires === 'number' && expires) {
    const d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    options.expires = d;
    expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  let updatedCookie = `${name}=${value}`;

  for (const propName in options) {
    if (Object.prototype.hasOwnProperty.call(options, propName)) {
      updatedCookie += `; ${propName}`;
      const propValue = options[propName];
      if (propValue !== true) {
        updatedCookie += `=${propValue}`;
      }
    }
  }
  document.cookie = updatedCookie;
}

// удаляет cookie с именем name
function deleteCookie(name, path) {
  setCookie(name, '', { expires: -1, path: (path) || '/' });
}

// проверяет включены ли Cookie у пользователя
function isEnableCookie() {
  setCookie('is_enable_cookie', 'enable');
  const isEnable = getCookie('is_enable_cookie');
  deleteCookie();
  return !!isEnable;
}

export {
  getCookie, setCookie, deleteCookie, isEnableCookie,
};
