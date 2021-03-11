
const width = 600;
const height = 800;

const WHITE_KEY = 0;
const BLACK_KEY = 1;

const WHITE_KEYS_PER_OCTAVE = 7;
const BLACK_KEYS_PER_OCTAVE = 5;

const layout = {topViz:{top: 10, bottom: 50, left: 10, right: 10},
    bottomVis:{top: 10, bottom: 10, left: 10, right: 10}, 
    division: height - width};

const keyboard = {blackKeys:{heightReduce: 2, widthReduce: 2}};

const keyboardColor = {K: 1}

let svg;

// The keys need access to these variables
let gNoteTable;
let gCurrentScale;

function makeVis(selectedIndex)
{      
    // Major thirds are used to create the circle vis
    let majorThirds = gData[selectedIndex]["Major_Thirds"];
                    
    // The difference is used to build the note table
    let equalTemperamentDifference = gData[selectedIndex]["Equal_Temperament_Difference"];
                        
    // Default scale starts with the first note name of the first system
    gCurrentScale = Object.keys(majorThirds)[0].split(" ")[0];
    
    // Makes the note table (the other main form of data)
    // array of objects where each is {key: 'C0', frequency: 131.256}
    gNoteTable = makeNoteTable(equalTemperamentDifference);

    svg = d3.select("#first_vis")
        .attr("width", width)
        .attr("height", height);

    // Makes the top keyboard vis, uses the global note table
    makeKeyboardVis();
    
    // Makes the bottom circle vis
    makeCircleVis(majorThirds);
}

function makeKeyboardVis()
{
    // const layout = {topViz:{top: 10, bottom: 10, left: 10, right: 10},
    // bottomVis:{top: 10, bottom: 10, left: 10, right: 10}, 
    // division: 500};

    let whiteKeyWidth = ((width - layout.topViz.left) - layout.topViz.right) / (WHITE_KEYS_PER_OCTAVE * gKeyboardOctaves);
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

    let keyColor = d3.scaleOrdinal()
        .domain([WHITE_KEY, BLACK_KEY])
        .range(["#FFFFFF", "#FFFFFF"]);

    let drawKey = (kt, n) =>
    {
        svg.append("rect")
        .attr('id', gNoteTable[n].key)
        .attr('x', keyxArray[n]) 
        .attr('y', keyy(kt))
        .attr('width', keyWidth(kt))
        .attr('height', keyHeight(kt))
        .style("stroke", "black")
        .style("stroke-width", 1)
        .style("fill", keyColor(kt))
        .on("mousedown", key_mouseDown)
        .on("mouseup", key_mouseUpOrLeave)
        .on("mouseleave", key_mouseUpOrLeave)
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
            drawKey(kt, n);
        }
    }

    // Draw black keys
    for (let n = 0; n < gNoteTable.length; n++)
    {
        let kt = keyType(gNoteTable[n].key);
        if (kt === BLACK_KEY)
        {
            drawKey(kt, n);
        }
    }

    // Draw names
}

function key_mouseOver(e)
{
    // color adjust
    this.style.fill = d3.color(this.style.fill).darker(keyboardColor.K * 0.5);
}

function key_mouseDown(e)
{
    // color adjust
    this.style.fill = d3.color(this.style.fill).darker(keyboardColor.K);

    // Play sound, use ID to get the frequency froom the note table
}

function key_mouseUpOrLeave(e)
{
    // color adjust
    this.style.fill = d3.color(this.style.fill).brighter(keyboardColor.K);

    // Stop playing or pause sound
}

function drawKey(kt, n, keyxArray)
{
    
}

function makeCircleVis(majorThirds)
{

}
