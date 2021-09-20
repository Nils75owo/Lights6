const can: HTMLCanvasElement = document.createElement("canvas");
const ctx: CanvasRenderingContext2D = can.getContext("2d");
document.body.appendChild(can);

let Dreiecke: Array<Dreieck> = [];
let mouse: object = { x: 0, y: 0}

class Dreieck {
  point1: object = { x: 0, y: 0 };
  point2: object = { x: 0, y: 0 };
  point3: object = { x: 0, y: 0 };
  pointv1: object = { x: 1, y: 1 };
  pointv2: object = { x: 1, y: 1 };
  pointv3: object = { x: 1, y: 1 };
  color: number = 0;
	lastMouse: object = { x: 0, y: 0 };
  constructor(
    point1: object,
    point2: object,
    point3: object,
    pointv1: object,
    pointv2: object,
    pointv3: object
  ) {
    this.point1 = point1;
    this.point2 = point2;
    this.point3 = point3;
    this.pointv1 = pointv1;
    this.pointv2 = pointv2;
    this.pointv3 = pointv3;
  }

  update = () => {
		this.lastMouse["x"] += (mouse["x"] - this.lastMouse["x"]) * 0.15
		this.lastMouse["y"] += (mouse["y"] - this.lastMouse["y"]) * 0.15



    //this.point1["x"] += this.pointv1["x"];
    this.point2["x"] += this.pointv2["x"];
    this.point3["x"] += this.pointv3["x"];
    //this.point1["y"] += this.pointv1["y"];
    this.point2["y"] += this.pointv2["y"];
    this.point3["y"] += this.pointv3["y"];

		//this.point1["x"] = this.lastMouse["x"];
		//this.point1["y"] = this.lastMouse["y"];
		this.point1["x"] = mouse["x"];
		this.point1["y"] = mouse["y"];

    this.color++;

    //if (this.point1["x"] < 0 || this.point1["x"] > can.width)
      //this.pointv1["x"] *= -1;
    //if (this.point1["y"] < 0 || this.point1["y"] > can.height)
      //this.pointv1["y"] *= -1;
    if (this.point2["x"] < 0 || this.point2["x"] > can.width)
      this.pointv2["x"] *= -1;
    if (this.point2["y"] < 0 || this.point2["y"] > can.height)
      this.pointv2["y"] *= -1;
    if (this.point3["x"] < 0 || this.point3["x"] > can.width)
      this.pointv3["x"] *= -1;
    if (this.point3["y"] < 0 || this.point3["y"] > can.height)
      this.pointv3["y"] *= -1;

    this.draw();
  };

  draw = () => {
    ctx.beginPath();
    ctx.fillStyle = `hsl(${this.color}, 100%, 60%)`;
    ctx.arc(this.point1["x"], this.point1["y"], 0, 0, Math.PI * 2);
    ctx.arc(this.point2["x"], this.point2["y"], 0, 0, Math.PI * 2);
    ctx.arc(this.point3["x"], this.point3["y"], 0, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  };
}

const redrawCan = () => {
  can.width = window.innerWidth;
  can.height = window.innerHeight;
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, can.width, can.height);
};
redrawCan();
window.addEventListener("resize", redrawCan);

const animate = () => {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0,0,0,0.09)";
  ctx.fillRect(0, 0, can.width, can.height);
  for (let i = 0; i < Dreiecke.length; i++) {
    Dreiecke[i].update();
  }
};
animate();

const rn = (min: number, max: number) => {
  return min + Math.random() * max;
};

for (let i = 0; i < 1; i++) {
  Dreiecke.push(
    new Dreieck(
      { x: rn(0, can.width), y: rn(0, can.height) },
      { x: rn(0, can.width), y: rn(0, can.height) },
      { x: rn(0, can.width), y: rn(0, can.height) },
      { x: rn(1, 3), y: rn(1, 3) },
      { x: rn(1, 3), y: rn(1, 3) },
      { x: rn(1, 3), y: rn(1, 3) }
    )
  );
}

document.addEventListener("mousemove", (evt) => {
	mouse = {x: evt.x, y: evt.y}
})
