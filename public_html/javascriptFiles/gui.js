// Set the scaling factor for the canvas
let scalingFactor = 60;

// Get the canvas and its context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set the canvas height and width
canvas.height = 1024;
canvas.width = 576;
canvas.style.padding = "0";
canvas.style.margin = "auto";
canvas.style.display = "block";
canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.right = "0";
canvas.style.bottom = "0";
canvas.style.border = "5px solid green"


// Log the map file data
console.log(wordlMapFileT);

// Parse the map data and extract relevant information
let mapString = wordlMapFileT;
const map = mapString.trim().split('\n').map(line => line.trim().split(' '));
let cwidth = parseInt(map[0][0]);
let cheight = parseInt(map[1][0]);

// Set the canvas height and width based on the dimensions in the map file
canvas.width = cwidth * scalingFactor + scalingFactor / 2;
canvas.height = (cheight) * scalingFactor * Math.sqrt(3) / 2 + (1 - Math.sqrt(3) / 2) * scalingFactor;

// Create an array to hold the list of cells
let listOfCells = [];
let bugArray = [];
let ind = 0;

// Create a 2D array to hold the cells
let fcells = new Array(cwidth);
for (let x = 0; x < cwidth; x++) {
    fcells[x] = new Array(cheight);

    for (let y = 0; y < cheight; y++) {
        // Check for borders and dimensions
        if (x === 0 || y === 0 || x === cwidth - 1 || y === cheight - 1) {
            if (map[y + 2][x] != '#') {
                window.alert("Borders not closed.");
                fail;
            }
        }
        if (typeof map[cheight + 1] === 'undefined' || typeof map[cheight + 1][cwidth - 1] === 'undefined' || typeof map[cheight + 2] != 'undefined' || typeof map[cheight + 1][cwidth] != 'undefined') {
            window.alert("Wrong Dimensions.");
            fail;
        }


        // Create cells based on the characters in the map data
        if (map[y + 2][x] === '#') {
            let cell;
            if (y % 2 == 0) {
                cell = new Cell(x * scalingFactor, y * scalingFactor * Math.sqrt(3) / 2, null, "./images/60/block1.png");
            }
            else {
                cell = new Cell(x * scalingFactor + scalingFactor / 2, y * scalingFactor * Math.sqrt(3) / 2, null, "./images/60/block1.png");
            }
            cell.obstructed = true;
            listOfCells.push(cell);
        } else if (map[y + 2][x] === '.') {
            let cell;
            if (y % 2 == 0) {
                cell = new Cell(x * scalingFactor, y * scalingFactor * Math.sqrt(3) / 2, null, "./images/60/nothing.png");
            }
            else {
                cell = new Cell(x * scalingFactor + scalingFactor / 2, y * scalingFactor * Math.sqrt(3) / 2, null, "./images/60/nothing.png");
            }
            listOfCells.push(cell);
        } else if (map[y + 2][x] === '-') {
            let cell;
            if (y % 2 == 0) {
                cell = new Cell(x * scalingFactor, y * scalingFactor * Math.sqrt(3) / 2, null, "./images/60/blacknest.png");
                placeBug(ind, x * scalingFactor, y * scalingFactor * (Math.sqrt(3) / 2), 0, 2);
                ind++;
            }
            else {
                cell = new Cell(x * scalingFactor + scalingFactor / 2, y * scalingFactor * Math.sqrt(3) / 2, null, "./images/60/blacknest.png");
                placeBug(ind, x * scalingFactor + scalingFactor / 2, y * scalingFactor * (Math.sqrt(3) / 2), 0, 2);
                ind++;
            }
            listOfCells.push(cell);
        } else if (map[y + 2][x] === '+') {
            let cell;
            if (y % 2 == 0) {
                cell = new Cell(x * scalingFactor, y * scalingFactor * Math.sqrt(3) / 2, null, "./images/60/rednest.png");
                placeBug(ind, x * scalingFactor, y * scalingFactor * (Math.sqrt(3) / 2), 0, 1);
                ind++;
            }
            else {
                cell = new Cell(x * scalingFactor + scalingFactor / 2, y * scalingFactor * Math.sqrt(3) / 2, null, "./images/60/rednest.png");
                placeBug(ind, x * scalingFactor + scalingFactor / 2, y * scalingFactor * (Math.sqrt(3) / 2), 0, 1);
                ind++;
            }
            listOfCells.push(cell);
        } else if (map[y + 2][x] >= '0' && map[y + 2][x] <= '9') {
            let cell;
            let foodNumImage;
            if (map[y + 2][x] == '1') foodNumImage = "./images/60/food.png";
            else if (map[y + 2][x] == '2') foodNumImage = "./images/60/food_2.png";
            else if (map[y + 2][x] == '3') foodNumImage = "./images/60/food_3.png";
            else if (map[y + 2][x] == '4') foodNumImage = "./images/60/food_4.png";
            else foodNumImage = "./images/60/food_5.png";
            if (y % 2 == 0) {
                cell = new Cell(x * scalingFactor, y * scalingFactor * Math.sqrt(3) / 2, null, foodNumImage);
            }
            else {
                cell = new Cell(x * scalingFactor + scalingFactor / 2, y * scalingFactor * Math.sqrt(3) / 2, null, foodNumImage);
            }
            listOfCells.push(cell);
        } else {
            window.alert("Invalid character in the map");
            fail;
        }

    }
}

// Create a World object with the list of cells
let world = new World(listOfCells);

// Create an array to hold the bugs



function placeBug(ind, xpos, ypos, dirc, colorr) {
    // Create 10 bugs with random positions, directions, and colors
    // let xpos = Math.floor(Math.random() * (cwidth * scalingFactor));
    // let ypos = Math.floor(Math.random() * (cheight * scalingFactor));

    // let dirc = Math.floor(Math.random() * 6);

    // let colorr = Math.floor(Math.random() * 2) + 1;

    let animationss = "";
    let imgSr = "";

    if (colorr === 1) {
        animationss = {
            dir0: { imageSrc: "./images/red0.png" },
            dir1: { imageSrc: "./images/red1.png" },
            dir2: { imageSrc: "./images/red2.png" },
            dir3: { imageSrc: "./images/red3.png" },
            dir4: { imageSrc: "./images/red4.png" },
            dir5: { imageSrc: "./images/red5.png" }
        };
        imgSr = "./images/red0.png";
    } else {
        animationss = {
            dir0: { imageSrc: "./images/black0.png" },
            dir1: { imageSrc: "./images/black1.png" },
            dir2: { imageSrc: "./images/black2.png" },
            dir3: { imageSrc: "./images/black3.png" },
            dir4: { imageSrc: "./images/black4.png" },
            dir5: { imageSrc: "./images/black5.png" }
        };
        imgSr = "./images/black0.png";
    }


    const bug = new Bug(ind, colorr, 1, 1, dirc, xpos, ypos, {
        imageSrc: imgSr,
        animations: animationss,
        cells: listOfCells
    });

    bugArray.push(bug);
}

//Create the background Sprite
const backgroundSprite = new Sprite({ position: { x: 0, y: 0 }, imageSrc: "./images/preview.jpg" });


//function to animate the bugs and render the sprites
function animate() {
    for (let i = 0; i < bugArray.length; i++) {
        bugArray[i].update();
    }
}

animate();
setInterval(animate, 1250);




