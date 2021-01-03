var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d");

var height = canvas.height = window.innerHeight;
var width = canvas.width = window.innerWidth;



var map = {

    tile_size: 20,

    /*
    
    Key vairables:
    
    id       [required] - an integer that corresponds with a tile in the data array.
    colour   [required] - any javascript compatible colour variable.
    solid    [optional] - whether the tile is solid or not, defaults to false.
    bounce   [optional] - how much velocity is preserved upon hitting the tile, 0.5 is half.
    jump     [optional] - whether the player can jump while over the tile, defaults to false.
    friction [optional] - friction of the tile, must have X and Y values (e.g {x:0.5, y:0.5}).
    gravity  [optional] - gravity of the tile, must have X and Y values (e.g {x:0.5, y:0.5}).
    fore     [optional] - whether the tile is drawn in front of the player, defaults to false.
    script   [optional] - refers to a script in the scripts section, executed if it is touched.
    
    */

    keys: [
        { name: 'Empty dark', id: 0, colour: '#333', solid: 0 },
        { name: 'Space', id: 1, colour: '#888', solid: 0 },
        { name: 'Wall', id: 2, colour: '#555', solid: 1, bounce: 0.35 },
        { name: 'Water', id: 3, colour: 'rgba(121, 220, 242, 0.4)', friction: { x: 0.9, y: 0.9 }, gravity: { x: 0, y: 0.1 }, jump: 1, fore: 1 },
        { name: 'Jump 1', id: 4, colour: '#777', jump: 1 },
        { name: 'Jumpgroud', id: 5, colour: '#E373FA', solid: 1, bounce: 1.1 },
        { name: 'No bounce', id: 6, colour: '#666', solid: 1, bounce: 0 },
        { name: 'Magic', id: 7, colour: '#73C6FA', solid: 0, script: 'change_colour' },
        { name: 'Next level', id: 8, colour: '#FADF73', solid: 0, script: 'next_level' },
        { name: 'Lava', id: 9, colour: '#C93232', solid: 0, script: 'death' },
        { name: 'Locked', id: 10, colour: '#555', solid: 1 },
        { name: 'Unlock', id: 11, colour: '#0FF', solid: 0, script: 'unlock' }
    ],

    /* An array representing the map tiles. Each number corresponds to a key */
    data: [[2,2,2,2,2,2,2,2,2,2,2,2,2],[2,1,1,1,1,1,1,1,1,1,1,1,2],[2,1,1,1,1,1,1,1,1,1,1,1,2],[2,1,1,1,1,1,1,1,1,1,1,1,2],[2,1,1,1,1,1,1,1,1,1,1,1,2],[2,1,1,1,1,1,1,0,0,0,0,1,2],[2,1,1,1,1,1,1,0,0,0,0,1,2],[2,1,1,1,1,1,1,1,1,1,1,1,2],[2,1,1,1,1,1,1,1,1,1,1,1,2],[2,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,6,6,6,6,6,2],[2,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1,2],[2,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1,2],[2,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,1,1,1,1,2],[2,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,1,1,1,1,1,2,2,2],[2,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,7,1,1,1,1,1,1,1,2],[2,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,4,2,2,2,1,2],[2,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,4,2,1,1,1,2],[2,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,4,2,1,2,2,2],[2,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,4,2,1,2],[2,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,4,2,1,2],[2,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,4,2,1,2],[2,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,4,2,1,2],[2,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,4,2,1,2],[2,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,4,2,1,2],[2,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,4,2,1,2],[2,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,4,2,1,2],[2,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,4,2,1,2],[2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,2,1,2],[2,1,1,1,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,4,2,1,2],[2,1,1,1,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,4,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2],[2,1,2,1,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,4,2,1,2,2,2,2,2,2,2,2,1,1,1,1,2],[2,1,2,2,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,4,2,1,2,2,2,2,2,2,2,2,1,1,1,1,2],[2,1,2,2,2,1,1,1,1,1,2,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,4,2,1,2,2,2,2,2,2,2,2,1,1,1,1,2],[2,1,2,2,2,2,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,2,1,2,2,2,2,2,2,2,2,8,1,1,1,2],[2,1,2,2,2,2,2,2,2,2,2,6,2,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,4,2],[2,1,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,2,2,2,9,9,9,2,10,10,10,10,10,10,1,1,1,1,1,1,1,11,2,2,2,2,4,2],[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,10,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,2],[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,2],[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,2,2,2,2,2,2,2,2],[2,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,2,1,1,1,1,1,1,2],[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,1,1,1,1,1,1,1,2],[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2],[2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,6,6,6,2,2,2,2,2,2,6,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],[2,1,1,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],[2,1,1,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],[2,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],[2,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,1,1,1,1,2,5,5,2,1,1,1,1,1,1,1,1,1,1,1,2],[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,2],[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,2],[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,2],[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,2],[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,2],[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,2],[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,2],[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,2],[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2],[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2],[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,5,1,1,1,1,1,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2],[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]],
    /* scripts refered to by the "script" variable in the tile keys */

    scripts: {
        /* you can just use "this" instead of your engine variable ("game"), but Codepen doesn't like it */
        change_colour: 'game.player.colour = "#"+(Math.random()*0xFFFFFF<<0).toString(16);',
        /* you could load a new map variable here */
        next_level: 'alert("Yay! You won! Reloading map.");game.load_map(map);',
        death: 'alert("You died!");game.load_map(map);',
        unlock: 'game.current_map.keys[10].solid = 0;game.current_map.keys[10].colour = "#888";'
    }
};

/* Clarity engine */

var Clarity = function () {

    this.alert_errors = false;
    this.log_info = true;
    this.tile_size = 16;
    this.limit_viewport = false;
    this.jump_switch = 0;

    // viewport = ?? 
    this.viewport = {
        x: window.innerWidth,
        y: window.innerHeight
    };

    this.camera = {
        x: 0,
        y: 0
    };

};

Clarity.prototype.load_map = function (map) {

    if (typeof map === 'undefined'
        || typeof map.data === 'undefined'
        || typeof map.keys === 'undefined') {

        this.error('Error: Invalid map data!');

        return false;
    }

    this.current_map = map;

    this.current_map.background = map.background || '#333';
    this.current_map.gravity = map.gravity || { x: 0, y: 0.3 };
    this.tile_size = map.tile_size || 16;

    var _this = this;

    this.current_map.width = 0;
    this.current_map.height = 0;

    map.keys.forEach(function (key) {

        map.data.forEach(function (row, y) {

            _this.current_map.height = Math.max(_this.current_map.height, y);

            row.forEach(function (tile, x) {

                _this.current_map.width = Math.max(_this.current_map.width, x);

                if (tile == key.id)
                    _this.current_map.data[y][x] = key;
            });
        });
    });

    this.current_map.width_p = this.current_map.width * this.tile_size;
    this.current_map.height_p = this.current_map.height * this.tile_size;

    this.camera = {
        x: 0,
        y: 0
    };

    return true;
};

Clarity.prototype.get_tile = function (x, y) {

    return (this.current_map.data[y] && this.current_map.data[y][x]) ? this.current_map.data[y][x] : 0;
};

Clarity.prototype.draw_tile = function (x, y, tile, context) {

    if (!tile || !tile.colour) return;

    context.fillStyle = tile.colour;
    context.fillRect(
        x,
        y,
        this.tile_size,
        this.tile_size
    );
};

Clarity.prototype.draw_map = function (context, fore) {

    for (var y = 0; y < this.current_map.data.length; y++) {

        for (var x = 0; x < this.current_map.data[y].length; x++) {
            if (this.current_map.data[y][x] === undefined) {
                return
            }else{
                if ((!fore && !this.current_map.data[y][x].fore) || (fore && this.current_map.data[y][x].fore)) {

                    var t_x = (x * this.tile_size) - this.camera.x;
                    var t_y = (y * this.tile_size) - this.camera.y;

                    if (t_x < -this.tile_size
                        || t_y < -this.tile_size
                        || t_x > this.viewport.x
                        || t_y > this.viewport.y) continue;

                    this.draw_tile(
                        t_x,
                        t_y,
                        this.current_map.data[y][x],
                        context
                    );
                }
            }
        }
    }

    if (!fore) this.draw_map(context, true);
};

Clarity.prototype.draw = function (context) {

    this.draw_map(context, false);
};

Clarity.prototype.newTile = function (x, y) {
    var n_x = Math.round( x / this.tile_size);
    var n_y = Math.round( y / this.tile_size);
    var e = document.getElementById("tiles");
    // get selected tile from editor menu
    var selectedTile = map.keys[e.value]

    // draw horizontal if 1 next to it is defined
    if (this.current_map.data[n_y][n_x - 1] !== undefined || this.current_map.data[n_y][n_x] !== undefined ) {
        this.current_map.data[n_y][n_x] = selectedTile;
        game.draw(ctx);
    } else {
        // let hasRowAbove 
        // let hasRowUnder

        // Vertical allow of +1 or -1 has a block
        if (this.current_map.data[n_y - 1][n_x] !== undefined || this.current_map.data[n_y + 1][n_x] !== undefined) {
           
            
            // if array n_y length is < than n_x  
            if (this.current_map.data[n_y].length < n_x) {
                console.log("hello");
                for (let index = this.current_map.data[n_y].length; index <  n_x; index++) {
                    this.current_map.data[n_y][index] = 3;
                }   
            }
            this.current_map.data[n_y][n_x] = selectedTile;
            game.draw(ctx);
        } else {
            return ;
        } 
    }
}

var game = new Clarity();
game.load_map(map);
console.log(game);

/* Limit the viewport to the confines of the map */
game.limit_viewport = true;

// ctx.fillStyle = '#333';
ctx.fillRect(0, 0, canvas.width, canvas.height);

game.draw(ctx);


// MAP EDIT CONTROLS
var mouseDown = false;

document.addEventListener('mousedown', function(e) {
    mouseDown = true;
}, true);

document.addEventListener('mouseup', function() {
    mouseDown = false;
}, true);

document.addEventListener("mousemove", function (e){
    if(mouseDown){
        game.newTile(e.clientX, e.clientY);
    }
}, false);

document.addEventListener("click", function (e){
    game.newTile(e.clientX, e.clientY);
}, false);

// set the tiles select options
var select = document.getElementById("tiles");
for(index in map.keys) {
    select.options[select.options.length] = new Option(map.keys[index].name, map.keys[index].id);
}


// EXPORT functionalities
var saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName) {
        var json = JSON.stringify(data),
            blob = new Blob([json], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
    }());
    
    
function minimizeMap(mapData) {
    let minimizedMap = [];
    mapData.forEach(elementA => {
        let row = [];
        elementA.forEach(element => {
            console.log(element.id);
            row.push(element.id)
        });
        minimizedMap.push(row);
    });
    console.log("Map is minimized");
    return minimizedMap;
}

function save(){
    let date = new Date()
    let fileName = date.toDateString()+"-map.json";
    // Save minimized map data with FileName
    saveData(minimizeMap(map.data), fileName);
}
