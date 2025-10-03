/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly';
import { save, load } from './serialization';
import { toolbox } from './toolbox';
import './index.css';
import { musicGenerator } from './generators/music';
import { playProgram } from './sounds';
// @ts-expect-error No types in js file
import { blocks } from './blocks/p5_blocks';
// @ts-expect-error No types in js file
import { load as loadTestBlocks } from './loadTestBlocks';
import { installAllBlocks as installColourBlocks } from '@blockly/field-colour';

// Register the blocks and generator with Blockly
Blockly.common.defineBlocks(blocks);
installColourBlocks();

const params = new URLSearchParams(window.location.search);

const scenarioParam = params.get('scenario');
const scenario = scenarioParam ?? 'simpleCircle';

// Update form inputs to match params, but only after the page is
// fully loaded as Chrome (at least) tries to restore previous form
// values and does so _after_ DOMContentLoaded has fired, which can
// result in the form inputs being out-of-sync with the actual
// options when doing browser page navigation.
window.addEventListener('load', () => {
  (document.getElementById('scenario') as HTMLSelectElement).value = scenario;
});

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
  loadTestBlocks(ws, scenario);
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

document.getElementById('play')?.addEventListener('click', () => {
  playProgram(codeDiv?.textContent || '');
});