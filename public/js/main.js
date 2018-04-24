function deleteItem(e) {
    let num = e.currentTarget.dataset.id;
    alert('確定要刪除嗎？');
    window.location.assign(`/${num}`);
}
function checkNull(e) {
    e.preventDefault();
    let input = document.querySelector('.input').value;
    if (!input) {
        alert('請輸入待辦事項！');
    } else {
        document.form.submit();
    }
}
window.onload = function () {
    for (let [index, i] of item.entries()) {
        item[index].addEventListener('click', deleteItem, false);
        console.log(item[index]);
    }
    btn.addEventListener('click', checkNull, false);
}
const item = document.querySelectorAll('.btn-delete');
const btn = document.querySelector('.btn');

