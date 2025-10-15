import * as Tone from "tone";
import { piano, clarinet } from "./sampler";
import { SoundConfig } from "./soundConfig";

// State variables
let synth: Tone.PolySynth = createPianoSynth();
let sampler: Tone.Sampler = piano;
let activeInstrument: Tone.PolySynth | Tone.Sampler = sampler;

let soundConfig : SoundConfig = new SoundConfig();


// An octave shift is always +12 semitones in music theory.
const SEMITONES_PER_OCTAVE = 12;
let shiftBase = SEMITONES_PER_OCTAVE;
let openingNotes : (string | null)[] = [];
let closingNotes : (string | null)[] = [];
let baseNotes : (string | null)[] = ['C5'];

/**
 * Initializes and configures the Tone.PolySynth for a piano-like sound.
 * The synth is set up with a fast attack and rapid decay to simulate a percussive instrument.
 */
function createPianoSynth() {
    // Initialize a PolySynth (to potentially play chords later if desired)
    return new Tone.PolySynth(Tone.Synth, {
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
    });
}

let instruments: { [key: string]: any } = {
    'piano': piano,
    'synth': synth,
    'clarinet': clarinet,
}

export function useSampler() {
    activeInstrument = sampler;
    activeInstrument.toDestination();
}

export function useSynth() {
    activeInstrument = synth;
    activeInstrument.toDestination();
}

// The data structure for the notes must be updated to be compatible with Tone.Part
// We will use an array of objects where each object contains a time, note, and duration.
// The time will be calculated based on the position in the original sequence.
interface NoteEvent {
    time: string; // Tone.js time format (e.g., '0:0:0', '0:0:1', '0:1:0')
    note: string | string[] | null;
    duration: string;
}

interface PartWithDuration {
    part: Tone.Part;
    duration: string;
}
let partList: PartWithDuration[] = [];

function createPartEvents(notes: (string | null)[], sixteenthsDur: number): NoteEvent[] {
    return notes.map((note, index) => {
        // Calculate the trigger time for this event in measures:beats:sixteenths format
        const time = `0:0:${index * sixteenthsDur}`;

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
            activeInstrument?.triggerAttackRelease(value.note, value.duration, time)
        }
    }, partEvents);

    let duration = sixteenthsDur * (notes.length);
    let durationString = `0:0:${duration}`;

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
        // Get rid of old list of events.
        transport.cancel();
        transport.position = 0; // Reset position for next play.
    }, elapsedTime);

    transport.start();
}

function shiftNotes(notes: (string | null)[], shiftAmount: number): (string | null)[] {
    return notes.map(note => {
        if (note === null) {
            return null;
        }

        try {
            const midi = Tone.Midi(note);
            const transposedMidi = midi.transpose(shiftAmount * shiftBase);
            return transposedMidi.toNote();
        } catch (error) {
            console.error(`Skipping invalid note string: ${note}`, error);
            return null;
        }
    });
}

export function playOpening(nestingLevel: number) {
    let notes = Array.from(soundConfig.openingNotes[nestingLevel].notes);
    notes.push(null);
    notes.push(null);
    partList.push(createPartWithDuration(notes, 1));
}

export function playClosing(nestingLevel: number) {
    let notes = Array.from(soundConfig.closingNotes[nestingLevel].notes);
    notes.push(null);
    notes.push(null);
    partList.push(createPartWithDuration(notes, 1));
}

export function playBlock(nestingLevel: number) {
    let notes = Array.from(soundConfig.basicNotes[nestingLevel].notes);
    partList.push(createPartWithDuration(notes, 4));
}

export function playBetweenStacks() {
    partList.push(createPartWithDuration([null, null], 4));

}

function updateInstrument() {
    const selector = document.getElementById('instrumentSelect') as HTMLSelectElement | null;
    const instrumentName = selector ? selector.value : 'piano';

    activeInstrument = instruments[instrumentName];
    activeInstrument.toDestination();
}

function updateShift() {
    const shiftSlider = document.getElementById('shiftSlider') as HTMLInputElement | null;
    shiftBase = parseInt(shiftSlider?.value || '12', 10);
}

// function updateNotes() {
//     const openingInput = document.getElementById('openingNotes') as HTMLInputElement | null;
//     openingNotes = parseNotesFromText(openingInput?.value || '');
//     closingNotes = [...openingNotes].reverse();
//     const baseInput = document.getElementById('baseNotes') as HTMLInputElement | null;
//     baseNotes = parseNotesFromText(baseInput?.value || 'C5');
// }
// /**
//  * Parses a raw string of text into an array of valid note strings or nulls.
//  * Drops any items that cannot be parsed as a musical note.
//  * @param {string} text - Raw input text (e.g., "C4, E4, skip, null, G5").
//  * @returns {Array<string | null>} The parsed array.
//  */
// function parseNotesFromText(text: string) {
//     // Split by comma, space, or newline, then trim whitespace, filter out empty strings
//     const parts = text.split(/[,\s\n]+/).map(part => part.trim()).filter(part => part.length > 0);

//     const parsedNotes = [];
//     for (const part of parts) {
//         // Check for explicit "null" text
//         if (part.toLowerCase() === 'null') {
//             parsedNotes.push(null);
//             continue;
//         }

//         try {
//             // Use Tone.Midi constructor to attempt validation
//             // @ts-ignore The Tone.Midi constructor comes from the external Tone.js library.
//             const midi = new Tone.Midi(part);

//             // A successful construction and a pitch within the usable MIDI range (0-127) is considered valid.
//             const midiValue = midi.toMidi();

//             if (midiValue >= 0 && midiValue <= 127) {
//                 // Push the cleaned, original note string for Sampler/Synth use
//                 parsedNotes.push(part);
//             } else {
//                 // Parsed but out of standard range (e.g., 'C-10')
//                 parsedNotes.push(null);
//             }
//         } catch (error) {
//             // Invalid note string (e.g., 'skip', 'x4')
//             parsedNotes.push(null);
//         }
//     }
//     return parsedNotes;
// }

export function playProgram(programText: string) {
    updateInstrument();
    activeInstrument.toDestination();


    soundConfig.updateTempo();
    soundConfig.updateNotes();

    updateShift();
    partList = [];
    // Shoves items into the parts list.
    eval(programText);
    playPartsFromList();
}