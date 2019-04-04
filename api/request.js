/**
 *
 * @authors liwb (lwbhtml@gmail.com)
 * @date    2018/6/5 上午10:43
 * @description https://github.com/mzabriskie/axios
 * 安卓4.4.3一下的手机还是不支持Promise的,需要引入npm install babel-polyfill和npm install babel-runtime，在入口文件上加上即可
 * import 'babel-polyfill';
 */

import Light from 'light';
import autoMatchBaseUrl from './autoMatchBaseUrl';

const stream = weex.requireModule('stream');

const TIMEOUT = 10000;

/**
 * 基于axios ajax请求
 * @param url
 * @param method
 * @param timeout
 * @param prefix 用来拼接url地址
 * @param data
 * @param headers
 * @param dataType
 * @returns {Promise.<T>}
 */
export default function request(url, {
  method = 'get',
  prefix = '',
  data = {},
  headers = {},
  dataType = 'json',
  jsonpCallbackName = 'callback'
}) {
  const baseURL = autoMatchBaseUrl(prefix);
  headers = Object.assign(
    {}, { "Content-Type": "application/x-www-form-urlencoded" }, headers
  );

  url = baseURL + url;

  const defaultConfig = {
    method,
    url,
    type: dataType,
    headers
  };

  // jsonp 请求
  if (dataType === 'jsonp') {
    defaultConfig['jsonpCallbackName'] = jsonpCallbackName;
  }

  // post 请求
  if (method.toLocaleLowerCase() === 'post') {
    defaultConfig['body'] = JSON.stringify(data);
  }

  return new Promise((resolve, reject) => {
    stream.fetch(defaultConfig,
      (ret) => {
        if (ret.ok) {
          resolve(ret.data);
        } else {
          reject(ret);
        }
      });
  });
}
