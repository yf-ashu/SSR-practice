window.onload = function () {
    for (let [index, i] of item.entries()) {
        item[index].addEventListener('click', deleteItem, false);
        console.log(item[index]);
    }
}
const item = document.querySelectorAll('.btn-delete');
const btn = document.querySelectorAll('.btn');

function deleteItem(e) {
    let num = e.currentTarget.dataset.id;
    console.log(num);
    alert('確定要刪除嗎？');
    window.location.assign(`/${num}`);
}
