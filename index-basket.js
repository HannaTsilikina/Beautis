let basketProducts = document.querySelector('.basket_products');

function getBasketData() {

  fetch('http://localhost:3001/chosenProducts')
  .then((response) => response.json())
  .then((data) => {
    if (data.length>0) {
    data.forEach(element => {createBasketProduct (element)

  });

  let btnClose = document.querySelectorAll('.close')
  console.log("btnClose", btnClose)
  btnClose.forEach((elem) => {
    elem.onclick = function (e) {
        let targetdeleteProduct = e.target
        console.log("targetdeleteProduct", targetdeleteProduct)
        targetdeleteProduct.forEach((element) => {
                try {
                    fetch('http://localhost:3001/chosenProducts', {
                        method: 'DELETE',
                        body: JSON.stringify({
                            id: element.id,
                            brand: element.brand,
                            name: element.name,
                            size: element.size,
                            ranking: element.ranking,
                            price: element.price,
                            discount: element.discount,
                            image: element.image,
                        }),
                        headers: {
                            'Content-type': 'application/json',
                        },
                    }).then((response) => {
                        console.log(response)
                    })
                } catch (err) {
                    console.log(err.status)
                }

        })
    }
  })
}
  else {
    const div = document.createElement('div')
    div.classList.add('basket_no-products')
    const el = `<div>В корзине нет товара</div>`
   }
  console.log(data)
  })
  .catch((error) => console.error('Ошибка:', error));
}

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
                <button class="close" id="deleteProduct">&times</button>
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
