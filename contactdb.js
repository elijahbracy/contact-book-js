require('dotenv').config();
const Database = require('dbcmps369');
const bcrypt = require('bcryptjs');

class ContactDB {
    constructor() {
        this.db = new Database();
    }

    async initialize() {
        await this.db.connect();

        await this.db.schema('Contact', [
            { name: 'id', type: 'INTEGER' },
            { name: 'first', type: 'TEXT' },
            { name: 'last', type: 'TEXT' },
            { name: 'phone', type: 'TEXT' },
            { name: 'email', type: 'TEXT' },
            { name: 'street', type: 'TEXT' },
            { name: 'city', type: 'TEXT' },
            { name: 'state', type: 'TEXT' },
            { name: 'zip', type: 'TEXT' },
            { name: 'country', type: 'TEXT' },
            { name: 'contact_by_email', type: 'INTEGER' },
            { name: 'contact_by_phone', type: 'INTEGER' },
            { name: 'contact_by_mail', type: 'INTEGER' }
        ], 'id');

        await this.db.schema('Users', [
            { name: 'id', type: 'INTEGER' },
            { name: 'first_name', type: 'TEXT' },
            { name: 'last_name', type: 'TEXT' },
            { name: 'username', type: 'TEXT' },
            { name: 'password', type: 'TEXT' },
        ], 'id');

        
        const incomplete = await this.db.read('Contact', [{ column: 'first', value: '' }]);
        for (const g of incomplete) {
            await this.db.delete('Contact', [{ column: 'id', value: g.id }]);
        }
        
        if (!(await this.findUserByUsername('cmps369'))) {
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync('rcnj', salt);
            this.createUser('test', 'user', 'cmps369', hash);
        }
    }

    async createUser(first_name, last_name, username, password) {
        const id = await this.db.create('Users', [
            { column: 'first_name', value: first_name },
            { column: 'last_name', value: last_name },
            { column: 'username', value: username },
            { column: 'password', value: password }
        ])
        return id;
    }

    async createContact(first, last, phone, email, street, city, state, zip, country, contact_by_phone, contact_by_email, contact_by_mail) {
        const id = await this.db.create('Contact', [
            { column: 'first', value: first },
            { column: 'last', value: last },
            { column: 'phone', value: phone },
            { column: 'email', value: email },
            { column: 'street', value: street },
            { column: 'city', value: city },
            { column: 'state', value: state },
            { column: 'zip', value: zip },
            { column: 'country', value: country },
            { column: 'contact_by_phone', value: contact_by_phone },
            { column: 'contact_by_email', value: contact_by_email },
            { column: 'contact_by_mail', value: contact_by_mail }
        ])
        return id;
    }

    async updateContact(id, first, last, phone, email, street, city, state, zip, country, contact_by_phone, contact_by_email, contact_by_mail) {
    
        const updatedValues = [
            { column: 'first', value: first },
            { column: 'last', value: last },
            { column: 'phone', value: phone },
            { column: 'email', value: email },
            { column: 'street', value: street },
            { column: 'city', value: city },
            { column: 'state', value: state },
            { column: 'zip', value: zip },
            { column: 'country', value: country },
            { column: 'contact_by_phone', value: contact_by_phone },
            { column: 'contact_by_email', value: contact_by_email },
            { column: 'contact_by_mail', value: contact_by_mail }
        ];
            
        const query = [
            {column: 'id', value: id},
        ];
        console.log('updatedValues: ', updatedValues);
        
        await this.db.update('Contact', updatedValues, query);
        return;
    }

    async getAllContacts() {
        const contacts = await this.db.read('Contact', []);
        return contacts;
      }

    async findUserByUsername(username) {
        const us = await this.db.read('Users', [{ column: 'username', value: username }]);
        if (us.length > 0) return us[0];
        else {
            return undefined;
        }
    }

    async findUserById(id) {
        const us = await this.db.read('Users', [{ column: 'id', value: id }]);
        if (us.length > 0) return us[0];
        else {
            return undefined;
        }
    }

    async findContactById(id) {
        const us = await this.db.read('Contact', [{ column: 'id', value: id }]);
        if (us.length > 0) return us[0];
        else {
            return undefined;
        }
    }

    async deleteContactById(id) {
        const us = await this.db.delete('Contact', [{ column: 'id', value: id }]);
        if (us.length > 0) return us[0];
        else {
            return undefined;
        }
    }
}

module.exports = ContactDB;