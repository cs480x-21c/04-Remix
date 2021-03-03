const fs = require('fs')

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'englandTemp1772.csv',
    header: [
        { id: 'trialNumber', title: 'TrailNumber' },
        { id: 'expected', title: 'Expected' },
        { id: 'error', title: 'Error' },
        { id: 'reportedPercent', title: 'ReportedPercent' },
        { id: 'vis', title: 'Visualization' },
    ]
});


const output = [];

fs.readFile('./cetdl1772on.dat', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const lines = data.split('\n');

    for (let line of lines) {
        console.log(line.split(' ').filter(i => i.trim().length > 0).length);
    }
})

csvWriter
    .writeRecords(output)
    .then(() => console.log('The CSV file was written successfully'));