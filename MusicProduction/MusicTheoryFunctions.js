/**
 * MusicTheoryFunctions.js
 * date created: 3/10/2021
 * Author: Benjamin M'Sadoques
 *
 * Provies all the music theory functionality needed for the project
 */

const SYNTONIC_COMMA_CENTS = 21.5069;

// A Major third becomes a wolf when altered by more than a syntonic comma
const MAJOR_THIRD_UPPER_WOLF = Math.log2(5/4)*1200 + SYNTONIC_COMMA_CENTS;
const MAJOR_THIRD_LOWER_WOLF = Math.log2(5/4)*1200 - SYNTONIC_COMMA_CENTS;

/**
 * Makes the note table (the frequencies to use) for the vis
 * Depends on the equal temperament difference
 * @param {*} equalTemperamentDifference object that contains
 *  notes and the difference in cents between that note and equal temperament
 * @returns the now global note table
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
                note0 = octaveLayout.findIndex((element) => teoria.note(element).chroma() === teoria.note(note0).chroma());
                note1 = octaveLayout.findIndex((element) => teoria.note(element).chroma() === teoria.note(note1).chroma());
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
 * Checks if the note is in the musical key
 * @param {"*"} note to check
 * @param {"*"} key to check against
 * @returns true if the note is in the major scale of the key
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
 * @param {*} keyboardLayout pointer for the keyboard layout
 * @param {*} equalTemperament pointer for equal temperament 
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
function getKeyType(kName)
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
 * Gets the note from string
 * @param {*} noteString note string such as 'C E'
 * @returns the note string for the index number
 */
function getNoteString(noteString, number)
{
    return noteString.split(" ")[number];
}

/**
 * Makes the key color values based on the major third spacing
 * @param {} majorThirds global major thirds to use to make the colors
 * @returns the global color array used for coloring everything
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
        let entry0 = getNoteString(entry[0], 0);
        let entry1 = spacingScale(entry[1].size_in_cents);
        return [entry0, entry1];
    })
    
    // Convert entries back to object form
    return Object.fromEntries(spacingArray);
}

/**
 * Updates the current well temperament
 * Maintains that the major thirds do not become wolf tones
 * @param {*} inputValue 
 * @param {*} inputId 
 * @param {*} scale 
 * @param {*} firstNote 
 * @param {*} secondNote 
 * @param {*} previousValue 
 */
function updateWellTemperament(inputValue, inputId, scale, firstNote, secondNote, previousValue)
{
    // Try to Update the next Major 3rd spacing above the current spacing
    // There's a chance this spacing may break the system (create a wolf interval), if it does, then stop the change from happening
    // This interval change is the earlist way to judge that
    let changeIsOkay = true;
    let labels = Object.keys(gMajorThirds);
    for (let i = 0; i < labels.length; i++)
    {
        // Second note is the first note of the major third
        if (teoria.note(secondNote).chroma() == teoria.note(getNoteString(labels[i], 0)).chroma())
        {
            // check if the new upper third is in bounds
            let newThirdValue = (previousValue - inputValue) + gMajorThirds[labels[i]].size_in_cents;
            if ((newThirdValue <= MAJOR_THIRD_UPPER_WOLF) && (newThirdValue >= MAJOR_THIRD_LOWER_WOLF))
            {
                // Change that major third to match what its value will be in the system
                gMajorThirds[labels[i]].size_in_cents = (previousValue - inputValue) + gMajorThirds[labels[i]].size_in_cents;
            }
            else
            {
                // This change will create a wolf interval, don't do it!
                changeIsOkay = false;
            }
            break;
        }
    }

    // We know for sure the user entered value will not create a wolf third
    if (changeIsOkay)
    {
        // Update the first major 3rd spacing to the new one
        gMajorThirds[inputId].size_in_cents = inputValue;

        // Find all the instances of the first note, all of them need to have their major 3rd changed by the scale
        for (let i = 0; i < gNoteTable.length; i++)
        {
            // Note in the table has the same name as the note to change
            if (teoria.note(gNoteTable[i].key).chroma() === teoria.note(firstNote).chroma())
            {
                try
                {
                    // try to change the major 3rd above the current one (major 3rd's are +4, so it may not exist)
                    gNoteTable[i + 4].frequency = gNoteTable[i].frequency * scale;
                }
                catch (e)
                {
                    // Change failed, but that's okay, those notes do not exist
                }
            }
        }
    }
}
