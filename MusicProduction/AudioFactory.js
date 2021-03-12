

function setupKeyboardAudio()
{
    let env = {attack: 0.01, decay: 0.005, sustain: 0.2, hold: -1, release: 0.3};

    var sine = new Wad({source : 'sine' , env});
    var square = new Wad({source : 'square', env});
    var sawtooth = new Wad({source : 'sawtooth' , env});
    var triangle = new Wad({source : 'triangle', env});

    let waveform = new Wad.Poly({
        filter  : [{
            type      : 'bandpass',
            frequency : 600,
            q         : 3
        }]
    });
    waveform.add(sine).add(sawtooth);

    let waveform2 = new Wad.Poly({
        filter  : [{
            type      : 'bandpass',
            frequency : 1000,
            q         : 3
        }]
    });
    waveform2.add(sawtooth).add(square);

    let waveform3 = new Wad.Poly({
        filter  : [{
            type      : 'lowpass',
            frequency : 1200,
            q         : 3
        }]
    });
    waveform3.add(triangle);
    
    // TODO: adjust filtering to get rid of audio conflicting
    keyPlayer = new Wad.Poly({
        filter  : [{
            type      : 'bandpass',
            frequency : 700,
            q         : 3
        }]
    });

    let compressor = new Wad.Poly({
        compressor : {
            attack    : .003, // The amount of time, in seconds, to reduce the gain by 10dB. This parameter ranges from 0 to 1.
            knee      : 40,   // A decibel value representing the range above the threshold where the curve smoothly transitions to the "ratio" portion. This parameter ranges from 0 to 40.
            ratio     : 16,   // The amount of dB change in input for a 1 dB change in output. This parameter ranges from 1 to 20.
            release   : .25,  // The amount of time (in seconds) to increase the gain by 10dB. This parameter ranges from 0 to 1.
            threshold : -70  // The decibel value above which the compression will start taking effect. This parameter ranges from -100 to 0.
        }})

    keyPlayer.add(compressor).add(waveform).add(waveform2).add(waveform3);
    return keyPlayer;
}

function playPitch(frequency)
{
    gKeyPlayer.wads[1].play({ pitch : frequency, label : "p1"});
    gKeyPlayer.wads[2].play({ pitch : frequency * 2, label : "p1"});
    gKeyPlayer.wads[3].play({ pitch : frequency * 8, label : "p1"});
    gKeyPlayer.setVolume(1, "p1");
}