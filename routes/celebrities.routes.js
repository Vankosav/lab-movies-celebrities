const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
router.get('/celebrities/create', (req, res) => res.render('celebrities/new-celebrity'));

router.post('/celebrities/create', async (req, res) => {
    try {
        const {name, occupation, catchPhrase} = req.body
        await Celebrity.create({name, occupation, catchPhrase})
        res.redirect("/celebrities")
    } catch (error) {
        console.log(error);
        res.redirect('/celebrities/new-celebrities')
    }
});

module.exports = router;