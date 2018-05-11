const ul = document.querySelectorAll('.header ul');

window.onload = function () {
  ul.forEach((input, index) => {
    input.addEventListener('click', btnUl, false);

  });
}

function btnUl() {
  const li = this.querySelector('.item');
  li.classList.toggle('item--open');
  console.log(this);
}