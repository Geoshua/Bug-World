const Bug = require('./bug');
const Position = require('./position')

class WorldCell extends World {
	constructor (x,y){
		this.Pos = Position(x,y);
		this.obstructed = null;
		this.bug = Bug();
		this.food = null;
		this.base = null;
		this.marker = null;
		this.markeri = 0;
	}

	/* BugCondition Enumeration */
	Condition ={
		FRIEND : 'friend',
		FOE : 'foe',
		FRIENDWITHFOOD : 'friendWithFood',
		FOEWITHFOOD : 'foeWithFood',
		FOOD : 'food',
		ROCK : 'rock',
		MARKER : 'marker',
		FOEMARKER : 'foeMarker',
		HOME : 'home',
		FOEHOME : 'foeHome',
	};

	/**
	 * is true if obstructed.
	 * @return {Boolean}
	 */
	isObstructed(){
		if (this.obstructed != null) {
			return 1;
		}
		return 0;
	}

	/**
	 * is true if it is holding a bug.
	 * @return {Boolean}
	 */
	isOccupied(){
		if (this.bug != null){
			return 1;
		}
		return 0;
	}

	/**
	 * sets the WorldCell to be occupied by Bug b.
	 * 
	 * @param {Bug} b 
	 * @return {Boolean}
	 */
	setBug(b){
		this.bug = b;
		return 1;
	}

	/**
	 * returns the bug of an occupied position. It is a checked run-time error to apply bug at to a cell an unoccupied cell.
	 * @return {Bug}
	 */
	getBug(){
		return this.bug;
	}

	/**
	 * removes a bug from a position; this does not affect the liveness of the bug.
	 * @return {Boolean}
	 */
	removeBug(){
		this.bug = null;
		return 1;
	}
	
	/**
	 * places food (bits) at a position.
	 * 
	 * @param {Integer} num 
	 */
	setFood(num){
		this.food = num;
	}

	/**
	 *  is true if a position belongs to bug of a given color.
	 * 
	 * @param {Color} c 
	 * @return {Boolean}
	 */
	isFriendlyBase(c){
		if (this.Color = c){
			return 1;
		}
		return 0;
	}

	/**
	 * is true if a base of a different color is at a position.
	 * 
	 * @param {Color} c
	 * @return {Boolean} 
	 */
	isEnemyBase(Color){
		if (this.Color != c) {
			return 1;
		}
		return 0;
	}

	/**
	 * Set marker at position pos for swarm of color c.
	 * 
	 * @param {Color} c
	 * @param {Position} pos 
	 */
	setMarker(c,pos){
		this.marker = this.Condition.MARKER;
	}

	/**
	 * Delete marker at position pos for swarm of color c
	 * 
	 * @param {Color} c
	 * @param {Position} pos 
	 */
	clearMarker(c,pos){
		this.marker = null;
	}

	/**
	 *  is true if a position holds markers for a given color of bugs.
	 * 
	 * @param {Color} c
	 * @param {Position} pos 
	 * @return {Boolean}
	 */
	isFriendlyMarker(c,pos){
		if (this.marker.Condition = MARKER) {
			return 1;
		}
		return 0;
	}

	/** 
	 * Return true if at position pos any marker is set by the adversarial swarm
	 * 
	 * @param {Color} c
	 * @param {Position} pos 
	 * @return {Boolean}
	 */
	isEnemyMarker(c,pos){
		if (this.marker.Condition = FOEMARKER) {
			return 1;
		}
		return 0;
	}

	/**
	 *  if a cell matches a condition cond for a bug of color.
	 * @param {Position} pos 
	 * @param {BugCondition} cond
	 * @param {Color} c
	 */
	cellMatches(pos, cond, c){
		if (this.cond == cond && this.Color == c) {
			return 1;
		}
		return 0;
	}

	/**
	 * @return {String}
	 */
	toString(){}
}

module.exports = WorldCell;
