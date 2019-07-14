window.onload = function() {

    const canvasWidth = 900;
    const canvasHeight = 600;
    let ctx;
    const delay = 200;
    let snakee;
    const blockSize = 30;

    init();


    function init() {

        const canvas = document.createElement("canvas");
        canvas.style.border = "1px solid";
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        snakee = new snake([
            [6, 4],
            [5, 4],
            [4, 4],
        ], "right");
        refreshCanvas();
    }

    function refreshCanvas() {

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        snakee.draw();
        snakee.advance();
        setTimeout(refreshCanvas, delay);

    }

    function drawBlock(ctx, position) {
        let x = position[0] * blockSize;
        let y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize);
    }

    function snake(body, direction) {
        this.body = body;
        this.direction = direction;
        this.draw = function() {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for (i = 0; i < this.body.length; i++) {
                drawBlock(ctx, this.body[i]);
            };
            ctx.restore();
        }
        this.advance = function() {
            let nextPosition = this.body[0].slice();
            switch (this.direction) {
                case "left":
                    nextPosition[0] -= 1;
                    break;
                case "right":
                    nextPosition[0] += 1;
                    break;
                case "down":
                    nextPosition[1] += 1;
                    break;
                case "top":
                    nextPosition[1] -= 1;
                    break;
                default:
                    throw ("Invalid Direction");
            }
            this.body.unshift(nextPosition);
            this.body.pop();
        };
        this.setDirection = function(newDirection) {
            let allowedDirection;
            switch (this.direction) {
                case "left":
                case "right":
                    allowedDirection = ["top", "down"];
                    break;
                case "down":
                case "top":
                    allowedDirection = ["left", "right"];
                    break;
                default:
                    throw ("Invalid Direction");

            }
            if (allowedDirection.indexOf(newDirection) > -1) {
                this.direction = newDirection;
            }
        };
    }


    document.onkeydown = function handleKeyDown(e) {
        let key = e.keyCode;
        let newDirection;
        switch (key) {
            case 37:
                newDirection = "left";
                break;
            case 38:
                newDirection = "top";
                break;
            case 39:
                newDirection = "right";
                break;
            case 40:
                newDirection = "down";
                break;
            default:
                return;

        }
        snakee.setDirection(newDirection);
    }
}