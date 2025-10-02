import * as Tone from "tone";

// State variables
let synth: null | Tone.PolySynth = null;

/**
 * Initializes and configures the Tone.PolySynth for a piano-like sound.
 * The synth is set up with a fast attack and rapid decay to simulate a percussive instrument.
 */
export function initializeSynth() {
    if (synth === null) {
        // Initialize a PolySynth (to potentially play chords later if desired)
        synth = new Tone.PolySynth(Tone.Synth, {
            // Use 'am' (Amplitude Modulation) for a slightly richer tone than 'sine'
            oscillator: {
                type: "amsine",
                modulationType: "sawtooth",
                //modulationIndex: 3
            },
            // Configure the envelope for a quick, percussive piano-like sound
            envelope: {
                attack: 0.005,  // Very fast attack
                decay: 0.5,     // Medium decay
                sustain: 0.0,   // No sustain (key immediately fades)
                release: 0.1    // Short release
            },
        }).toDestination();
        console.log("Tone.PolySynth initialized.");
    }
}


/**
 * The core function to play middle C (C4).
 * This function first ensures the AudioContext is started.
 */
function playMiddleC() {
    // 1. Start the AudioContext (required by most browsers on user gesture)
    if (Tone.context.state !== 'running') {
        Tone.start().then(() => {
            console.log('Audio context started. Playing C4...')
            triggerNote();
        }).catch(err => {
            console.log('Error starting audio context.');
            console.error("Failed to start Tone.js context:", err);
        });
    } else {
        console.log('Playing C4...');
        triggerNote();
    }
}

/**
 * Triggers the note on the initialized synthesizer.
 */
export function triggerNote() {
    // Ensure the synth is initialized
    initializeSynth();

    // Note: "C4" is Middle C. "8n" is an eighth note duration.
    const note = "C4";
    const duration = "8n";

    // Trigger the note
    synth?.triggerAttackRelease(note, duration);

    console.log(`Played note: ${note} for duration ${duration}`);
}


export function playNote(note: string, duration: string) {
    // Trigger the note
    synth?.triggerAttackRelease(note, duration);

    console.log(`Played note: ${note} for duration ${duration}`);
}

export function playSequence(notes: (string | string[])[]) {
    const subdivision = '4n';
    // Calculate the total duration of the sequence (3 notes)
    const durationInSeconds = Tone.Time(subdivision).toSeconds();
    // Add a small buffer (e.g., 0.05s) to ensure the final note's release completes before stopping.
    const totalDuration = durationInSeconds * notes.length + 0.05;
    const sequence = new Tone.Sequence(function (time, note) {
        synth?.triggerAttackRelease(note, subdivision);
        //straight quarter notes
    }, notes, subdivision);
    sequence.loop = false;
    sequence.start(0);


    // 2. Schedule the transport to stop and update status at the end
    // We use Tone.Transport.scheduleOnce for precise timing.
    Tone.Transport.scheduleOnce((time) => {
        Tone.Transport.stop();
        Tone.Transport.position = 0; // Reset transport position for next play
        console.log('Sequence finished. Click to play again.');
        console.log("Tone.Transport stopped.");
    }, totalDuration);

    // 3. Reset the transport position and start the main transport
    Tone.Transport.position = 0;
    Tone.Transport.start();
    console.log(`Starting Transport. Total duration: ${totalDuration.toFixed(2)}s`);
}