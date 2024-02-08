const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const user = req.session.user;
    res.render('create', { user: user});
});

router.post('/', async (req, res) => {
    const first = req.body.first.trim();
    const last = req.body.last.trim();
    const phone = req.body.phone.trim();
    const email = req.body.email.trim();
    const street = req.body.street.trim();
    const city = req.body.city.trim();
    const state = req.body.state.trim();
    const zip = req.body.zip.trim();
    const country = req.body.country.trim();
    const contact_by_email = req.body.contact_by_email !== undefined ? true : false;
    const contact_by_phone = req.body.contact_by_phone !== undefined ? true : false;
    const contact_by_mail = req.body.contact_by_mail !== undefined ? true : false;
    const id = await req.db.createContact(first, last, phone, email, street, city, state, zip, country, contact_by_email, contact_by_phone, contact_by_mail);
    res.redirect('/');
});

module.exports = router;