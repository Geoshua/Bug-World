// Based on code by Lev Leontev from the first sprint.
function testAssembleSingleInstruction() {
    const source = "s2: \n Move s1 s2 \n\n s1: ";
    const expected = [new MoveInstruction(1, 0)];
    const actual = assemble(source);
    assertArraysEqual(expected, actual);
}


function testAssembleMultipleInstructions() {
    const source = "s1: \n move s1 s2 \n s2: \n turn Left s1 \n";
    const expected = [
        new MoveInstruction(0, 1),
        new TurnInstruction(TurnDirection.LEFT, 0),
    ];
    const actual = assemble(source);
    assertArraysEqual(expected, actual);
}

function testAssembleSenseInstruction() {
    const source = "s1: \n sense ahead friend s2 s3 \n s2: \n move s1 s4 \n s3: \n move s1 s4 \n s4: ";
    const senseInstruction = assemble(source)[0];
    assertTrue(senseInstruction instanceof SenseInstruction);
    assertEquals(SenseDirection.AHEAD, senseInstruction.sensedir);
    assertEquals(1, senseInstruction.s1);
    assertEquals(2, senseInstruction.s2);
}

function testAssembleMarkInstruction() {
    const source = "s1: \n mark 3 s2 \n s2: ";
    const expected = [new MarkInstruction(3, 1)];
    const actual = assemble(source);
    assertArraysEqual(expected, actual);
}

function testAssembleUnmarkInstruction() {
    const source = "s1: \n unmark 2 s2 \n s2: ";
    const expected = [new UnmarkInstruction(2, 1)];
    const actual = assemble(source);
    assertArraysEqual(expected, actual);
}

function testAssemblePickupInstruction() {
    const source = "s1: \n pickup s2 s3 \n s2: \n move s1 s4 \n s3: \n move s1 s4 \n s4: ";
    const expected = [new PickupInstruction(1, 2), new MoveInstruction(0, 3), new MoveInstruction(0, 3)];
    const actual = assemble(source);
    assertArraysEqual(expected, actual);
}

function testAssembleDropInstruction() {
    const source = "s1: \n drop s2 \n s2: ";
    const expected = [new DropInstruction(1)];
    const actual = assemble(source);
    assertArraysEqual(expected, actual);
}

function testAssembleTurnInstruction() {
    const source = "s1: \n turn left s2 \n s2: ";
    const expected = [new TurnInstruction("left", 1)];
    const actual = assemble(source);
    assertArraysEqual(expected, actual);
}

function testAssembleMoveInstruction() {
    const source = "s1: \n move s2 s3 \n s2: \n mark 1 s4 \n s3: \n unmark 1 s4 \n s4: ";
    const expected = [new MoveInstruction(1, 2), new MarkInstruction(1, 3), new UnmarkInstruction(1, 3)];
    const actual = assemble(source);
    assertArraysEqual(expected, actual);
}

function testAssembleFlipInstruction() {
    const source = "s1: \n flip 5 s2 s3 \n s2: \n move s1 s4 \n s3: \n move s1 s4 \n s4: ";
    const expected = [new FlipInstruction(5, 1, 2), new MoveInstruction(0, 3), new MoveInstruction(0, 3)];
    const actual = assemble(source);
    assertArraysEqual(expected, actual);
}

function testAssembleDirectionInstruction() {
    const source = "s1: \n direction 2 s2 s3 \n s2: \n move s1 s4 \n s3: \n move s1 s4 \n s4: ";
    const expected = [new DirectionInstruction(2, 1, 2), new MoveInstruction(0, 3), new MoveInstruction(0, 3)];
    const actual = assemble(source);
    assertArraysEqual(expected, actual);
}

let assemblerTests = [
    testAssembleSingleInstruction, testAssembleMultipleInstructions, testAssembleSenseInstruction,
    testAssembleMarkInstruction, testAssembleUnmarkInstruction, testAssemblePickupInstruction,
    testAssembleDropInstruction, testAssembleTurnInstruction, testAssembleMoveInstruction,
    testAssembleFlipInstruction, testAssembleDirectionInstruction
]
