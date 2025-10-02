/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly';
import { blocks } from './blocks/text';
import { save, load } from './serialization';
import { toolbox } from './toolbox';
import './index.css';
import { musicGenerator } from './generators/music';
import { initializeSynth, playSequence } from './sounds';

// Register the blocks and generator with Blockly
Blockly.common.defineBlocks(blocks);

// Set up UI elements and inject Blockly
const codeDiv = document.getElementById('generatedCode')?.firstChild;
const blocklyDiv = document.getElementById('blocklyDiv');

if (!blocklyDiv) {
  throw new Error(`div with id 'blocklyDiv' not found`);
}
const ws = Blockly.inject(blocklyDiv, { toolbox });

// This function resets the code and output divs, shows the
// generated code from the workspace, and evals the code.
// In a real application, you probably shouldn't use `eval`.
const genCode = () => {
  const code = musicGenerator.workspaceToCode(ws as Blockly.Workspace);
  if (codeDiv) codeDiv.textContent = code;
};

if (ws) {
  // Load the initial state from storage and run the code.
  load(ws);
  genCode();

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
    genCode();
  });
}

let sequence: (string | string[])[] = [];
export function playOpening(nestingLevel: number) {
  if (nestingLevel == 0) {
    sequence.push(['C4', 'E4', 'G4', 'C5']);
  } else if (nestingLevel == 1) {
    sequence.push(['D4', 'F4', 'B4', 'D5']);
  } else {
    sequence.push('A2');
  }
}

export function playClosing(nestingLevel: number) {
  if (nestingLevel == 0) {
    sequence.push(['C5', 'G4', 'E4', 'C4']);
  } else if (nestingLevel == 1) {
    sequence.push(['D5', 'B4', 'F4', 'D4']);
  } else {
    sequence.push('A2');
  }
}

export function playBlock(nestingLevel: number) {
  if (nestingLevel == 0) {
    sequence.push('E5');
  } else if (nestingLevel == 1) {
    sequence.push('E6');
  } else {
    sequence.push('E7');
  }
}

export function playBetweenStacks() {
  sequence.push('C2');
}

document.getElementById('play')?.addEventListener('click', () => {
  initializeSynth();
  if (codeDiv?.textContent) {
    sequence = [];
    eval(codeDiv.textContent);
    playSequence(sequence);
  }
});