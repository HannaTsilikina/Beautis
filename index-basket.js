let basketProducts = document.querySelector('.basket_products')

function getBasketData() {
    fetch('http://localhost:3001/chosenProducts')
        .then((response) => response.json())
        .then((data) => {
            if (data.length > 0) {
                data.forEach((object) => {
                    createBasketProduct(object)
                })
                let btnClose = document.querySelectorAll('.close')
                btnClose.forEach((button) => {
                    button.onclick = function (e) {
                        let buttonToDeleteProduct = e.target
                        let div =
                            buttonToDeleteProduct.closest('.basket_products')
                        data.forEach((element) => {
                            if (div.id == element.id) {
                                fetch(
                                    `http://localhost:3001/chosenProducts/${element.id}`,
                                    {
                                        method: 'DELETE',
                                    }
                                )
                                    .then((response) => {
                                        {
                                            return response
                                        }
                                    })
                                    .catch((err) => console.log(err))
                                basketProducts.removeChild(div)
                                if (
                                    document.querySelectorAll('.item').length ==
                                    0
                                ) {
                                    const div = document.createElement('div')
                                    div.classList.add('basket_no-products')
                                    const el = document.createElement('div')
                                    el.textContent = 'В корзине нет товаров'
                                    basketProducts.append(el)
                                }
                            }
                        })
                    }
                })
            }
        })
        .catch((error) => console.log('Ошибка:', error))
}

function createBasketProduct(obj) {
    const name = obj.name
    const price = obj.price
    const image = obj.image
    const div = document.createElement('div')
    div.classList.add('item')
    div.classList.add('basket_products')
    div.setAttribute('id', `${obj.id}`)
    const el = `
                <div class="basket_products__container">
                <div class="basket_div__imgAndname">
                <img src="${image}" class="basket_div__img">
                <div class="basket_div__nameplusminus">
                <div class="basket_products__name">${name}</div>
                  <div class="basket_quantity">
                    <button class="basket_minus-btn" type="button" name="button"></button>
                    <input class="basket_input" type="number" value="1" id="input" />
                    <button class="basket_plus-btn" type="button" name="button"></button>
                  </div>
                </div>
                </div>
                <div class="basket_div__priceAndcross">
                <div class="basket_price">${price} </div>
                <button class="close" id="deleteProduct">&times</button>
                </div>
                </div>
                <div><hr class="basket_line__gray" /></div>`
    div.insertAdjacentHTML('beforeend', el)
    basketProducts.appendChild(div)
    // let quantity = document.querySelector('.basket_input')
    // console.log(quantity)
    // let finalPrice = parseInt(obj.price) * quantity.value
    // console.log(document.querySelector('.basket_price'))
    // console.log(finalPrice)
    // document.querySelector('.basket_price').textContent = `${finalPrice}$`
    // console.log(document.querySelector('.basket_price'))
}

document.addEventListener('DOMContentLoaded', () => {
    getBasketData()
})

const minusButtons = document.querySelectorAll('.basket_minus-btn')
const plusButtons = document.querySelectorAll('.basket_plus-btn')

for (let i = 0; i < minusButtons.length; i++) {
    minusButtons[i].addEventListener('click', function minusProduct() {
        if (inputFields[i].value > 1) {
            inputFields[i].value--
        }
    })
}
for (let i = 0; i < plusButtons.length; i++) {
    plusButtons[i].addEventListener('click', function plusProduct() {
        inputFields[i].value++
    })
}
