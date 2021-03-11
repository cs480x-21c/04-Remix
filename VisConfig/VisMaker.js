
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

function makeVis(majorThirds, equalTemperamentDifference)
{        
    // Makes the note table (the other main form of data)
    // array of objects where each is {key: 'C0', frequency: 131.256}
    let noteTable = makeNoteTable(equalTemperamentDifference);

    // TODO: clear svg
    svg = d3.select("#first_vis")
        .attr("width", width)
        .attr("height", height);


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

    let whiteKeyWidth = ((width - layout.topViz.left) - layout.topViz.right) / ((WHITE_KEYS_PER_OCTAVE * gKeyboardOctaves) + 1);
    let whiteKeyHeight = ((layout.division - layout.topViz.top) - layout.topViz.bottom);
    let blackKeyAdjust = whiteKeyWidth/Math.pow(keyboard.blackKeys.widthReduce, 2);

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


    // The x position of each key is just calculated
    //  doin it while drawing keys is just a pain
    let keyxArray = [];
    let whiteKeyx = layout.topViz.left;
    for (let n = 0; n < noteTable.length; n++)
    {
        let kt = keyType(noteTable[n].key);
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
    
    keyx = (k) => { return ; };
    
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
        .range(["#FFFFFF", "#404040"]);

    let drawKey = (kt, n) =>
    {
        svg.append("rect")
            .attr('id', noteTable[n].key)
            .attr('x', keyxArray[n]) 
            .attr('y', keyy(kt))
            .attr('width', keyWidth(kt))
            .attr('height', keyHeight(kt))
            .style("stroke", "black")
            .style("stroke-width", 1)
            .style("fill", keyColor(kt))
            .on("mousedown", function (e) 
            {
                let k = keyboardColor.K;
                if (keyType(this.id) === BLACK_KEY)
                {
                    k + 2;
                }

                // color adjust
                this.style.fill = d3.color(this.style.fill).darker(k);

                // Play sound
            })
            .on("mouseup", function(e)
            {
                let k = keyboardColor.K;
                if (keyType(this.id) === BLACK_KEY)
                {
                    k - 2;
                }

                // color adjust
                this.style.fill = d3.color(this.style.fill).brighter(k);

                // Play sound
            });
    }

    // 

    // Key drawing must be done white then black, since black keys are on top
    // Draw white keys
    for (let n = 0; n < noteTable.length; n++)
    {
        let kt = keyType(noteTable[n].key);
        if (kt === WHITE_KEY)
        {
            drawKey(kt, n);
        }
    }

    // Draw black keys
    previousWhiteKeyx = layout.topViz.left; // used to judge where black keys should be
    for (let n = 0; n < noteTable.length; n++)
    {
        let kt = keyType(noteTable[n].key);
        if (kt === BLACK_KEY)
        {
            drawKey(kt, n);
        }
    }

    // Draw names
}

function makeCircleVis(majorThirds)
{

}
