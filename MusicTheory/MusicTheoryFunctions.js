

function makeNoteTable(equalTemperamentDifference)
{ 
    let keyboardLayout = [];
    let equalTemperament = [];
    makeKeyboardLayout(keyboardLayout, equalTemperament);

    let noteTable = [];
    let systemFrequencies = [];
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

    // Calculate the system values using the cents and equal temprament
    for (let k = 0; k < keyboardLayout.length;)
    {
        for (let value of Object.values(sortedDifference))
        {
            systemFrequencies[k] = equalTemperament[k] * centsToScale(value);
            k++;
        }
    }

    // sew the systemFrequencies and keyboard layout together into objects to make the note table
    // makes the note table easy to work with in d3 and easy to get the frequencies
    for (let n = 0; n < systemFrequencies.length; n++)
    {
        noteTable[n] = {key: keyboardLayout[n], frequency: systemFrequencies[n]};
    }

    return noteTable;
}

/**
 * Compares the chroma of an element 
 * @param {*} element 
 * @param {*} note 
 */
function compareChroma(element, note)
{
    return teoria.note(element).chroma() === teoria.note(note).chroma();
}

function centsToScale(n)
{
    return Math.pow(2, n/1200);
}

function makeKeyboardLayout(keyboardLayout, equalTemperament)
{
    for (let octave = 0; octave < gKeyboardOctaves; octave++)
    {
        teoria.note(gStartKey + octave.toString(10))
            .scale("chromatic")
            .notes()
            .forEach((element, index) =>
             {
                let i = index + octave * gKeysPerOctave;
                keyboardLayout[i] = element.scientific();
                equalTemperament[i] = element.fq(gConcertPitch);
            });
    }
}

