function deleteItem(e) {
    let num = e.currentTarget.dataset.id;
    alert('確定要刪除嗎？');
    window.location.assign(`/task/${num}`);
}

function checkNull(e) {
    e.preventDefault();
    let input = document.querySelector('.input').value;
    if (!input) {
        alert('請輸入項目！');
    } else {
        document.form.submit();
    }
}

function statusChange() {
    if (status.textContent) {
        logStatus.textContent = '登出';
        logStatus.href = '/logout';
        deleteBtn.forEach(prop => prop.style.visibility = "visible");
        btn.disabled = false;

    } else {
        logStatus.textContent = '登入';
        logStatus.href = '/signin';
        deleteBtn.forEach(prop => prop.style.visibility = "hidden");
        btn.disabled = true;
    }
}

function signupTo() {
    window.location.assign(`/signup`);
}




window.onload = function () {
    for (let [index, i] of item.entries()) {
        item[index].addEventListener('click', deleteItem, false);
        console.log(item[index]);
    }
    btn.addEventListener('click', checkNull, false);
    if (window.location == 'http://127.0.0.1:3000/signin') {
        signup.addEventListener('click', signupTo, false);
    }
    if (window.location =='http://127.0.0.1:3000/task') {
        statusChange();
    }
}
const item = document.querySelectorAll('.btn-delete');
const btn = document.querySelector('.action');
const logStatus = document.querySelector('.logStatus');
const status = document.querySelector('.userName');
const deleteBtn = document.querySelectorAll('.btn-delete');
const signup = document.querySelector('.signup');