let connect = function () {
  fetch('http://127.0.0.1:3000/api/posts', {
          method: 'get'
      })
      .then(function (response) {
          return response.json();
      })
      .then((jsonData) => {
          console.log(jsonData);
          // return update(jsonData.streams);
      }).catch((err) => {
          console.log('錯誤:', err);
      });
}
window.onload = function () {
  connect();
}