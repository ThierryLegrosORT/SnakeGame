window.onload = function() {

    let canvas;
    let ctx;
    const delay = 100;
    let xCoord = null;
    let yCoord = null;

    init();

    function init() {

        canvas = document.createElement("canvas");
        canvas.width = 900;
        canvas.height = 600;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);

        ctx = canvas.getContext("2d");
        refreshCanvas();
    }

    function refreshCanvas() {

        xCoord += 5;
        yCoord += 5;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(xCoord, yCoord, 100, 25);
        setTimeout(refreshCanvas, delay);

    }
}