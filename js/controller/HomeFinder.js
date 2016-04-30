var HomeFinder = 
{
	map: null,
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
	getPath( startPoint, endPoint )
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
		        neighbors = [],
		        s0 = false, d0 = false,
		        s1 = false, d1 = false,
		        s2 = false, d2 = false,
		        s3 = false, d3 = false,
		        nodes = this.nodes;


		    // ↑
		    if (this.isWalkableAt(x, y - 1)) {
		        neighbors.push(nodes[y - 1][x]);
		        s0 = true;
		    }
		    // →
		    if (this.isWalkableAt(x + 1, y)) {
		        neighbors.push(nodes[y][x + 1]);
		        s1 = true;
		    }
		    // ↓
		    if (this.isWalkableAt(x, y + 1)) {
		        neighbors.push(nodes[y + 1][x]);
		        s2 = true;
		    }
		    // ←
		    if (this.isWalkableAt(x - 1, y)) {
		        neighbors.push(nodes[y][x - 1]);
		        s3 = true;
		    }
		    
		    return neighbors;
		};
	}
}