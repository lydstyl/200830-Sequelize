const express = require('express')
const exphdbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')

// Database
const db = require('./config/database')

// Test DB
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log('Error: ' + err))

const app = express()

// Index route
app.get('/', (req, res) => {
  return res.render('index', { layout: 'landing' })
})

// Handlebars
app.engine('handlebars', exphdbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Gig routes
app.use('/gigs', require('./routes/gigs'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server started on port ${PORT}`))
