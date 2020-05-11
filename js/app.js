'use strict';

var productsArray = [];
var clicksLeft = 25;
var parentElement = document.getElementById('products');
parentElement.addEventListener('click',findEventTarget);

function Product(image, title) {
  this.image = image;
  this.alt = title;
  this.title = this.alt;
  this.numberOfClicks = 0;
  this.timesShown = 0;
  productsArray.push(this);
}


function findEventTarget() {
  for (var i = 0; i < productsArray.length; i++) {
    if (event.target.title === productsArray[i].title){
      productsArray[i].numberOfClicks++;
    }
  }
  threeRandomPictures();
  clicksLeft--;
  if (clicksLeft === 0) {
    parentElement.removeEventListener('click',findEventTarget);
    resultsList();
  }
}

function threeRandomPictures() {
  parentElement.textContent = '';

  // Figure out images to show
  var firstIndex = randomNumber(productsArray.length);
  var secondIndex = randomNumber(productsArray.length);
  var thirdIndex = randomNumber(productsArray.length);

  while (firstIndex === secondIndex || firstIndex === thirdIndex || secondIndex === thirdIndex) {
    secondIndex = randomNumber(productsArray.length);
    thirdIndex = randomNumber(productsArray.length);
  }

  // Put images on screen
  appendImage(firstIndex);
  appendImage(secondIndex);
  appendImage(thirdIndex);
  // Update times shown
  productsArray[firstIndex].timesShown++;
  productsArray[secondIndex].timesShown++;
  productsArray[thirdIndex].timesShown++;
}

function appendImage(imageNumber) {
  var picture = document.createElement('img');
  picture.src = productsArray[imageNumber].image;
  picture.alt = productsArray[imageNumber].alt;
  picture.title = productsArray[imageNumber].title;
  parentElement.appendChild(picture);
}

function resultsList() {
  var listParent = document.getElementById('results');
  var productResult;
  for (var i = 0; i < productsArray.length; i++) {
    productResult = document.createElement('li');
    productResult.textContent = `${productsArray[i].title} had ${productsArray[i].numberOfClicks} votes and was shown ${productsArray[i].timesShown} times`;
    listParent.appendChild(productResult);
  }
}

function randomNumber(arrayLength) {
  return Math.floor(Math.random()*arrayLength);
}

new Product('img/bag.jpg','R2D2 Luggage');
new Product('img/banana.jpg','Banana Slicer');
new Product('img/bathroom.jpg','Toilet Paper Tablet Holder');
new Product('img/boots.jpg','Toeless Rain Boots');
new Product('img/breakfast.jpg','Breakfast Maker');
new Product('img/bubblegum.jpg','Meatball Bubble Gum');
new Product('img/chair.jpg', 'Round Seat Chair');
new Product('img/cthulhu.jpg','Cthulhu Action Figure');
new Product('img/dog-duck.jpg','Dog Duck Beak');
new Product('img/dragon.jpg','Can of Dragon Meat');
new Product('img/pen.jpg','Silverware Pen Set');
new Product('img/pet-sweep.jpg','Pet Sweep');
new Product('img/scissors.jpg','Pizza Scissors');
new Product('img/shark.jpg','Shark Slepping Bag');
new Product('img/sweep.png','Baby Sweep Outfit');
new Product('img/tauntaun.jpg','Tauntaun Sleeping Bag');
new Product('img/unicorn.jpg','Unicorn Meat');
new Product('img/usb.gif','Tentacle USB');
new Product('img/water-can.jpg','Self Filling Water Can');
new Product('img/wine-glass.jpg','Modern Wine Glass');

threeRandomPictures();
