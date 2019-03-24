const Router = require('koa-router');
const router = new Router();

module.exports = ({ router }) => {
  router.get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
  });
  
  router.get('/contacts', (ctx, next) => {
    ctx.body = {name:"Jhonatan"};
   });
};