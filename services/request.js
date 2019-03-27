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

const TIMEOUT = 10000;

function checkStatus(response) {
  // 如果http状态码正常，则直接返回数据
  if (response) {
    // -1000 自己定义，连接错误的status
    const status = response.status || -1000;
    if ((status >= 200 && status < 300) || status === 304) {
      // 如果不需要除了data之外的数据，可以直接 return response.data
      return response.data;
    } else {
      let errorInfo = '';
      switch (status) {
        case -1:
          errorInfo = '远程服务响应失败,请稍后重试';
          break;
        case 400:
          errorInfo = '400: 错误请求';
          break;
        case 401:
          errorInfo = '401: 访问令牌无效或已过期';
          break;
        case 403:
          errorInfo = '403: 拒绝访问';
          break;
        case 404:
          errorInfo = '404：资源不存在';
          break;
        case 405:
          errorInfo = '405: 请求方法未允许';
          break;
        case 408:
          errorInfo = '408: 请求超时';
          break;
        case 500:
          errorInfo = '500：访问服务失败';
          break;
        case 501:
          errorInfo = '501：未实现';
          break;
        case 502:
          errorInfo = '502：无效网关';
          break;
        case 503:
          errorInfo = '503: 服务不可用';
          break;
        default:
          errorInfo = `连接错误${status}`;
      }
      return {
        status,
        msg: errorInfo
      };
    }
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  };
}

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
  method = 'post',
  timeout = TIMEOUT,
  prefix = '',
  data = {},
  headers = {},
  dataType = 'json'
}) {
  const baseURL = autoMatchBaseUrl(prefix);

  headers = Object.assign(method === 'get' ? {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=UTF-8'
  } : {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }, headers);

  return new Promise((resolve, reject) => {
    Light.ajax({
      type: method,
      url: baseURL + url,
      dataType,
      data,
      headers,
      success(data) {
        resolve(data);
      },
      error(err) {
        reject(err);
      }
    });
  });
}
