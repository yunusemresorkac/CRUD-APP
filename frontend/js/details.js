function fetchDetailData(postId) {
    fetch(`http://localhost:3000/get-data/${postId}`)
      .then(response => response.json())
      .then(data => {
        createDetailPage(data);
      })
      .catch(error => console.error('Hata:', error));
  }
  
  function createDetailPage(data) {
    const detailPageContainer = document.getElementById('detailPageContainer');
    detailPageContainer.innerHTML = `
      <h1>${data.FirstName} ${data.LastName}</h1>
      <p>Şehir: ${data.City}</p>
      <p>İlçe: ${data.District}</p>
      <p>Oda Sayısı: ${data.RoomCount}</p>
      <!-- Daha fazla detay ekleyebilirsiniz -->
    `;
  }
  
  window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');
    fetchDetailData(postId);
  };