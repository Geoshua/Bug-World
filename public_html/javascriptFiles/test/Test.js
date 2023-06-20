// Based on code by Lev Leontev from the first sprint.
function assertEquals(expected, actual) {
    let equals;
    if (expected !== null && typeof expected.equals === "function") {
        equals = expected.equals(actual);
    } else {
        equals = expected === actual;
    }
    if (!equals) {
        throw new Error(`Expected ${expected}, but got ${actual}`);
    }
}

function assertTrue(condition) {
    if (!condition) {
        throw new Error(`Expected true, but got ${condition}`);
    }
}

function assertFalse(condition) {
    if (condition) {
        throw new Error(`Expected false, but got ${condition}`);
    }
}

function assertNull(actual) {
    assertEquals(null, actual)
}

function assertArraysEqual(expected, actual) {
    assertEquals(expected.length, actual.length);
    for (let i = 0; i < expected.length; i++) {
        assertEquals(expected[i], actual[i]);
    }
}

function runTest(testFn) {
    try {
        testFn();
        return { name: testFn.name, status: 'pass' };
    } catch (error) {
        return { name: testFn.name, status: 'fail', message: error.message };
    }
}

function runTestsInModule(module) {
    return module.map(runTest);
}
