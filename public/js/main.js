const ul = document.querySelectorAll('.header ul');

window.onload = function () {
  console.log(ul[0]);
  ul.forEach((input, index) => {
    let title=input.querySelector('p');
    input.addEventListener('click', btnUl, false);

  });
}

function btnUl(e) {
  // if(e.currentTarget)
  console.log(e.currentTarget.nodeName)
  const li = this.querySelector('.item');
  li.classList.toggle('item--open');
  console.log(this);
}