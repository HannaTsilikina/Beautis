// import './index-basket'

let name = document.querySelector('.name')
let surname = document.querySelector('.surname')
let email = document.querySelector('.email')
let formName = document.querySelector('.formName')
let formSurname = document.querySelector('.formSurname')
let formEmail = document.querySelector('.formEmail')
let finalButton = document.querySelector('.btn-2')

let deliveryInfo = document.querySelector('.deliverySelect')
let cityInfo = document.querySelector('#cities')
let streetInfo = document.querySelector('.street')
let paymentInfo = document.querySelector('.payment')
let comments = document.querySelector('.comments')

let finalPrice = document.querySelector('#finalPrice')

fetch('http://localhost:3001/orders')
    .then((response) => response.json())
    .then((data) => {
        let totalPrice = data[data.length - 1].totalPrice
        finalPrice.textContent = totalPrice
    })
    .catch((err) => (finalPrice.textContent = 'Ошибка'))
//сюда добавить финальную цену

//появление и удаление доп инпута с улицей и домом в зависимости от выбора доставки до двери и самовывоза, соответственно
let hide = document.querySelector('.formStreet')
let select = document.querySelector('.deliverySelect')
function openHide() {
    if (select.value === 'getByMyself') {
        hide.classList.add('hide')
    } else hide.classList.remove('hide')
}

//передача массива столиц в выпадающий список
const citiesList = [
    'Амстердам',
    'Андорра-ла-Велья',
    'Афины',
    'Белград',
    'Берлин',
    'Берн',
    'Братислава',
    'Брюссель',
    'Будапешт',
    'Бухарест',
    'Вадуц',
    'Валлетта',
    'Варшава',
    'Ватикан',
    'Вена',
    'Вильнюс',
    'Дублин',
    'Загреб',
    'Киев',
    'Кишинёв',
    'Копенгаген',
    'Лиссабон',
    'Лондон',
    'Любляна',
    'Люксембург',
    'Мадрид',
    'Минск',
    'Монако',
    'Москва',
    'Осло',
    'Париж',
    'Подгорица',
    'Прага',
    'Рейкьявик',
    'Рига',
    'Рим',
    'Сан-Марино',
    'Сараево',
    'Скопье',
    'София',
    'Стокгольм',
    'Таллин',
    'Тирана',
    'Хельсинки',
    'Приштина',
    'Тирасполь',
]

let citiesParent = document.querySelector('#cities')
for (i = 0; i < citiesList.length; i++) {
    let citiesChild = document.createElement('option')
    citiesChild.textContent = citiesList[i]
    citiesParent.append(citiesChild)
}

//Проверка полей и отправка данных в формах на сервер при нажатии кнопки ОФОРМИТЬ ЗАКАЗ
finalButton.addEventListener('click', function checkAndSend() {
    if (name.value == '' || surname.value == '' || email.value == '') {
        comments.innerHTML = 'Заполните ВСЕ поля'
    } else {
        let x = {
            name: name.value,
            surname: surname.value,
            email: email.value,
            delivery: deliveryInfo.value,
            city: cityInfo.value,
            address: streetInfo.value,
            payment: paymentInfo.value,
        }
        fetch('http://localhost:3001/orders')
            .then((response) => response.json())
            .then((data) => {
                let infoOrder = data[data.length - 1]

                fetch('http://localhost:3001/totalOrders', {
                    method: 'POST',
                    body: JSON.stringify({
                        customer: x,
                        order: infoOrder,
                    }),
                    headers: { 'Content-type': 'application/json' },
                }).then((response) => {
                    console.log(response)
                })
            })
            .catch((err) => (console.log = 'Ошибка получения данных'))

        comments.innerHTML = ''
        document.location = 'index-done.html'
    }
})

/*
//работа с модулем Nodemailer
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport(
    {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'bogdanovaelis@gmail.com',
            pass: 'elissyele11'
        }
    },
    {
        from: 'Mailer Test <bogdanovaelis@gmail.com>'
    }
)

const mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if(err) return console.log(err)
        console.log('Email sent: ', info)
    })
}

module.exports = mailer*/
