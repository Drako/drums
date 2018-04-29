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

        PIXI.loader.add('img/drums.jpg').load(this.onImagesReady.bind(this));
    }

    onImagesReady() {
        console.log("Images ready.");

        const drums = new PIXI.Sprite(PIXI.loader.resources['img/drums.jpg'].texture);
        this.pixiApp.stage.addChild(drums);
    }
}

const app = new App();
