'use strict'

Array.prototype.remove = function(obj){
	this.splice(this.indexOf(obj), 1)
}

class Group{
	constructor(segments){
		this.segments = segments || []
		this.center = new Vector(0, 0)
	}

	add(segment){
		this.segments.push(segment)
	}

	intersects(other){
		if(other instanceof Segment){
			for(var segment of this.segments){
				var point = segment.intersects(segment)
				if(point){
					return point
				}
			}
			return null
		}
		if(other instanceof Group){
			for(var segment of other.segments){
				var point = this.intersects(segment)
				if(point){
					return point
				}
			}
			return null
		}
	}

	remove(segment){
		this.segments.remove(segment)
	}

	rotate(angle){
		var rotated = []
		for(var segment of this.segments){
			rotated.push(segment.subtract(this.center).rotate(angle).add(this.center))
		}
		this.segments = rotated
	}

	translate(vector){
		for(var segment of this.segments){
			segment.translate(vector)
		}
		this.center.translate(vector)
	}
}

class Segment{
	constructor(a, b){
		this.a = a
		this.b = b
	}

	//TODO doesn't handle identical slopes of overlapping segments properly, or infinite slopes
	//TODO perhaps use a different algebraic approach (point-slope?)
	intersects(other){
		if(other instanceof Group){
			return other.intersects(this)
		}

		if(this.slope === other.slope){
			return null
		}
		var x = (other.yIntercept - this.yIntercept) / (this.slope - other.slope)
		var y = this.slope*x + this.yIntercept

		if(x < Math.min(this.a.x, this.b.x) || x > Math.max(this.a.x, this.b.x)
				|| x < Math.min(other.a.x, other.b.x) || x > Math.max(other.a.x, other.b.x)){
			return null
		}

		return new Vector(x, y)
	}

	get length(){
		return Math.sqrt(Math.pow(this.a.x - this.b.x, 2) + Math.pow(this.a.y - this.b.y, 2))
	}

	get midpoint(){
		return new Vector((this.a.x + this.b.x)/2, (this.a.y + this.b.y)/2)
	}

	get slope(){
		return (this.a.y - this.b.y) / (this.a.x - this.b.x)
	}

	translate(vector){
		this.a.translate(vector)
		this.b.translate(vector)
	}

	get yIntercept(){
		return this.a.y - this.slope*this.a.x
	}
}

class Vector{
	constructor(x, y){
		this.x = x
		this.y = y
	}

	add(vector){
		return new Vector(this.x + vector.x, this.y + vector.y)
	}

	get length(){
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.a.y, 2))
	}

	rotate(angle){
		var x = this.x*Math.cos(angle) - this.y*Math.sin(this.angle)
		var y = this.x*Math.sin(angle) + this.y*Math.cos(this.angle)
		return new Vector(x, y)
	}

	subtract(vector){
		return new Vector(this.x - vector.x, this.y - vector.y)
	}

	translate(vector){
		this.x += vector.x
		this.y += vector.y
	}
}

exports.Group = Group
exports.Segment = Segment
exports.Vector = Vector
