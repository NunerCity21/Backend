// const csv = require('csv-parser');
// const fs = require('fs');

// fs.createReadStream('data/languages.csv')
//     .pipe(csv())
//     .on('data', (row) => {
//         if (row.language === 'French') {
//             console.log(row);
//         }
//     })
//     .on('end', () => {
//         console.log('Ta Da!');
//     });
// // node_modules doesnt install


const fs = require('fs');
const csv = require('csv-parser');

const inputFile = 'usedCars.csv';
const outputFile = '2012PlusUsedCars.csv';
const targetYear = 2010;

let matchedCount = 0;
let notMatchedCount = 0;

const matchedCars = [];

fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', (row) => {
    const year = parseInt(row.year);
    if (year >= targetYear) {
      matchedCars.push(row);
      matchedCount++;
    } else {
      notMatchedCount++;
    }
  })
  .on('end', () => {
    console.log(`Finished parsing input file: ${inputFile}`);
    console.log(`Matched count = ${matchedCount}. Not matched count = ${notMatchedCount}. Total count = ${matchedCount + notMatchedCount}`);

    fs.writeFile(outputFile, '', (err) => {
      if (err) throw err;
      console.log(`Report file: ${outputFile}.`);

      // Writing matched cars to the output file
      fs.appendFileSync(outputFile, 'id,first_name,last_name,email,gender,title,make,model,color,year\n');
      matchedCars.forEach((car) => {
        const carString = `${car.id},${car.first_name},${car.last_name},${car.email},${car.gender},${car.title},${car.make},${car.model},${car.color},${car.year}\n`;
        fs.appendFileSync(outputFile, carString);
      });

      console.log(`Used car file:\n${matchedCars.slice(0, 5).map(car => Object.values(car).join(',')).join('\n')}\nETC`);
    });
  });
