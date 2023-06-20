describe('World', () => {
    const worldContent = [
        '#.#.#.#.#',
        '.#.#.#.#.',
        '#.#.#.#.#',
        '.#.#.#.#.',
        '#.#.#.#.#',
    ];
    const height = worldContent.length;
    const width = worldContent[0].length;
    const world = new World(height, width, worldContent);

    describe('constructor', () => {
        it('should create a world with the correct dimensions', () => {
            expect(world.height).toEqual(height);
            expect(world.width).toEqual(width);
        });

        it('should create a map with the correct content', () => {
            expect(world.map).toEqual([
                [
                    new WorldCell(true, 0, null),
                    new WorldCell(false, 0, null),
                    new WorldCell(true, 0, null),
                    new WorldCell(false, 0, null),
                    new WorldCell(true, 0, null),
                ],
                [
                    new WorldCell(false, 0, null),
                    new WorldCell(true, 0, null),
                    new WorldCell(false, 0, null),
                    new WorldCell(true, 0, null),
                    new WorldCell(false, 0, null),
                ],
                [
                    new WorldCell(true, 0, null),
                    new WorldCell(false, 0, null),
                    new WorldCell(true, 0, null),
                    new WorldCell(false, 0, null),
                    new WorldCell(true, 0, null),
                ],
                [
                    new WorldCell(false, 0, null),
                    new WorldCell(true, 0, null),
                    new WorldCell(false, 0, null),
                    new WorldCell(true, 0, null),
                    new WorldCell(false, 0, null),
                ],
                [
                    new WorldCell(true, 0, null),
                    new WorldCell(false, 0, null),
                    new WorldCell(true, 0, null),
                    new WorldCell(false, 0, null),
                    new WorldCell(true, 0, null),
                ],
            ]);
        });
    });

    describe('cellAt', () => {
        it('should return the correct cell', () => {
            expect(world.cellAt(0, 0)).toEqual(new WorldCell(true, 0, null));
            expect(world.cellAt(1, 1)).toEqual(new WorldCell(true, 0, null));
            expect(world.cellAt(2, 2)).toEqual(new WorldCell(true, 0, null));
            expect(world.cellAt(3, 3)).toEqual(new WorldCell(true, 0, null));
            expect(world.cellAt(4, 4)).toEqual(new WorldCell(true, 0, null));
        });
    });
});
  