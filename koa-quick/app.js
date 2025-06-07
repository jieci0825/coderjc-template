const path = require('path')
const Koa = require('koa')
const Router = require('koa-router') 
const { koaBody } = require('koa-body')
const cors = require('@koa/cors')
const serve = require('koa-static')

const router = new Router({ prefix: '/api' })
const app = new Koa()
app.use(cors())
app.use(serve(path.resolve(process.cwd(), 'public'), { maxage: 1000 * 60 * 60 }))
app.use(koaBody())
app.use(router.routes())
app.use(router.allowedMethods())  

router.get('/', async (ctx, next) => {
    ctx.body = '欢迎使用 koa-api-gen'
})

router.post('/', async ctx => {
    console.log(ctx.request.body)
    ctx.body = 'post请求'
})

app.listen(9527, () => {
    console.log(`server is running at http://localhost:9527`)
})