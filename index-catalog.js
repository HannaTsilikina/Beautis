// Создание каталога

// const { response } = require('express')
try {
    fetch('http://localhost:3001/products', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json, charset=UTF-8',
        },
    })
        .then((res) => res.json())
        .then((data) => {
            data.forEach((element) => newPost(element))
            document
                .querySelector('.catalog')
                .addEventListener('click', function (evt) {
                    let targetbutton = evt.target
                    let card = targetbutton.closest('.card')
                    card.classList.add('active')
                    addToSessionStorage(card)
                })
        })
        .catch((err) => console.log(err.message))
} catch (err) {
    console.log(err.meaasge)
}

let mainDiv = document.querySelector('.catalog')

function newPost(obj) {
    const card = document.createElement('div')
    card.classList.add('card')
    mainDiv.append(card)

    const img = document.createElement('img')
    img.getAttribute('src')
    img.src = obj.image
    img.classList.add('img-card')
    card.append(img)
    const brand = document.createElement('h5')
    brand.textContent = obj.brand
    card.append(brand)
    const rate = document.createElement('div')
    rate.classList.add('rate')
    drawRate(obj.ranking, rate)
    card.append(rate)
    const title = document.createElement('h4')
    title.textContent = obj.name.toUpperCase()
    card.append(title)
    const volume = document.createElement('span')
    volume.classList.add('volume')
    volume.textContent = obj.size
    card.append(volume)
    const price = document.createElement('div')
    price.classList.add('all-price')
    card.append(price)
    const oldPriceContainer = document.createElement('div')
    oldPriceContainer.classList.add('old-price-container')
    price.append(oldPriceContainer)
    const oldPrice = document.createElement('span')
    oldPrice.classList.add('old-price')
    oldPrice.textContent = obj.price
    oldPriceContainer.append(oldPrice)
    const crossLines = document.createElement('img')
    crossLines.classList.add('cross-lines')
    crossLines.getAttribute('src')
    crossLines.src = './images/crossLine.png'
    oldPriceContainer.append(crossLines)

    const newPrice = document.createElement('span')
    newPrice.classList.add('new-price')
    let priceWithDiscount =
        parseInt(obj.price) -
        (parseInt(obj.discount) / 100) * parseInt(obj.price)
    newPrice.textContent = priceWithDiscount + ' $'
    price.append(newPrice)
    if (parseInt(obj.discount) == 0) {
        oldPriceContainer.classList.add('hidden')
    }
    const buttonBuy = document.createElement('button')

    buttonBuy.classList.add('hidden')
    buttonBuy.textContent = ' Купить '
    card.append(buttonBuy)
    buttonBuy.onmouseover = function transit() {
        buttonBuy.classList.add('transition')
    }

    const buttonBuyInOneClick = document.createElement('button')
    buttonBuyInOneClick.classList.add('button-buy-one')
    buttonBuyInOneClick.classList.add('hidden')
    buttonBuyInOneClick.textContent = ' Купить в 1 клик'

    card.append(buttonBuyInOneClick)
    card.onmouseover = function () {
        buttonBuy.classList.remove('hidden')
        buttonBuyInOneClick.classList.remove('hidden')
        card.classList.add('emphasized-card')
        buttonBuy.classList.add('button-buy')
    }
    card.onmouseout = function () {
        buttonBuy.classList.add('hidden')
        buttonBuyInOneClick.classList.add('hidden')
        card.classList.remove('emphasized-card')
        buttonBuy.classList.remove('button-buy')
    }
}

function drawRate(count, divToDraw) {
    for (let i = 1; i <= count; i++) {
        let star = document.createElement('img')
        star.getAttribute('src')
        star.src = './images/Star-full.png'
        divToDraw.append(star)
    }
    let emptyStars = 5 - count
    if (emptyStars > 0) {
        for (let i = 1; i <= emptyStars; i++) {
            let star = document.createElement('img')
            star.getAttribute('src')
            star.src = './images/Star-empty.png'
            divToDraw.append(star)
        }
    }
}

function addToSessionStorage(card) {
    let name = card.querySelector('h4').textContent
    let price = card.querySelector('.new-price').textContent
    window.sessionStorage.setItem(`${name}`, `${price}`)
}
