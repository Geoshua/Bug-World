
const BugBrain = require('./bugBrain');
const Position = require('./position');
const WorldCell = require('./worldcell');

class Bug extends WorldCell{
	constructor(color, state){
		this.id = id;
		this.color = color;
		this.state = state;
		this.resting = 1;
		this.direction = 0;
		this.hasFood = false;
		this.brain = BugBrain;
	}

	/**Kill bug at position pos and remove it from the corresponding cell
	 * 
	 * @param {Position} Pos Position of target bug
	 */
	kill(pos){
		this.state = dead;
		this.removeBug(pos);
	}

	/**Return position of bug b
	 * 
	 * @param {Bug} b Selected Bug
	 * @return {Position}
	 */
	getPosition(b){
		return this.getPosition(b);
	}
	/**
	 * @return {String}
	 */
	toString(){}
}

module.exports = Bug;