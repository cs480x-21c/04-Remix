const fs = require('fs')

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'englandTemp1772.csv',
    header: [
        { id: 'date', title: 'date' },
        { id: 'value', title: 'value' }
    ]
});


function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

let output = [];

fs.readFile('./cetdl1772on.dat', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const lines = data.split('\n');

    for (let line of lines) {
        const items = line.split(' ').filter(i => i.trim().length > 0)

        for (let i = 2; i < items.length; i++) {
            if (items[i] !== '-999') {
                var dt = new Date(items[0], i - 1, items[1]);
                output.push({
                    date: formatDate(dt),
                    d: dt,
                    value: items[i]
                });
            }
        }
    }

    output.sort((dateA, dateB) => {
        if (dateA.d < dateB.d) return -1;
        if (dateA.d > dateB.d) return 1;
        return 0;
    });

    csvWriter
        .writeRecords(output)
        .then(() => console.log('The CSV file was written successfully'));
})