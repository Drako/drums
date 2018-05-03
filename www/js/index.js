(function() {
    const throttle = function(type, name, obj) {
        obj = obj || window;
        let running = false;
        const func = function() {
            if (running) { return; }
            running = true;
            requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    throttle('resize', 'optimizedResize');
})();

class App {
    constructor() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    };

    onDeviceReady() {
        const type = PIXI.utils.isWebGLSupported() ? 'WebGL' : 'canvas';
        PIXI.utils.sayHello(type);

        const app = new PIXI.Application();
        app.renderer.view.style.position = 'absolute';
        app.renderer.view.style.display = 'block';
        app.renderer.autoResize = true;
        app.renderer.resize(window.innerWidth, window.innerHeight);
        document.body.appendChild(app.view);

        this.pixiApp = app;

        this.sprites = {};

        // PIXI.loader
        //     .add('img/drums.jpg')
        //     .add('sound-1', 'sounds/1.wav')
        //     .add('sound-2', 'sounds/2.wav')
        //     .add('sound-3', 'sounds/3.wav')
        //     .add('sound-4', 'sounds/4.wav')
        //     .add('sound-5', 'sounds/5.wav')
        //     .load(this.onAssetsReady.bind(this));

        //TODO refactor (can we use multiple loaders?)
        PIXI.loader
            .add('sounds/1.wav')
            .add('sounds/2.wav')
            .add('sounds/3.wav')
            .add('sounds/4.wav')
            .add('sounds/5.wav')
            .add('sounds/6.wav')
            .add('sounds/7.wav')
            .add('sounds/8.wav')
            .add('sounds/9.wav')
            .add('sounds/10.wav')
            .add('sounds/11.wav')
            .add('sounds/12.wav')
            .add('sounds/13.wav')
            .add('sounds/14.wav')
            .add('sounds/15.wav')
            .add('sounds/16.wav')
            .add('sounds/17.wav')
            .add('sounds/18.wav')
            .add('sounds/19.wav')
            .load(this.mapSomeSounds.bind(this));
    }

    onAssetsReady() {
        const drums = new PIXI.Sprite(PIXI.loader.resources['img/drums.jpg'].texture);
        this.pixiApp.stage.addChild(drums);
        this.sprites.drums = drums;
        this.resizeDrums();

        window.addEventListener('optimizedResize', this.onResize.bind(this), false);
    }

    //TODO refactor
    mapSomeSounds(loader, resources) {
        debugger;
        document.addEventListener('keypress', (event) => {
            console.log(event.code)
            if (event.code === 'Enter') {
                let sounds = Object.values(resources)
                const randomIndex = Math.floor(Math.random() * sounds.length)
                const sound = sounds[randomIndex].data;
                sound.play();
            }
        });
    }

    onResize() {
        this.pixiApp.renderer.resize(window.innerWidth, window.innerHeight);
        this.resizeDrums();
    }

    resizeDrums() {
        this.sprites.drums.width = window.innerWidth;
        this.sprites.drums.height = window.innerHeight;
    }
}

const app = new App();
