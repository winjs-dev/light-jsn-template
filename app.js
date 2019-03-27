import App from 'light';
import './assets/css/reset.css';
import './assets/fonts/iconfont.css';
import './assets/css/main.css';

App.filter('start', function (next) {
  //启动拦截器
  App.log('app started...');
  next();
}).filter('route', function (from, to, next) {
  //视图拦截器
  App.log(`view changed:${from.path}--${to.path}`);
  next();
}).start();