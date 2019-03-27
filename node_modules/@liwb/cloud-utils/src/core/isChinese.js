/**
 * 是否为中文
 *
 * @since 1.2.4
 * @param {string} str
 * @returns {boolean}
 * @example
 *
 * isChinese('中文');
 * // => true
 */
function isChinese(str) {
  var reg = /^[\u4E00-\u9FA5]+$/;

  return reg.test(str);
}

export default isChinese;
