/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly';
import { blocks } from './blocks/text';
//import {forBlock} from './generators/javascript';
//import {javascriptGenerator} from 'blockly/javascript';
import { save, load } from './serialization';
import { toolbox } from './toolbox';
import './index.css';
import { musicGenerator } from './generators/music';
import { triggerNote, initializeSynth, playNote, playSequence } from './sounds';

// Register the blocks and generator with Blockly
Blockly.common.defineBlocks(blocks);
//Object.assign(javascriptGenerator.forBlock, forBlock);

// Set up UI elements and inject Blockly
const codeDiv = document.getElementById('generatedCode')?.firstChild;
const outputDiv = document.getElementById('output');
const blocklyDiv = document.getElementById('blocklyDiv');

if (!blocklyDiv) {
  throw new Error(`div with id 'blocklyDiv' not found`);
}
const ws = Blockly.inject(blocklyDiv, { toolbox });

// This function resets the code and output divs, shows the
// generated code from the workspace, and evals the code.
// In a real application, you probably shouldn't use `eval`.
const runCode = () => {
  const code = musicGenerator.workspaceToCode(ws as Blockly.Workspace);
  if (codeDiv) codeDiv.textContent = code;

  //if (outputDiv) outputDiv.innerHTML = '';

  //eval(code);
};

if (ws) {
  // Load the initial state from storage and run the code.
  load(ws);
  runCode();

  // Every time the workspace changes state, save the changes to storage.
  ws.addChangeListener((e: Blockly.Events.Abstract) => {
    // UI events are things like scrolling, zooming, etc.
    // No need to save after one of these.
    if (e.isUiEvent) return;
    save(ws);
  });

  // Whenever the workspace changes meaningfully, run the code again.
  ws.addChangeListener((e: Blockly.Events.Abstract) => {
    // Don't run the code when the workspace finishes loading; we're
    // already running it once when the application starts.
    // Don't run the code during drags; we might have invalid state.
    if (
      e.isUiEvent ||
      e.type == Blockly.Events.FINISHED_LOADING ||
      ws.isDragging()
    ) {
      return;
    }
    runCode();
  });
}

let sequence: (string | string[])[] = [];
export function playOpening(nestingLevel: number) {
  sequence.push(['C4', 'E4', 'G4', 'C5']);  
  //playNote('G4', '8n');
}

export function playClosing(nestingLevel: number) {
  //sequence.push('A4');
  sequence.push(['C5', 'G4', 'E4', 'C4']);
    //playNote('A4', '8n');
}

export function playBlock(nestingLevel: number) {
  if (nestingLevel == 0) {
    sequence.push('C4');
  } else if (nestingLevel == 1) {
    sequence.push('G4');
  } else {
    sequence.push('A2');
  }
//playNote('C4', '8n');
}

export function playBetweenStacks() {
  sequence.push('C2');  
  //playNote('C2', '4n');
}

document.getElementById('play')?.addEventListener('click', () => {
  initializeSynth();

  
  if (codeDiv?.textContent) {
    // Clear sequence.
    sequence = [];
    eval(codeDiv.textContent);
    playSequence(sequence);
  }
  //triggerNote();
});