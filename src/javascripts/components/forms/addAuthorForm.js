import clearDom from '../../helpers/data/clearDom';

const addAuthorForm = (obj = {}) => {
  clearDom();
  document.querySelector('#form-container').innerHTML = `
    <form id="submit-author-form" class="mb-4">
      <div class="form-group">
        <label for="firstName">Author's First Name</label>
        <input type="text" class="form-control" id="firstName" aria-describedby="authorName" placeholder="Enter First Name" value='${obj.first_name || ''}'required>
      </div>
      <div class="form-group">
        <label for="lastName">Author's Last Name</label>
        <input type="text" class="form-control" id="lastName" placeholder="Enter Last Name" value='${obj.last_name || ''}'required>
      </div>
      <div class="form-group">
        <label for="authorsEmail">Author's Email</label>
        <input type="email" class="form-control" id="email" placeholder="Enter Email" value='${obj.email || ''}'required>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea class="form-control" placeholder="Author Description" id="description" style="height: 100px">${obj.description || ''}</textarea>
      </div>
      <div class="form-check">
        <input type="checkbox" class="form-check-input" id="favorite" ${obj.favorite ? 'checked' : ''}>
        <label class="form-check-label" for="favorited">Favorite?</label>
      </div>
      <button type="submit" id="${obj.firebaseKey ? `update-author--${obj.firebaseKey}` : 'submit-author'}" class="btn btn-primary">Submit Author</button>
    </form>`;
};

export default addAuthorForm;
