import {
  deleteAuthor,
  getSingleAuthor,
  getAuthorBooks,
  searchFirstName,
  searchLastName
} from './authorData';
import {
  getSingleBook,
  deleteBook,
  booksByAuthor,
  searchTitle,
  getBooks
} from './bookData';

const viewBookDetails = (bookFirebasekey) => new Promise((resolve, reject) => {
  getSingleBook(bookFirebasekey)
    .then((bookObject) => {
      getSingleAuthor(bookObject.author_id)
        .then((authorObject) => {
          resolve({ authorObject, ...bookObject });
        });
    }).catch(reject);
});

const viewAuthorsBooks = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleAuthor(firebaseKey)
    .then((authorObject) => {
      booksByAuthor(authorObject.firebaseKey)
        .then((bookObject) => {
          resolve({ bookObject, ...authorObject });
        });
    }).catch(reject);
});

const deleteAuthorBooks = (authorId, userId) => new Promise((resolve, reject) => {
  getAuthorBooks(authorId).then((authorBookArray) => {
    const deleteBooks = authorBookArray.map((book) => deleteBook(book.firebaseKey, userId));
    Promise.all([...deleteBooks]).then(() => resolve(deleteAuthor(authorId, userId)));
  }).catch(reject);
});

const searchCall = (searchedValue) => new Promise((resolve, reject) => {
  searchTitle(searchedValue)
    .then((titleArray) => {
      searchFirstName(searchedValue.first_Name)
        .then((firstNameArray) => {
          searchLastName(searchedValue.last_Name)
            .then((lastNameArray) => {
              console.warn(resolve(getBooks([titleArray, ...firstNameArray, ...lastNameArray])));
            });
        });
    }).catch(reject);
});

//   const searchBooks = searchArray.map((book) => showBook(book.title));
//   const searchFirstName = searchArray.map((book) => showBook(book.first_Name));
//   const searchLastName = searchArray.map((book) => showBook(book.last_Name));
//   Promise.all([...deleteBooks]).then(() => resolve(showBooks(authorId)));

export {
  viewBookDetails,
  viewAuthorsBooks,
  deleteAuthorBooks,
  searchCall
};
