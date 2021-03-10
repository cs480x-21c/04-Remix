let gData;

let gStartKey = "C";
let gKeyboardOctaves = 2;
let gKeysPerOctave = 12;
let gConcertPitch = 3520.0;

let gCurrentScale;

function main()
{
    // Load all 3 files
    dataFiles = [d3.json("data/Theoretically_Correct_Well_Temperament_Tuned_by_Francesco_Antonio_Vallotti's_Rules.json"),
        d3.json("data/Theoretically_Correct_Well_Temperament_Tuned_by_George_Fredrick_Handel's_Rules.json"),
        d3.json("data/Well_Temperament_Tuned_by_William_Tans'ur's_Rules.json")]

    Promise.all(dataFiles)
        .then((values) =>
            {
                // Each data set
                gData = values;

                // Major thirds are used to create the circle vis
                let majorThirds = gData[0]["Major_Thirds"];
                
                // The difference is used to build the note table
                let equalTemperamentDifference = gData[0]["Equal_Temperament_Difference"];
                
                // Default scale starts with the first note name of the first system
                gCurrentScale = Object.keys(majorThirds)[0].split(" ")[0];

                // Makes the fist full vis
                makeVis(majorThirds, equalTemperamentDifference);
            });
}
