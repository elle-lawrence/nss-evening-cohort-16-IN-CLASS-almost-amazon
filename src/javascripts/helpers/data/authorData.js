import axios from 'axios';
import firebaseConfig from '../../../api/apiKeys';
// API CALLS FOR AUTHORS
const dbUrl = firebaseConfig.databaseURL;
// GET AUTHORS
const getAuthors = (userId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors.json?orderBy="uid"&equalTo="${userId}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

// DELETE AUTHOR
const deleteAuthor = (firebaseKey, userId) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/authors/${firebaseKey}.json`)
    .then(() => {
      getAuthors(userId).then(resolve);
    })
    .catch(reject);
});
// CREATE AUTHOR
const createAuthor = (authorObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/authors.json`, authorObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/authors/${response.data.name}.json`, body)
        .then(() => {
          getAuthors(authorObj.uid).then((authorsArray) => resolve(authorsArray));
        });
    }).catch((error) => reject(error));
});

const getSingleAuthor = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});
// UPDATE AUTHOR
const updateAuthor = (userId, authorObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/authors/${authorObj.firebaseKey}.json`, authorObj)
    .then(() => getAuthors(userId).then(resolve))
    .catch(reject);
});
// SEARCH AUTHORS
const favAuthors = (userId) => new Promise((resolve, reject) => {
  getAuthors(userId)
    .then((userAuthorsArray) => {
      const favAuth = userAuthorsArray.filter((author) => author.favorite);
      resolve(favAuth);
    }).catch(reject);
});

const getAuthorBooks = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books.json?orderBy="author_id"&equalTo="${firebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const searchFirstName = (firstName) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books.json?orderBy="title"&equalTo="${firstName}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const searchLastName = (lastName) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books.json?orderBy="title"&equalTo="${lastName}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

export {
  getAuthors,
  createAuthor,
  favAuthors,
  deleteAuthor,
  updateAuthor,
  getSingleAuthor,
  getAuthorBooks,
  searchFirstName,
  searchLastName
};
