import { showAuthors } from '../components/authors';
import { showBooks } from '../components/books';
import signOut from '../helpers/auth/signOut';
import { getAuthors, favAuthors } from '../helpers/data/authorData';
import { getBooks, booksOnSale } from '../helpers/data/bookData';
import { searchCall } from '../helpers/data/mergedData';

// navigation events
const navigationEvents = (uid) => {
  // LOGOUT BUTTON
  document.querySelector('#logout-button')
    .addEventListener('click', signOut);

  // BOOKS ON SALE
  document.querySelector('#sale-books').addEventListener('click', () => {
    booksOnSale(uid).then(showBooks);
  });

  // ALL BOOKS
  document.querySelector('#all-books').addEventListener('click', () => {
    getBooks(uid).then(showBooks);
  });

  // // SEARCH
  //   // WHEN THE USER PRESSES ENTER, MAKE THE API CALL AND CLEAR THE INPUT
  document.querySelector('#search').addEventListener('e.keyCode === 13', () => {
    const searchValue = document.querySelector('#search').value.toLowerCase();
    document.querySelector('#search').reset();
    // MAKE A CALL TO THE API TO FILTER ON THE BOOKS
    searchCall(searchValue);
    // getBooks().then(bookArray) {
    //   bookArray.filter( obj => {
    //     return obj.title.toLowerCase().includes(searchValue);
    //   });
    showBooks();
    console.warn(searchValue);
  });
  // IF THE SEARCH DOESN'T RETURN ANYTHING, SHOW THE EMPTY STORE
  // OTHERWISE SHOW THE STORE
  // document.querySelector('#search').value = '';

  document.querySelector('#authors').addEventListener('click', () => {
    getAuthors(uid).then(showAuthors);
  });

  document.querySelector('#fav-authors').addEventListener('click', () => {
    favAuthors(uid).then(showAuthors);
  });
  // FIXME: STUDENTS Create an event listener for the Authors
  // 1. When a user clicks the authors link, make a call to firebase to get all authors
  // 2. Convert the response to an array because that is what the makeAuthors function is expecting
  // 3. If the array is empty because there are no authors, make sure to use the emptyAuthor function
};

export default navigationEvents;
