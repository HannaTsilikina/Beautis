
let basketProducts = document.querySelector('.basket_products')

function getBasketData() {

  for(let i=0; i<localStorage.length; i++) {
    let key = localStorage.key(i);
    let basket = JSON.parse(localStorage.getItem(key)) ;
    createBasketProduct (basket)
  return console.log(basket);
}}

function createBasketProduct (basket){
  const name  = basket.name
  const price  = basket.price
  const image  = basket.image
  const div = document.createElement('div')
  div.classList.add('basket_products')
  const el = `
  <div class="basket_products__container">
  <div class="basket_div__imgAndname">
  <img src="${image}" class="basket_div__img">
  <div class="basket_div__nameplusminus">
  <div class="basket_products__name">${name}</div>
    <div class="basket_quantity">
      <button class="basket_minus-btn" type="button" name="button"></button>
      <input class="basket_input" type="text" value="1" id="input" />
      <button class="basket_plus-btn" type="button" name="button"></button>
    </div>
  </div>
  </div>
  <div class="basket_div__priceAndcross">
  <div class="basket_price">${price}</div>
  <div class="close">&times</div>
  </div>
  </div>
  <div><hr class="basket_line__gray" /></div>`

  div.insertAdjacentHTML("beforeend", el)
  basketProducts.appendChild(div)
}

document.addEventListener("DOMContentLoaded", ()=>{
  getBasketData()
})



const minusButtons = document.querySelectorAll('.basket_minus-btn');
const plusButtons = document.querySelectorAll('.basket_plus-btn');
const inputFields = document.querySelectorAll('.basket_quantity input');

for (let i = 0; i < minusButtons.length; i++) {
  minusButtons[i].addEventListener('click', function minusProduct() {
    if (inputFields[i].value > 1) {
      inputFields[i].value--;
    }
  });
}
for (let i = 0; i < minusButtons.length; i++) {
  plusButtons[i].addEventListener('click', function plusProduct() {
    inputFields[i].value++;
  });
}
