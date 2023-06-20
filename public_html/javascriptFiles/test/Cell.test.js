describe('Cell', () => {
    let cell;
    let bug;

    beforeEach(() => {
        cell = new Cell(0, 0);
        bug = {color: 'red', setPosition: jest.fn()};
    });

    test('should create a cell with default properties', () => {
        expect(cell.x).toBe(0);
        expect(cell.y).toBe(0);
        expect(cell.obstructed).toBe(false);
        expect(cell.bug).toBe(null);
        expect(cell.food).toBe(0);
        expect(cell.markers).toEqual([]);
        expect(cell.position).toEqual({x: 0, y: 0});
    });

    test('should add a marker to the cell', () => {
        cell.addMarker('marker1', 'red');
        expect(cell.markers.length).toBe(1);
        expect(cell.markers[0].marker).toBe('marker1');
        expect(cell.markers[0].color).toBe('red');
    });

    test('should remove a marker from the cell', () => {
        cell.addMarker('marker1', 'red');
        cell.removeMarker('marker1', 'red');
        expect(cell.markers.length).toBe(0);
    });

    test('should throw an error when getting a bug from an unoccupied cell', () => {
        expect(() => cell.getBug()).toThrow('Cannot get bug at an unoccupied cell.');
    });

    test('should set the food amount for the cell', () => {
        cell.setFood(5);
        expect(cell.getFood()).toBe(5);
    });

    test('should remove the food from the cell', () => {
        cell.setFood(5);
        cell.removeFood();
        expect(cell.getFood()).toBe(0);
    });

    test('should set a bug on the cell', () => {
        cell.setBug(bug);
        expect(cell.bug).toBe(bug);
        expect(bug.setPosition).toHaveBeenCalledWith(0, 0);
    });

    test('should throw an error when placing a bug on an obstructed cell', () => {
        cell.obstructed = true;
        expect(() => cell.setBug(bug)).toThrow('Cannot place bug on obstructed cell');
    });

    test('should throw an error when placing a bug on an occupied cell', () => {
        cell.setBug(bug);
        expect(() => cell.setBug(bug)).toThrow('Cannot place bug on occupied cell');
    });

    test('should remove a bug from the cell', () => {
        cell.setBug(bug);
        const removedBug = cell.removeBug();
        expect(cell.bug).toBe(null);
        expect(removedBug).toBe(bug);
        expect(bug.setPosition).toHaveBeenCalledWith(null, null);
    });

    test('should throw an error when removing a bug from an unoccupied cell', () => {
        expect(() => cell.removeBug()).toThrow('Cannot remove bug from unoccupied cell');
    });
});
