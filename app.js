/*
	Include modules
*/
const koa = require('koa')
const mongoose = require('mongoose')
const convert = require('koa-convert')
const bodyParser = require('koa-bodyparser')
const router = require('koa-simple-router')
const error = require('koa-json-error')
const logger = require('koa-logger')
const koaRes = require('koa-res')
const handleError = require('koa-handle-error')
const contact = require('./controller/contact')
const app = new koa()

/*
	Mongoose Config	
*/
mongoose.Promise = require('bluebird')
mongoose
.connect('localhost:28000')
.then((response) => {
	console.log('mongo connection created')
})
.catch((err) => {
	console.log("Error connecting to Mongo")
	console.log(err);
})

/*
	Server Config
*/
// error handling
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = err.message
    ctx.app.emit('error', err, ctx)
  }
})

// logging
app.use(logger())
// body parsing
app.use(bodyParser())
// format response as JSON
app.use(convert(koaRes()))
// configure router
app.use(router(_ => {
	_.get('/saysomething', async (ctx) => {
		ctx.body = 'hello world'
	}),
	_.get('/throwerror', async (ctx) => {
		throw new Error('Aghh! An error!')
	}),
	_.get('/contacts', contact.getContacts),
	_.post('/contact', contact.createContact),
	_.put('/contact', contact.updateContact),
	_.delete('/contact', contact.deleteContact)
}))

app.listen(3000)