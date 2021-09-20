var can = document.createElement("canvas");
var ctx = can.getContext("2d");
document.body.appendChild(can);
var Dreiecke = [];
var mouse = { x: 0, y: 0 };
var Dreieck = /** @class */ (function () {
    function Dreieck(point1, point2, point3, pointv1, pointv2, pointv3) {
        var _this = this;
        this.point1 = { x: 0, y: 0 };
        this.point2 = { x: 0, y: 0 };
        this.point3 = { x: 0, y: 0 };
        this.pointv1 = { x: 1, y: 1 };
        this.pointv2 = { x: 1, y: 1 };
        this.pointv3 = { x: 1, y: 1 };
        this.color = 0;
        this.lastMouse = { x: 0, y: 0 };
        this.update = function () {
            _this.lastMouse["x"] += (mouse["x"] - _this.lastMouse["x"]) * 0.15;
            _this.lastMouse["y"] += (mouse["y"] - _this.lastMouse["y"]) * 0.15;
            //this.point1["x"] += this.pointv1["x"];
            _this.point2["x"] += _this.pointv2["x"];
            _this.point3["x"] += _this.pointv3["x"];
            //this.point1["y"] += this.pointv1["y"];
            _this.point2["y"] += _this.pointv2["y"];
            _this.point3["y"] += _this.pointv3["y"];
            //this.point1["x"] = this.lastMouse["x"];
            //this.point1["y"] = this.lastMouse["y"];
            _this.point1["x"] = mouse["x"];
            _this.point1["y"] = mouse["y"];
            _this.color++;
            //if (this.point1["x"] < 0 || this.point1["x"] > can.width)
            //this.pointv1["x"] *= -1;
            //if (this.point1["y"] < 0 || this.point1["y"] > can.height)
            //this.pointv1["y"] *= -1;
            if (_this.point2["x"] < 0 || _this.point2["x"] > can.width)
                _this.pointv2["x"] *= -1;
            if (_this.point2["y"] < 0 || _this.point2["y"] > can.height)
                _this.pointv2["y"] *= -1;
            if (_this.point3["x"] < 0 || _this.point3["x"] > can.width)
                _this.pointv3["x"] *= -1;
            if (_this.point3["y"] < 0 || _this.point3["y"] > can.height)
                _this.pointv3["y"] *= -1;
            _this.draw();
        };
        this.draw = function () {
            ctx.beginPath();
            ctx.fillStyle = "hsl(" + _this.color + ", 100%, 60%)";
            ctx.arc(_this.point1["x"], _this.point1["y"], 0, 0, Math.PI * 2);
            ctx.arc(_this.point2["x"], _this.point2["y"], 0, 0, Math.PI * 2);
            ctx.arc(_this.point3["x"], _this.point3["y"], 0, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        };
        this.point1 = point1;
        this.point2 = point2;
        this.point3 = point3;
        this.pointv1 = pointv1;
        this.pointv2 = pointv2;
        this.pointv3 = pointv3;
    }
    return Dreieck;
}());
var redrawCan = function () {
    can.width = window.innerWidth;
    can.height = window.innerHeight;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, can.width, can.height);
};
redrawCan();
window.addEventListener("resize", redrawCan);
var animate = function () {
    window.requestAnimationFrame(animate);
    ctx.fillStyle = "rgba(0,0,0,0.09)";
    ctx.fillRect(0, 0, can.width, can.height);
    for (var i = 0; i < Dreiecke.length; i++) {
        Dreiecke[i].update();
    }
};
animate();
var rn = function (min, max) {
    return min + Math.random() * max;
};
for (var i = 0; i < 1; i++) {
    Dreiecke.push(new Dreieck({ x: rn(0, can.width), y: rn(0, can.height) }, { x: rn(0, can.width), y: rn(0, can.height) }, { x: rn(0, can.width), y: rn(0, can.height) }, { x: rn(1, 3), y: rn(1, 3) }, { x: rn(1, 3), y: rn(1, 3) }, { x: rn(1, 3), y: rn(1, 3) }));
}
document.addEventListener("mousemove", function (evt) {
    mouse = { x: evt.x, y: evt.y };
});
