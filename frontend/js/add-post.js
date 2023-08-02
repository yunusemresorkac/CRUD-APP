function addData() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const publisher = document.getElementById('publisher').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const pageCount = document.getElementById('pageCount').value;
    const price = document.getElementById('price').value;

    const data = {
        Title: title,
        Author: author,
        Publisher: publisher,
        Category: category,
        Description: description,
        PageCount : pageCount,
        Price : price
    };

    fetch('http://localhost:3000/add-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(result => {
            alert(result.message);
            document.getElementById('dataForm').reset();
        })
        .catch(error => console.error('Hata:', error));
}

document.getElementById('dataForm').addEventListener('submit', (event) => {
    event.preventDefault();
    addData();
});
