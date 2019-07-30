class Layer {
	constructor(width, height, mult) {
		
		this.width = width;
		this.height = height;
		
		this.mult = mult*5;
		
		this.stars = [];
		for(var i = 0; i < 4; i++) {
			//let x = -this.width + Math.floor((Math.random() * ((this.width*2) + 1)));
			//let y = -this.height + Math.floor((Math.random() * ((this.height*2) + 1)));
			let x = Math.floor(Math.random()*(this.width+1));
			let y = Math.floor(Math.random()*(this.height+1));
			this.stars.push(new Star(x,y,100*(mult/1)));
		}
	}
	
	calcNewXY(EV, speed) {
		
		for(var i = 0; i < this.stars.length; i++) {
			this.stars[i].deg += Math.random()*0.5;
			this.stars[i].x -= EV[0]*this.mult*speed;
			this.stars[i].y -= EV[1]*this.mult*speed;
			
			
			if(this.stars[i].x < 0 - this.stars[i].size) {
				this.stars[i].x = this.width + this.stars[i].size;
			}
			if(this.stars[i].x > this.width + this.stars[i].size) {
				this.stars[i].x = 0 - this.stars[i].size;
			}
			if(this.stars[i].y < 0 - this.stars[i].size) {
				this.stars[i].y = this.height + this.stars[i].size;
			}
			if(this.stars[i].y > this.height + this.stars[i].size) {
				this.stars[i].y = 0 - this.stars[i].size;
			}
			
		}
		
	}
	
	draw(context) {
		for(var i = 0; i < this.stars.length; i++) {
			this.stars[i].draw(context);
		}
	}
}