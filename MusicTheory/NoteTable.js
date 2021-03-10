


function makeNoteTable(equalTemperamentDifference, frequencyLayout, keyboardLayout)
{
    let noteTable = [];
    let octaveLayout = teoria.note(gStartKey).scale("chromatic").simple();

    // Sorts the imput distance by the keys so they are in the same
    //  layout as the keyboard (C for now)
    let sortedDifference = Object.keys(equalTemperamentDifference)
        .sort((note0, note1) => // Sorts the set of tone keys into the correct layout (may be different than teoria!)
            {
                note0 = octaveLayout.findIndex((element) => compareChroma(element, note0));
                note1 = octaveLayout.findIndex((element) => compareChroma(element, note1));
                return note0 - note1;
            })
        .reduce((obj, key) => // Reduces the array to the difference but centered
            {
                obj[key] = equalTemperamentDifference[key]; 
                return obj;
            }, {});

    // Calculate the system values
    for (let k = 0; k < keyboardLayout.length;)
    {
        for (let value of Object.values(sortedDifference))
        {
            noteTable[k] = frequencyLayout[k] * centsToScale(value);
            k++;
        }
    }

    for (let i = 0; i < noteTable.length; i++)
    {
        let h = teoria.note.fromFrequency(noteTable[i]);
        let b = h.note.scientific();
    }
    

            // for (let [key, value] of Object.entries(yourobject)) {
            //     console.log(key, value);
            // }
    
    // let noteTable = [];
    // // Starting frequency
    // noteTable[0] = startingFrequency;

    // now we have the sorted intervals in 3rd's
    //  no idea how YYYthis should work, I might need the other table 
    // (differences from equal temperament, just add it to the current data)
    //  

    // possible process order
    // C E, => 200[s], 200*cts[s+4]
    // E G#/Ab
    // G#/Ab C
    //  

    // let s = 0;
    // let h = wellTemperamentSystem[sample[s]];
    // noteTable[s + 4] = noteTable[s] * centsToScale(wellTemperamentSystem[sample[s]].size_in_cents);

}

function compareChroma(element, note)
{
    return teoria.note(element).chroma() === teoria.note(note).chroma();
}


function centsToScale(n)
{
    return Math.pow(2, n/1200);
}


