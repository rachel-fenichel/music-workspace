import * as Tone from "tone";

type Note = string | null;

export class SoundEffect {
    notes: Note[];
    constructor(notes: Note[], public chord: boolean = false,) {
        this.notes = notes.length > 0 ? notes : ['C4', 'D4'];
    }
}

export class SoundConfig {

    defaultEffect = 
        new SoundEffect(['C4'], false);
    TEMPO_DEFAULT = 150;

    // Default values for four levels of nesting.
    openingNotes: SoundEffect[] = [
        new SoundEffect(['C4'], false),
        new SoundEffect(['D4'], false),
        new SoundEffect(['E4'], false),
        new SoundEffect(['F4'], false),
    ];
    // Default values for four levels of nesting.
    closingNotes: SoundEffect[] = [
        new SoundEffect(['D4'], false),
        new SoundEffect(['E4'], false),
        new SoundEffect(['F4'], false),
        new SoundEffect(['G4'], false),
    ];
    // Default values for four levels of nesting.
    basicNotes: SoundEffect[] = [
        new SoundEffect(['E4'], false),
        new SoundEffect(['F4'], false),
        new SoundEffect(['G4'], false),
        new SoundEffect(['A4'], false),
    ];

    tempo: number = this.TEMPO_DEFAULT;

    constructor() {
    }

    setOpening(effect: SoundEffect, level: number) {
        while (level > this.openingNotes.length) {
            this.openingNotes.push(effect);
        }

        this.openingNotes[level] = effect;
    }

    setClosing(effect: SoundEffect, level: number) {
        while (level > this.closingNotes.length) {
            this.closingNotes.push(effect);
        }

        this.closingNotes[level] = effect;
    }

    setBasic(effect: SoundEffect, level: number) {
        while (level > this.basicNotes.length) {
            this.basicNotes.push(effect);
        }

        this.basicNotes[level] = effect;
    }

    getOpeningNotes(level: number) {
        if (level < this.openingNotes.length) {
            return this.openingNotes[level];
        }
        return Array.from(this.openingNotes[0].notes);
    }

    updateTempo() {
        const slider = document.getElementById('tempoSlider') as HTMLInputElement | null;
        this.tempo = slider ? parseInt(slider.value) : this.TEMPO_DEFAULT;
        Tone.getTransport().bpm.value = this.tempo;
    }

    updateNotes() {
        const openingInput = document.getElementById('openingNotes') as HTMLInputElement | null;
        const parsedOpening = parseNotesFromText(openingInput?.value || '');
        this.openingNotes[0] = new SoundEffect(parsedOpening, false);
        this.closingNotes[0] = new SoundEffect([...parsedOpening].reverse(), false);

        const baseInput = document.getElementById('baseNotes') as HTMLInputElement | null;
        this.basicNotes[0] = new SoundEffect(parseNotesFromText(baseInput?.value || 'C5'), false);
    }
}

/**
 * Parses a raw string of text into an array of valid note strings or nulls.
 * Drops any items that cannot be parsed as a musical note.
 */
function parseNotesFromText(text: string) : Note[] {
    // Split by comma, space, or newline, then trim whitespace, filter out empty strings
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
            // @ts-ignore The Tone.Midi constructor comes from the external Tone.js library.
            const midi = new Tone.Midi(part);

            // A successful construction and a pitch within the usable MIDI range (0-127) is considered valid.
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
