
const width = 500;
const height = 800;

const WHITE_KEY = 0;
const BLACK_KEY = 1;

const WHITE_KEYS_PER_OCTAVE = 7;
const BLACK_KEYS_PER_OCTAVE = 5;

const layout = {topViz:{top: 10, bottom: 10, left: 10, right: 10},
    bottomVis:{top: 10, bottom: 10, left: 10, right: 10}, 
    division: width};

const keyboard = {blackKeys:{heightReduce: 2, widthReduce: 2}};

const svg = d3.select("#first_vis")
                .attr("width", width)
                .attr("height", height);

function makeVis(majorThirds, equalTemperamentDifference)
{        
    // Makes the note table (the other main form of data)
    // array of objects where each is {key: 'C0', frequency: 131.256}
    let noteTable = makeNoteTable(equalTemperamentDifference);

    // TODO: clear svg

    // Makes the top keyboard vis
    makeKeyboardVis(noteTable);
    
    // Makes the bottom circle vis
    makeCircleVis(majorThirds);
}

function makeKeyboardVis(noteTable)
{
    // const layout = {topViz:{top: 10, bottom: 10, left: 10, right: 10},
    // bottomVis:{top: 10, bottom: 10, left: 10, right: 10}, 
    // division: 500};

    let whiteKeyWidth = ((layout.topViz.left + width) - layout.topViz.right) / noteTable.length;
    let whiteKeyHeight = layout.division - layout.topViz.top - layout.topViz.bottom;
    let blackKeyReducedProportional = whiteKeyWidth * (1 - 1/keyboard.blackKeys.widthReduce);

    // key x white coordinate, based on the placement
    let keyxw = d3.scaleLinear()
        .domain([0, WHITE_KEYS_PER_OCTAVE * gKeyboardOctaves])
        .range([layout.topViz.left, (layout.topViz.left + width) - layout.topViz.right]);

    // Key x black placement
    let keyxb = d3.scaleLinear()
        .domain([0, BLACK_KEYS_PER_OCTAVE * gKeyboardOctaves])
        .range([layout.topViz.left + blackKeyReducedProportional,
            ((layout.topViz.left + width) - layout.topViz.right) - blackKeyReducedProportional]);

    let keyx = (k, keyIndex) =>
    {
        let keyxs;
        switch (k)
        {
            case WHITE_KEY:
                keyxs = keyxw(keyIndex);
                break;
            case BLACK_KEY:
                keyxs = keyxb(keyIndex);
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

    // Gets the key type from the key name: 0 is white keys, 1 is black keys
    let keyType = (kName) => 
    {
        let k = 0;
        // We assume that black keys include an accidental
        if (kName.includes("b") || kName.includes("#"))
        {
            k = 1;
        }
        return k;
    }

    
}

function makeCircleVis(majorThirds)
{

}
