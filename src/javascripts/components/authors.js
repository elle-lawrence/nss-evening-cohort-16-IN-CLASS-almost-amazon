import clearDom from '../helpers/data/clearDom';

const showAuthors = (array) => {
  clearDom();
  // CREATE A BUTTON TO ADD BOOKS
  document.querySelector('#add-button').innerHTML = '<button class="btn btn-success btn-lg mb-4" id="add-author-btn">Add An Author</button>';
  document.querySelector('#form-container').innerHTML = '';
  array.forEach((item) => {
    document.querySelector('#store').innerHTML += `
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${item.first_name} ${item.last_name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${item.email}</h6>
          <p class="card-text"></p>
          <p class="card-text bold">${item.favorite ? `<span class="badge rounded-pill bg-info text-dark" aria-hidden="true">favorite</span> ${item.favorite}` : ''}</p>
          <i class="btn btn-success fas fa-eye" id="view-author-btn--${item.firebaseKey}"></i>
          <i id="edit-author-btn--${item.firebaseKey}" class="fas fa-edit btn btn-info"></i>
          <i id="delete-author--${item.firebaseKey}" class="btn btn-danger fas fa-trash-alt"></i>
        </div>
      </div>`;
  });
};

const emptyAuthors = () => {
  document.querySelector('#store').innerHTML = '<h1>No Authors</h1>';
};

const authorsBooks = (bookArray) => {
  let authorBookString = '';
  bookArray.forEach((bookTitle) => {
    authorBookString += `<li>${bookTitle}</li>`;
  });
  document.querySelector('#view').innerHTML = authorBookString;
};

export { showAuthors, emptyAuthors, authorsBooks };
