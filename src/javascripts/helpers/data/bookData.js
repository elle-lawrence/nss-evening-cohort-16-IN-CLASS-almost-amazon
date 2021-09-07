import axios from 'axios';
import firebaseConfig from '../../../api/apiKeys';
// API CALLS FOR BOOKS

const dbUrl = firebaseConfig.databaseURL;

// GET BOOKS
const getBooks = (userId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books.json?orderBy="uid"&equalTo="${userId}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

// DELETE BOOK
const deleteBook = (firebaseKey, userId) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/books/${firebaseKey}.json`)
    .then(() => {
      getBooks(userId).then(resolve);
    })
    .catch(reject);
});
// GET SINGLE BOOK
const getSingleBook = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});
// BOOKS BY AUTHOR
const booksByAuthor = (authorId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books.json?orderBy="author_id"&equalTo="${authorId}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});
// CREATE BOOK
const createBook = (bookObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/books.json`, bookObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/books/${response.data.name}.json`, body)
        .then(() => {
          getBooks(bookObj.uid).then((booksArray) => resolve(booksArray));
        });
    }).catch((error) => reject(error));
});
// UPDATE BOOK
const updateBook = (userId, bookObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/books/${bookObj.firebaseKey}.json`, bookObj)
    .then(() => getBooks(userId).then(resolve))
    .catch(reject);
});
// SALE BOOKS

const booksOnSale = (userId) => new Promise((resolve, reject) => {
  getBooks(userId)
    .then((userBooksArray) => {
      const onSaleBooks = userBooksArray.filter((book) => book.sale);
      resolve(onSaleBooks);
    }).catch(reject);
});

// SEARCH BOOKS

const searchTitle = (title) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books.json?orderBy="title"&equalTo="${title}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

export {
  getBooks,
  createBook,
  booksOnSale,
  deleteBook,
  getSingleBook,
  updateBook,
  booksByAuthor,
  searchTitle
};
