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
// New section for using Part instead of Sequence.

// The data structure for the notes must be updated to be compatible with Tone.Part
// We will use an array of objects where each object contains a time, note, and duration.
// The time will be calculated based on the position in the original sequence.
interface NoteEvent {
    time: string; // Tone.js time format (e.g., '0:0:0', '0:0:1', '0:1:0')
    note: string | string[] | null;
    duration: string; // Optional duration for the note
}

interface PartWithDuration {
 part: Tone.Part;
 duration: string; 
}
let partList: PartWithDuration[] = [];

function createPartEvents(notes: (string | null)[], sixteenthsDur: number): NoteEvent[] {
    // 1. Convert the array of notes/chords into an array of NoteEvent objects
    return notes.map((note, index) => {
        // Calculate the 'time' for this event in measures:beats:sixteenths format
        const time = `0:0:${index * sixteenthsDur}`; // Time is in 'measure:beat:sixteenth' format.

        return {
            time: time,
            note: note,
            duration: `0:0:${sixteenthsDur}`
        };
    });
}

function createPartWithDuration(notes: (string | null)[], sixteenthsDur: number): { part: Tone.Part, duration: string } {
    const partEvents = createPartEvents(notes, sixteenthsDur);
    // The callback function fires for each event in the 'partEvents' array
    const part = new Tone.Part<NoteEvent>((time, value) => {
        if (value.note) {
            synth?.triggerAttackRelease(value.note, value.duration, time)
        }
    }, partEvents);

    let duration = sixteenthsDur * (notes.length);
    let durationString = `0:0:${duration}`;
    console.log('duration was ' + duration);

    return { part, duration: durationString };
}

function playPartsFromList() {
    const transport = Tone.getTransport();

    let elapsedTime = 0;
    partList.forEach((item) => {
        const part = item.part;
        part.loop = false;
        part.start(elapsedTime);
        elapsedTime = elapsedTime + Tone.Time(item.duration).toSeconds();
    });

    transport.scheduleOnce(() => {
        transport.stop();
        transport.position = 0; // Reset position for next play.
        console.log('Arpeggio finished.');
    }, elapsedTime);

    transport.start();
}

function createOpening(nestingLevel: number) {
    let notes = ['C4', 'E4', 'G4', 'C5', null];
    // Duration of each note, in sixteenths.
    const sixteenthsDuration = 1;
    partList = [];

    partList.push(createPartWithDuration(notes, sixteenthsDuration));
    let downNotes = notes.reverse();
    partList.push(createPartWithDuration(downNotes, sixteenthsDuration));

}

//

let sequence: (string | (string | null)[])[] = [];
export function playOpening(nestingLevel: number) {
    let notes = [];
    if (nestingLevel == 0) {
        notes = ['C4', 'E4', 'G4', 'C5', null, null];
    } else if (nestingLevel == 1) {
        notes = ['D4', 'F4', 'B4', 'D5', null, null];
    } else {
        notes = ['A2'];
    }
    partList.push(createPartWithDuration(notes, 1));
}

export function playClosing(nestingLevel: number) {
    let notes = [];
    if (nestingLevel == 0) {
        notes = ['C5', 'G4', 'E4', 'C4', null, null];
    } else if (nestingLevel == 1) {
        notes = ['D5', 'B4', 'F4', 'D4', null, null];
    } else {
        notes = ['A2'];
    }
    partList.push(createPartWithDuration(notes, 1));
}

export function playBlock(nestingLevel: number) {
    let notes = [];
    if (nestingLevel == 0) {
        notes.push('C5');
    } else if (nestingLevel == 1) {
        notes.push('C6');
    } else {
        notes.push('C7');
    }
    partList.push(createPartWithDuration(notes, 4));
}

export function playBetweenStacks() {
    partList.push(createPartWithDuration(['C2'], 4));
}

export function playProgram(programText: string) {
    initializeSynth();
    const slider = document.getElementById('tempoSlider') as HTMLInputElement | null;
    const tempo = slider ? parseInt(slider.value) : 150;
    Tone.getTransport().bpm.value = tempo;
    sequence = [];
    partList = [];
    eval(programText);
    //playSequence(sequence, tempo);
    //createOpening(0);
    playPartsFromList();
}