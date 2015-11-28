'use strict'

var express = require('express')
var http = require('http')
var socketio = require('socket.io')
var uuid = require('uuid')
var C = require('./config.js')

var app = express()
var server = http.createServer(app)
var io = socketio(server)

app.use(express.static('static'))

server.listen(C.PORT, function(){
	var host = server.address().address
	var port = server.address().port
	console.log('listening at http://%s:%s', host, port)
})
