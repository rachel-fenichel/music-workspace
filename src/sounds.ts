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

export function playSequence(notes: (string | (string | null)[])[], tempo: number) {
    Tone.getTransport().bpm.value = tempo;

    const subdivision = '2n';
    const durationInSeconds = Tone.Time(subdivision).toSeconds();
    // Add a small buffer (e.g., 0.05s) to ensure the final note's release completes before stopping.
    const totalDuration = durationInSeconds * notes.length + 0.05;
    const sequence = new Tone.Sequence(function (time, note) {
        if (note) {
            synth?.triggerAttackRelease(note, '4n', time);
        }
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