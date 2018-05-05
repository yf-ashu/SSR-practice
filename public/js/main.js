const action = document.querySelector('.action');
const item = document.querySelectorAll('.item--inner');
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
  item[set].value = item[set].placeholder;
  updateBtn[set].textContent = '修改';
  deleteBtn[set].textContent = '刪除';
  deleteBtn.forEach(input => (input.disabled = false));
  updateBtn.forEach(input => (input.disabled = false));
  console.log('3.' + updateBtn[set].textContent);
}

function btnUpdate() {
  let num = this.dataset.id ? this.dataset.id : '';
  let set = this.dataset.num;
  console.log('1.' + updateBtn[set].textContent);

  deleteBtn.forEach(input => (input.disabled = true));
  updateBtn.forEach(input => (input.disabled = true));
  item[set].disabled = false;
  deleteBtn[set].disabled = false;
  updateBtn[set].disabled = false;
  deleteBtn[set].textContent = '取消';

  deleteBtn[set].addEventListener('click', cancel);
  updateBtn[set].addEventListener('click', send);
}

function send() {
  if (updateBtn[this.dataset.num].textContent === '送出') {
    document.getElementById('formUpdate').submit();
    return console.log('2.' + updateBtn[this.dataset.num].textContent);
  } else {
    updateBtn[this.dataset.num].textContent = '送出';
    return console.log('4.' + updateBtn[this.dataset.num].textContent);
  }
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
    // console.log(updateBtn[index].className);
    input.dataset.num = index;
    return input.addEventListener('click', btnUpdate, false);
  });

  if (window.location == 'http://127.0.0.1:3000/task') {
    action.addEventListener('click', checkNull, false);
  }

  if (window.location == 'http://127.0.0.1:3000/signin') {
    signup.addEventListener('click', signupTo, false);
  }
};
