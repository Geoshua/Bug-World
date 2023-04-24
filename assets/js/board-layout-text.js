/** 
 * Initializes grid under hexmap to display chars.
 * 
 * Creates square-objects that naturally fall into place using css float and div widths/heights.
 * Some rectangles are used to stagger the grid. Dimension alignments are calculated in 'board-layout-hexes.js'.
 */
function boardLayoutDivisions() {
    //(grab) board params
    let xlen = parseInt(sessionStorage.getItem("xlen"));
    let ylen = parseInt(sessionStorage.getItem("ylen"));

    //fill board division with tile divisions
    let gameboard = document.getElementById("bugDisplayTextBoard")

    if (ylen >= 2) {
        for (let i=0; i<ylen; i++)
        {
            //stagger the start of even-rows
            if (i%2 === 1)
            {
                let squarestagger = document.createElement("div");
                squarestagger.classList.add("square");
                squarestagger.style.height = String(100/ylen)+"%";
                squarestagger.style.width = String(100/(xlen + .5)/2)+"%"; //half-width
                gameboard.appendChild(squarestagger);
            }
        
            for (let j=0; j<xlen; j++)
            {
                let square = document.createElement("div");
                square.classList.add("square");
                square.setAttribute('id', "squareNum"+String(i*xlen+j) );
                square.style.height = String(100/ylen)+"%";
                square.style.width = String(100/(xlen + .5))+"%";
                gameboard.appendChild(square);
            }
            
            //stagger the end of odd-rows
            if (i%2 === 0)
            {
                let squarestagger = document.createElement("div");
                squarestagger.classList.add("square");
                squarestagger.style.height = String(100/ylen)+"%";
                squarestagger.style.width = String(100/(xlen + .5)/2)+"%";  //half-width
                gameboard.appendChild(squarestagger);
            }
        }
    } else {
        //no stagger space needed to fill just one row
        for (let j=0; j<xlen; j++)
        {
            let square = document.createElement("div")
            square.classList.add("WorldCell")
            square.setAttribute('id', "squareNum"+String(j) )
            square.style.height = "100%"
            square.style.width = String(100/xlen)+"%"
            gameboard.appendChild(square)
        }
    }

    /*for debugging purposes: places numbers in tiles*
    setTileText(getTileID({x:0,y:0}), '2');
    setTileText(getTileID({x:1,y:1}), '2');
    setTileText(getTileID({x:5,y:8}), '5');
    //*/
    
    return false;
}

/** 
 * Delivers the element ID of a specified cell.
 * 
 * @param {vector} p A set of coordinates.
 * @return {string} element ID of tile.
 */ 
function getTileID(p)
{
    //(grab) board params
    let xlen = parseInt(sessionStorage.getItem("xlen"));
    
    //square id = squareNum#, with # = y*xlen+x
    return "squareNum" + String(p.y*xlen+p.x);
}

/** 
 * Sets the char shown within a tile
 * 
 * @param {string} tileID A set of coordinates.
 * @param {char} letter A character to display.
 */ 
function setTileText(tileID, letter, color ="")
{
    //uses svg to make tiny text fit.
    let myElement = document.getElementById(tileID);
    myElement.innerHTML = '<svg viewBox="0 0 12 17" class="squareText"> <text x="0" y="17">' + String(letter) + '</text> </svg>';
    myElement.style.backgroundColor = color;
}
