
/**
 * Makes the note table (the frequencies to use) for the vis
 * Depends on the equal temperament difference
 * @param {*} equalTemperamentDifference object that contains
 *  notes and the difference in cents between that note and equal temperament
 * @returns 
 */
function makeNoteTable(equalTemperamentDifference)
{ 
    let keyboardLayout = [];
    let equalTemperament = [];
    makeKeyboardLayout(keyboardLayout, equalTemperament);

    let noteTable = [];
    let systemFrequencies = [];
    let octaveLayout = teoria.note(keyboard.startKey).scale("chromatic").simple();

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
 * Compares the chroma between notes, helper function for sorting 
 * @param {"*"} element 
 * @param {"*"} note 
 */
function compareChroma(element, note)
{
    return teoria.note(element).chroma() === teoria.note(note).chroma();
}

/**
 * Checks if the note is in the musical key
 * @param {"*"} note 
 * @param {"*"} key 
 * @returns 
 */
function noteIsInMajorScale(note, key)
{
    // convert the note to a form teoria uses, "C0" -> "c"
    note = teoria.note(note).chroma();
    return teoria.note(key).scale("major").simple().map((e) => teoria.note(e).chroma()).includes(note);
}

/**
 * Helper function that converts cents to the scale value
 * @param {number} n in cents
 * @returns the value to scale
 */
function centsToScale(n)
{
    return Math.pow(2, n/1200);
}

/**
 * Creates the keyboard layout based on the keyboard parameters
 * Also gets the frequencies for equal temperament
 * @param {*} keyboardLayout pointer for place the keyboard layout
 * @param {*} equalTemperament pointer ro
 */
function makeKeyboardLayout(keyboardLayout, equalTemperament)
{
    for (let octave = 0; octave < keyboard.octaves; octave++)
    {
        teoria.note(keyboard.startKey + octave.toString(10))
            .scale("chromatic")
            .notes()
            .forEach((element, index) =>
            {
                let i = index + octave * keyboard.keysPerOctave;
                keyboardLayout[i] = element.scientific();
                equalTemperament[i] = element.fq(keyboard.concertPitch);
            });
    }
}

/**
 * Checks if the key type is white or black
 * @param {*} kName key name
 * @returns WHITE_KEY or BLACK_KEY
 */
function keyType(kName)
{
    let k = WHITE_KEY;
    // We assume that black keys include an accidental
    if (kName.includes("b") || kName.includes("#"))
    {
        k = BLACK_KEY;
    }
    return k;
}

/**
 * 
 * @param {*} noteString 
 * @returns 
 */
function getFirstNote(noteString)
{
    return noteString.split(" ")[0];
}

/**
 * Makes the key color values based on 
 * @param {} majorThirds 
 * @returns 
 */
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
