const Bug = require('./bug');
export default class BugBrain extends Bug{
	constructor(instruction,pos){
		this.instruction = instruction;
		this.pos = pos;
	}
	/**
	 * @return {Instruction}
	 */
	getNextInstruction(){}
}

module.exports = BugBrain;