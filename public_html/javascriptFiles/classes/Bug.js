//import { bug1FileT } from "../fileLogic.js"
//export { bug2FileT as blackBugCode } from "../fileLogic.js"

class Bug extends Sprite {



    //constructor
    constructor(id, color, state, resting, direction, x, y, imageSrc, animations, cells = []) {


        super(imageSrc, animations);
        this.id = id;
        this.color = color;
        this.state = state;
        this.resting = resting;
        this.direction = direction;
        this.has_food = false;
        this.markers = Array(6).fill(false); // markers are initially unset
        this.position = { x: x, y: y };

        this.cells = cells;
        this.instructionId = 0;
        this.instructions = assemble(bug1FileT);


    }

    //function to check if the bug can move in its current direction
    canMove() {
        if (this.cells)
            return true;

        else {
            for (let i = 0; i < this.cells.length; i++) {
                if (this.cells[i].obstructed) {
                    if (this.cells[i].x <= this.position.x && this.position.x <= this.cells[i].x + 60 && this.cells[i].y <= this.position.y && this.position.y <= this.cells[i].y + 60) {
                        return false;
                    }
                }
            }
            return true;
        }
    }


    //function to change the bug's appearance based on its direction
    switchSprite(name) {
        // if (this.image === this.animations[name].image)
        //   return;

        this.image = this.animations[name].image;

    }


    //function to update the bug's position on the board

    advanceByOneInDirection(currX, currY, dir) {
        switch (dir) {
            case 0:
                currX += 1;
                break;
            case 1:
                currX += 1 / 2;
                currY += 1 / 2 * (Math.sqrt(3));
                break;
            case 2:
                currX -= 1 / 2;
                currY += 1 * (Math.sqrt(3)) / 2;
                break;
            case 3:
                currX -= 1;
                break;
            case 4:
                currX -= 1 / 2;
                currY -= 1 * (Math.sqrt(3)) / 2;
                break;
            case 5:
                currX += 1 / 2;
                currY -= 1 * (Math.sqrt(3)) / 2;
                break;
            default:
                break;
        }
        return [currX, currY]
    }

    smallMove(x, y, dir) {
        // console.log(x, y, dir);
        var newPos = this.advanceByOneInDirection(x, y, +dir);
        // console.log("do " + [this.position.x, this.position.y])
        this.position.x = newPos[0];
        this.position.y = newPos[1];
        backgroundSprite.draw();
        for (let i = 0; i < listOfCells.length; i++) {
            listOfCells[i].draw();

        }
        for (let i = 0; i < bugArray.length; i++) {
            bugArray[i].draw();

        }
        this.draw();
        return [this.position.x, this.position.y];

        //  console.log("posle " + " " + [newPos[0], newPos[1]])
    }

    smallTurn(dir) {
        this.switchSprite('dir' + dir);
    }

    async update() {
        //console.log(this.instructionId, this.instructions)
        if (this.instructionId == this.instructions.length) return;
        var instruction = this.instructions[this.instructionId]
        this.instructionId++;

        //  console.log(assemble(bug1FileT));

        //console.log(instruction);
        if (instruction.type == "sense") {
            if (i.cond) {

            }
            else {

            }
        }
        if (instruction.type == "mark") {
            this.set_marker_at(i.m);
        }
        if (instruction.type == "unmark") {
            this.clear_marker_at(i.m);
        }
        if (instruction.type == "pickup") {

        }
        if (instruction.type == "drop") {

        }
        if (instruction.type == "turn") {


        }
        if (instruction.type == "move") {
            // console.log(this.position.x, this.position.y)
            // if (!this.canMove()) return;
            var x = this.position.x;
            var y = this.position.y;
            var ins = this.direction;
            var step = 0;
            this.smallTurn(this.direction);
            const loop = setInterval(smallLoop.bind(this), 20);
            function smallLoop() {

                if (step == scalingFactor) {
                    clearInterval(loop);
                    if (this.canMove()) {
                        this.direction = instruction.s1;
                       
                    }
                    else {
                        this.direction = instruction.s2;
                        //this.smallTurn(this.direction);
                    }
                }
                step++;
                var res = this.smallMove(x, y, ins);
                x = res[0];
                y = res[1];
            }



        }
        if (instruction.type == "flip") {

        }
        if (instruction.type == "direction") {

        }

    }


    left() {
        this.direction = (this.direction + 5) % 6;
    }

    right() {
        this.direction = (this.direction + 1) % 6;
    }

    sensed_cell(p, dir) {
        // Given a position p and a direction dir, return the position of the cell in
        // that direction
        const x = p[0];
        const y = p[1];
        switch (dir) {
            case 0:
                return [x, y - 1];
            case 1:
                return [x + 1, y - 1 + (x % 2)];
            case 2:
                return [x + 1, y + (x % 2)];
            case 3:
                return [x, y + 1];
            case 4:
                return [x - 1, y + (x % 2)];
            case 5:
                return [x - 1, y - 1 + (x % 2)];
        }
    }

    set_marker_at(i) {
        this.markers[i] = true;
    }

    clear_marker_at(i) {
        this.markers[i] = false;
    }

    check_marker_at(pos, i) {
        return this.markers[i];
    }

}
