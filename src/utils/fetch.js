import fetch from 'isomorphic-fetch';

export default function(fetchConfig = {}) {

  function removeEmptyPair(params) {
    params = params || {};
    let newObj = {};
    Object.keys(params).forEach(function(key) {
      if (params[key] !== undefined &&
        params[key] !== '' &&
        params[key] !== null
      ) newObj[key] = params[key];
    });
    return newObj;
  }

  function assembleUrl(path, params, method) {
    path = path || '';
    params = params || {};
    params = removeEmptyPair(params);
    method = method ? method.toLowerCase() : 'get';
    Object.keys(params).forEach(function(key) {
      let _path = path.replace(`:${key}`, params[key]);
      if (_path === path) {
        if (method === 'get') {
          if (_path.indexOf('?') === -1) {
            _path = `${_path}?${key}=${params[key]}`;
          } else {
            _path = `${_path}&${key}=${params[key]}`;
          }
          delete params[key];
        }
      } else {
        delete params[key];
      }
      path = _path;
    });
    return path;
  }

  function jsonResponse(response) {
    if (response && (response.status === 401 || response.status === 418)) {
      //dispatch(signOutUser());
      return {
        status: 401,
        message: '请求错误'
      };
    }
    if (response && response.status === 204 && response.statusText === 'No Content') {
      return {
        status: 204,
        message: '数据获取成功'
      };
    }
    return response.json();
  }


  return function(params, headers, settings) {
    let method = fetchConfig.method || 'get';
    method = method.toLocaleLowerCase();
    params = params || {};
    headers = headers || {};
    settings = settings || {};

    let url = assembleUrl(fetchConfig.url, params, method);
    if (!(params instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }
    let ajaxSettings = Object.assign({}, settings, {
      method: method,
      //credentials: 'include',
      headers: headers
    });

    if (method !== 'get' && method !== 'head') {
      ajaxSettings.body = params instanceof FormData ? params : JSON.stringify(params);
    }
    
    return fetch(url, ajaxSettings).then(jsonResponse).then(function(data) {
      return data;
    });
  };
}