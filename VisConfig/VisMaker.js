


function makeVis(majorThirds, equalTemperamentDifference, currentScale)
{
    // Makes the perament vis part
    // TODO: something with d3 right here



    // Making keybord layout
    let keyboardLayout = [];
    let equalTemperament = [];
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

    // Updates the vis for a new system
    updateVisSystem(majorThirds, equalTemperamentDifference, currentScale, equalTemperament, keyboardLayout);
};

function updateVisSystem(majorThirds, equalTemperamentDifference, currentScale, equalTemperament, keyboardLayout)
{        
    // Makes the note table
    // TODO: make this work 
    let noteTable = makeNoteTable(equalTemperamentDifference, equalTemperament, keyboardLayout);

    

    // Global (on-click will update, then check)
                // Well Temperament System
                // Current Scale

                // Top Vis
                // 1. keyboard layout
                // 2. Scale Layout <- Current Scale (hilight notes)
                // 3. Frequencies <- Well Temperament System
                // 4. Play sounds && make key darker <- onclick | keypress | scale player

                // Bottom Vis
                // 1. Circle layout
                // 2. 

    updateVisScale(currentScale);
}

function updateVisScale(currentScale)
{

}