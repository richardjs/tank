'use strict'

var express = require('express')
var http = require('http')
var socketio = require('socket.io')
var uuid = require('uuid')
var C = require('./config.js')

var app = express()
var server = http.createServer(app)
var io = socketio(server)

var games = {}

app.get('/', function(req, res){
	res.redirect('/game/'+uuid.v4())
})

app.get('/game/:gameid', function(req, res){
	res.sendFile('game.html', {root: './static'})
})

app.use(express.static('static'))

io.on('connection', function(socket){
	console.log('connection')
	var game = null

	socket.on('join', function(gameID){
		if(!gameID in games){
			games[gameID] = 'game goes here'
		}
		game = games[gameID]
		// game.addPlayer(socket)
	})
})

server.listen(C.PORT, function(){
	var host = server.address().address
	var port = server.address().port
	console.log('listening at http://%s:%s', host, port)
})
