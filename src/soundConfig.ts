import * as Tone from "tone";
import { SoundEffect } from "./SoundEffect";
import { parseNotesFromText } from "./Note";

export class SoundConfig {

    defaultEffect = new SoundEffect(['C4'], false, 4);
    TEMPO_DEFAULT = 150;

    // Default values for four levels of nesting.
    openingNotes: SoundEffect[] = [
        new SoundEffect(['C4'], false, 1),
        new SoundEffect(['D4'], false, 1),
        new SoundEffect(['E4'], false, 1),
        new SoundEffect(['F4'], false, 1),
    ];
    // Default values for four levels of nesting.
    closingNotes: SoundEffect[] = [
        new SoundEffect(['D4'], false, 1),
        new SoundEffect(['E4'], false, 1),
        new SoundEffect(['F4'], false, 1),
        new SoundEffect(['G4'], false, 1),
    ];
    // Default values for four levels of nesting.
    basicNotes: SoundEffect[] = [
        new SoundEffect(['E4'], false, 4),
        new SoundEffect(['F4'], false, 4),
        new SoundEffect(['G4'], false, 4),
        new SoundEffect(['A4'], false, 4),
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
        this.openingNotes[0] = new SoundEffect(parsedOpening, false, 1);
        this.closingNotes[0] = new SoundEffect([...parsedOpening].reverse(), false, 1);

        const baseInput = document.getElementById('baseNotes') as HTMLInputElement | null;
        this.basicNotes[0] = new SoundEffect(parseNotesFromText(baseInput?.value || 'C5'), false, 4);
    }
}
