

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

function noteIsInMajorScale(note, key)
{
    // convert the note to a form teoria uses, "C0" -> "c"
    note = teoria.note(note).chroma();
    return teoria.note(key).scale("major").simple().map((e) => teoria.note(e).chroma()).includes(note);
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

function keyType(kName)
{
    let k = 0;
        // We assume that black keys include an accidental
        if (kName.includes("b") || kName.includes("#"))
        {
            k = 1;
        }
        return k;
}

function getFirstNote(noteString)
{
    return noteString.split(" ")[0];
}

function makeKeyColors(majorThirds)
{
    // Sorts by the spacing in cents
    // An array of entries is just easier to work with in sorting/mapping
    let spacingArray = Object.entries(majorThirds)
        .sort((note0, note1) => 
            {
                return note0[1].size_in_cents - note1[1].size_in_cents;
            })

    // Map the spacing from the current spacing to a vaue between 0 and 1
    // 0 to 1 is good for spectural color data
    let spacingScale = d3.scaleLinear()
        .domain([spacingArray[0][1].size_in_cents, spacingArray[spacingArray.length - 1][1].size_in_cents])
        .range([0.0, 1.0]);

    // First part is mapped to the key name (removes the third part)
    // second part is mapped using the linear scale
    spacingArray = spacingArray.map((entry) =>
    {
        let entry0 = getFirstNote(entry[0]);
        let entry1 = spacingScale(entry[1].size_in_cents);
        return [entry0, entry1];
    })
    
    // Convert entries back to object form
    return Object.fromEntries(spacingArray);
}
