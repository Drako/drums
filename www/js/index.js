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

        PIXI.loader
            .add('img/drums.jpg')
            .load(this.onAssetsReady.bind(this));
    }

    onAssetsReady() {
        const drums = new PIXI.Sprite(PIXI.loader.resources['img/drums.jpg'].texture);
        this.pixiApp.stage.addChild(drums);
        this.sprites.drums = drums;
        this.resizeDrums();

        window.addEventListener('optimizedResize', this.onResize.bind(this), false);
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

// const app = new App();

(function init() {
  let app = new PIXI.Application({
    width: 1280,
    height: 720,
    antialias: true,
    backgroundColor: 0xff393a,
  });

  // app.renderer.view.style.position = "absolute";
  // app.renderer.view.style.display = "block";
  // app.renderer.autoResize = true;
  // app.renderer.resize(window.innerWidth, window.innerHeight);

  document.body.appendChild(app.view);


  const box = new DrumBox(100, 100);
  box.draw(app.stage);

})()
