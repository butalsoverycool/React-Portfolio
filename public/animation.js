
/*
* Noel Delgado - @pixelia_me
* Inspiration: https://dingundding.tumblr.com/post/99836716906
*/

/* https://threejs.org/examples/js/Detector.js */

//document.onclick = (e) => console.log('position', e.offsetX, e.offsetY);

let navExists = false;

animInit = () => {
	navExists = true;
	//console.log('threejs init...');

	const nav = document.querySelector('.Navigation');


	// globals
	const _size = () => {
		let landscape = window.innerWidth > window.innerHeight;
		let winW = window.innerWidth,
			winH = window.innerHeight,
			navH = nav.clientHeight;

		w = landscape
			? winH
			: winW;

		h = navH;

		return { w, h };
	}
	// landscape: w: winH, h: winH / 2
	// portrait: w: winW, h: winW / 2


	// width: (100vw)
	// height: 50vw;
	// portrait: max-height: 300px;
	// landscape: max-height: 50vh;

	let GRID = 2, /* cols, rows */
		_width = _size().w,//window.innerWidth,
		_height = _size().h,
		/* _height = window.innerHeight, */
		PI = Math.PI,
		card_SIZE = 200,//setCardsize(), /* width, height */
		MAIN_COLOR = 0xffffff,
		SECONDARY_COLOR = 0x000,// 0x888888,
		navAnim = [],
		navCards = [],
		renderer = new THREE.WebGLRenderer(),
		camera = new THREE.PerspectiveCamera(30, 3/* _height */, 1, 10000),
		scene = new THREE.Scene(),
		group = new THREE.Object3D(),
		debug = false;

    /* function updateCam() {
        camera.setViewOffset(_width, _height, _width * 0, -_height / 100, _width, _height);
    } */

	//updateCam();

	let rangeConfig = {
		randomInRange: (min, max) => {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
	};

	const random = (min, max) => {
		min = Math.ceil(min * 100);
		max = Math.floor(max * 100);
		return (Math.floor(Math.random() * (max - min + 1)) + min) / 100;
	}

	// Handle compatibility issues
	var Detector = {
		canvas: !!window.CanvasRenderingContext2D,
		webgl: (function () {
			try {
				var e = document.createElement("canvas");
				e.className = 'canvasNav'
				return (
					!!window.WebGLRenderingContext &&
					(e.getContext("webgl") || e.getContext("experimental-webgl"))
				);
			} catch (t) {
				return false;
			}
		})(),
		workers: !!window.Worker,
		fileapi: window.File && window.FileReader && window.FileList && window.Blob,
		getWebGLErrorMessage: function () {
			var e = document.createElement("div");
			e.id = "webgl-error-message";
			e.style.fontFamily = "monospace";
			e.style.fontSize = "13px";
			e.style.fontWeight = "normal";
			e.style.textAlign = "center";
			e.style.background = "#fff";
			e.style.color = "#000";
			e.style.padding = "1.5em";
			e.style.width = "400px";
			e.style.margin = "5em auto 0";
			if (!this.webgl) {
				e.innerHTML = window.WebGLRenderingContext
					? [
						'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />',
						'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
					].join("\n")
					: [
						'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>',
						'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
					].join("\n");
			}
			return e;
		},
		addGetWebGLMessage: function (e) {
			var t, n, r;
			e = e || {};
			t = e.parent !== undefined ? e.parent : document.body;
			n = e.id !== undefined ? e.id : "oldie";
			r = Detector.getWebGLErrorMessage();
			r.id = n;
			t.appendChild(r);
		}
	}; // Detector

	if (!Detector.webgl) Detector.addGetWebGLMessage();


	function setCardsize() {
		let res = window.innerWidth / 3;
		// if ladnscape
		if (window.innerWidth > window.innerHeight && res > 200) {
			res = 200;
		}
		return 200;// res;
	}

	let TOTAL_navCards = GRID * GRID,
		WALL_SIZE = GRID * card_SIZE;
	let HALF_WALL_SIZE = WALL_SIZE / 2;

	// cam position
	const camXYZ = () => {
		let w = window.innerWidth,
			h = window.innerHeight,
			x = 0,
			y = 300,
			z = 1000;

		// portrait
		if (h > w) {
			switch (true) {
				case w < 350: // very narrow
					y = 550;
					z = 1800;
					break;
				case w < 420: // narrow
					y = 420;
					z = 1500;
					break;
				default:
					z = 1200;
			}
		}
		// landscape
		else {
			y = 250;
		}
		z = 500;
		y = 0;
		return { x, y, z };
	}


	// shoot scene
	setupCamera(camXYZ().x, camXYZ().y, camXYZ().z);
	setupBox(group);
	setupFloor(group);
	setupNavCards(group);
	setupLights(group);
	group.position.y = 50;
	group.rotation.set(-60 * (PI / 180), 0, -45 * (PI / 180));
	scene.add(group);
	setupRenderer(document.querySelector('.Navigation'))




	/* -- -- */
	if (debug) render();
	else TweenMax.ticker.addEventListener("tick", render);
	window.addEventListener("resize", resizeHandler, false);

	//document.querySelector('.NavToggle').addEventListener('click', waitForNavRise, false);

	function waitForNavRise() {
		// if nav will go down, bail
		if (nav.clientHeight > 0) {
			return;
		}

		// else repeat resizeHandler
		let navInter = setInterval(() => {
			console.log('tryin resize again');

			resizeHandler();

			// if nav is upp, clear interval
			if (nav.clientHeight > 0) {
				clearInterval(navInter);
				console.log('cleared inter');
				return;
			}
		}, 200);
	}

	/* -- -- */
	function resizeHandler() {
		//console.log('three resizehandler...');
		//updateOverlayPos();

		navH = nav.clientHeight;
		//console.log('navH', navH);

		//_width = window.innerWidth;
		//_height = window.innerHeight;

		//card_SIZE = setCardsize();
		setupCamera(camXYZ().x, camXYZ().y, camXYZ().z);
		renderer.setSize(_size().w, _size().h);
		camera.aspect = _size().w / _size().h;
		//camera.updateProjectionMatrix();

	}



	// cam
	function setupCamera(x, y, z) {
		camera.position.set(x, y, z);
		scene.add(camera);
	}

	// box
	function setupBox(parent) {
		var i, boxesArray, geometry, material;

		boxesArray = [];
		geometry = new THREE.BoxGeometry(WALL_SIZE, WALL_SIZE, 0.05);
		geometry.faces[8].color.setHex(SECONDARY_COLOR);
		geometry.faces[9].color.setHex(SECONDARY_COLOR);
		geometry.colorsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial({
			color: MAIN_COLOR,
			vertexColors: THREE.FaceColors
		});

		for (i = 0; i < 5; i++) {
			boxesArray.push(new THREE.Mesh(geometry, material));
		}

		// back
		boxesArray[0].position.set(0, HALF_WALL_SIZE, -HALF_WALL_SIZE);
		boxesArray[0].rotation.x = 90 * (PI / 180);

		// right
		boxesArray[1].position.set(HALF_WALL_SIZE, 0, -HALF_WALL_SIZE);
		boxesArray[1].rotation.y = -90 * (PI / 180);

		// front
		boxesArray[2].position.set(0, -HALF_WALL_SIZE, -HALF_WALL_SIZE);
		boxesArray[2].rotation.x = -90 * (PI / 180);

		// left
		boxesArray[3].position.set(-HALF_WALL_SIZE, 0, -HALF_WALL_SIZE);
		boxesArray[3].rotation.y = 90 * (PI / 180);

		// bottom
		boxesArray[4].position.set(0, 0, -WALL_SIZE);

		boxesArray.forEach(function (box) {
			parent.add(box);
		});
	}

	// floor
	function setupFloor(parent) {
		var i, tilesArray, geometry, material;

		tilesArray = [];
		geometry = new THREE.PlaneBufferGeometry(WALL_SIZE, WALL_SIZE);
		material = new THREE.MeshLambertMaterial({
			color: MAIN_COLOR
		});

		for (i = 0; i < 8; i++) {
			tilesArray.push(new THREE.Mesh(geometry, material));
		}

		tilesArray[0].position.set(-WALL_SIZE, WALL_SIZE, 0);
		tilesArray[1].position.set(0, WALL_SIZE, 0);
		tilesArray[2].position.set(WALL_SIZE, WALL_SIZE, 0);
		tilesArray[3].position.set(-WALL_SIZE, 0, 0);
		tilesArray[4].position.set(WALL_SIZE, 0, 0);
		tilesArray[5].position.set(-WALL_SIZE, -WALL_SIZE, 0);
		tilesArray[6].position.set(0, -WALL_SIZE, 0);
		tilesArray[7].position.set(WALL_SIZE, -WALL_SIZE, 0);

		tilesArray.forEach(function (tile) {
			tile.receiveShadow = true;
			parent.add(tile);
		});
	}


	// navcards anim
	function animateNavCard(parent, elem, index = null, configParams = null) {
		//console.log('animation intro')
		let direction = index === 1 || index === 2 ? 'x' : 'y';

		let config = {
			ease: Elastic.easeInOut,
			delay: 3/* rangeConfig.randomInRange(minDelay, maxDelay) */,
			repeat: -1,
			yoyo: true,
			[direction]: random(.01, .07),
			onComplete: () => {
				//console.log(`navcard-${index} anim stopped.`);
			}
		}

		// override config
		for (let option in configParams) {
			config[option] = configParams[option];
		}

		navAnim[index] = TweenMax.to(
			[elem.rotation],
			rangeConfig.randomInRange(2, 6),
			config
		);

		// for pausing on click
		const thisTween = navAnim[index];

		// pause when yoyo completed
		let yoyoComplete = true;

		// when global var loopAnim changes, pause on next loop-start
		navAnim[index].updateTo({
			onRepeat: function (thisTween) {
				yoyoComplete = !yoyoComplete;
				if (!elem.memo.loopAnim && yoyoComplete) {
					//console.log('Killing');
					this.pause();
				}
			}
		});

		//console.log('navAnim', navAnim[index]);

		parent.add(elem);
	}



	// navcards
	function setupNavCards(parent) {
		var x = 0,
			y = 0,
			row = 0,
			col = 0,
			minDuration = 2,
			maxDuration = 6,
			minDelay = .5,
			maxDelay = 10,
			attrOptions = ['x', 'y'],
			attr,
			direction,
			config;




		let material = [];
		let texture = [];
		let imgs = [];

		const imgSources = [
			'media/musicEndframe.png',
			'media/workEndframe.png',
			'media/storyEndframe.png',
			'media/contactEndframe.png'
		];

		/////





		const loadImgs = async items => {
			try {
				return await items.map(item => {
					loader = new THREE.ImageLoader();

					return loader.load(
						item,
						(img) => img,
						undefined,
						() => console.log('load err')
					);
				});
			}

			catch (err) {
				console.log('Error when loading imgs:', err);
			}

		}

		const applyTexture = async items => {
			try {
				return await items.map(item => {
					const res = new THREE.Texture(item);
					res.needsUpdate = true;
					return res;
				});
			}

			catch (err) {
				console.log('Error when applying texture:', err);
			}
		}


		const applyMaterial = async items => {
			try {
				return await items.map(item =>
					new THREE.MeshBasicMaterial({ map: item })
				)
			}

			catch (err) {
				console.log('Error when applying material:', err);
			}
		}


		const applyGeometry = async items => {
			const geometry = new THREE.PlaneBufferGeometry(card_SIZE, card_SIZE, 1);

			try {
				return await items.map((item, nth) => {
					const navCard = new THREE.Mesh(geometry, item);

					if (nth % GRID === 0) {
						col = 1;
						row++;
					} else col++;

					x = -(GRID * card_SIZE / 2 - card_SIZE * col + card_SIZE / 2);
					y = -(GRID * card_SIZE / 2 - card_SIZE * row + card_SIZE / 2);
					z = 0;

					navCard.FaceColors;

					// pos of flip-roofs
					// 0 = on floor
					navCard.position.set(x, y, 0);
					// set text orientation
					navCard.rotation.z = nth === 1 || nth === 2 ? Math.PI / 2 : 0


					navCard.memo = {};
					navCard.memo.positionX = x;
					navCard.memo.positionY = y;
					navCard.memo.positionZ = z;
					navCard.memo.rotationZ = navCard.rotation.z;
					navCard.memo.loopAnim = true;

					return navCard;
				});
			}

			catch (err) {
				console.log('Error when applying geometry:', err);
			}

		}

		const applyShadow = async items => {
			try {
				return await items.map((item, nth) => {
					item.castShadow = true;
					item.receiveShadow = true;

					if (debug) {
						item.rotation.x = 0;
						return;
					} else {

						const awaitIntro = false;
						// if on landing, do animation after title intro
						if (window.location.pathname === '/') {
							await = true;
						}

						return {
							item,
							index: nth,
							awaitIntro
						};
					}
				});
			}

			catch (err) {
				console.log('Error when applying shadow:', err);
			}
		}




		const doAnim = async items => {
			try {
				return await items.map(item => {
					if (item.awaitIntro) {
						document.querySelector('.Intro').addEventListener('ended', () => {
							animateNavCard(parent, item.item, item.index);
						});
					} else {
						animateNavCard(parent, item.item, item.index);
					}
				})
			}

			catch (err) {
				console.log('Error at doAnim():', err);
			}
		}



		// LOAD IMGS TO NAVCARDS
		const IMGS = async () => {
			const imgs = await loadImgs(imgSources);
			//console.log('1: imgs loaded', imgs);

			const texture = await applyTexture(await imgs);
			//console.log('2: texture loaded', texture);

			const material = await applyMaterial(await texture);
			//console.log('3: material loaded', material);

			const geometry = await applyGeometry(await material);
			//console.log('4: geometry loaded', geometry);

			const withShadow = await applyShadow(await geometry);
			//console.log('5: shadows loaded', withShadow);

			navCards = await withShadow.map(item => item.item);

			Promise.all([imgs, texture, material, geometry, withShadow]).then(function (values) {
				console.log('(NAVCARDS:', navCards);

				doAnim(values[values.length - 1]);
			});
		}

		IMGS();

	} // setupNavCards


	// NAVCARD INTERACTION ANIM
	const navEnterHandler = (e) => {
		const key = Number(e.target.dataset.navKey);

		navAnim[key] = TweenMax.to(
			navCards[key].position,
			1,
			{
				z: -20,
				ease: Elastic.easeOut,
			}
		);
	}

	const navLeaveHandler = (e) => {
		let key = Number(e.target.dataset.navKey);

		navAnim[key] = TweenMax.to(
			navCards[key].position,
			1,
			{
				x: navCards[key].memo.positionX,
				y: navCards[key].memo.positionY,
				z: navCards[key].memo.positionZ,
				ease: Elastic.easeOut
			}
		);
	}


	// listen for click
	document.querySelectorAll('.HiddenNav .NavLink').forEach(btn => {
		//btn.addEventListener('click', navClickHandler);
		btn.addEventListener('mouseenter', navEnterHandler);
		btn.addEventListener('mouseleave', navLeaveHandler);
	});




	// LIGHTS
	function setupLights(parent) {
		var light, soft_light;

		light = new THREE.DirectionalLight(MAIN_COLOR, 1.25);
		soft_light = new THREE.DirectionalLight(MAIN_COLOR, 1.5);

		light.position.set(-WALL_SIZE * 1, -WALL_SIZE * 1, card_SIZE * GRID * 1);
		light.castShadow = true;
		light.shadowDarkness = 0;

		soft_light.position.set(WALL_SIZE, WALL_SIZE, card_SIZE * GRID);

		parent.add(light).add(soft_light);
	}

	// RENDERER
	function setupRenderer(parent) {
		renderer.setSize(_width, _height);
		renderer.setClearColor(MAIN_COLOR, 1.0);
		renderer.shadowMapEnabled = true;
		parent.appendChild(renderer.domElement);
	}

	function render() {
		renderer.render(scene, camera);
	}




} // animInit



window.addEventListener('DOMContentLoaded', () => {
	//console.log('doc fully loaded and parsed');
	animInit();

    /* const NavListener = () => {
        console.log('listening for nav...')
        document.querySelector('.HiddenNav').onclick = (e) => {
            console.log('going to page');
            setTimeout(HomeListener, 2000);
        }
    }

    const HomeListener = () => {
        console.log('listening for Home...')
        document.querySelector('.HomeBtn').onclick = (e) => {
            console.log('going home');
        }
    }

    document.querySelector('.App').onchange = () => {
        console.log('something changed!')
    }

    NavListener(); */

    /* document.documentElement.onclick = (e) => {
        if (window.location.pathname !== '/' && e.target.classList.contains('HomeBtn')) {
            const canvas = document.querySelector('canvas')
            canva s.parentElement.removeChild(canvas);
            

            const inter = setInterval(() => {
                if (!navExists) {
                    console.log('trying inter animInit()')
                    animInit()
                } else {
                    console.log('nav already exists clearing interval');
                    clearInterval(inter);
                }
            }, 200
            );


            //setTimeout(animInit, 1000);

            console.log('running anim init()')

        } else {
            navExists = false;
        }
    } */

});

