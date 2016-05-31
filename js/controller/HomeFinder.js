var HomeFinder = 
{
	map: null,
    mapController: MapController,
	mapMatrix: null,
	finder: null,
	grid: null,
	init()
	{
		this.finder = new PF.AStarFinder();
		this.hackGrid();
	},
	loadMap( map )
	{
		this.map = map;
		this.mapMatrix = this.getMapMatrix();
		this.grid = new PF.Grid( map.sizeX, map.sizeY, this.mapMatrix );
		this.gridBackup = this.grid.clone();
	},
	getPath( startPoint, endPoint, vehicle )
	{
		var path = this.finder.findPath( startPoint.x, startPoint.y, endPoint.x, endPoint.y, this.grid );
		this.grid = this.gridBackup.clone();

		return path;
	},
	getMapMatrix()
	{
		var matrix = [];
		for (var y = 0; y < this.map.sizeY; y++) 
		{
			var row = [];
			for (var x = 0; x < this.map.sizeX; x++) 
			{
				var cellType = this.map.cells[ x ][ y ].type;
				if( cellType != MapCellType.BLOCK )
					row.push( 0 );
				else
					row.push( 1 );
				//0 - walkable, 1 - not walkable
			}
			matrix.push( row );
		}
		return matrix;
	},
	hackGrid()
	{

/**
 * Get the neighbors of the given node.
 *
 *     offsets      diagonalOffsets:
 *  +---+---+---+    +---+---+---+
 *  |   | 0 |   |    | 0 |   | 1 |
 *  +---+---+---+    +---+---+---+
 *  | 3 |   | 1 |    |   |   |   |
 *  +---+---+---+    +---+---+---+
 *  |   | 2 |   |    | 3 |   | 2 |
 *  +---+---+---+    +---+---+---+
 *
 *  When allowDiagonal is true, if offsets[i] is valid, then
 *  diagonalOffsets[i] and
 *  diagonalOffsets[(i + 1) % 4] is valid.
 * @param {Node} node
 * @param {DiagonalMovement} diagonalMovement
 */
PF.Grid.prototype.getNeighbors = function(node, diagonalMovement) {
    var x = node.x,
        y = node.y,
        parent = node.parent,
        neighbors = [],
        s0 = false, d0 = false,
        s1 = false, d1 = false,
        s2 = false, d2 = false,
        s3 = false, d3 = false,
        fromDirection = "",
        nodes = this.nodes;

    if( parent )
    {
        // ↓
        if( parent.x == x && parent.y > y )
            fromDirection = "S";
        // ↑
        if( parent.x == x && parent.y < y )
            fromDirection = "N";
        // →
        if( parent.x > x && parent.y == y )
            fromDirection = "E";
        // ←
        if( parent.x < x && parent.y == y )
            fromDirection = "W";
    }

    // ↑
    if ( this.isAllowed( x, y, fromDirection + "N") && this.isWalkableAt(x, y - 1 ) ) {
        neighbors.push(nodes[y - 1][x]);
        s0 = true;
    }
    // →
    if (this.isAllowed( x, y, fromDirection + "E") && this.isWalkableAt(x + 1, y )) {
        neighbors.push(nodes[y][x + 1]);
        s1 = true;
    }
    // ↓
    if (this.isAllowed( x, y, fromDirection + "S") && this.isWalkableAt(x, y + 1 )) {
        neighbors.push(nodes[y + 1][x]);
        s2 = true;
    }
    // ←
    if (this.isAllowed( x, y, fromDirection + "W") && this.isWalkableAt(x - 1, y )) {
        neighbors.push(nodes[y][x - 1]);
        s3 = true;
    }

    if (diagonalMovement === PF.DiagonalMovement.Never) {
        return neighbors;
    }

    if (diagonalMovement === PF.DiagonalMovement.OnlyWhenNoObstacles) {
        d0 = s3 && s0;
        d1 = s0 && s1;
        d2 = s1 && s2;
        d3 = s2 && s3;
    } else if (diagonalMovement === PF.DiagonalMovement.IfAtMostOneObstacle) {
        d0 = s3 || s0;
        d1 = s0 || s1;
        d2 = s1 || s2;
        d3 = s2 || s3;
    } else if (diagonalMovement === PF.DiagonalMovement.Always) {
        d0 = true;
        d1 = true;
        d2 = true;
        d3 = true;
    } else {
        throw new Error('Incorrect value of diagonalMovement');
    }

    // ↖
    if (d0 && this.isWalkableAt(x - 1, y - 1)) {
        neighbors.push(nodes[y - 1][x - 1]);
    }
    // ↗
    if (d1 && this.isWalkableAt(x + 1, y - 1)) {
        neighbors.push(nodes[y - 1][x + 1]);
    }
    // ↘
    if (d2 && this.isWalkableAt(x + 1, y + 1)) {
        neighbors.push(nodes[y + 1][x + 1]);
    }
    // ↙
    if (d3 && this.isWalkableAt(x - 1, y + 1)) {
        neighbors.push(nodes[y + 1][x - 1]);
    }

    return neighbors;
};

/**
 * Determine whether the node at the given position is walkable.
 * (Also returns false if the position is outside the grid.)
 * @param {number} x - The x coordinate of the node.
 * @param {number} y - The y coordinate of the node.
 * @return {boolean} - The walkability of the node.
 */
PF.Grid.prototype.isWalkableAt = function( x, y ) {
    return this.isInside(x, y) && this.nodes[y][x].walkable;
};

PF.Grid.prototype.isAllowed = function( x, y, direction ) 
{
    if( MapController.canMoveFromCell( x, y, direction ) )
    	return true;
  	else
    	return false;
};


	}
}