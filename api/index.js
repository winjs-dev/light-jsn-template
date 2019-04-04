import request from './request';
import urls from './RESTFULLURL';

let FUNS = {};

Object.keys(urls).forEach((key) => {
  FUNS[key] = (options = {}) => {
    return request(urls[key], options);
  };
});

export default FUNS;
