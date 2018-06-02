<p align='center'>
  <b>Fuel Economy Gov</b><br/>
  Perform chained queries on the fueleconomy.gov dataset
</p>

<hr/>
<p align='center'>
  <a href="#overview"><strong>Overview</strong></a> &middot;
  <a href="#install"><strong>Install</strong></a> &middot;
  <a href="#sample"><strong>Sample</strong></a> &middot;
  <a href="#api"><strong>API</strong></a> &middot;
  <a href="#tests"><strong>Tests</strong></a>
</p>
<hr/>

## Overview
Fuel Economy Gov allows you to search through vehicle records from the fueleconomy.gov website based on criteria you specify. You can find vehicles by make, model, year, MPG, etc.

**Design** -
The queries follow a *chaining* pattern, allowing you to specify as few or as many constraints as you wish ([see API list for details](#api)). Once the query is assembled, call `.search()` with a callback of the form cb(cars), where cars will be an array of records that met the criteria.

All the data (back to 1984) is packed in a .csv file obtained from the ["Download the Vehicle Data" ](https://www.fueleconomy.gov/feg/ws/index.shtml) section of the .gov website. Integration with their web service API is expected for this module.

**Why?**
This was made to support projects that provide vehicle search capabilities to users. The data is from fueleconomy.gov, so it's main focus is on fuel efficiency and emissions.

## Install
```js
npm install fueleconomygov
```

## Sample
```js
var FuelEconomy = require('fueleconomygov');

new FuelEconomy().make('Volkswagen').search(function(cars) {
    // `cars` will contain Volkswagen vehicles
});

new FuelEconomy().make('Jetta').search(function(cars) {
    // `cars` will contain Jettas (a model of Volkswagen)
});

// Queries can be chained together to be more specific
new FuelEconomy().make('Ford').minMpg(20).maxMpg(30).minYear(2005).maxYear(2018).search(function(cars) {
    // `cars` will contain any records that are Ford vehicles, with between 20-30mpg, and made between 2005 and 2018
});
```

## API
The following functions can be chained together on the `new FuelEconomy()` clause to specify search constraints. As demonstrated above, call `.search()` with a callback to get the records found.
```js
.make       string
.model      string
.year       number
.minYear    number
.maxYear    number
.mpg        number
.minMpg     number
.maxMpg     number
```

## Tests
Run `npm test` to execute the *Mocha* tests. Each test takes a few seconds because the streaming query has to go through tens of thousands of records.
