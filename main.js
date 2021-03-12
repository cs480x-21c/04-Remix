let gData;

let gStartKey = "C";
let gKeyboardOctaves = 2;
let gKeysPerOctave = 12;
let gConcertPitch = 3520.0;

function main()
{
    // Load all 3 files
    dataFiles = [d3.json("data/Theoretically_Correct_Priz_Well_Temperament.json"),
        d3.json("data/Theoretically_Correct_Well_Temperament_Tuned_by_Francesco_Antonio_Vallotti's_Rules.json"),
        d3.json("data/Theoretically_Correct_Well_Temperament_Tuned_by_George_Fredrick_Handel's_Rules.json"),
        d3.json("data/Well_Temperament_Tuned_by_William_Tans'ur's_Rules.json")]

    // Make drop down, fill it with the current options
    let optionsNames = ["Prinz Well Temperament",
        "Francesco Antonio Vallotti's Well Temperament",
        "George Fredrick Handel's Well Temperament",
        "William Tans'ur's Well Temperament"];

    for (let i = 0; i < optionsNames.length; i++)
    {
        let option = document.createElement("option");
        option.text = optionsNames[i];
        document.getElementById("selectSystem").add(option);
    }

    Promise.all(dataFiles)
        .then((values) =>
            {
                // Each data set
                gData = values;

                // Makes the fist full vis
                makeVis(0);
            });
}
