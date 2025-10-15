import * as Tone from "tone";

export type Note = string | null;

/**
 * Parses a raw string of text into an array of valid note strings or nulls.
 * Drops any items that cannot be parsed as a musical note.
 */
export function parseNotesFromText(text: string) : Note[] {
    // Split by comma, space, or newline, then trim whitespace,
    // filter out empty strings
    const parts = text.split(/[,\s\n]+/).map(part => part.trim()).filter(part => part.length > 0);

    const parsedNotes = [];
    for (const part of parts) {
        // Check for explicit "null" text
        if (part.toLowerCase() === 'null') {
            parsedNotes.push(null);
            continue;
        }

        try {
            // Use Tone.Midi constructor to attempt validation
            // @ts-ignore The Tone.Midi constructor comes from the external 
            // Tone.js library.
            const midi = new Tone.Midi(part);

            // A successful construction and a pitch within the usable MIDI 
            // range (0-127) is considered valid.
            const midiValue = midi.toMidi();

            if (midiValue >= 0 && midiValue <= 127) {
                // Push the cleaned, original note string for Sampler/Synth use
                parsedNotes.push(part);
            } else {
                // Parsed but out of standard range (e.g., 'C-10')
                parsedNotes.push(null);
            }
        } catch (error) {
            // Invalid note string (e.g., 'skip', 'x4')
            parsedNotes.push(null);
        }
    }
    return parsedNotes;
}


// An octave shift is always +12 semitones in music theory.
const SEMITONES_PER_OCTAVE = 12;
let shiftBase = SEMITONES_PER_OCTAVE;

export function shiftNotes(notes: Note[], shiftAmount: number): Note[] {
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
