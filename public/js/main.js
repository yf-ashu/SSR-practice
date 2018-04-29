const itemDelete = document.querySelectorAll('.btn-delete');
const btn = document.querySelector('.action');
const itemUpdate = document.querySelectorAll('.btn-update');
const item = document.querySelectorAll('.item');
const logStatus = document.querySelector('.logStatus');
const status = document.querySelector('.userName');
const deleteBtn = document.querySelectorAll('.btn-delete');
const updateBtn = document.querySelectorAll('.btn-update');
const signup = document.querySelector('.signup');

function deleteItem() {
    let num = this.dataset.id ? this.dataset.id : '';
    alert('確定要刪除嗎？');
    window.location.assign(`/task/${num}`);
}

function updateItem() {
    let num = this.dataset.id ? this.dataset.id : '';
    let set = this.dataset.num;

    item[set].disabled =false;
    itemUpdate[set].textContent='送出';

    // window.location.assign(`/task/update/${num}`);
}

// function checkNull(e) {
//     e.preventDefault();
//     let input = document.querySelector('.input').value;
//     !input ? alert('請輸入項目！') : document.form.submit();
// }

// function statusChange() {
//     if (!status.textContent) {
//         btn.disabled = false;
//     }else {
//         btn.disabled = true;
//     }
// }

let signupTo = function () {
    window.location.assign(`/signup`);
};
window.onload = function () {
    for (let [index, i] of itemDelete.entries()) {
        itemDelete[index].addEventListener('click', deleteItem, false);//可改foreach
    }
    for (let [index, i] of itemUpdate.entries()) {
        itemUpdate[index].addEventListener('click', updateItem, false);
        itemUpdate[index].dataset.num=index;
    }
   
    // btn.addEventListener('click', checkNull, false);
    
    if (window.location == 'http://127.0.0.1:3000/signin') {
        signup.addEventListener('click', signupTo, false);
    }
    if (window.location == 'http://127.0.0.1:3000/task') {
        // statusChange();
    }


};