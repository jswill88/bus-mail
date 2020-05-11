'use strict';

var parentElement = document.getElementById('products');
parentElement.addEventListener('click',threeRandomPictures);

var productsArray = [];

function Product(image) {
  this.image = image;
  this.alt = image.slice(4, image.length - 4);
  this.title = this.alt;
  this.numberOfClicks = 0;
  productsArray.push(this);
}

function threeRandomPictures() {
  parentElement.textContent = '';

  var firstIndex = randomNumber(productsArray.length);
  var secondIndex = randomNumber(productsArray.length);
  var thirdIndex = randomNumber(productsArray.length);

  while (firstIndex === secondIndex || firstIndex === thirdIndex || secondIndex === thirdIndex) {
    secondIndex = randomNumber(productsArray.length);
    thirdIndex = randomNumber(productsArray.length);
  }

  appendImage(firstIndex);
  appendImage(secondIndex);
  appendImage(thirdIndex);

}

function appendImage(imageNumber) {
  var picture = document.createElement('img');
  picture.src = productsArray[imageNumber].image;
  picture.alt = productsArray[imageNumber].alt;
  picture.title = productsArray[imageNumber].title;
  parentElement.appendChild(picture);
}

function randomNumber(arrayLength) {
  return Math.floor(Math.random()*arrayLength);
}



new Product('img/bag.jpg');
new Product('img/banana.jpg');
new Product('img/bathroom.jpg');
new Product('img/boots.jpg');
new Product('img/breakfast.jpg');
new Product('img/bubblegum.jpg');
new Product('img/chair.jpg');
new Product('img/cthulhu.jpg');
new Product('img/dog-duck.jpg');
new Product('img/dragon.jpg');
new Product('img/pen.jpg');
new Product('img/pet-sweep.jpg');
new Product('img/scissors.jpg');
new Product('img/shark.jpg');
new Product('img/sweep.png');
new Product('img/tauntaun.jpg');
new Product('img/unicorn.jpg');
new Product('img/usb.gif');
new Product('img/water-can.jpg');
new Product('img/wine-glass.jpg');

threeRandomPictures();
