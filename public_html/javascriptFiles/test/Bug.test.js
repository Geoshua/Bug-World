const Bug = require('../classes/Bug'); // import the class

describe('Bug class', () => {
    let bug;

    beforeEach(() => {
        bug = new Bug(1, 'red', 'resting', 5, 0, 100, 200, 'image.png', {});
    });

    it('should have correct initial values', () => {
        expect(bug.id).toBe(1);
        expect(bug.color).toBe('red');
        expect(bug.state).toBe('resting');
        expect(bug.resting).toBe(5);
        expect(bug.direction).toBe(0);
        expect(bug.has_food).toBe(false);
        expect(bug.markers).toEqual([false, false, false, false, false, false]);
        expect(bug.position).toEqual({x: 100, y: 200});
        expect(bug.cells).toEqual([]);
    });

    it('should switch sprite when calling switchSprite', () => {
        spyOn(bug, 'switchSprite').and.callThrough();
        bug.switchSprite('dir1');
        expect(bug.image).toBeDefined();
        expect(bug.switchSprite).toHaveBeenCalled();
    });

    it('should update position correctly when calling update', () => {
        spyOn(bug, 'canMove').and.returnValue(true);
        spyOn(bug, 'switchSprite').and.callThrough();
        bug.update();
        expect(bug.position.x).toBe(101);
        expect(bug.position.y).toBe(200);
        expect(bug.switchSprite).toHaveBeenCalledWith('dir0');
        expect(bug.canMove).toHaveBeenCalled();
    });

    it('should check if it can move when calling canMove', () => {
        bug.cells = [{x: 100, y: 200, obstructed: true}];
        expect(bug.canMove()).toBe(false);
        bug.cells = [];
        expect(bug.canMove()).toBe(true);
    });

    it('should change direction when hitting a wall', () => {
        spyOn(bug, 'canMove').and.returnValue(false);
        bug.direction = 0;
        bug.update();
        expect(bug.direction).toBe(3);
    });

    it('should set and clear markers correctly', () => {
        bug.set_marker_at([1, 2], 0);
        expect(bug.markers[0]).toBe(true);
        bug.clear_marker_at([1, 2], 0);
        expect(bug.markers[0]).toBe(false);
    });

    it('should check if a marker is set correctly', () => {
        bug.markers = [false, true, false, false, false, false];
        expect(bug.check_marker_at([1, 2], 1)).toBe(true);
    });

    it('should sense cell correctly', () => {
        expect(bug.sensed_cell([1, 2], 0)).toEqual([1, 1]);
        expect(bug.sensed_cell([1, 2], 1)).toEqual([2, 2]);
        expect(bug.sensed_cell([1, 2], 2)).toEqual([2, 3]);
        expect(bug.sensed_cell([1, 2], 3)).toEqual([1, 3]);
        expect(bug.sensed_cell([1, 2], 4)).toEqual([0, 3]);
        expect(bug.sensed_cell([1, 2], 5)).toEqual([0, 2]);
    });
});
  