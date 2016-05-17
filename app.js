
// define a variable for hour strings
var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];

// define a variable for kiosk locations
kioskLocations = [];

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

  // reporting strings
  this.hourlyReportString = [];
  this.dailyReportString = [];

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

// update all variables holding the daily stats
CoffeeKiosk.prototype.calcDailyStats = function() {
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

//---------------------------------------------
// CREATE KIOSK OBJECTS FOR EACH LOCATION
//---------------------------------------------
var pikePlace = new CoffeeKiosk('Pike Place', 14, 35, 1.2, 0.34);
var capitolPlace = new CoffeeKiosk('Capitol Hill', 12, 28, 3.2, 0.03);
var splPlace = new CoffeeKiosk('Seattle Public Library', 9, 45, 2.6, 0.02);
var sluPlace = new CoffeeKiosk('South Lake Union', 5, 18, 1.3, 0.04);
var seatacPlace = new CoffeeKiosk('Sea-Tac Airport', 28, 44, 1.1, 0.41);

// call the getStats method for each object
pikePlace.getStats();
capitolPlace.getStats();
splPlace.getStats();
sluPlace.getStats();
seatacPlace.getStats();

//---------------------------------------------
// POPULATE BEANS BY LOCATION
// UPDATE FIRST HTML TABLE
//---------------------------------------------
var beansTable = document.getElementById('beans-table');

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
beansTable.appendChild(trElement);

for (var i = 0; i < kioskLocations.length; i++) {
  var trElement = document.createElement('tr');
  var tdElement = document.createElement('td');
  tdElement.textContent = kioskLocations[i].location;
  trElement.appendChild(tdElement);
  var tdElement = document.createElement('td');
  tdElement.textContent = (kioskLocations[i].totalPoundsPerDay).toFixed(1);
  trElement.appendChild(tdElement);
  for (var j = 0; j < hours.length; j++) {
    var tdElement = document.createElement('td');
    tdElement.textContent = kioskLocations[i].totalPoundsPerHr[j];
    trElement.appendChild(tdElement);
  }
  beansTable.appendChild(trElement);
}
beansTable.appendChild(trElement);

//---------------------------------------------
// POPULATE EMPLOYEES BY LOCATION
// UPDATE SECOND HTML TABLE
//---------------------------------------------
var empTable = document.getElementById('baristas-table');

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
empTable.appendChild(trElement);

for (var i = 0; i < kioskLocations.length; i++) {
  var trElement = document.createElement('tr');
  var tdElement = document.createElement('td');
  tdElement.textContent = kioskLocations[i].location;
  trElement.appendChild(tdElement);
  var tdElement = document.createElement('td');
  tdElement.textContent = (kioskLocations[i].totalEmpPerDay).toFixed(1);
  trElement.appendChild(tdElement);
  for (var j = 0; j < hours.length; j++) {
    var tdElement = document.createElement('td');
    tdElement.textContent = kioskLocations[i].totalEmpPerHr[j];
    trElement.appendChild(tdElement);
  }
  empTable.appendChild(trElement);
}
empTable.appendChild(trElement);
