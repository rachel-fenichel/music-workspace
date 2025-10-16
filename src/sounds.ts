import * as Tone from "tone";
import { piano, clarinet } from "./sampler";
import { SoundConfig } from "./soundConfig";
import { SoundEffect } from "./SoundEffect";

// State variables
let synth: Tone.PolySynth = createPianoSynth();
let sampler: Tone.Sampler = piano;
let activeInstrument: Tone.PolySynth | Tone.Sampler = sampler;

let soundConfig: SoundConfig = new SoundConfig();
let isPlaying = false;

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

function createPartWithDuration(effect: SoundEffect): { part: Tone.Part, duration: string } {
    const partEvents = effect.toPartEvents();
    // The callback function fires for each event in the 'partEvents' array
    const part = new Tone.Part<NoteEvent>((time, value) => {
        if (value.note) {
            activeInstrument?.triggerAttackRelease(value.note, value.duration, time)
        }
    }, partEvents);
    return { part, duration: effect.getDurationString() };
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

export function playOpening(nestingLevel: number) {
    partList.push(
        createPartWithDuration(soundConfig.getEffect('opening', nestingLevel)));
}

export function playClosing(nestingLevel: number) {
    partList.push(
        createPartWithDuration(soundConfig.getEffect('closing', nestingLevel)));
}

export function playBlock(nestingLevel: number) {
    partList.push(
        createPartWithDuration(soundConfig.getEffect('basic', nestingLevel)));
}

export function playBetweenStacks() {
    // TODO: implement.
}

function updateInstrument() {
    const selector = document.getElementById('instrumentSelect') as HTMLSelectElement | null;
    const instrumentName = selector ? selector.value : 'piano';

    activeInstrument = instruments[instrumentName];
    activeInstrument.toDestination();
}

export function cancelPlay() {
    let transport = Tone.getTransport();
    transport.stop();
    // Get rid of old list of events.
    transport.cancel();
    transport.position = 0; // Reset position for next play.
}

export function playProgram() {
    const codeDiv = document.getElementById('generatedCode')?.firstChild;
    let programText = codeDiv?.textContent || '';

    cancelPlay();
    updateInstrument();
    activeInstrument.toDestination();

    soundConfig.updateTempo();
    soundConfig.updateNotes();

    partList = [];

    // Shoves items into the parts list.
    eval(programText);
    playPartsFromList();
}

/**
 * Toggles the playback state, calls the appropriate sound function,
 * and updates the button's text and appearance.
 */
export function togglePlayback() {
    const button = document.getElementById('playback-button') as HTMLElement;
    const icon = document.getElementById('playback-icon') as HTMLElement;
    const text = document.getElementById('playback-text') as HTMLElement;


    if (!isPlaying) {
        // Transition to PLAYING (Stop state)
        playProgram();
        button.classList.add('playing');
        icon.textContent = '■'; // Unicode for Stop block
        text.textContent = 'Stop';
    } else {
        // Transition to STOPPED (Play state)
        cancelPlay();
        button.classList.remove('playing');
        icon.textContent = '▶'; // Unicode for Play triangle
        text.textContent = 'Play';
    }
    isPlaying = !isPlaying;
}