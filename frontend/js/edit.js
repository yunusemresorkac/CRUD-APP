document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("postId");
  
    fetch(`http://localhost:3000/get-data/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        populateEditForm(data);
      })
      .catch((error) => console.error("Hata:", error));
  
    const editForm = document.getElementById("editForm");
    editForm.addEventListener("submit", updateData);
  });
  
  function populateEditForm(data) {
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const publisher = document.getElementById('publisher');
    const category = document.getElementById('category');
    const description = document.getElementById('description');
    const pageCount = document.getElementById('pageCount');
    const price = document.getElementById('price');
  

    title.value = data.Title;
    author.value = data.Author;
    publisher.value = data.Publisher;
    category.value = data.Category;
    description.value = data.Description;
    pageCount.value = data.PageCount;
    price.value = data.Price;

  
  }
  
  function updateData(event) {
    event.preventDefault();
  
    const editForm = event.target;
    const formData = new FormData(editForm);
  
    const updatedData = {
      Title: formData.get("Title"),
      Author: formData.get("Author"),
      Publisher: formData.get("Publisher"),
      Category: formData.get("Category"),
      Description: formData.get("Description"),
      PageCount: formData.get("PageCount"),
      Price: formData.get("Price"),

    };
  
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("postId");
  
    fetch(`http://localhost:3000/update-data/${postId}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data updated:", data);
        window.location.href = "index.html"
      })
      .catch((error) => console.error("Hata:", error));
  }