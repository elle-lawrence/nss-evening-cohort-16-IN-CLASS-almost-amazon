import { showBooks } from '../components/books';
import { showAuthors } from '../components/authors';
import logoutButton from '../components/buttons/logoutButton';
import domBuilder from '../components/domBuilder';
import navBar from '../components/navBar';
import domEvents from '../events/domEvents';
import navigationEvents from '../events/navigationEvents';
import { getAuthors } from '../helpers/data/authorData';
import { getBooks } from '../helpers/data/bookData';

const startApp = () => {
  domBuilder(); // BUILD THE DOM
  domEvents(); // ADD THE EVENT LISTENTERS TO THE DOM
  navBar(); // DYNAMICALLY ADD THE NAV
  logoutButton(); // ADD THE LOGOUT BUTTON COMPONENT
  navigationEvents(); // ATTACH THE EVENT LISTENERS TO THE NAVBAR
  getAuthors().then((authors) => showAuthors(authors));
  getBooks().then((books) => showBooks(books));
};

export default startApp;
