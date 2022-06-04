// 引入外部套件
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')

// 建立基本參數
const port = 3000
const app = express()
let validatedUser = ''

// 使用者名單
const users = require('./models/users.json')

// 建立 session 的 middleware，並將需要帶入的屬性放進 options 物件中
app.use(session({
 secret: 'mySecret', // 存放在cookie的sessionID
 name: 'isLoggedIn', // name是指存放在cookie的key，可以不寫，如果不寫的話預設是connect.sid
 resave: false, // 代表在每次與使用者互動後，不會強制把 session 儲存，除非 session 有變動
 saveUninitialized: false
}))

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
  const validateEmail = users.find(object => object.email === email) || []
  if (validateEmail.length <= 0) {
    const errorEmail = '您輸入的電子郵件地址不正確'
    res.render('index', { errorEmail })
  } else {
    if (password !== validateEmail.password) {
      const errorPassword = '您輸入的密碼不正確'
      res.render('index', { errorPassword })
    } else {
      validatedUser = validateEmail.firstName
      req.session.user = validateEmail.firstName
      req.session.isLoggedIn = true  // 在 session物件上新增key和value
      console.log(req.session)
      console.log(req.sessionID)
      res.redirect('/login')
    }
  }
})

app.get('/login', (req, res) => {
  res.render('login', { validatedUser })
})

// 監聽路由
app.listen(port, () => {
  console.log(`Express is running on localhost:${port}`)
})
