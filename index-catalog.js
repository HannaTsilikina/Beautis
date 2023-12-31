let mainDiv = document.querySelector('.catalog')
document.querySelector('.cancel').classList.add('hidden')
//создать массив объектов на базе json
let submitall = document.getElementById('submitall') // обработчик событий на кнопку, тут надо чето добавить чтобы дефолтные значения не считались?

submitall.addEventListener('click', getData)

function getData() {
    let davinesCheckbox = document.getElementById('davineschekbox')
    let tigiCheckbox = document.getElementById('tigichekbox')
    let morganCheckbox = document.getElementById('morganchekbox')
    document.querySelector('.cancel').classList.remove('hidden')
    let input_pricemin = parseInt(
        document.getElementById('input_pricemin').value
    )

    let input_pricemax = parseInt(
        document.getElementById('input_pricemax').value
    )

    let davinescheckbox = document.querySelector('#davineschekbox')

    let tigicheckbox = document.querySelector('#tigichekbox')

    let morganchekbox = document.querySelector('#morganchekbox')

    let Brands = [davinescheckbox, tigicheckbox, morganchekbox] //поместила в один массив все чекбоксы
    const brandFilter = Brands.filter((brand) => brand.checked)
    const brandFilterValue = brandFilter.map(function (brand) {
        return brand.value
    })
    let input_ratemin = parseInt(document.getElementById('input_ratemin').value)

    let input_ratemax = parseInt(document.getElementById('input_ratemax').value)

    fetch('http://localhost:3001/products', {
        method: 'GET',
    })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            const jsonArray = Array.from(data)

            let filteredResult = [...jsonArray]
            function priceWithDisc(obj) {
                let newPriceVal =
                    parseInt(obj.price) -
                    (parseInt(obj.discount) / 100) * parseInt(obj.price)
                const NewPrice = `${newPriceVal}$`
                return NewPrice
            }
            if (!isNaN(input_pricemax) && !isNaN(input_pricemin)) {
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

            //тут чекбоксы

            if (
                morganCheckbox.checked &&
                tigiCheckbox.checked &&
                !davinesCheckbox.checked
            ) {
                filteredResult = filteredResult.filter((object) => {
                    if (object.brand == "Morgan's") return object
                    if (object.brand == 'TIGI') return object
                })
            }

            if (
                morganCheckbox.checked &&
                davinesCheckbox.checked &&
                !tigiCheckbox.checked
            ) {
                filteredResult = filteredResult.filter((object) => {
                    if (object.brand == 'Davines') return object
                    if (object.brand == "Morgan's") return object
                })
            }

            if (
                tigiCheckbox.checked &&
                davinesCheckbox.checked &&
                !morganCheckbox.checked
            ) {
                filteredResult = filteredResult.filter((object) => {
                    if (object.brand == 'TIGI') {
                        return object
                    }
                    if (object.brand == 'Davines') {
                        return object
                    }
                })
                console.log(filteredResult)
            }

            if (
                tigiCheckbox.checked &&
                !morganCheckbox.checked &&
                !davinesCheckbox.checked
            ) {
                filteredResult = filteredResult.filter(
                    (object) => object.brand === 'TIGI'
                )
            }

            if (
                !tigiCheckbox.checked &&
                morganCheckbox.checked &&
                !davinesCheckbox.checked
            ) {
                filteredResult = filteredResult.filter(
                    (object) => object.brand === "Morgan's"
                )
            }
            if (
                !tigiCheckbox.checked &&
                !morganCheckbox.checked &&
                davinesCheckbox.checked
            ) {
                filteredResult = filteredResult.filter(
                    (object) => object.brand === 'Davines'
                )
            }

            document.querySelector('.cancel').onclick = function clearInputs() {
                davinesCheckbox.checked = false
                morganCheckbox.checked = false
                tigiCheckbox.checked = false
                let inputs = document.querySelectorAll('.input-text')
                inputs.forEach((input) => (input.value = ''))

                window.location.reload()
            }

            while (mainDiv.firstChild) {
                mainDiv.removeChild(mainDiv.lastChild)
            }

            filteredResult.forEach((element) => newPost(element))
            document.querySelectorAll('.button-to-card').forEach((elem) => {
                elem.onclick = function (evt) {
                    toBasket(evt, filteredResult)
                }
            })
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
let headerBasketImg = document.querySelector('.header_basket-img')

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
                    headerBasketImg.classList.remove('header_basket-img')
                    headerBasketImg.classList.add('header_basket-img-change')
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

fetch('http://localhost:3001/chosenProducts')
    .then((response) => response.json())
    .then((data) => {
        if (!data.length == 0) {
            headerBasketImg.classList.remove('header_basket-img')
            headerBasketImg.classList.add('header_basket-img-change')
        }
    })
    .catch((error) => {
        console.error('Ошибка:', error)
    })

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
