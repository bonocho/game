const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

const tileSize = 40;
const rows = 10;
const cols = 10;

const player = {
    x: 0,
    y: 0,
    color: 'blue'
};

const goal = {
    x: 9,
    y: 9,
    color: 'green'
};

const walls = [
    {x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3},
    {x: 2, y: 3}, {x: 3, y: 3}, {x: 3, y: 2}, {x: 3, y: 1},
    {x: 4, y: 1}, {x: 5, y: 1}, {x: 5, y: 2}, {x: 5, y: 3},
    {x: 5, y: 4}, {x: 6, y: 4}, {x: 7, y: 4}, {x: 7, y: 3},
    {x: 7, y:2}, {x: 7, y: 1}, {x: 7, y: 0}, {x: 8, y: 0},
    {x: 9, y: 0}, {x: 9, y: 1}, {x: 9, y: 2}, {x: 9, y: 3},
];

function drawTile(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
}

function drawMaze() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawTile(player.x, player.y, player.color);
    drawTile(goal.x, goal.y, goal.color);

    walls.forEach(wall => {
        drawTile(wall.x, wall.y, 'black');
    });
}

function movePlayer(dx, dy) {
    const newX = player.x + dx;
    const newY = player.y + dy;

    if (newX >= 0 && newX < cols && newY >= 0 && newY < rows) {
        const isWall = walls.some(wall => wall.x === newX && wall.y === newY);

        if (!isWall) {
            player.x = newX;
            player.y = newY;

            if (player.x === goal.x && player.y === goal.y) {
                alert('You win!');
                player.x = 0;
                player.y = 0;
            }
        }
    }

    drawMaze();
}

document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            movePlayer(0, -1);
            break;
        case 'ArrowDown':
            movePlayer(0, 1);
            break;
        case 'ArrowLeft':
            movePlayer(-1, 0);
            break;
        case 'ArrowRight':
            movePlayer(1, 0);
            break;
    }
});

drawMaze();
