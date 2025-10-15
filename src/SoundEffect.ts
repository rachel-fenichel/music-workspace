import * as Tone from "tone";
import { Note } from "./Note";


// The data structure for the notes must be updated to be compatible with Tone.Part
// We will use an array of objects where each object contains a time, note, and duration.
// The time will be calculated based on the position in the original sequence.
interface NoteEvent {
    time: string; // Tone.js time format (e.g., '0:0:0', '0:0:1', '0:1:0')
    note: string | string[] | null;
    duration: string;
}

export class SoundEffect {
    notes: Note[];
    // How long each note in the array is, in sixteenths. Must be the same for all notes.
    noteDuration: number = 4;
    chord: boolean = false;

    constructor(notes: Note[], chord: boolean, duration: number) {
        this.notes = notes.length > 0 ? notes : ['C4', 'D4'];
        this.chord = chord;
        this.noteDuration = duration;
    }

    toPartEvents(): NoteEvent[] {
        const notesList = [...this.notes, null];
        return notesList.map((note, index) => {
            // Calculate the trigger time for this event in measures:beats:sixteenths format
            const time = `0:0:${index * this.noteDuration}`;

            return {
                time: time,
                note: note,
                duration: `0:0:${this.noteDuration}`
            };
        });
    }

    getDurationString() {
        // Add one beat for the null at the end of the part.
        return `0:0:${this.noteDuration * (this.notes.length + 1)}`;
    }

    toPartWithDuration(
        activeInstrument: Tone.PolySynth | Tone.Sampler
    ): { part: Tone.Part, duration: string } {
        const partEvents = this.toPartEvents();
        // The callback function fires for each event in the 'partEvents' array
        const part = new Tone.Part<NoteEvent>((time, value) => {
            if (value.note) {
                activeInstrument?.triggerAttackRelease(value.note, value.duration, time)
            }
        }, partEvents);

        let duration = this.noteDuration * (this.notes.length);
        let durationString = `0:0:${duration}`;

        return { part, duration: durationString };
    }
}




