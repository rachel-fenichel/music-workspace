/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';
import { longStack, sixStacks } from './scenarios/longStacks';
import { sunnyDay } from './scenarios/sunnyDay';
import { simpleCircle } from './scenarios/simpleCircle';
import { blankCanvas } from './scenarios/blankCanvas';
import { moreBlocks } from './scenarios/moreBlocks';
import { navigationTestBlocks } from './scenarios/navigationTestBlocks';
import { moveStartTestBlocks } from './scenarios/moveStartTestBlocks';
import { moveStatementTestBlocks } from './scenarios/moveStatementTestBlocks';
import { moveValueTestBlocks } from './scenarios/moveValueTestBlocks';
import { comments } from './scenarios/comments';

const emptyWorkspace = {
  'blocks': {
    'blocks': [],
  },
};

/**
 * Loads saved state from local storage into the given workspace.
 * @param {Blockly.Workspace} workspace Blockly workspace to load into.
 * @param {string} scenarioString Which scenario to load.
 */
export const load = function (workspace, scenarioString) {
  const scenarioMap = {
    'blank': blankCanvas,
    comments,
    moreBlocks,
    moveStartTestBlocks,
    moveStatementTestBlocks,
    moveValueTestBlocks,
    navigationTestBlocks,
    simpleCircle,
    'sun': sunnyDay,
    emptyWorkspace,
    'longStack': longStack,
    'sixStacks': sixStacks
  };
  
  // Don't emit events during loading.
  Blockly.Events.disable();
  Blockly.serialization.workspaces.load(
    scenarioMap[scenarioString],
    workspace,
    false,
  );
  Blockly.Events.enable();
};