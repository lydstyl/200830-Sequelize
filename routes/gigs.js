const express = require('express')

const db = require('../config/database')
const Gig = require('../models/Gig')

const router = express.Router()

// Display add gig form
router.get('/add', (req, res) => res.render('add'))

// Get gig list
router.get('/', (req, res) =>
  Gig.findAll()
    .then((gigs) => {
      res.render('gigs', {
        gigs: gigs.map((gig) => ({
          title: gig.title,
          technology: gig.technology,
          budget: gig.budget,
          description: gig.description,
          contact_email: gig.contact_email,
        })),
      })
    })
    .catch((err) => console.log(err))
)

// Add a gig
router.post('/add', (req, res) => {
  const data = {
    title: 'Simple WordPress website',
    technologies: 'WordPress, PHP, JS, HTML, CSS',
    budget: '$1000',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    contact_email: 'user2@gmail.com',
  }

  let { title, technologies, budget, description, contact_email } = data

  // Insert into table
  Gig.create({
    title,
    technologies,
    description,
    budget,
    contact_email,
  })
    .then((gig) => res.redirect('/gigs'))
    .catch((err) => console.log(err))
})

module.exports = router
