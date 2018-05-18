const updateMain = document.querySelector('.main');
let connect = function () {
    fetch('http://127.0.0.1:3000/api/posts', {
            method: 'get'
        })
        .then(function (response) {
            return response.json();
        })
        .then((jsonData) => {
            console.log(jsonData);
            return update(jsonData);
        }).catch((err) => {
            console.log('錯誤:', err);
        });
}


let update = (data) => {
    console.log(data);
    let str = '';

    data.forEach(input => {
        str += `      
<a href="/article/posts/${input.id}">
<div class="post">
<div class="image">
<img src="/public/upload/${input.upload}" alt="">
    </div>

    <div class="text">
        <div class="title">
            <h3>${input.name}</h3>
        </div>
        <div class="date">
            <h4>${input.time}</h4>
        </div>
    </div>
</div>
</a>`;

    });
     updateMain.innerHTML = str;
}
window.onload = function () {
    if (window.location.pathname.split('/')[1] === '') {
    connect();
    }
}