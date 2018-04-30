const action = document.querySelector('.action');
const item = document.querySelectorAll('.item');
const deleteBtn = document.querySelectorAll('.btnDelete');
const updateBtn = document.querySelectorAll('.btnUpdate');
const signup = document.querySelector('.signup');

function btnDelete() {
  let set = this.dataset.num;
  let str = this.textContent.trim();
  switch (str) {
    case '取消':
      break;
    case '刪除':
      let num = this.dataset.id ? this.dataset.id : '';
      alert('確定要刪除嗎？');
      window.location.assign(`/task/${num}`);
      break;
  }
}
function cancel() {
  let set = this.dataset.num;
  item[set].disabled = true;
  updateBtn[set].textContent = '修改';
  deleteBtn[set].textContent = '刪除';
}

function btnUpdate() {
  //可以重構成this[set]，呼叫updateItem(attr,attr2,'送出')
  let num = this.dataset.id ? this.dataset.id : '';
  let set = this.dataset.num;
  item[set].disabled = false;
  updateBtn[set].textContent = '送出';
  deleteBtn[set].textContent = '取消';
  deleteBtn[set].addEventListener('click', cancel, false);
  updateBtn[set].addEventListener(
    'click',
    function() {
      document.getElementById('formUpdate').submit();
    },
    false
  );
}

function checkNull(e) {
  e.preventDefault();
  let input = document.querySelector('.input').value;
  !input ? alert('請輸入項目！') : document.getElementById('form').submit();
}

let signupTo = function() {
  window.location.assign(`/signup`);
};

// function clickEvent(btnAttr) {
//     btnAttr.forEach((input, index) => {
//         console.log(btnAttr[index].className)
//        let str= btnAttr[index].className;
//         input.addEventListener('click',str, false);
//         input.dataset.num = index;
//     });
// }

window.onload = function() {
  deleteBtn.forEach((input, index) => {
    input.addEventListener('click', btnDelete, false);
    input.dataset.num = index;
  });
  updateBtn.forEach((input, index) => {
    console.log(updateBtn[index].className);
    input.addEventListener('click', btnUpdate, false);
    input.dataset.num = index;
  });

  if (window.location == 'http://127.0.0.1:3000/task') {
    action.addEventListener('click', checkNull, false);
  }

  if (window.location == 'http://127.0.0.1:3000/signin') {
    signup.addEventListener('click', signupTo, false);
  }
};
