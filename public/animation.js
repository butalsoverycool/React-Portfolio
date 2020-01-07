
/*
* Noel Delgado - @pixelia_me
* Inspiration: https://dingundding.tumblr.com/post/99836716906
*/

/* https://threejs.org/examples/js/Detector.js */

//document.onclick = (e) => console.log('position', e.offsetX, e.offsetY);



const animInit = () => {
    console.log('threejs init...');

    // globals
    let GRID = 2, /* cols, rows */
        _width = window.innerWidth,
        _height = window.innerHeight,
        PI = Math.PI,
        card_SIZE = 200,//setCardsize(), /* width, height */
        MAIN_COLOR = 0xffffff,
        SECONDARY_COLOR = 0x000,// 0x888888,
        navAnim = [],
        navCards = [],
        renderer = new THREE.WebGLRenderer(),
        camera = new THREE.PerspectiveCamera(45, _width / _height, 1, 10000),
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
    setupRenderer(document.querySelector('.Nav'));


    /* -- -- */
    if (debug) render();
    else TweenMax.ticker.addEventListener("tick", render);
    window.addEventListener("resize", resizeHandler, false);

    /* -- -- */
    function resizeHandler() {
        //updateOverlayPos();

        _width = window.innerWidth;
        _height = window.innerHeight;

        //card_SIZE = setCardsize();
        setupCamera(camXYZ().x, camXYZ().y, camXYZ().z);
        renderer.setSize(_width, _height);
        camera.aspect = _width / _height;
        camera.updateProjectionMatrix();

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
        console.log('animation intro')
        let direction = index === 1 || index === 2 ? 'x' : 'y';

        let config = {
            ease: Elastic.easeInOut,
            delay: 1/* rangeConfig.randomInRange(minDelay, maxDelay) */,
            repeat: -1,
            yoyo: true,
            [direction]: random(.01, .07),
            onComplete: () => {
                console.log(`navcard-${index} anim stopped.`);
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
                    console.log('Killing');
                    this.pause();
                }
            }
        });

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


        var geometry = new THREE.PlaneBufferGeometry(card_SIZE, card_SIZE, 1);

        let material = [];
        let texture = [];
        let imgs = [];

        const Imgsrc = [
            'media/Music_bg.png',
            'media/Work_bg.png',
            'media/Story_bg.png',
            'media/Contact_bg.png'
        ];


        for (let nth = 0; nth < Imgsrc.length; nth++) {
            imgs.push(document.createElement('img'));
            imgs[nth].src = Imgsrc[nth];
            texture.push(new THREE.Texture(imgs[nth]));
            texture[nth].needsUpdate = true;
            material.push(new THREE.MeshBasicMaterial({ map: texture[nth] }));
        }




        for (let i = 0; i < TOTAL_navCards; i++) {
            //material[i] = new THREE.MeshBasicMaterial({ map: textures[i] });
            navCards[i] = new THREE.Mesh(geometry, material[i]);

            //backsides.push(new THREE.Mesh(geometry, backsideMaterial[i]));

            if (i % GRID === 0) {
                col = 1;
                row++;
            } else col++;

            x = -(GRID * card_SIZE / 2 - card_SIZE * col + card_SIZE / 2);
            y = -(GRID * card_SIZE / 2 - card_SIZE * row + card_SIZE / 2);
            z = 0;

            navCards[i].FaceColors;

            // pos of flip-roofs
            navCards[i].position.set(x, y, 0); // 0 = on floor
            navCards[i].rotation.z = i === 1 || i === 2 ? Math.PI / 2 : 0 // set text orientation


            navCards[i].memo = {};

            navCards[i].memo.positionX = x;
            navCards[i].memo.positionY = y;
            navCards[i].memo.positionZ = z;

            navCards[i].memo.rotationZ = navCards[i].rotation.z;

            navCards[i].memo.loopAnim = true;





            //backsides[i].position.set(x, y, -10);
        }

        //navCards.forEach(function (card, index = 0) {
        for (let nth = 0; nth < navCards.length; nth++) {
            //let index = navCards.indexOf(card);
            //var flipAnim = navAnim[index];

            navCards[nth].castShadow = true;
            navCards[nth].receiveShadow = true;

            if (debug) {
                navCards[nth].rotation.x = 0;//Math.random() * 10;
            } else {
                animateNavCard(parent, navCards[nth], nth);

            }
        }
    } // setupNavCards

    const animateCardClick = (parent, index, active, configParams = null) => {
        /* navCards.forEach((card, nth) => {
            // default config
            let config = {
                x: card.memo.positionX,
                y: card.memo.positionY,
                z: card.memo.positionZ,
                ease: Elastic.easeOut,
            };
    
            // override optional config
            for (let param in configParams) {
                config[param] = configParams[param];
            }
    
            // chosen nav-card
            if (nth === index) {
                navAnim[index] = TweenMax.to(
                    card.position,
                    1,
                    config
                );
                //parent.add(card)
            }
            // other nav-cards
            else {
                navAnim[index] = TweenMax.to(
                    card.position,
                    3,
                    {
                        z: -200,
                        ease: Elastic.easeOut,
                    }
                );
            }
        }); */

        //camera.translateZ(- 200);
        //setupCamera(0, 0, 0);

        /* navCardsToGo.forEach(card => {
            console.log('togo', card)
        }); */


        //elem.rotation.z = index === 1 || index === 2 ? Math.PI / 2 : 0 // set text orientation
        //let direction = index === 1 || index === 2 ? 'x' : 'y';


        //let power = Math.random();
        //config[direction] = .1;// power < .1 ? -.3 : -power / 10;
        //navCards[index].position.set(100, 0, 0);

    }

    // animate away nav
    const animateNavDrop = () => {
        /* const nav = document.querySelector('.Nav canvas');
        TweenMax.to(
            document.querySelector('.Nav canvas'),
            .5,
            {
                ease: SlowMo.easeOut,
                y: 100,
                opacity: 0
            }
        ); */
    }

    /* let activeSection = null; */


    const animateSection = (target, key) => {
        //console.log('key', key, 'id', target.id)
        /* const section = (() => {
            let res;
            document.querySelectorAll('main').forEach(elem => {
                if (Number(elem.dataset.key) === key) {
                    res = elem;
                }
            });
            return res;
        })();
    
        activeSection = section;
    
        let duration = 1;
    
        TweenMax.to(
            section,
            duration,
            {
                opacity: 1,
                visibility: 'unset',
                height: '100vh'
            }
        ); */

        /* TweenMax.to(
            document.querySelector('#mainTitle'),
            duration,
            {
                opacity: 0
            }
        ); */

        /* TweenMax.to(
            document.querySelector('#homeBtn'),
            duration,
            {
                opacity: 1,
                visibility: 'unset',
            }
        ); */
    }

    /* document.querySelector('#backToNav').addEventListener('click', (e) => {
        if (!activeSection) return;
     
        let duration = 2;
     
        TweenMax.to(
            activeSection,
            duration,
            {
                opacity: 0,
                /* visibility: 'hidden', *//*
height: 0
}
);

TweenMax.to(
document.querySelector('#mainTitle'),
duration,
{
opacity: 1
}
);

TweenMax.to(
document.querySelector('#backToNav'),
duration,
{
opacity: 0,
/* visibility: 'hidden', *//*
                                                                                                                                                                                                                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                                                                                                                                                        const nav = document.querySelector('#canvasContainer canvas');
                                                                                                                                                                                                                                                                                                                                                                                                                                        TweenMax.to(
                                                                                                                                                                                                                                                                                                                                                                                                                                        document.querySelector('#canvasContainer canvas'),
                                                                                                                                                                                                                                                                                                                                                                                                                                        duration,
                                                                                                                                                                                                                                                                                                                                                                                                                                        {
                                                                                                                                                                                                                                                                                                                                                                                                                                        ease: SlowMo.easeOut,
                                                                                                                                                                                                                                                                                                                                                                                                                                        y: 0,
                                                                                                                                                                                                                                                                                                                                                                                                                                        opacity: 1
                                                                                                                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                                                                                                                                                        navAnim.forEach((anim, nth) => {
                                                                                                                                                                                                                                                                                                                                                                                                                                        TweenMax.to(
                                                                                                                                                                                                                                                                                                                                                                                                                                        anim,
                                                                                                                                                                                                                                                                                                                                                                                                                                        duration,
                                                                                                                                                                                                                                                                                                                                                                                                                                        {
                                                                                                                                                                                                                                                                                                                                                                                                                                        y: navCards[nth].memo.positionY
                                                                                                                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                                                                                                                        )
                                                                                                                                                                                                                                                                                                                                                                                                                                        })
                                                                                                                                                                                                                                                                                                                                                                                                                                        }); */





    //////
    const navClickHandler = (e) => {
        // get clicked key
        let key = Number(e.target.dataset.navKey);

        // check if already active
        let active = e.target.dataset.active === 'true' ? true : false;

        // make all other navs inactive
        let btns = document.querySelectorAll('.navBtn');
        btns.forEach(btn => {
            if (btn.dataset.navKey !== key) {
                btn.dataset.active = false;
            }
        })

        // toggle active in DOM
        e.target.dataset.active = String(!active);


        // pause clicked navAnim att next loop-start
        navCards[key].memo.loopAnim = false;

        // animate nav-cards disappear
        //animateCardClick(group, key, active);

        // animate nav disappear
        //animateNavDrop();

        // animate section appear
        //animateSection(e.target, key);

    } // clickHandler

    const navEnterHandler = (e) => {
        let key = Number(e.target.dataset.navKey);

        navCards.forEach((card, nth) => {
            // chosen nav-card
            if (nth === key) {
                navAnim[key] = TweenMax.to(
                    card.position,
                    1,
                    {
                        z: -20,
                        ease: Elastic.easeOut,
                    }
                );
                //parent.add(card);
            }
        });

    }

    const navLeaveHandler = (e) => {
        let key = Number(e.target.dataset.navKey);

        navCards.forEach((card, nth) => {
            // chosen nav-card
            if (nth === key) {
                navAnim[key] = TweenMax.to(
                    card.position,
                    1,
                    {
                        x: card.memo.positionX,
                        y: card.memo.positionY,
                        z: card.memo.positionZ,
                        ease: Elastic.easeOut
                    }
                );
            }
        });
    }


    // listen for click
    document.querySelectorAll('.HiddenNav .NavLink').forEach(btn => {
        //btn.addEventListener('click', navClickHandler);
        btn.addEventListener('mouseenter', navEnterHandler);
        btn.addEventListener('mouseleave', navLeaveHandler);
    });




    /* -- LIGHTS -- */
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

    /* -- RENDERER -- */
    function setupRenderer(parent) {
        renderer.setSize(_width, _height);
        renderer.setClearColor(MAIN_COLOR, 1.0);
        renderer.shadowMapEnabled = true;
        parent.appendChild(renderer.domElement);
    }

    function render() {
        renderer.render(scene, camera);
    }




}



window.addEventListener('DOMContentLoaded', () => {
    //console.log('doc fully loaded and parsed');
    animInit();
});