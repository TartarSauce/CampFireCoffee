var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];

// Pike Place Market

var pikePlace = {
  location: 'Pike Place Market',

  // market data
  minCustPerHr: 14,
  maxCustPerHr: 35,
  cupsPerCust: 1.2,
  poundsPerCust: 0.34,

  // hourly statistics
  custPerHr: [],
  cupsPerHr: [],
  poundsForCupsPerHr: [],
  poundsForPkgsPerHr: [],
  totalPoundsPerHr: [],

  // daily statistics
  totalCustPerDay: 0,
  totalCupsPerDay: 0,
  totalPoundPkgsPerDay: 0,
  totalPoundsPerDay: 0,

  // reporting strings
  hourlyReportString: [],
  dailyReportString: [],

  // helper functions

  // update all variables holding hourly stats
  calcHourlyStats: function() {
    for (var i = 0; i < hours.length; i++) {
      var customers = this.minCustPerHr + Math.floor(Math.random() * (this.maxCustPerHr - this.minCustPerHr) + 1);
      this.custPerHr.push(customers);
      this.cupsPerHr.push((customers * this.cupsPerCust).toFixed(1));
      this.poundsForCupsPerHr.push((this.cupsPerHr[i] / 16).toFixed(1)); // 1 lb of coffee beans makes 16 cups
      this.poundsForPkgsPerHr.push((customers * this.poundsPerCust).toFixed(1));
      var total = parseFloat(this.poundsForCupsPerHr[i]) + parseFloat(this.poundsForPkgsPerHr[i]);
      this.totalPoundsPerHr.push(total.toFixed(1));
    }
  },

  // update all variables holding the daily stats
  calcDailyStats: function() {
    for (var i = 0; i < hours.length; i++) {
      this.totalCustPerDay += parseFloat(this.custPerHr[i]);
      this.totalCupsPerDay += parseFloat(this.cupsPerHr[i]);
      this.totalPoundPkgsPerDay += parseFloat(this.poundsForPkgsPerHr[i]);
      this.totalPoundsPerDay += (parseFloat(this.poundsForCupsPerHr[i]) + parseFloat(this.poundsForPkgsPerHr[i]));
    }
  },

  formHourlyOutputString: function() {
    for (var i = 0; i < hours.length; i++) {
      var myStr = hours[i] + ':' + this.totalPoundsPerHr[i] + ' [' + this.custPerHr[i] + ' customers, ' +
                  this.cupsPerHr[i] + ' cups (' + this.poundsForCupsPerHr[i] + ' lbs), ' +
                  this.poundsForPkgsPerHr[i] + ' lbs to-go]';
      this.hourlyReportString.push(myStr);
    }
  },

  formDailyStatsString: function() {
    var s1 = 'Total customers at ' + this.location + ': ' + this.totalCustPerDay.toFixed(1);
    this.dailyReportString.push(s1);
    var s2 = 'Total cups sold at ' + this.location + ': ' + this.totalCupsPerDay.toFixed(1);
    this.dailyReportString.push(s2);
    var s3 = 'Total pound packages sold at ' + this.location + ': ' + this.totalPoundPkgsPerDay.toFixed(1);
    this.dailyReportString.push(s3);
    var s4 = 'Total pounds of beans sold at ' + this.location + ': ' + this.totalPoundsPerDay.toFixed(1);
    this.dailyReportString.push(s4);
  },

  render: function() {
    //calculate all stats, form output strings
    this.calcHourlyStats();
    this.calcDailyStats();
    this.formHourlyOutputString();
    this.formDailyStatsString();

    // get HTML element where you want to insert the text
    var ulElement = document.getElementById('pike');

    // report hourly stats
    for (var i = 0; i < hours.length; i++) {
      var liElement = document.createElement('li');
      liElement.textContent = this.hourlyReportString[i];
      ulElement.appendChild(liElement);
    }

    //report daily stats
    for (var i = 0; i < this.dailyReportString.length; i++) {
      var liElement = document.createElement('li');
      liElement.textContent = this.dailyReportString[i];
      ulElement.appendChild(liElement);
    }
  }

};

pikePlace.render();

var capitolPlace = {
  location: 'Capitol Hill',

  // market data
  minCustPerHr: 12,
  maxCustPerHr: 28,
  cupsPerCust: 3.2,
  poundsPerCust: 0.03,

  // hourly statistics
  custPerHr: [],
  cupsPerHr: [],
  poundsForCupsPerHr: [],
  poundsForPkgsPerHr: [],
  totalPoundsPerHr: [],

  // daily statistics
  totalCustPerDay: 0,
  totalCupsPerDay: 0,
  totalPoundPkgsPerDay: 0,
  totalPoundsPerDay: 0,

  // reporting strings
  hourlyReportString: [],
  dailyReportString: [],

  // helper functions

  // update all variables holding hourly stats
  calcHourlyStats: function() {
    for (var i = 0; i < hours.length; i++) {
      var customers = this.minCustPerHr + Math.floor(Math.random() * (this.maxCustPerHr - this.minCustPerHr) + 1);
      this.custPerHr.push(customers);
      this.cupsPerHr.push((customers * this.cupsPerCust).toFixed(1));
      this.poundsForCupsPerHr.push((this.cupsPerHr[i] / 16).toFixed(1)); // 1 lb of coffee beans makes 16 cups
      this.poundsForPkgsPerHr.push((customers * this.poundsPerCust).toFixed(1));
      var total = parseFloat(this.poundsForCupsPerHr[i]) + parseFloat(this.poundsForPkgsPerHr[i]);
      this.totalPoundsPerHr.push(total.toFixed(1));
    }
  },

  // update all variables holding the daily stats
  calcDailyStats: function() {
    for (var i = 0; i < hours.length; i++) {
      this.totalCustPerDay += parseFloat(this.custPerHr[i]);
      this.totalCupsPerDay += parseFloat(this.cupsPerHr[i]);
      this.totalPoundPkgsPerDay += parseFloat(this.poundsForPkgsPerHr[i]);
      this.totalPoundsPerDay += (parseFloat(this.poundsForCupsPerHr[i]) + parseFloat(this.poundsForPkgsPerHr[i]));
    }
  },

  formHourlyOutputString: function() {
    for (var i = 0; i < hours.length; i++) {
      var myStr = hours[i] + ':' + this.totalPoundsPerHr[i] + ' [' + this.custPerHr[i] + ' customers, ' +
                  this.cupsPerHr[i] + ' cups (' + this.poundsForCupsPerHr[i] + ' lbs), ' +
                  this.poundsForPkgsPerHr[i] + ' lbs to-go]';
      this.hourlyReportString.push(myStr);
    }
  },

  formDailyStatsString: function() {
    var s1 = 'Total customers at ' + this.location + ': ' + this.totalCustPerDay.toFixed(1);
    this.dailyReportString.push(s1);
    var s2 = 'Total cups sold at ' + this.location + ': ' + this.totalCupsPerDay.toFixed(1);
    this.dailyReportString.push(s2);
    var s3 = 'Total pound packages sold at ' + this.location + ': ' + this.totalPoundPkgsPerDay.toFixed(1);
    this.dailyReportString.push(s3);
    var s4 = 'Total pounds of beans sold at ' + this.location + ': ' + this.totalPoundsPerDay.toFixed(1);
    this.dailyReportString.push(s4);
  },

  render: function() {
    //calculate all stats, form output strings
    this.calcHourlyStats();
    this.calcDailyStats();
    this.formHourlyOutputString();
    this.formDailyStatsString();

    // get HTML element where you want to insert the text
    var ulElement = document.getElementById('capitol');

    // report hourly stats
    for (var i = 0; i < hours.length; i++) {
      var liElement = document.createElement('li');
      liElement.textContent = this.hourlyReportString[i];
      ulElement.appendChild(liElement);
    }

    //report daily stats
    for (var i = 0; i < this.dailyReportString.length; i++) {
      var liElement = document.createElement('li');
      liElement.textContent = this.dailyReportString[i];
      ulElement.appendChild(liElement);
    }
  }

};

capitolPlace.render();

var splPlace = {
  location: 'Seattle Public Library',

  // market data
  minCustPerHr: 12,
  maxCustPerHr: 28,
  cupsPerCust: 3.2,
  poundsPerCust: 0.03,

  // hourly statistics
  custPerHr: [],
  cupsPerHr: [],
  poundsForCupsPerHr: [],
  poundsForPkgsPerHr: [],
  totalPoundsPerHr: [],

  // daily statistics
  totalCustPerDay: 0,
  totalCupsPerDay: 0,
  totalPoundPkgsPerDay: 0,
  totalPoundsPerDay: 0,

  // reporting strings
  hourlyReportString: [],
  dailyReportString: [],

  // helper functions

  // update all variables holding hourly stats
  calcHourlyStats: function() {
    for (var i = 0; i < hours.length; i++) {
      var customers = this.minCustPerHr + Math.floor(Math.random() * (this.maxCustPerHr - this.minCustPerHr) + 1);
      this.custPerHr.push(customers);
      this.cupsPerHr.push((customers * this.cupsPerCust).toFixed(1));
      this.poundsForCupsPerHr.push((this.cupsPerHr[i] / 16).toFixed(1)); // 1 lb of coffee beans makes 16 cups
      this.poundsForPkgsPerHr.push((customers * this.poundsPerCust).toFixed(1));
      var total = parseFloat(this.poundsForCupsPerHr[i]) + parseFloat(this.poundsForPkgsPerHr[i]);
      this.totalPoundsPerHr.push(total.toFixed(1));
    }
  },

  // update all variables holding the daily stats
  calcDailyStats: function() {
    for (var i = 0; i < hours.length; i++) {
      this.totalCustPerDay += parseFloat(this.custPerHr[i]);
      this.totalCupsPerDay += parseFloat(this.cupsPerHr[i]);
      this.totalPoundPkgsPerDay += parseFloat(this.poundsForPkgsPerHr[i]);
      this.totalPoundsPerDay += (parseFloat(this.poundsForCupsPerHr[i]) + parseFloat(this.poundsForPkgsPerHr[i]));
    }
  },

  formHourlyOutputString: function() {
    for (var i = 0; i < hours.length; i++) {
      var myStr = hours[i] + ':' + this.totalPoundsPerHr[i] + ' [' + this.custPerHr[i] + ' customers, ' +
                  this.cupsPerHr[i] + ' cups (' + this.poundsForCupsPerHr[i] + ' lbs), ' +
                  this.poundsForPkgsPerHr[i] + ' lbs to-go]';
      this.hourlyReportString.push(myStr);
    }
  },

  formDailyStatsString: function() {
    var s1 = 'Total customers at ' + this.location + ': ' + this.totalCustPerDay.toFixed(1);
    this.dailyReportString.push(s1);
    var s2 = 'Total cups sold at ' + this.location + ': ' + this.totalCupsPerDay.toFixed(1);
    this.dailyReportString.push(s2);
    var s3 = 'Total pound packages sold at ' + this.location + ': ' + this.totalPoundPkgsPerDay.toFixed(1);
    this.dailyReportString.push(s3);
    var s4 = 'Total pounds of beans sold at ' + this.location + ': ' + this.totalPoundsPerDay.toFixed(1);
    this.dailyReportString.push(s4);
  },

  render: function() {
    //calculate all stats, form output strings
    this.calcHourlyStats();
    this.calcDailyStats();
    this.formHourlyOutputString();
    this.formDailyStatsString();

    // get HTML element where you want to insert the text
    var ulElement = document.getElementById('spl');

    // report hourly stats
    for (var i = 0; i < hours.length; i++) {
      var liElement = document.createElement('li');
      liElement.textContent = this.hourlyReportString[i];
      ulElement.appendChild(liElement);
    }

    //report daily stats
    for (var i = 0; i < this.dailyReportString.length; i++) {
      var liElement = document.createElement('li');
      liElement.textContent = this.dailyReportString[i];
      ulElement.appendChild(liElement);
    }
  }
};

splPlace.render();

var sluPlace = {
  location: 'South Lake Union',

  // market data
  minCustPerHr: 12,
  maxCustPerHr: 28,
  cupsPerCust: 3.2,
  poundsPerCust: 0.03,

  // hourly statistics
  custPerHr: [],
  cupsPerHr: [],
  poundsForCupsPerHr: [],
  poundsForPkgsPerHr: [],
  totalPoundsPerHr: [],

  // daily statistics
  totalCustPerDay: 0,
  totalCupsPerDay: 0,
  totalPoundPkgsPerDay: 0,
  totalPoundsPerDay: 0,

  // reporting strings
  hourlyReportString: [],
  dailyReportString: [],

  // helper functions

  // update all variables holding hourly stats
  calcHourlyStats: function() {
    for (var i = 0; i < hours.length; i++) {
      var customers = this.minCustPerHr + Math.floor(Math.random() * (this.maxCustPerHr - this.minCustPerHr) + 1);
      this.custPerHr.push(customers);
      this.cupsPerHr.push((customers * this.cupsPerCust).toFixed(1));
      this.poundsForCupsPerHr.push((this.cupsPerHr[i] / 16).toFixed(1)); // 1 lb of coffee beans makes 16 cups
      this.poundsForPkgsPerHr.push((customers * this.poundsPerCust).toFixed(1));
      var total = parseFloat(this.poundsForCupsPerHr[i]) + parseFloat(this.poundsForPkgsPerHr[i]);
      this.totalPoundsPerHr.push(total.toFixed(1));
    }
  },

  // update all variables holding the daily stats
  calcDailyStats: function() {
    for (var i = 0; i < hours.length; i++) {
      this.totalCustPerDay += parseFloat(this.custPerHr[i]);
      this.totalCupsPerDay += parseFloat(this.cupsPerHr[i]);
      this.totalPoundPkgsPerDay += parseFloat(this.poundsForPkgsPerHr[i]);
      this.totalPoundsPerDay += (parseFloat(this.poundsForCupsPerHr[i]) + parseFloat(this.poundsForPkgsPerHr[i]));
    }
  },

  formHourlyOutputString: function() {
    for (var i = 0; i < hours.length; i++) {
      var myStr = hours[i] + ':' + this.totalPoundsPerHr[i] + ' [' + this.custPerHr[i] + ' customers, ' +
                  this.cupsPerHr[i] + ' cups (' + this.poundsForCupsPerHr[i] + ' lbs), ' +
                  this.poundsForPkgsPerHr[i] + ' lbs to-go]';
      this.hourlyReportString.push(myStr);
    }
  },

  formDailyStatsString: function() {
    var s1 = 'Total customers at ' + this.location + ': ' + this.totalCustPerDay.toFixed(1);
    this.dailyReportString.push(s1);
    var s2 = 'Total cups sold at ' + this.location + ': ' + this.totalCupsPerDay.toFixed(1);
    this.dailyReportString.push(s2);
    var s3 = 'Total pound packages sold at ' + this.location + ': ' + this.totalPoundPkgsPerDay.toFixed(1);
    this.dailyReportString.push(s3);
    var s4 = 'Total pounds of beans sold at ' + this.location + ': ' + this.totalPoundsPerDay.toFixed(1);
    this.dailyReportString.push(s4);
  },

  render: function() {
    //calculate all stats, form output strings
    this.calcHourlyStats();
    this.calcDailyStats();
    this.formHourlyOutputString();
    this.formDailyStatsString();

    // get HTML element where you want to insert the text
    var ulElement = document.getElementById('slu');

    // report hourly stats
    for (var i = 0; i < hours.length; i++) {
      var liElement = document.createElement('li');
      liElement.textContent = this.hourlyReportString[i];
      ulElement.appendChild(liElement);
    }

    //report daily stats
    for (var i = 0; i < this.dailyReportString.length; i++) {
      var liElement = document.createElement('li');
      liElement.textContent = this.dailyReportString[i];
      ulElement.appendChild(liElement);
    }
  }
};

sluPlace.render();

var seatacPlace = {
  location: 'Sea-Tac Airport',

  // market data
  minCustPerHr: 12,
  maxCustPerHr: 28,
  cupsPerCust: 3.2,
  poundsPerCust: 0.03,

  // hourly statistics
  custPerHr: [],
  cupsPerHr: [],
  poundsForCupsPerHr: [],
  poundsForPkgsPerHr: [],
  totalPoundsPerHr: [],

  // daily statistics
  totalCustPerDay: 0,
  totalCupsPerDay: 0,
  totalPoundPkgsPerDay: 0,
  totalPoundsPerDay: 0,

  // reporting strings
  hourlyReportString: [],
  dailyReportString: [],

  // helper functions

  // update all variables holding hourly stats
  calcHourlyStats: function() {
    for (var i = 0; i < hours.length; i++) {
      var customers = this.minCustPerHr + Math.floor(Math.random() * (this.maxCustPerHr - this.minCustPerHr) + 1);
      this.custPerHr.push(customers);
      this.cupsPerHr.push((customers * this.cupsPerCust).toFixed(1));
      this.poundsForCupsPerHr.push((this.cupsPerHr[i] / 16).toFixed(1)); // 1 lb of coffee beans makes 16 cups
      this.poundsForPkgsPerHr.push((customers * this.poundsPerCust).toFixed(1));
      var total = parseFloat(this.poundsForCupsPerHr[i]) + parseFloat(this.poundsForPkgsPerHr[i]);
      this.totalPoundsPerHr.push(total.toFixed(1));
    }
  },

  // update all variables holding the daily stats
  calcDailyStats: function() {
    for (var i = 0; i < hours.length; i++) {
      this.totalCustPerDay += parseFloat(this.custPerHr[i]);
      this.totalCupsPerDay += parseFloat(this.cupsPerHr[i]);
      this.totalPoundPkgsPerDay += parseFloat(this.poundsForPkgsPerHr[i]);
      this.totalPoundsPerDay += (parseFloat(this.poundsForCupsPerHr[i]) + parseFloat(this.poundsForPkgsPerHr[i]));
    }
  },

  formHourlyOutputString: function() {
    for (var i = 0; i < hours.length; i++) {
      var myStr = hours[i] + ':' + this.totalPoundsPerHr[i] + ' [' + this.custPerHr[i] + ' customers, ' +
                  this.cupsPerHr[i] + ' cups (' + this.poundsForCupsPerHr[i] + ' lbs), ' +
                  this.poundsForPkgsPerHr[i] + ' lbs to-go]';
      this.hourlyReportString.push(myStr);
    }
  },

  formDailyStatsString: function() {
    var s1 = 'Total customers at ' + this.location + ': ' + this.totalCustPerDay.toFixed(1);
    this.dailyReportString.push(s1);
    var s2 = 'Total cups sold at ' + this.location + ': ' + this.totalCupsPerDay.toFixed(1);
    this.dailyReportString.push(s2);
    var s3 = 'Total pound packages sold at ' + this.location + ': ' + this.totalPoundPkgsPerDay.toFixed(1);
    this.dailyReportString.push(s3);
    var s4 = 'Total pounds of beans sold at ' + this.location + ': ' + this.totalPoundsPerDay.toFixed(1);
    this.dailyReportString.push(s4);
  },

  render: function() {
    //calculate all stats, form output strings
    this.calcHourlyStats();
    this.calcDailyStats();
    this.formHourlyOutputString();
    this.formDailyStatsString();

    // get HTML element where you want to insert the text
    var ulElement = document.getElementById('seatac');

    // report hourly stats
    for (var i = 0; i < hours.length; i++) {
      var liElement = document.createElement('li');
      liElement.textContent = this.hourlyReportString[i];
      ulElement.appendChild(liElement);
    }

    //report daily stats
    for (var i = 0; i < this.dailyReportString.length; i++) {
      var liElement = document.createElement('li');
      liElement.textContent = this.dailyReportString[i];
      ulElement.appendChild(liElement);
    }
  }
};

seatacPlace.render();
