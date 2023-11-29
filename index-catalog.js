// Создание каталога

fetch('http://localhost:3001/products', {
  method: 'GET',
  headers: {
    'Content-type': 'application/json, charset=UTF-8'
      }
 })
 .then(res => res.json())
 .then(data => data.forEach(element => newPost(element)))
 .catch(err => console.log(err.message))


 let mainDiv = document.querySelector('.catalog')
 function newPost(obj)  {
      const card = document.createElement('div');
      card.classList.add('card');
      mainDiv.append(card);
const img = document.createElement('img');
img.getAttribute('src');
console.log(obj.image);
img.src = obj.image;
img.classList.add('img-card')
card.append(img)
const brand = document.createElement('h5')
brand.textContent = obj.brand
card.append(brand)
//  тут нужно решить со *const rate = document.createElement('div')
// title.textContent = obj.brand
// card.append(title)
const title = document.createElement('h4')
title.textContent = obj.name.toUpperCase()
card.append(title)
const volume = document.createElement('span')
volume.classList.add('volume')
volume.textContent = obj.size
card.append(volume)
const price = document.createElement('div')
price.classList.add('allPrice')
card.append(price)
const oldPrice = document.createElement('span')
oldPrice.classList.add('oldPrice')
oldPrice.textContent = obj.price
price.append(oldPrice)
const newPrice = document.createElement('span')
newPrice.classList.add('newPrice')
let priceWithDiscount = parseInt(obj.price) - ((parseInt(obj.discount)/100) * parseInt(obj.price))
newPrice.textContent = priceWithDiscount + '$'
price.append(newPrice)
if (parseInt(obj.discount) == 0) {
  oldPrice.classList.add('hidden')
}
const buttonBuy = document.createElement('button')
buttonBuy.classList.add('button-buy')
buttonBuy.textContent = ' Купить '
card.append(buttonBuy)
const buttonBuyInOneClick = document.createElement('button')
buttonBuyInOneClick.classList.add('button-buy-one')
buttonBuyInOneClick.textContent = ' Купить в 1 клик'
card.append(buttonBuyInOneClick)



      // const caption = document.createElement('h4');
      // caption.classList.add('caption');
      // caption.textContent = `Заголовок:  ${object.title}`;
      // div.prepend(caption);
      // const text = document.createElement('p');
      // text.classList.add('text');
      // text.textContent =`Статья:  ${object.body}`;
      // caption.after(text);
  }

