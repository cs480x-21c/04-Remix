const WHITE_KEY = 0;
const BLACK_KEY = 1;

const WHITE_KEYS_PER_OCTAVE = 7;
const BLACK_KEYS_PER_OCTAVE = 5;

const layout = {topViz:{top: 50, bottom: 10, left: 10, right: 10},
    bottomVis:{top: 30, bottom: 120, left: 60, right: 10, leftAxisText: 40, bottomAxisText: 80, bottomTickPadding: 40, 
        textBox: {yAdjust: 8, width: 80, height: 100}}, 
    division: 250, width: 1300, height: 900};

const style = {font: "bold 14px Open Sans, Helvetica, Arial, sans"}

const keyboard = {blackKeys: {heightReduce: 2, widthReduce: 2, color: "#FFFFFF"},
     K: 1, whiteKeys: {color: "#FFFFFF"}, 
     startKey: "C", octaves: 2, keysPerOctave: 12, concertPitch: 3520.0,
     text: {}};

let svg;

// Major thirds for the bottom vis
let gMajorThirds;

// Note frequencies
let gNoteTable;

// Data used to decide the color
let gCurrentKey;
let gKeyColorT;

// Sound 
let gKeyPlayer;


function makeVis(selectedIndex)
{      
    // Major thirds are used to create the circle vis
    gMajorThirds = gData[selectedIndex]["Major_Thirds"];
                    
    // The difference is used to build the note table
    let equalTemperamentDifference = gData[selectedIndex]["Equal_Temperament_Difference"];

    // Default key is the smallest spacing
    gCurrentKey = getNoteString(Object.keys(gMajorThirds)[0], 0);

    // Makes the note table (the other main form of data)
    // array of objects where each is {key: 'C0', frequency: 131.256}
    gNoteTable = makeNoteTable(equalTemperamentDifference);

    // General remake function, if we want to keep the current state
    // and not revert back to default values
    softRemakeVis();
}

function softRemakeVis()
{
    // colors need to be updated if thirds are updated
    // Creates the key color array, orders the keys from smallest to largest spacing
    gKeyColorT = makeKeyColors(gMajorThirds);

    svg.selectAll("*").remove();

    // Makes the top keyboard vis, uses the global note table
    makeKeyboardVis();
    
    // Makes the bottom vis
    makeHistogram();
}

let neutralKeyColor = d3.scaleOrdinal()
        .domain([WHITE_KEY, BLACK_KEY])
        .range([keyboard.blackKeys.color, keyboard.whiteKeys.color]);

function keyColor(key, keyType)
{   
    if (noteIsInMajorScale(key, gCurrentKey))
    {
        return d3.interpolateSpectral(gKeyColorT[gCurrentKey]);
    }
    else
    {  
        return neutralKeyColor(keyType)
    }
}

function circleColor(key)
{
    // If the key matches the current key color
    if (teoria.note(key).chroma() === teoria.note(gCurrentKey).chroma())
    {
        return d3.interpolateSpectral(gKeyColorT[gCurrentKey]);
    }
    else
    {  
        return "#F0F0F0";
    }
}

function rectangleColor(key)
{
    return d3.interpolateSpectral(gKeyColorT[key]);
}

function makeKeyboardVis()
{
    gKeyPlayer = setupKeyboardAudio();

    let whiteKeyWidth = ((layout.width - layout.topViz.left) - layout.topViz.right) / (WHITE_KEYS_PER_OCTAVE * keyboard.octaves);
    let whiteKeyHeight = ((layout.division - layout.topViz.top) - layout.topViz.bottom);
    let blackKeyAdjust = whiteKeyWidth/Math.pow(keyboard.blackKeys.widthReduce, 2);

    // The x position of each key is just calculated
    //  doin it while drawing keys is just a pain
    let keyxArray = [];
    let whiteKeyx = layout.topViz.left;
    for (let n = 0; n < gNoteTable.length; n++)
    {
        let keyType = getKeyType(gNoteTable[n].key);
        switch (keyType)
        {
            case WHITE_KEY:
                keyxArray.push(whiteKeyx)
                whiteKeyx += whiteKeyWidth;
                break;
            case BLACK_KEY:
                keyxArray.push(whiteKeyx - blackKeyAdjust);
                break;
            default:
                break;
        }
    }

    // key width: 0 is white keys, 1 is black keys
    let keyWidth = d3.scaleLinear()
        .domain([WHITE_KEY, BLACK_KEY])
        .range([whiteKeyWidth, whiteKeyWidth / keyboard.blackKeys.widthReduce]);

    // key height: 0 is white keys, 1 is black keys
    let keyHeight = d3.scaleLinear()
        .domain([WHITE_KEY, BLACK_KEY])
        .range([whiteKeyHeight, whiteKeyHeight / keyboard.blackKeys.heightReduce]);

    

    let keyText = (keyType, keyIndex) =>
    {
        let textAdjust;
        switch (keyType)
        {
            case WHITE_KEY:
                textAdjust = keyxArray[keyIndex] + (1/2 * whiteKeyWidth);
                break;
            case BLACK_KEY:
                textAdjust = keyxArray[keyIndex] + blackKeyAdjust;
                break;
            default:
                break;
        }
        return textAdjust;
    }

    let drawKey = (key, keyType, keyIndex) =>
    {
        svg.append("rect")
            .attr("id", "#" + keyIndex)
            .attr("x", keyxArray[keyIndex]) 
            .attr("y", layout.topViz.top)
            .attr("width", keyWidth(keyType))
            .attr("height", keyHeight(keyType))
            .style("stroke", "black")
            .style("stroke-width", 1)
            .style("fill", keyColor(key, keyType))
            .on("mousedown", key_mouseDown)
            .on("mouseup", key_mouseUp)
            .on("mouseleave", key_mouseLeave)
            .on("mouseenter", key_mouseOver);

        // TODO: somehow make the text non-selectable, at least it can be played
        svg.append("text")
            .attr("id", "#" + keyIndex)
            .attr("x", keyText(keyType, keyIndex))
            .attr("y", keyHeight(keyType))
            .attr("text-anchor", "middle")
            .style("font", style.font)
            .text(key)
            .on("mousedown", key_mouseDown)
            .on("mouseup", key_mouseUp)
            .on("mouseleave", key_mouseLeave)
            .on("mouseenter", key_mouseOver);
    }

    drawVisKeys(drawKey);
}

function drawVisKeys(drawKey)
{
    // Key drawing must be done white then black, becaus SVGs follow painter's algorithm
    // Draw white keys
    for (let n = 0; n < gNoteTable.length; n++)
    {
        let kt = getKeyType(gNoteTable[n].key);
        if (kt === WHITE_KEY)
        {
            drawKey(gNoteTable[n].key, kt, n);
        }
    }

    // Draw black keys
    for (let n = 0; n < gNoteTable.length; n++)
    {
        let kt = getKeyType(gNoteTable[n].key);
        if (kt === BLACK_KEY)
        {
            drawKey(gNoteTable[n].key, kt, n);
        }
    }
}

function makeHistogram()
{
    //gKeyColorT
    let sizesInCents = Object.values(gMajorThirds);
    let labels = Object.keys(gMajorThirds);

    // Special kind of scale, different kind of ordinal scale
    let xScale = d3.scaleBand()
        .domain(labels)
        .range([layout.bottomVis.left, (layout.width - layout.bottomVis.right) - layout.bottomVis.left])

    // hehe, maybe making it all on one svg was a bad idea, oh well
    // X axis
    svg.append("g")
        .attr("transform", "translate(" + 0 + "," + (layout.height - layout.bottomVis.bottom) + ")")
        .call(d3.axisBottom(xScale)
            .tickPadding(layout.bottomVis.bottomTickPadding));

    // X axis label
    svg.append("text")
        .attr("x", layout.width * 1/2)
        .attr("y", (layout.height - layout.bottomVis.bottom) + layout.bottomVis.bottomAxisText)
        .style("font", style.font)
        .text("Major Thirds");

    // y axis
    let yScale = d3.scaleLinear()
        .domain([MAJOR_THIRD_LOWER_WOLF, MAJOR_THIRD_UPPER_WOLF])
        .range([((layout.height - layout.division) - layout.bottomVis.top) - layout.bottomVis.bottom, layout.bottomVis.top]);

    // Y axis
    svg.append("g")
        .attr("transform", "translate(" + layout.bottomVis.left + "," + (layout.division + layout.bottomVis.top) + ")")
        .call(d3.axisLeft(yScale));

    // Y axis label
    svg.append("text")
        .attr("x", layout.bottomVis.left - layout.bottomVis.leftAxisText)
        .attr("y", ((layout.height - layout.division) - layout.bottomVis.top))
        .style("font", style.font)
        .text("Spacing in Cents")
        .attr("transform", "rotate(270, " + (layout.bottomVis.left - layout.bottomVis.leftAxisText) + ", "
         + ((layout.height - layout.division) - layout.bottomVis.top) + ")");


    let heightScale = d3.scaleLinear()
        .domain([MAJOR_THIRD_LOWER_WOLF, MAJOR_THIRD_UPPER_WOLF])
        .range([0, ((layout.height - layout.division) - layout.bottomVis.top) - layout.bottomVis.bottom])

    let yDataScale = d3.scaleLinear()
        .domain([407.82, 386.31371]) // , 
        .range([0, ((layout.height - layout.division) - layout.bottomVis.top) - layout.bottomVis.bottom - yScale(386.31371)])

    // Draw the text boxes, used for changing the chart
    // Also draw the (mostly invisible) circles used for selecting the key
    for (let i = 0; i < labels.length; i++)
    {
        let xPosition = xScale(labels[i])

        // Bar
        svg.append("rect")
            .attr("x", xPosition)
            .attr("y", yDataScale(sizesInCents[i].size_in_cents) + layout.division + layout.bottomVis.top)
            .attr("width", layout.bottomVis.textBox.width + 10)
            .attr("height", heightScale(sizesInCents[i].size_in_cents))
            .attr("fill", rectangleColor(getNoteString(labels[i], 0)))
        
        // Text box for edititing values
        svg.append("foreignObject")
            .attr("x", xPosition)
            .attr("y", layout.height - layout.bottomVis.bottom + layout.bottomVis.textBox.yAdjust)
            .attr("width", layout.bottomVis.textBox.width + 10)
            .attr("height", layout.bottomVis.textBox.height)
            .append("xhtml:div")
            .html("<input type='number' id='" + labels[i] + "' min=" + MAJOR_THIRD_LOWER_WOLF + " max=" + MAJOR_THIRD_UPPER_WOLF + 
            " value='" + sizesInCents[i].size_in_cents + "' placeholder='cents' style='width: " + layout.bottomVis.textBox.width +"px' onchange='changeCentsValue(this)'></input>");
        
        // Circles for selecting the key and telling the user what key is displayed
        svg.append("circle")
            .attr("id", getNoteString(labels[i], 0))
            .attr("cx", xPosition + (1/2 * layout.bottomVis.textBox.width) + 8.87) // axis offset, kinda a hard value to look up
            .attr("cy", layout.height - layout.bottomVis.bottom + layout.bottomVis.bottomTickPadding + 8.87)
            .attr("r", 16)
            .style("fill-opacity", 0)
            .style("stroke-width", 4)
            .style("stroke", circleColor(getNoteString(labels[i], 0)))
            .on("mousedown", circle_mouseClick);
    }
}


function changeCentsValue(input)
{
    let inputValue = parseFloat(input.value);
    let previousValue = parseFloat(gMajorThirds[input.id].size_in_cents);

    // Check if the value is valid (if not, nothing will be changed and the value will change back on its own)
    if ((inputValue <= MAJOR_THIRD_UPPER_WOLF) && (inputValue >= MAJOR_THIRD_LOWER_WOLF))
    {
        // Scales are just direct multiplication, easier to work with
        let scale = centsToScale(inputValue);
        let firstNote = getNoteString(input.id, 0);
        let secondNote = getNoteString(input.id, 1);

        // Tries to update well temperament
        // It will be unaltered if the user accidently creates a wolf-third
        updateWellTemperament(inputValue, input.id, scale, firstNote, secondNote, previousValue);
    }

    // Remake Vis, just easier to do that
    softRemakeVis();
}
