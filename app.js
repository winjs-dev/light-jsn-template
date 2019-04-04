import App from 'light';

App.filter('start', (next) =>{
  console.log('App', App);
  //启动拦截器
  App.log('app started...');
  next();
}).filter('route', (from, to, next) => {
  //视图拦截器
  App.log(`view changed:${from.path}--${to.path}`);
  next();
}).start();