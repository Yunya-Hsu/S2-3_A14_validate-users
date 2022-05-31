// 引入外部套件
const express = require('express')
const exphbs = require('express-handlebars')

// 建立基本參數
const port = 3000
const app = express()

// 使用者名單
const users = [
  {
    firstName: 'Tony',
    email: 'tony@stark.com',
    password: 'iamironman'
  },
  {
    firstName: 'Steve',
    email: 'captain@hotmail.com',
    password: 'icandothisallday'
  },
  {
    firstName: 'Peter',
    email: 'peter@parker.com',
    password: 'enajyram'
  },
  {
    firstName: 'Natasha',
    email: 'natasha@gamil.com',
    password: '*parol#@$!'
  },
  {
    firstName: 'Nick',
    email: 'nick@shield.com',
    password: 'password'
  }
]

// 使用express-handlebars為樣板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 使用body-parser和method-override
app.use(express.urlencoded({ extended: true }))

// 設定路由
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const { email, password } = req.body
  console.log(email)
  console.log(password)

  res.send(`got input`)
})


// 監聽路由
app.listen(port, () => {
  console.log(`Express is running on localhost:${port}`)
})
