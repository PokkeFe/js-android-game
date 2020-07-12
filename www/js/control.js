const avWidth  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
const avHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

let dots = [];
let walker;

function setup() {
	createCanvas(avWidth,avHeight);
	walker = new Walker(width/2, height/2);
}

function draw() {
	background(51);
	stroke(53);
	fill(45);
	rect(10,10,width-20,height-20);

	for(let dot of dots){
		dot.draw();
	}
	walker.update();
	walker.show();
	walker.drawLine();
}

function mousePressed() {
	//dots.push(new Dot(mouseX, mouseY));
}


function mouseDragged() {
	//dots.push(new Dot(mouseX, mouseY));

}

class Dot {
	constructor(x,y) {
		this.pos = createVector(x, y);
	}

	draw() {
		push();
		stroke(240);
		fill(240);
		ellipse(this.pos.x, this.pos.y, 10);
		pop();
	}
}

class Walker {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector();
        this.acc = createVector();
        this.mass = 10;

        this.vel = p5.Vector.random2D();
    }

    update() {
        let mouse = createVector(mouseX, mouseY);
        if (!mouseIsPressed) {
			this.acc = createVector(0,0);
			this.vel = createVector(0,0);
        } else {
            this.acc = p5.Vector.sub(mouse, this.pos);
            this.acc.setMag(0.1);
        }
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.force = p5.Vector.mult(this.acc, this.mass);
    }

    show() {
        stroke(255, 100);
        fill(250, 100);
        ellipse(this.pos.x, this.pos.y, 32);
    }

    showForce() {
        text('(' + this.force.x + "," + this.force.y + ")", 10, 30);
	}
	
	drawLine() {
		if (mouseIsPressed) {
			stroke(255);
			strokeWeight(0.5);
			line(this.pos.x, this.pos.y, mouseX, mouseY);
		}
	}
}