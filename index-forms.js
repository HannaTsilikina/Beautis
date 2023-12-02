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

let finalPrice = document.querySelector('#finalPrice');
let name = document.querySelector('.name')

if 

