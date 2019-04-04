import config from '../config';

/**
 * 根据前缀，自动匹配基础的url
 * 根据项目所需，自己扩展
 * @param prefix
 * @returns {string}
 */
export default function autoMatchBaseUrl(prefix) {
  let baseUrl = '';
  switch (prefix) {
    default:
      baseUrl = config.API_HOME;
  }

  return `${baseUrl}`;
}
