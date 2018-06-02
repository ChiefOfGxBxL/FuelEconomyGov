const csv = require('csv-streamify')
const fs = require('fs')

function FuelEconomy() {

    var constraints = [];

    return {
        make: function(make) {
            constraints.push((line) => {
                return line.make === make;
            });
            return this;
        },
        model: function(model) {
            constraints.push((line) => {
                return line.model === model;
            });
            return this;
        },
        year: function(year) {
            constraints.push((line) => {
                return line.year == year;
            });
            return this;
        },
        minYear: function(minYear) {
            constraints.push((line) => {
                return +line.year >= minYear;
            });
            return this;
        },
        maxYear: function(maxYear) {
            constraints.push((line) => {
                return +line.year <= maxYear;
            });
            return this;
        },
        mpg: function(mpg) {
            constraints.push((line) => {
                return +line['comb08'] === mpg;
            });
            return this;
        },
        minMpg: function(minMpg) {
            constraints.push((line) => {
                return +line['comb08'] >= minMpg;
            });
            return this;
        },
        maxMpg: function(maxMpg) {
            constraints.push((line) => {
                return +line['comb08'] <= maxMpg;
            });
            return this;
        },
        // fuelType: function(fuelType) {
        //     constraints.push((line) => {
        //         return line.fuelType === fuelType;
        //     });
        //     return this;
        // },

        search: function(cb) {
            let vehicles = [];

            const options = { newline: '\r\n', columns: true };
            const parser = csv(options);

            parser.on('data', (line) => {
                // Clean up the data
                line.year = parseInt(line.year);
                line['comb08'] = parseInt(line['comb08']);

                // The car record here needs to satisfy all of the constraints
                let satisfies = true;

                // Iterate through each constraint function and determines
                // if the record passes for fails
                constraints.forEach((constr) => {
                    if(!constr(line)) satisfies = false;
                });

                // If after all the constraints are tested, the record still
                // satisfies, then that vehicle is good to include in output
                if(satisfies) {
                    vehicles.push(line);
                };
            });

            parser.on('end', () => {
                cb(vehicles);
            });

            fs.createReadStream('./vehicles.csv').pipe(parser)
        }
    }

}

module.exports = FuelEconomy;
