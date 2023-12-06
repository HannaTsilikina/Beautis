let basketProducts = document.querySelector('.basket_products')
const btnOrder = document.querySelector('#btn-order')
btnOrder.setAttribute('disabled', true)
btnOrder.classList.add('basket_btn-order_non')
const btnClose = document.querySelector('#btn-close')

function getBasketData() {
    fetch('http://localhost:3001/chosenProducts')
        .then((response) => response.json())
        .then((data) => {
            if (data.length > 0) {
                btnOrder.removeAttribute('disabled')
                btnOrder.classList.remove('basket_btn-order_non')
                btnOrder.classList.add('basket_btn-order')

                const totalDiv = document.querySelector('.total_container_main')
                const total = `<hr class="basket_line" />
              <div class="total_container">
              <div class="total_text">Итого</div>
              <div class="total_sum"></div>
              </div>`
                totalDiv.insertAdjacentHTML('beforeend', total)
                data.forEach((object) => {
                    createBasketProduct(object)

                    let total = document.querySelector('.total_sum')
                    let prices = document.querySelectorAll('.basket_price')
                    let sum = 0
                    pricesValues = prices.forEach((el) => {
                        sum = sum + parseInt(el.textContent)
                        total.textContent = `${sum}$ `
                    })
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

                                let total = document.querySelector('.total_sum')
                                let prices =
                                    document.querySelectorAll('.basket_price')
                                let sum = 0
                                pricesValues = prices.forEach((el) => {
                                    sum = sum + parseInt(el.textContent)
                                    total.textContent = `${sum}$ `
                                })
                                if (
                                    document.querySelectorAll('.item').length ==
                                    0
                                ) {
                                    const div = document.createElement('div')
                                    div.classList.add('basket_no-products')
                                    const el = document.createElement('div')
                                    el.classList.add('no-products')
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
                    <input class="basket_input" type="text" value="1" id="input" />
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

    const minusButtons = document.querySelectorAll('.basket_minus-btn')
    const plusButtons = document.querySelectorAll('.basket_plus-btn')
    minusButtons.forEach((element) => {
        element.onclick = function (event) {
            let button = event.target
            let card = button.closest('.basket_quantity')
            let mainCard = button.closest('.basket_products__container')
            let cardWithId = mainCard.closest('.item')
            let inputValue = card.querySelector('.basket_input')
            if (inputValue.value > 1) {
                inputValue.value--
                fetch('http://localhost:3001/chosenProducts')
                    .then((response) => response.json())
                    .then((data) => {
                        data.forEach((el) => {
                            if (cardWithId.id == el.id) {
                                let finalPrice =
                                    parseInt(el.price) * inputValue.value
                                mainCard.querySelector(
                                    '.basket_price'
                                ).textContent = `${finalPrice}$`
                                let total = document.querySelector('.total_sum')
                                let prices =
                                    document.querySelectorAll('.basket_price')
                                let sum = 0
                                pricesValues = prices.forEach((el) => {
                                    sum = sum + parseInt(el.textContent)
                                    total.textContent = `${sum}$ `
                                })
                            }
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }
    })

    plusButtons.forEach((element) => {
        element.onclick = function (event) {
            let button = event.target
            let card = button.closest('.basket_quantity')
            let mainCard = button.closest('.basket_products__container')
            let cardWithId = mainCard.closest('.item')
            let inputValue = card.querySelector('.basket_input')
            inputValue.value++

            fetch('http://localhost:3001/chosenProducts')
                .then((response) => response.json())
                .then((data) => {
                    data.forEach((el) => {
                        if (cardWithId.id == el.id) {
                            let finalPrice =
                                parseInt(el.price) * inputValue.value

                            mainCard.querySelector(
                                '.basket_price'
                            ).textContent = `${finalPrice}$`
                            let total = document.querySelector('.total_sum')
                            let prices =
                                document.querySelectorAll('.basket_price')
                            let sum = 0
                            pricesValues = prices.forEach((el) => {
                                sum = sum + parseInt(el.textContent)
                                total.textContent = `${sum}$ `
                            })
                        }
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    })
}
document.addEventListener('DOMContentLoaded', () => {
    getBasketData()
})
