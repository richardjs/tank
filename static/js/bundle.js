/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var s2d = __webpack_require__(1);

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 100);

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	var ground = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshBasicMaterial({ color: 0x005500 }));
	ground.rotation.x = -Math.PI / 2;
	scene.add(ground);

	var grid = new THREE.GridHelper(50, 5);
	grid.position.y = .01;
	grid.setColors('black', 'black');
	scene.add(grid);

	var axes = new THREE.AxisHelper(10);
	scene.add(axes);

	var keysdown = {};
	document.addEventListener('keydown', function (event) {
		keysdown[event.key] = true;
	});
	document.addEventListener('keyup', function (event) {
		keysdown[event.key] = false;
	});

	var lastTime = null;
	function frame(time) {
		if (lastTime === null) {
			lastTime = time;
			requestAnimationFrame(frame);
			return;
		}
		var delta = time - lastTime;
		lastTime = time;

		if (keysdown.ArrowLeft) {
			camera.rotation.y += Math.PI / 2 * delta / 1000;
		}
		if (keysdown.ArrowRight) {
			camera.rotation.y -= Math.PI / 2 * delta / 1000;
		}
		if (keysdown.ArrowUp) {
			var angle = 2 * Math.PI - camera.rotation.y - Math.PI / 2;
			var dx = Math.cos(angle) * 10 * delta / 1000;
			var dz = Math.sin(angle) * 10 * delta / 1000;
			camera.position.add(new THREE.Vector3(dx, 0, dz));
		}
		if (keysdown.ArrowDown) {
			var angle = 2 * Math.PI - camera.rotation.y - Math.PI / 2;
			var dx = Math.cos(angle) * 10 * delta / 1000;
			var dz = Math.sin(angle) * 10 * delta / 1000;
			camera.position.sub(new THREE.Vector3(dx, 0, dz));
		}

		renderer.render(scene, camera);
		requestAnimationFrame(frame);
	}
	frame();

	//camera.rotation.x = -Math.PI/2
	//camera.position.y = 25
	camera.position.y = 1;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	Array.prototype.remove = function (obj) {
		this.splice(this.indexOf(obj), 1);
	};

	var Group = (function () {
		function Group(segments) {
			_classCallCheck(this, Group);

			this.segments = segments || [];
			this.center = new Vector(0, 0);
		}

		_createClass(Group, [{
			key: 'add',
			value: function add(segment) {
				this.segments.push(segment);
			}
		}, {
			key: 'intersects',
			value: function intersects(other) {
				if (other instanceof Segment) {
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;

					try {
						for (var _iterator = this.segments[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var segment = _step.value;

							var point = segment.intersects(segment);
							if (point) {
								return point;
							}
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator.return) {
								_iterator.return();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}

					return null;
				}
				if (other instanceof Group) {
					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;

					try {
						for (var _iterator2 = other.segments[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							var segment = _step2.value;

							var point = this.intersects(segment);
							if (point) {
								return point;
							}
						}
					} catch (err) {
						_didIteratorError2 = true;
						_iteratorError2 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion2 && _iterator2.return) {
								_iterator2.return();
							}
						} finally {
							if (_didIteratorError2) {
								throw _iteratorError2;
							}
						}
					}

					return null;
				}
			}
		}, {
			key: 'remove',
			value: function remove(segment) {
				this.segments.remove(segment);
			}
		}, {
			key: 'rotate',
			value: function rotate(angle) {
				var rotated = [];
				var _iteratorNormalCompletion3 = true;
				var _didIteratorError3 = false;
				var _iteratorError3 = undefined;

				try {
					for (var _iterator3 = this.segments[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
						var segment = _step3.value;

						rotated.push(segment.subtract(this.center).rotate(angle).add(this.center));
					}
				} catch (err) {
					_didIteratorError3 = true;
					_iteratorError3 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion3 && _iterator3.return) {
							_iterator3.return();
						}
					} finally {
						if (_didIteratorError3) {
							throw _iteratorError3;
						}
					}
				}

				this.segments = rotated;
			}
		}, {
			key: 'translate',
			value: function translate(vector) {
				var _iteratorNormalCompletion4 = true;
				var _didIteratorError4 = false;
				var _iteratorError4 = undefined;

				try {
					for (var _iterator4 = this.segments[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
						var segment = _step4.value;

						segment.translate(vector);
					}
				} catch (err) {
					_didIteratorError4 = true;
					_iteratorError4 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion4 && _iterator4.return) {
							_iterator4.return();
						}
					} finally {
						if (_didIteratorError4) {
							throw _iteratorError4;
						}
					}
				}

				this.center.translate(vector);
			}
		}]);

		return Group;
	})();

	var Segment = (function () {
		function Segment(a, b) {
			_classCallCheck(this, Segment);

			this.a = a;
			this.b = b;
		}

		//TODO doesn't handle identical slopes of overlapping segments properly, or infinite slopes
		//TODO perhaps use a different algebraic approach (point-slope?)

		_createClass(Segment, [{
			key: 'intersects',
			value: function intersects(other) {
				if (other instanceof Group) {
					return other.intersects(this);
				}

				if (this.slope === other.slope) {
					return null;
				}
				var x = (other.yIntercept - this.yIntercept) / (this.slope - other.slope);
				var y = this.slope * x + this.yIntercept;

				if (x < Math.min(this.a.x, this.b.x) || x > Math.max(this.a.x, this.b.x) || x < Math.min(other.a.x, other.b.x) || x > Math.max(other.a.x, other.b.x)) {
					return null;
				}

				return new Vector(x, y);
			}
		}, {
			key: 'translate',
			value: function translate(vector) {
				this.a.translate(vector);
				this.b.translate(vector);
			}
		}, {
			key: 'length',
			get: function get() {
				return Math.sqrt(Math.pow(this.a.x - this.b.x, 2) + Math.pow(this.a.y - this.b.y, 2));
			}
		}, {
			key: 'midpoint',
			get: function get() {
				return new Vector((this.a.x + this.b.x) / 2, (this.a.y + this.b.y) / 2);
			}
		}, {
			key: 'slope',
			get: function get() {
				return (this.a.y - this.b.y) / (this.a.x - this.b.x);
			}
		}, {
			key: 'yIntercept',
			get: function get() {
				return this.a.y - this.slope * this.a.x;
			}
		}]);

		return Segment;
	})();

	var Vector = (function () {
		function Vector(x, y) {
			_classCallCheck(this, Vector);

			this.x = x;
			this.y = y;
		}

		_createClass(Vector, [{
			key: 'add',
			value: function add(vector) {
				return new Vector(this.x + vector.x, this.y + vector.y);
			}
		}, {
			key: 'rotate',
			value: function rotate(angle) {
				var x = this.x * Math.cos(angle) - this.y * Math.sin(this.angle);
				var y = this.x * Math.sin(angle) + this.y * Math.cos(this.angle);
				return new Vector(x, y);
			}
		}, {
			key: 'subtract',
			value: function subtract(vector) {
				return new Vector(this.x - vector.x, this.y - vector.y);
			}
		}, {
			key: 'translate',
			value: function translate(vector) {
				this.x += vector.x;
				this.y += vector.y;
			}
		}, {
			key: 'length',
			get: function get() {
				return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.a.y, 2));
			}
		}]);

		return Vector;
	})();

	exports.Group = Group;
	exports.Segment = Segment;
	exports.Vector = Vector;

/***/ }
/******/ ]);