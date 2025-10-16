import * as Tone from "tone";
import { SoundEffect } from "./SoundEffect";
import { parseNotesFromText } from "./Note";

enum Phrase {
    Opening = "opening",
    Closing = "closing",
    Basic = "basic",
}

export class SoundConfig {

    defaultEffect = new SoundEffect(['C4'], false, 4);
    TEMPO_DEFAULT = 150;

    phrases = {
        opening: [
            new SoundEffect(['C4'], false, 1),
            new SoundEffect(['D4'], false, 1),
            new SoundEffect(['E4'], false, 1),
            new SoundEffect(['F4'], false, 1),
        ],
        closing: [
            new SoundEffect(['C4'], false, 1),
            new SoundEffect(['D4'], false, 1),
            new SoundEffect(['E4'], false, 1),
            new SoundEffect(['F4'], false, 1),
        ],
        basic: [
            new SoundEffect(['E4'], false, 4),
            new SoundEffect(['F4'], false, 4),
            new SoundEffect(['G4'], false, 4),
            new SoundEffect(['A4'], false, 4),
        ]
    }

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

    updateTempo() {
        const slider = document.getElementById('tempoSlider') as HTMLInputElement | null;
        this.tempo = slider ? parseInt(slider.value) : this.TEMPO_DEFAULT;
        Tone.getTransport().bpm.value = this.tempo;
    }

    updateNotes() {
        this.setNotesFromDom(Phrase.Opening, 1);
        this.setNotesFromDom(Phrase.Closing, 1);
        this.setNotesFromDom(Phrase.Basic, 4);
    }

    setNotesFromDom(phrase: Phrase, duration: number) {
        for (let i = 0; i < 4; i++) {
            const input = document.getElementById(`${phrase}-notes-l${i + 1}`) as HTMLInputElement;
            const parsedNotes = parseNotesFromText(input.value || '');
            this.phrases[phrase][i] = new SoundEffect(parsedNotes, false, duration);
        }
    }

    getEffect(phrase: string, level: number) {
        return this.phrases[phrase as Phrase][level];
    }
}
