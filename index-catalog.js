let mainDiv = document.querySelector('.catalog')

//создать массив объектов на базе json
let submitall = document.getElementById('submitall') // обработчик событий на кнопку, тут надо чето добавить чтобы дефолтные значения не считались?

submitall.addEventListener('click', getData)

function getData() {
    let input_pricemin = parseInt(
        document.getElementById('input_pricemin').value
    )
    console.log(input_pricemin)
    let input_pricemax = parseInt(
        document.getElementById('input_pricemax').value
    )
    console.log(input_pricemax)
    let davinescheckbox = document.querySelector('#davineschekbox')

    let tigicheckbox = document.querySelector('#tigichekbox')

    let morganchekbox = document.querySelector('#morganchekbox')

    let Brands = [davinescheckbox, tigicheckbox, morganchekbox] //поместила в один массив все чекбоксы
    const brandFilter = Brands.filter((brand) => brand.checked)
    const brandFilterValue = brandFilter.map(function (brand) {
        return brand.value
    })
    console.log(brandFilterValue)

    let input_ratemin = parseInt(document.getElementById('input_ratemin').value)
    console.log(input_ratemin)
    let input_ratemax = parseInt(document.getElementById('input_ratemax').value)
    console.log(input_ratemax)
    fetch('http://localhost:3001/products', {
        method: 'GET',
    })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            const jsonArray = Array.from(data)

            let filteredResult = [...jsonArray]

            if (!isNaN(input_pricemax) && !isNaN(input_pricemin)) {
                function priceWithDisc(obj) {
                    let newPriceVal =
                        parseInt(obj.price) -
                        (parseInt(obj.discount) / 100) * parseInt(obj.price)
                    const NewPrice = `${newPriceVal}$`
                    return NewPrice
                }
                filteredResult = filteredResult.filter(
                    (value) =>
                        parseInt(priceWithDisc(value)) >= input_pricemin &&
                        parseInt(priceWithDisc(value)) <= input_pricemax
                )
            }
            if (isNaN(input_pricemax) && !isNaN(input_pricemin)) {
                filteredResult = filteredResult.filter(
                    (value) => parseInt(priceWithDisc(value)) >= input_pricemin
                )
            }
            if (!isNaN(input_pricemax) && isNaN(input_pricemin)) {
                filteredResult = filteredResult.filter(
                    (value) => parseInt(priceWithDisc(value)) <= input_pricemax
                )
            }
            if (!isNaN(input_ratemax) && !isNaN(input_ratemin)) {
                filteredResult = filteredResult.filter(
                    (value) =>
                        parseInt(value.ranking) >= input_ratemin &&
                        parseInt(value.ranking) <= input_ratemax
                )
            }
            if (isNaN(input_ratemax) && !isNaN(input_ratemin)) {
                filteredResult = filteredResult.filter(
                    (value) => parseInt(value.ranking) >= input_ratemin
                )
            }
            if (!isNaN(input_ratemax) && isNaN(input_ratemin)) {
                filteredResult = filteredResult.filter(
                    (value) => parseInt(value.ranking) <= input_ratemax
                )
            }

            while (mainDiv.firstChild) {
                mainDiv.removeChild(mainDiv.lastChild)
            }
            if (filterProducts.length > 0) {
                filteredResult.forEach((element) => newPost(element))
                document.querySelectorAll('.button-to-card').forEach((elem) => {
                    elem.onclick = function (evt) {
                        toBasket(evt, filteredResult)
                    }
                })
            }
        })
        .catch((err) => {
            const failedFilter = document.createElement('span')
            failedFilter.classList.add('not-found')
            failedFilter.textContent = 'Ничего не найдено'
            catalog.append(failedFilter)
        })
} //получить инпуты

// Создание каталога

// const { response } = require('express')

fetch('http://localhost:3001/products', {
    method: 'GET',
    headers: {
        'Content-type': 'application/json, charset=UTF-8',
    },
})
    .then((res) => res.json())
    .then((data) => {
        data.forEach((element) => newPost(element))
        document.querySelectorAll('.button-to-card').forEach((elem) => {
            elem.onclick = function (evt) {
                toBasket(evt, data)
            }
        })
    })
    .catch((errorToFetch) => {
        document.querySelector('.filters').classList.add('hidden')
        let errorText = document.createElement('div')
        errorText.classList.add('catalog-err')
        mainDiv.append(errorText)
        errorText.textContent =
            ' Произодится работа на сервере. Просим прощения за причиненные неудобства!'
    })
function toBasket(evt, data) {
    let targetbutton = evt.target
    let card = targetbutton.closest('.card')
    card.classList.add('active')
    data.forEach((element) => {
        if (card.id == element.id) {
            fetch('http://localhost:3001/chosenProducts', {
                method: 'POST',
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
            })
                .then((response) => {
                    console.log(response)
                })
                .catch((err) => console.log(err.message))
        }
    })
}
function newPost(obj) {
    const card = document.createElement('div')
    card.classList.add('card')
    card.setAttribute('id', `${obj.id}`)
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
    title.textContent = obj.name
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
    buttonBuy.classList.add('button-to-card')
    buttonBuy.classList.add('hidden-button')
    buttonBuy.textContent = ' Купить '
    card.append(buttonBuy)
    buttonBuy.onmouseover = function transit() {
        buttonBuy.classList.add('transition')
    }

    // const buttonBuyInOneClick = document.createElement('button')
    // buttonBuyInOneClick.classList.add('button-buy-one')
    // buttonBuyInOneClick.classList.add('hidden')
    // buttonBuyInOneClick.textContent = ' Купить в 1 клик'

    // card.append(buttonBuyInOneClick)

    card.onmouseover = function () {
        buttonBuy.classList.remove('hidden-button')
        // buttonBuyInOneClick.classList.remove('hidden')
        card.classList.add('emphasized-card')
        buttonBuy.classList.add('button-buy')
    }
    card.onmouseout = function () {
        buttonBuy.classList.add('hidden-button')
        // buttonBuyInOneClick.classList.add('hidden')
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

//попытка поиска

const searchInput = document.querySelector('.header_search')
const catalog = document.querySelector('.catalog')

searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        performSearch()
    } else {
        delayedSearch()
    }
})

let searchTimeout
function delayedSearch() {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(performSearch, 300)
}

function performSearch() {
    fetch('http://localhost:3001/products')
        .then((response) => response.json())
        .then((data) => {
            let trimSearch = searchInput.value.trim()
            let search = trimSearch.toLowerCase()

            // фильтрация товаров
            let filterProducts = data.filter((product) => {
                return (
                    product.brand.toLowerCase().includes(search) ||
                    product.name.toLowerCase().includes(search) ||
                    product.size.toLowerCase().includes(search)
                )
            })

            // отображения результатов
            catalog.innerHTML = ''
            if (filterProducts.length > 0) {
                filterProducts.forEach((el) => newPost(el))
            } else {
                const failedSearch = document.createElement('div')
                failedSearch.classList.add('not-found')
                failedSearch.textContent = 'Ничего не найдено'
                catalog.append(failedSearch)
            }
        })
        .catch((error) => console.error('Ошибка при загрузке данных:', error))
}
moment.locale('ru')
console.log(moment().format('LLL'))
