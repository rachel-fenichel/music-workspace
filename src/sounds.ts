import * as Tone from "tone";
import { piano, clarinet } from "./sampler";

// State variables
let synth: Tone.PolySynth = createPianoSynth();
let sampler: Tone.Sampler = piano;
let activeInstrument: Tone.PolySynth | Tone.Sampler = sampler;

// An octave shift is always +12 semitones in music theory.
const SEMITONES_PER_OCTAVE = 12;
let shiftBase = SEMITONES_PER_OCTAVE;

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
    let baseNotes = ['C4', 'E4', 'G4', 'C5', null, null];
    let notes = shiftNotes(baseNotes, nestingLevel);
    partList.push(createPartWithDuration(notes, 1));
}

export function playClosing(nestingLevel: number) {
    let notes = ['C5', 'G4', 'E4', 'C4', null, null];
    notes = shiftNotes(notes, nestingLevel);
    partList.push(createPartWithDuration(notes, 1));
}

export function playBlock(nestingLevel: number) {
    let notes: (string | null)[] = ['C5'];
    notes = shiftNotes(notes, nestingLevel);
    partList.push(createPartWithDuration(notes, 4));
}

export function playBetweenStacks() {
    partList.push(createPartWithDuration(['C2', 'E2'], 4));
}

function updateTempo() {
    const slider = document.getElementById('tempoSlider') as HTMLInputElement | null;
    const tempo = slider ? parseInt(slider.value) : 150;
    Tone.getTransport().bpm.value = tempo;
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

export function playProgram(programText: string) {
    activeInstrument.toDestination();
    updateTempo();
    updateInstrument();
    updateShift();
    partList = [];
    // Shoves items into the parts list.
    eval(programText);
    playPartsFromList();
}