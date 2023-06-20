// Parses a single line of assembler code and returns the corresponding instruction
function parseInstruction(tokens, labels) {
    console.log(tokens)
    const type = tokens[0];
    switch (type) {
        case InstructionType.SENSE:
            return new SenseInstruction(tokens[1], parseInt(tokens[2]), parseInt(tokens[3]), parseSenseCondition(tokens.slice(2, -2)));
        case InstructionType.MARK:
            return new MarkInstruction(parseInt(tokens[1]), tokens[2]);
        case InstructionType.UNMARK:
            return new UnmarkInstruction(parseInt(tokens[1]), tokens[2]);
        case InstructionType.PICKUP:
            return new PickupInstruction(parseInt(tokens[1]), parseInt(tokens[2]));
        case InstructionType.DROP:
            return new DropInstruction(parseInt(tokens[1]));
        case InstructionType.TURN:
            return new TurnInstruction(tokens[1], parseInt(tokens[2]));
        case InstructionType.MOVE:
            return new MoveInstruction(parseInt(tokens[1]), parseInt(tokens[2]));
        case InstructionType.FLIP:
            return new FlipInstruction(parseInt(tokens[1]), parseInt(tokens[2]), parseInt(tokens[3]));
        case InstructionType.DIRECTION:
            return new DirectionInstruction(parseInt(tokens[1]), parseInt(tokens[2]), parseInt(tokens[3]));
        default:
            throw new Error(`Unknown instruction type: ${type}`);
    }
}

// Parses a sense condition from a list of tokens
function parseSenseCondition(tokens) {
  
    if (tokens.length === 3) {
        tokens[2] = tokens[2].slice(0, -1);
        switch (tokens[2]) {
            case SenseCondition.FRIEND:
                return (cell, color) => cell.bug && cell.bug.color === color;
            case SenseCondition.FOE:
                return (cell, color) => cell.bug && cell.bug.color !== color;
            case SenseCondition.FRIEND_WITH_FOOD:
                return (cell, color) => cell.bug && cell.bug.color === color && cell.bug.hasFood;
            case SenseCondition.FOE_WITH_FOOD:
                return (cell, color) => cell.bug && cell.bug.color !== color && cell.bug.hasFood;
            case SenseCondition.FOOD:
                return (cell, _) => cell.hasFood();
            case SenseCondition.ROCK:
                return (cell, _) => cell.isObstructed();
            case SenseCondition.FOE_MARKER:
                return (cell, color) => cell.checkOtherMarkerAt(color);
            case SenseCondition.HOME:
                return (cell, color) => cell.isFriendlyBase(color);
            case SenseCondition.FOE_HOME:
                return (cell, color) => cell.isEnemyBase(color);
            default:
                throw new Error(`Unknown sense condition: ${tokens[2]}`);
        }
    } else if (tokens.length === 2 && tokens[0] === SenseCondition.MARKER) {
        const marker = parseInt(tokens[1]);
        return (cell, color) => cell.checkMarker(color, marker);
    }
    else {
        throw new Error(`Invalid sense condition: ${tokens.join(' ')}`);
    }
}

function splitToTokens(line) {
    return line.split(/\s+/).filter((token) => token.length > 0)
}

// Assembles the given source code and returns the instructions
function assemble(source) {
    const lines = source.toLowerCase().split('\n');

    // First pass: assign addresses to labels
    const labels = {};
    let address = 0;
    for (const line of lines) {
        const tokens = splitToTokens(line);
        if (tokens.length === 0) {
            // Skip empty lines.
            continue;
        }
        if (tokens[0].endsWith(':')) {
            const label = tokens[0].slice(0, -1);
            if (label in labels) {
                throw new Error(`Duplicate label: ${label}`);
            }
            labels[label] = address;
        } else {
            address++;
        }
    }

    // Second pass: translate instructions to objects
    const instructions = [];
    for (const line of lines) {
        const tokens = splitToTokens(line);
        if (tokens.length === 0) {
            // Skip empty lines.
            continue;
        }
        if (tokens.length > 0 && tokens[0].endsWith(':')) {
            // Skip labels
            continue;
        }
        const instruction = parseInstruction(tokens, labels);
        instructions.push(instruction);
    }

    return instructions;
}
