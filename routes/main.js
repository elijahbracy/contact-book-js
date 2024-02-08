const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const user = req.session.user;
    const contacts = await req.db.getAllContacts();
    res.render('main', { contacts: contacts, user: user });
    
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const user = req.session.user;
    const contact = await req.db.findContactById(id);
    res.render('contact', { contact: contact, user: user  });
    
});

router.get('/:id/delete', async (req, res) => {
    const user = req.session.user;
    if (!user) {
        res.render('unauthorized');
    }
    const id = req.params.id;
    const contact = await req.db.findContactById(id);
    res.render('delete', { contact: contact, user: user  });
    
});

router.post('/:id/delete', async (req, res) => {
    const id = req.params.id;
    const contact = await req.db.findContactById(id);
    await req.db.deleteContactById(id);
    res.redirect('/');
    
});

router.get('/:id/edit', async (req, res) => {
    const user = req.session.user;
    if (!user) {
        res.render('unauthorized');
    }
    const id = req.params.id;
    const contact = await req.db.findContactById(id);
    res.render('update', { contact: contact, user: user  });
    
});

router.post('/:id/edit', async (req, res) => {
    const id = req.params.id;
    const contact = await req.db.findContactById(id);
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
    await req.db.updateContact(id, first, last, phone, email, street, city, state, zip, country, contact_by_email, contact_by_phone, contact_by_mail);
    res.redirect('/' + id);
});

module.exports = router;