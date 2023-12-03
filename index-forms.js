let name = document.querySelector('.name');
let surname = document.querySelector('.surname');
let email = document.querySelector('.email');
let formName = document.querySelector('.formName');
let formSurname = document.querySelector('.formSurname');
let formEmail = document.querySelector('.formEmail');
/*formName.onsubmit = function(evt) {
    if (name.value == '') {
      evt.preventDefault();
    }
  };
  formSurname.onsubmit = function(evt) {
    if (surname.value == '') {
      evt.preventDefault();
    }
  };
  formEmail.onsubmit = function(evt) {
    if (email.value == '') {
      evt.preventDefault();
    }
  };*/

//шаблон для регистра вводимых значений
function inputSize() {
let checkedName = name.value;
name.textContent = checkedName[0].toUpperCase() + checkedName.slice(1).toLowerCase();

let checkedSurname = surname.value;
surname.textContent = checkedSurname[0].toUpperCase() + checkedSurname.slice(1).toLowerCase();

let checkedEmail = email.value;
email.textContent = checkedEmail.slice(0).toLowerCase();
};


//появление и удаление доп инпута с улицей и домом в зависимости от выбора доставки до двери и самовывоза, соответственно
let hide = document.querySelector('.formStreet');
let select = document.querySelector('.deliverySelect');
function openHide () {
    if (select.value === 'getByMyself') {
    hide.classList.add('hide');
    }
    else hide.classList.remove('hide');
};

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
'Тирасполь'
];

let citiesParent = document.querySelector('#cities');
for (i = 0; i<citiesList.length; i++) {
    let citiesChild = document.createElement('option');
    citiesChild.textContent = citiesList[i];
    citiesParent.append(citiesChild);
};

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















