const minusButtons = document.querySelectorAll('.basket_minus-btn');
const plusButtons = document.querySelectorAll('.basket_plus-btn');
const inputFields = document.querySelectorAll('.basket_input');

for (let i = 0; i < minusButtons.length; i++) {
  minusButtons[i].addEventListener('click', function minusProduct() {
    if (inputFields[i].value > 0) {
      inputFields[i].value--;
    }
  });
}
for (let i = 0; i < minusButtons.length; i++) {
  plusButtons[i].addEventListener('click', function plusProduct() {
    inputFields[i].value++;
  });
}