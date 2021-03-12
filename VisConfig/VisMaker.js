
const width = 700;
const height = 900;

const WHITE_KEY = 0;
const BLACK_KEY = 1;

const WHITE_KEYS_PER_OCTAVE = 7;
const BLACK_KEYS_PER_OCTAVE = 5;

const layout = {topViz:{top: 10, bottom: 10, left: 10, right: 10},
    bottomVis:{top: 10, bottom: 10, left: 10, right: 10}, 
    division: height - width};

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
    
    // Creates the key color array, orders the keys from smallest to largest spacing
    gKeyColorT = makeKeyColors(gMajorThirds);

    // Default key is the smallest spacing
    gCurrentKey = Object.keys(gKeyColorT)[0];

    // Makes the note table (the other main form of data)
    // array of objects where each is {key: 'C0', frequency: 131.256}
    gNoteTable = makeNoteTable(equalTemperamentDifference);

    svg = d3.select("#first_vis")
        .attr("width", width)
        .attr("height", height);

    // Makes the top keyboard vis, uses the global note table
    makeKeyboardVis();
    
    // Makes the bottom circle vis
    makeCircleVis();
}

function resetAndMakeVis()
{

}

function makeKeyboardVis()
{
    gKeyPlayer = setupKeyboardAudio();

    let whiteKeyWidth = ((width - layout.topViz.left) - layout.topViz.right) / (WHITE_KEYS_PER_OCTAVE * keyboard.octaves);
    let whiteKeyHeight = ((layout.division - layout.topViz.top) - layout.topViz.bottom);
    let blackKeyAdjust = whiteKeyWidth/Math.pow(keyboard.blackKeys.widthReduce, 2);

    // The x position of each key is just calculated
    //  doin it while drawing keys is just a pain
    let keyxArray = [];
    let whiteKeyx = layout.topViz.left;
    for (let n = 0; n < gNoteTable.length; n++)
    {
        let kt = keyType(gNoteTable[n].key);
        switch (kt)
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

    // Key y coordinate, always the same value
    let keyy = (k) => {return layout.topViz.top};

    // key width: 0 is white keys, 1 is black keys
    let keyWidth = d3.scaleLinear()
        .domain([WHITE_KEY, BLACK_KEY])
        .range([whiteKeyWidth, whiteKeyWidth / keyboard.blackKeys.widthReduce]);

    // key height: 0 is white keys, 1 is black keys
    let keyHeight = d3.scaleLinear()
        .domain([WHITE_KEY, BLACK_KEY])
        .range([whiteKeyHeight, whiteKeyHeight / keyboard.blackKeys.heightReduce]);

    let neutralKeyColor = d3.scaleOrdinal()
        .domain([WHITE_KEY, BLACK_KEY])
        .range([keyboard.blackKeys.color, keyboard.whiteKeys.color]);

    let keyColor = (key, keyType) =>
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

    let drawKey = (key, keyType, keyIndex) =>
    {
        svg.append("rect")
            .attr("id", "#" + keyIndex)
            .attr("x", keyxArray[keyIndex]) 
            .attr("y", keyy(keyType))
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
            .attr("x", keyxArray[keyIndex])
            .attr("y", keyHeight(keyType))
            .style("font", "font: italic 13px sans-serif")
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
        let kt = keyType(gNoteTable[n].key);
        if (kt === WHITE_KEY)
        {
            drawKey(gNoteTable[n].key, kt, n);
        }
    }

    // Draw black keys
    for (let n = 0; n < gNoteTable.length; n++)
    {
        let kt = keyType(gNoteTable[n].key);
        if (kt === BLACK_KEY)
        {
            drawKey(gNoteTable[n].key, kt, n);
        }
    }

    // Draw names
}

function makeCircleVis(majorThirds)
{

}
