const assert = require('chai').assert; // http://www.chaijs.com/api/assert/
var FuelEconomy = require('../index.js');

describe('FuelEconomy', function() {
    this.timeout(5000);

    describe('make', function() {
        it('.make(Volkswagen) should get only Volkswagens', function(done) {
            var fe = new FuelEconomy().make('Volkswagen').search(function(cars) {
                assert.notEqual(cars.length, 0);
                cars.forEach((car) => {
                    assert.equal(car.make, 'Volkswagen');
                });
                done();
            });
        });
    });

    describe('model', function() {
        it('.model(Jetta) should get only Jettas', function(done) {
            var fe = new FuelEconomy().model('Jetta').search(function(cars) {
                assert.notEqual(cars.length, 0);
                cars.forEach((car) => {
                    assert.equal(car.model, 'Jetta');
                });
                done();
            });
        });
    });

    describe('year', function() {
        it('.year(2017) should get only 2017 cars', function(done) {
            var fe = new FuelEconomy().year(2017).search(function(cars) {
                assert.notEqual(cars.length, 0);
                cars.forEach((car) => {
                    assert.equal(car.year, 2017);
                });
                done();
            });
        });
        it('.minYear(2017) should get cars 2017 or newer', function(done) {
            var fe = new FuelEconomy().minYear(2017).search(function(cars) {
                assert.notEqual(cars.length, 0);
                cars.forEach((car) => {
                    assert.isAtLeast(car.year, 2017);
                });
                done();
            });
        });
        it('.maxYear(2017) should get cars 2017 or older', function(done) {
            var fe = new FuelEconomy().maxYear(2017).search(function(cars) {
                assert.notEqual(cars.length, 0);
                cars.forEach((car) => {
                    assert.isAtMost(car.year, 2017);
                });
                done();
            });
        });
    });

    describe('mpg', function() {
        it('.mpg(22) should get cars with 22mpg', function(done) {
            var fe = new FuelEconomy().mpg(22).search(function(cars) {
                assert.notEqual(cars.length, 0);
                cars.forEach((car) => {
                    assert.equal(car['comb08'], 22);
                });
                done();
            });
        });
        it('.minMpg(35) should get cars with 35mpg or greater', function(done) {
            var fe = new FuelEconomy().minMpg(35).search(function(cars) {
                assert.notEqual(cars.length, 0);
                cars.forEach((car) => {
                    assert.isAtLeast(car['comb08'], 35);
                });
                done();
            });
        });
        it('.maxMpg(22) should get cars with <= 22mpg', function(done) {
            var fe = new FuelEconomy().maxMpg(22).search(function(cars) {
                assert.notEqual(cars.length, 0);
                cars.forEach((car) => {
                    assert.isAtMost(car['comb08'], 22);
                });
                done();
            });
        });
    });

    describe('chaining', function() {
        it('.make(Volkswagen).minMpg(25) should get Volkswagens with at least 25mpg', function(done) {
            var fe = new FuelEconomy().make('Volkswagen').minMpg(25).search(function(cars) {
                assert.notEqual(cars.length, 0);
                cars.forEach((car) => {
                    assert.equal(car.make, 'Volkswagen');
                    assert.isAtLeast(car['comb08'], 25);
                });
                done();
            });
        });
        it('.make(Ford).minMpg(20).maxMpg(30).minYear(2005).maxYear(2018)', function(done) {
            var fe = new FuelEconomy().make('Ford').minMpg(20).maxMpg(30).minYear(2005).maxYear(2018).search(function(cars) {
                assert.notEqual(cars.length, 0);
                cars.forEach((car) => {
                    assert.equal(car.make, 'Ford');
                    assert.isAtLeast(car['comb08'], 20);
                    assert.isAtMost(car['comb08'], 30);
                    assert.isAtLeast(car.year, 2005);
                    assert.isAtMost(car.year, 2018);
                });
                done();
            });
        });
    });

    describe('non-sensical chaining', function() {
        it('.make(Volkswagen).make(Ford) should return no cars', function(done) {
            var fe = new FuelEconomy().make('Volkswagen').make('Ford').search(function(cars) {
                assert.equal(cars.length, 0);
                done();
            });
        });
        it('.model(Jetta).model(Escape) should return no cars', function(done) {
            var fe = new FuelEconomy().model('Jetta').model('Escape').search(function(cars) {
                assert.equal(cars.length, 0);
                done();
            });
        });
        it('.year(2012).year(2013) should return no cars', function(done) {
            var fe = new FuelEconomy().year(2012).year(2013).search(function(cars) {
                assert.equal(cars.length, 0);
                done();
            });
        });
        it('.minYear(2010).maxYear(2005) should return no cars', function(done) {
            var fe = new FuelEconomy().minYear(2010).maxYear(2005).search(function(cars) {
                assert.equal(cars.length, 0);
                done();
            });
        });
        it('.minMpg(30).maxMpg(20) should return no cars', function(done) {
            var fe = new FuelEconomy().minMpg(30).maxMpg(20).search(function(cars) {
                assert.equal(cars.length, 0);
                done();
            });
        });
    });

});
