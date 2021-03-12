/**
 * Keyboard mouse over control
 * Makes the color darker by 1/2 k
 * @param {event} e mouse event
 */
function key_mouseOver(e)
{
    try
    {
        // color adjust
        this.style.fill = d3.color(this.style.fill).darker(keyboard.K * 0.5);
    }
    catch (e) {} // doesn't apply to keys
}

/**
 * Keyboard mouse down control
 * Makes the color darker by k
 * @param {event} e mouse event
 */
function key_mouseDown(e)
{
    try
    {
        // color adjust
        this.style.fill = d3.color(this.style.fill).darker(keyboard.K);
    }
    catch (e) {} // doesn't apply to keys

    // Play sound, use ID to get the frequency froom the note table
    playPitch(gNoteTable[this.id.split("#")[1]].frequency);
}

/**
 * Keyboard mouse leave control
 * Makes the color brighter by 1/2 k
 * @param {event} e mouse event
 */
function key_mouseLeave(e)
{
    try
    {
        // color adjust
        this.style.fill = d3.color(this.style.fill).brighter(keyboard.K * 0.5);
    }
    catch (e) {} // doesn't apply to keys
}

/**
 * Keyboard mouse up control
 * Makes the color brighter by k
 * @param {event} e mouse event
 */
function key_mouseUp(e)
{
    // color adjust
    try
    {
        this.style.fill = d3.color(this.style.fill).brighter(keyboard.K);
    }
    catch(e) {} // doesn't apply to keys
    
    // Stop playing
    // CTRL key is a sustain
    if (!e.ctrlKey)
    {
        gKeyPlayer.stop("p1");
    }
}

/**
 * Register window controls
 */
window.addEventListener("keyup", window_keyup);

/**
 * Stops the systain when the control key is unpressed anywhere
 * @param {event} e keyboard event
 */
function window_keyup(e)
{
    // Stop playing
    // CTRL key is a sustain, kept while leaving keys
    if (e.key = "ctrl")
    {
        gKeyPlayer.stop("p1");
    }
}