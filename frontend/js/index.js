
fetch('http://localhost:3000/get-data')
  .then(response => response.json())
  .then(data => {
    createCards(data);

  })
  .catch(error => console.error('Hata:', error));

function createCards(data) {
  const cardContainer = document.getElementById('cardContainer');
  cardContainer.innerHTML = '';

  data.forEach(item => {
    const cardCol = document.createElement('div');
    cardCol.className = 'col-md-4 mb-4';

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${item.Title} - ${item.Author}</h5>
          <p class="card-text">Tür: ${item.Category}</p>
          <p class="card-text">Yayınevi: ${item.Publisher}</p>
          <p class="card-text">Sayfa Sayısı: ${item.PageCount}</p>
          <h6 class="card-text">Fiyat: ${item.Price}₺</h6>

          <button id="deleteBtn" class="btn btn-danger delete-button" data-post-id="${item.PostId}">Delete</button>
          <button  id="editBtn" class="btn btn edit-button" data-post-id="${item.PostId}">Edit</button>


        </div>
      `;

    cardCol.appendChild(card);
    cardContainer.appendChild(cardCol);

    card.querySelector('.delete-button').addEventListener('click', (event) => {
      event.stopPropagation(); 
      const postId = event.target.dataset.postId;
      deleteData(postId);
    });

    card.querySelector('.edit-button').addEventListener('click', (event) => {
      event.stopPropagation(); 
      const postId = event.target.dataset.postId;
      redirectToEditPage(postId);
    });

    card.addEventListener('click', () => {
      redirectToDetailPage(item.PostId);
    });

  });
}
function redirectToDetailPage(postId) {
  window.location.href = `details.html?postId=${postId}`;
}

function deleteData(postId) {
  fetch(`http://localhost:3000/delete-data/${postId}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(data => {
      console.log('Veri başarıyla silindi:', data);
      fetch('http://localhost:3000/get-data')
        .then(response => response.json())
        .then(data => {
          createCards(data);
        })
        .catch(error => console.error('Hata:', error));
    })
    .catch(error => console.error('Hata:', error));
}

function redirectToEditPage(postId) {
  window.location.href = `edit.html?postId=${postId}`;
}