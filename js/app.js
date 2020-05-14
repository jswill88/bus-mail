'use strict';

var titlesArray = [];
var totalVotes = [];
var totalTimesShown = [];
var productsArray = [];
var productsArrayfromStorage = [];
var itemsDisplayed = [];
var clicksLeft = 25;
var parentElement = document.getElementById('products');
parentElement.addEventListener('click',findEventTarget);
var resetButton = document.getElementById('clearMemory');
resetButton.addEventListener('click',removeLocalStorage);

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
    endOfVotes();
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
  var resultsSection = document.getElementById('results-section');
  // Remove text to replace with new list
  resultsSection.removeChild(resultsSection.childNodes[1]);
  document.getElementById('arrow').textContent = '';
  // Add results list header
  var listParent = document.getElementById('results');
  var resultsHeader = document.createElement('h2');
  resultsHeader.textContent = 'Results for this session';
  listParent.appendChild(resultsHeader);
  // Add results list
  var productResult;
  for (var i = 0; i < productsArray.length; i++) {
    productResult = document.createElement('li');
    // Change sentence based on vote and times shown amounts
    var sentenceFirstHalf;
    var sentenceSecondHalf;
    if (productsArray[i].numberOfClicks === 1) {
      sentenceFirstHalf = `${productsArray[i].title} had 1 vote `;
    } else {
      sentenceFirstHalf = `${productsArray[i].title} had ${productsArray[i].numberOfClicks} votes `;
    }
    if (productsArray[i].timesShown === 1) {
      sentenceSecondHalf = 'and was shown 1 time';
    } else {
      sentenceSecondHalf = `and was shown ${productsArray[i].timesShown} times`;
    }
    productResult.textContent = sentenceFirstHalf + sentenceSecondHalf;
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

// What to do when votes run out
function endOfVotes() {
  parentElement.removeEventListener('click',findEventTarget);
  parentElement.removeAttribute('id'); // Removes pointer from mouse
  resultsList();
  // Add clicks and times shown from storage to display in chart
  if (localStorage.getItem('busMallProducts') !== null){
    for (var j = 0; j < productsArray.length; j++) {
      productsArray[j].numberOfClicks += productsArrayfromStorage[j].numberOfClicks;
      productsArray[j].timesShown += productsArrayfromStorage[j].timesShown;
    }
  }
  clicksAndTimesShown();
  renderChart();
  // Store productsArray
  var stringinfiedProducts = JSON.stringify(productsArray);
  localStorage.setItem('busMallProducts', stringinfiedProducts);
}

// Removes local storage and resets click counter, votes, and times shown
function removeLocalStorage(){
  localStorage.removeItem('busMallProducts');
  window.location='index.html';
}

function renderChart() {
  // Restyle page to make room for chart
  var parent = document.getElementById('chart-section');
  parent.style.backgroundColor = 'black';
  parent.style.height = '620px';
  document.getElementById('about').style.marginBottom = '10px';

  // Make canvas element
  var chart = document.createElement('canvas');
  chart.id = 'resultsChart';
  chart.height = '900';
  chart.width = '775';
  parent.appendChild(chart);

  // Make chart
  // eslint-disable-next-line no-undef
  Chart.defaults.global.defaultFontColor = 'white';
  // eslint-disable-next-line no-undef
  Chart.defaults.global.defaultFontSize = 14;
  var ctx = document.getElementById('resultsChart').getContext('2d');
  // eslint-disable-next-line no-unused-vars, no-undef
  var resultsChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: titlesArray,
      datasets: [{
        label: 'Number of Votes',
        data: totalVotes,
        backgroundColor: 'rgba(0,250,154,.4)',
        borderColor: 'rgba(0,250,154,1)',
        hoverBackgroundColor: 'rgba(0,250,154,1)',
        borderWidth: 2,
        minBarLength: 2,
      },
      {
        label: 'Total Times Shown',
        data: totalTimesShown,
        backgroundColor: 'rgba(72,209,204,.3)',
        borderColor: 'rgba(72,209,204,1)',
        hoverBackgroundColor: 'rgba(72,209,204,.5)',
        borderWidth: 2,
        minBarLength: 2
      },
      ]
    },
    options: {
      title: {
        display: true,
        position: 'top',
        text: 'Voting Results from All Sessions',
        fontSize: 20
      },
      scales: {
        yAxes: [{
          stacked: true
        }],
        xAxes: [{
          ticks: {
            beginAtZero: true,
            precision: 0,
            minStepSize: 1
          },
          gridLines: {
            color: 'white'
          }
        }],
      },
      layout: {
        padding: {
          right: 20,
          left: 20,
          top: 10,
          bottom: 20
        }
      }
    }
  });
}

// First time visiting page, new products are added
if (localStorage.getItem('busMallProducts') === null) {
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
}
else { // On subsequent visits, product info is taken from storage
  var storedProducts = localStorage.getItem('busMallProducts');
  productsArrayfromStorage = JSON.parse(storedProducts);
  for(var i = 0; i < productsArrayfromStorage.length; i++){
    var productImage = productsArrayfromStorage[i].image;
    var productName = productsArrayfromStorage[i].title;
    new Product(productImage,productName);
  }
}

threeRandomPictures();

