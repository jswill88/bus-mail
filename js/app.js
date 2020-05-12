'use strict';

var titlesArray = [];
var totalVotes = [];
var totalTimesShown = [];
var productsArray = [];
var itemsDisplayed = [];
var chartColors = [];
var chartBorderColors = [];
var clicksLeft = 25;
var parentElement = document.getElementById('products');
parentElement.addEventListener('click',findEventTarget);

function Product(image, title) {
  this.image = image;
  this.alt = title;
  this.title = title;
  this.numberOfClicks = 0;
  this.timesShown = 0;
  productsArray.push(this);
  titlesArray.push(this.title);
}

function findEventTarget() {
  for (var i = 0; i < productsArray.length; i++) {
    if (event.target.title === productsArray[i].title){
      productsArray[i].numberOfClicks++;
    }
  }
  threeRandomPictures();
  clicksLeft--;
  // Stop event listener
  if (clicksLeft === 0) {
    parentElement.removeEventListener('click',findEventTarget);
    parentElement.removeAttribute('id'); // Removes pointer from mouse
    resultsList();
    clicksAndTimesShown();
    makeChartColors();
    renderChart();
  }
}

function threeRandomPictures() {
  parentElement.textContent = '';
  if (itemsDisplayed.length === 6){
  // Get rid of index from 2 displays ago
    for(var i = 0; i < 3; i ++){
      itemsDisplayed.shift();
    }
  }
  // Make sure images are unique
  for (var j = 0; j < 3; j++) {
    var index = randomNumber(productsArray.length);
    while(itemsDisplayed.includes(index)){
      index = randomNumber(productsArray.length);
    }
    itemsDisplayed.push(index);
    appendImage(index);
    productsArray[index].timesShown++;
  }
}

function appendImage(imageNumber) {
  var picture = document.createElement('img');
  picture.src = productsArray[imageNumber].image;
  picture.alt = productsArray[imageNumber].alt;
  picture.title = productsArray[imageNumber].title;
  parentElement.appendChild(picture);
}

// Show voting results
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

function clicksAndTimesShown() {
  for (var i = 0; i < productsArray.length; i++){
    totalVotes.push(productsArray[i].numberOfClicks);
    totalTimesShown.push(productsArray[i].timesShown);
  }
}
function makeChartColors() {
  var red = randomNumber(100);
  var green = randomNumber(100);
  var blue = randomNumber(30);
  for(var i = 0; i < productsArray.length; i++){
    var color = `rgba(${red},${green},${blue},.3)`;
    var borderColor = `rgba(${red},${green},${blue},1)`;
    chartColors.push(color);
    chartBorderColors.push(borderColor);
    red += 8;
    green +=10;
  }
}

function renderChart() {
  var ctx = document.getElementById('resultsChart').getContext('2d');
  var resultsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: titlesArray,
      datasets: [{
        label: '# of Votes',
        data: totalVotes,
        backgroundColor: chartColors,
        borderColor: chartBorderColors,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
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

