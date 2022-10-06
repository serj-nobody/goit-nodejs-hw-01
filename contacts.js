const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, '/db/contacts.json') ;


const listContacts = async() => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

const getContactById = async(contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(contact => contact.id === contactId);
  return result || null;
}

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;

}

const removeContact = async(contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);

  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  const updatedContacts = contacts.filter(contact => contact[index] !== index);
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  return result;
}


module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact
};