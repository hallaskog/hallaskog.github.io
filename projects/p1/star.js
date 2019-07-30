
class Star {
	constructor(x , y, size) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.sprite = new Sprite("./p1/star.png");
		this.deg = 0;
	}
	
	draw(context) {
		this.sprite.drawImageRotated(this.x , this.y , this.size, this.size, this.deg, context);
	}
}