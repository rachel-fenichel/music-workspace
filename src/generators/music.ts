import * as Blockly from 'blockly';

export class MusicGenerator extends Blockly.CodeGenerator {
    constructor(name = 'Music') {
        super(name)
    }

    workspaceToCode(workspace?: Blockly.Workspace): string {
        if (!workspace) return '';
        const code = [];
        const blocks = workspace.getTopBlocks(true);
        for (const block of blocks) {
            let line = this.musicBlockToCode(block, 0);
            if (Array.isArray(line)) {
                // Value blocks return tuples of code and operator order.
                // Top-level blocks don't care about operator order.
                line = line[0];
                console.log('top level reporter block');
            }
            if (line) {
                if (block.outputConnection) {
                    console.log('skipping reporter block');
                } else {
                    code.push(line);
                }
            }
        }
        return code.join('\nplayBetweenStacks()\n');
    }

    musicBlockToCode(block: Blockly.Block | null, nestingLevel: number): string | [string, number] {
        if (!block) {
            return '';
        }
        if (block.outputConnection) {
            console.log('reporter block');
            return '';
        }
        const statementInputs = this.getBlockStatementInputs(block);

        let outputString = '';
        if (statementInputs.length) {
            outputString += `playOpening(${nestingLevel})\n`;
            for (const inputName of statementInputs) {
                const input = block.getInput(inputName);
                if (input && input.connection?.isConnected()) {
                    outputString += this.musicBlockToCode(input.connection.targetBlock(), nestingLevel + 1);
                }
            }
            outputString += `playClosing(${nestingLevel})\n`;
        }
        else if (block.previousConnection && block.nextConnection) {
            outputString = `playBlock(${nestingLevel})\n`;
        }
    const nextBlock =
      block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = this.musicBlockToCode(nextBlock, nestingLevel);
        return outputString + nextCode;
    }

    /**
 * Iterates through a block's inputs and returns a list of names 
 * for inputs that are of type INPUT_STATEMENT.
 * @param {Blockly.Block} block The block object to inspect.
 * @returns {Array<string>} A list of input names (e.g., ['DO', 'ELSE']).
 */
    getBlockStatementInputs(block: Blockly.Block): Array<string> {
        const statementInputs = [];

        // block.inputList holds all defined inputs (value, statement, field, dummy)
        for (const input of block.inputList) {
            // Check if the input type matches Blockly's constant for statement inputs
            if (input.type === Blockly.inputs.inputTypes.STATEMENT) {
                // Push the input's name (which is used in statementToCode)
                statementInputs.push(input.name);
                console.log('found a statement input');
            }
        }
        return statementInputs;
    }
}
export const musicGenerator = new MusicGenerator();

