import { showBooks } from '../components/books';
import { showAuthors } from '../components/authors';
import logoutButton from '../components/buttons/logoutButton';
import domBuilder from '../components/domBuilder';
import navBar from '../components/navBar';
import domEvents from '../events/domEvents';
import navigationEvents from '../events/navigationEvents';
import { getAuthors } from '../helpers/data/authorData';
import { getBooks } from '../helpers/data/bookData';

const startApp = (user) => {
  domBuilder(); // BUILD THE DOM
  domEvents(user.uid); // ADD THE EVENT LISTENTERS TO THE DOM
  navBar(); // DYNAMICALLY ADD THE NAV
  logoutButton(); // ADD THE LOGOUT BUTTON COMPONENT
  navigationEvents(user.uid); // ATTACH THE EVENT LISTENERS TO THE NAVBAR
  getAuthors(user.uid).then((authors) => showAuthors(authors));
  getBooks(user.uid).then((books) => showBooks(books));
};

export default startApp;
