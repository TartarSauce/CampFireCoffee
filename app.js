
//---------------------------------------------
// GLOBAL VARIABLES
//---------------------------------------------
// define a variable for hour strings
var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];

// define a variable for kiosk locations
kioskLocations = [];

// list of relevant DOM elements
var newKioskForm = document.getElementById('newkiosk');
var beansTable = document.getElementById('beans-table');
var baristaTable = document.getElementById('baristas-table');

//---------------------------------------------
// DEFINE CLASS COFFEEKIOSK
//---------------------------------------------
function CoffeeKiosk (location, minCustPerHr, maxCustPerHr, cupsPerCust, poundsPerCust) {
  this.location = location;

  //market data
  this.minCustPerHr = minCustPerHr;
  this.maxCustPerHr = maxCustPerHr;
  this.cupsPerCust = cupsPerCust;
  this.poundsPerCust = poundsPerCust;

  // hourly statistics
  this.custPerHr = [];
  this.cupsPerHr = [];
  this.poundsForCupsPerHr = [];
  this.poundsForPkgsPerHr = [];
  this.totalPoundsPerHr = [];
  this.totalEmpPerHr = [];

  // daily statistics
  this.totalCustPerDay = 0;
  this.totalCupsPerDay = 0;
  this.totalPoundPkgsPerDay = 0;
  this.totalPoundsPerDay = 0;
  this.totalEmpPerDay = 0;

  kioskLocations.push(this);
};

//---------------------------------------------
// DEFINE PROTOTYPE FUNCTIONS FOR CLASS COFFEEKIOSK
//---------------------------------------------
// update all variables holding hourly stats
CoffeeKiosk.prototype.calcHourlyStats = function() {
  for (var i = 0; i < hours.length; i++) {
    var customers = this.minCustPerHr + Math.floor(Math.random() * (this.maxCustPerHr - this.minCustPerHr) + 1);
    this.custPerHr.push(customers);
    this.cupsPerHr.push((customers * this.cupsPerCust).toFixed(1));
    this.poundsForCupsPerHr.push((this.cupsPerHr[i] / 16).toFixed(1)); // 1 lb of coffee beans makes 16 cups
    this.poundsForPkgsPerHr.push((customers * this.poundsPerCust).toFixed(1));
    var total = parseFloat(this.poundsForCupsPerHr[i]) + parseFloat(this.poundsForPkgsPerHr[i]);
    this.totalPoundsPerHr.push(total.toFixed(1));
    var numTransactions = parseFloat(this.cupsPerHr[i]) + parseFloat(this.totalPoundsPerHr[i]);
    this.totalEmpPerHr.push((numTransactions * 2 / 60).toFixed(1));
  }
};

// update all variables holding daily stats
CoffeeKiosk.prototype.calcDailyStats = function() {
  this.totalCustPerDay = 0;
  this.totalCupsPerDay = 0;
  this.totalPoundPkgsPerDay = 0;
  this.totalPoundsPerDay = 0;
  this.totalEmpPerDay = 0;
  for (var i = 0; i < hours.length; i++) {
    this.totalCustPerDay += parseFloat(this.custPerHr[i]);
    this.totalCupsPerDay += parseFloat(this.cupsPerHr[i]);
    this.totalPoundPkgsPerDay += parseFloat(this.poundsForPkgsPerHr[i]);
    this.totalPoundsPerDay += (parseFloat(this.poundsForCupsPerHr[i]) + parseFloat(this.poundsForPkgsPerHr[i]));
    this.totalEmpPerDay += parseFloat(this.totalEmpPerHr[i]);
  }
  this.totalEmpPerDay = Math.ceil(parseFloat(this.totalEmpPerDay));
};

// calculate all the hourly stats, daily stats
CoffeeKiosk.prototype.getStats = function() {
  this.calcHourlyStats();
  this.calcDailyStats();
};

// render all row information for every kiosk location
CoffeeKiosk.prototype.render = function(tableName) {
  var trElement = document.createElement('tr');
  var tdElement = document.createElement('td');
  tdElement.textContent = this.location;
  trElement.appendChild(tdElement);
  var tdElement = document.createElement('td');
  if (tableName === 'beans-table') {
    tdElement.textContent = (this.totalPoundsPerDay).toFixed(1);
  } else if (tableName === 'baristas-table') {
    tdElement.textContent = (this.totalEmpPerDay).toFixed(1);
  }
  trElement.appendChild(tdElement);

  for (var j = 0; j < hours.length; j++) {
    var tdElement = document.createElement('td');
    if (tableName === 'beans-table') {
      tdElement.textContent = this.totalPoundsPerHr[j];
    } else if (tableName === 'baristas-table') {
      tdElement.textContent = this.totalEmpPerHr[j];
    }
    trElement.appendChild(tdElement);
  }
  return trElement;
};

//---------------------------------------------
// DEFINE OTHER FUNCTIONS FOR DRAWING TABLES,
// HANDLING EVENTS
//---------------------------------------------
// draw both the beans and barista tables
function drawTables() {
  drawTableHeader('beans-table');
  drawTableHeader('baristas-table');

  for (var i = 0; i < kioskLocations.length; i++) {
    kioskLocations[i].getStats();
    beansTable.appendChild(kioskLocations[i].render('beans-table'));
    baristaTable.appendChild(kioskLocations[i].render('baristas-table'));
  }

  drawTableFooter('beans-table');
  drawTableFooter('baristas-table');
}

// draw header
function drawTableHeader(tableName) {
  var myTable = document.getElementById(tableName);

  var trElement = document.createElement('tr');
  var thElement = document.createElement('th');
  thElement.textContent = '';
  trElement.appendChild(thElement);
  var thElement = document.createElement('th');
  thElement.textContent = 'Daily Total';
  trElement.appendChild(thElement);

  for (var i = 0; i < hours.length; i++) {
    var thElement = document.createElement('th');
    thElement.textContent = hours[i];
    trElement.appendChild(thElement);
  }
  myTable.appendChild(trElement);
}

//draw footer
function drawTableFooter(tableName) {
  var myTable = document.getElementById(tableName);

  var trElement = document.createElement('tr');
  var tdElement = document.createElement('td');
  tdElement.textContent = 'Totals';
  trElement.appendChild(tdElement);

  // get the totals across all the locations
  var totalforlocations = 0;
  for (var i = 0; i < kioskLocations.length; i++) {
    if (tableName === 'beans-table') {
      totalforlocations += kioskLocations[i].totalPoundsPerDay;
    } else if (tableName === 'baristas-table') {
      totalforlocations += kioskLocations[i].totalEmpPerDay;
    }
  }

  var tdElement = document.createElement('td');
  tdElement.textContent = totalforlocations.toFixed(1);
  trElement.appendChild(tdElement);

  // get the totals for every column
  for (var i = 0; i < hours.length; i++) {
    var totalforhr = 0;
    for (var j = 0; j < kioskLocations.length; j++) {
      if (tableName === 'beans-table') {
        totalforhr += parseFloat(kioskLocations[j].totalPoundsPerHr[i]);
      } else if (tableName === 'baristas-table') {
        totalforhr += parseFloat(kioskLocations[j].totalEmpPerHr[i]);
      }
    }
    var tdElement = document.createElement('td');
    tdElement.textContent = totalforhr.toFixed(1);
    trElement.appendChild(tdElement);
  }
  myTable.appendChild(trElement);
}

// Event handler for form that accepts new kiosk input
function newKioskSubmit(event) {
  event.preventDefault(); // prevents page reload

  beansTable.innerHTML = '';
  baristaTable.innerHTML = '';

  var loc = event.target.loc.value;
  var min = parseFloat(event.target.min.value);
  var max = parseFloat(event.target.max.value);
  var cups = parseFloat(event.target.cups.value);
  var pounds = parseFloat(event.target.pounds.value);

  var newKiosk = new CoffeeKiosk(loc, min, max, cups, pounds);
  console.log(newKiosk);

  event.target.loc.value = null;
  event.target.min.value = null;
  event.target.max.value = null;
  event.target.cups.value = null;
  event.target.pounds.value = null;

  // redraw tables with new info added
  drawTables();
};

//---------------------------------------------
// EXECUTABLE CODE BEGINS
//---------------------------------------------
// create kiosk objects for each initial location known
var pikePlace = new CoffeeKiosk('Pike Place', 14, 35, 1.2, 0.34);
var capitolPlace = new CoffeeKiosk('Capitol Hill', 12, 28, 3.2, 0.03);
var splPlace = new CoffeeKiosk('Seattle Public Library', 9, 45, 2.6, 0.02);
var sluPlace = new CoffeeKiosk('South Lake Union', 5, 18, 1.3, 0.04);
var seatacPlace = new CoffeeKiosk('Sea-Tac Airport', 28, 44, 1.1, 0.41);

// first draw tables
drawTables();

// define event listener for the submit button
newKioskForm.addEventListener('submit', newKioskSubmit);
