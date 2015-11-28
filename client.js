'use strict'
var socket = io()
window.socket = socket
var gameID = window.location.href.replace(/^.*game\//, '')
socket.emit('join', gameID)

var s2d = require('./lib/s2d.js')

var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 100)

var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

var ground = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshBasicMaterial({color: 0x005500}))
ground.rotation.x = -Math.PI/2
scene.add(ground)

var grid = new THREE.GridHelper(50, 5)
grid.position.y = .01
grid.setColors('black', 'black')
scene.add(grid)

var axes = new THREE.AxisHelper(10)
scene.add(axes)

var keysdown = {}
document.addEventListener('keydown', function(event){
	keysdown[event.key] = true
})
document.addEventListener('keyup', function(event){
	keysdown[event.key] = false
})

var lastTime = null
function frame(time){
	if(lastTime === null){
		lastTime = time
		requestAnimationFrame(frame)
		return
	}
	var delta = time - lastTime
	lastTime = time

	if(keysdown.ArrowLeft){
		camera.rotation.y += Math.PI/2 * delta/1000
	}
	if(keysdown.ArrowRight){
		camera.rotation.y -= Math.PI/2 * delta/1000
	}
	if(keysdown.ArrowUp){
		var angle = 2*Math.PI - camera.rotation.y - Math.PI/2
		var dx = Math.cos(angle) * 10 * delta/1000
		var dz = Math.sin(angle) * 10 * delta/1000
		camera.position.add(new THREE.Vector3(dx, 0, dz))
	}
	if(keysdown.ArrowDown){
		var angle = 2*Math.PI - camera.rotation.y - Math.PI/2
		var dx = Math.cos(angle) * 10 * delta/1000
		var dz = Math.sin(angle) * 10 * delta/1000
		camera.position.sub(new THREE.Vector3(dx, 0, dz))
	}

	renderer.render(scene, camera)
	requestAnimationFrame(frame)
}
frame()

//camera.rotation.x = -Math.PI/2
//camera.position.y = 25
camera.position.y = 1

