/**
 * main.js
 * date created: 3/9/2021
 * Author: Benjamin M'Sadoques
 *
 * Provides the starting point for the program
 */

// Global data, stores all the data needed for each data set
let gData;

/**
 * Program starting point
 */
function main()
{
    // Load all 4 files
    dataFiles = [d3.json("data/Theoretically_Correct_Priz_Well_Temperament.json"),
        d3.json("data/Theoretically_Correct_Well_Temperament_Tuned_by_Francesco_Antonio_Vallotti's_Rules.json"),
        d3.json("data/Theoretically_Correct_Well_Temperament_Tuned_by_George_Fredrick_Handel's_Rules.json"),
        d3.json("data/Well_Temperament_Tuned_by_William_Tans'ur's_Rules.json")]

    // Make the SVG
    svg = d3.select("#first_vis")
        .attr("width", layout.width)
        .attr("height", layout.height);

    // Make drop down, fill it with the current options
    let optionsNames = ["Prinz Well Temperament",
        "Francesco Antonio Vallotti's Well Temperament",
        "George Fredrick Handel's Well Temperament",
        "William Tans'ur's Well Temperament"];

    // Add all the options to the drop down
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

                // Makes the fist full vis, or any vis with the new selected index
                makeVis(0);
            });
}
