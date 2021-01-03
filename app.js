const express = require('express')
const router = require('./routes/index')
const currency = require('./helpers/currency')
const app = express()
const PORT = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))
app.locals.formatCurrency = currency
app.use(router)

app.listen(PORT, ()=> {
  console.log('this app is running on port', PORT)
})