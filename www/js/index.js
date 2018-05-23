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
  const sounds = [
    {name: 'A', audio: 'a.wav', label: 'A', img: 'a.jpg'},
    {name: 'B', audio: 'b.wav', label: 'B', img: 'a.jpg'},
    {name: 'C', audio: 'c.wav', label: 'C', img: 'a.jpg'},
    {name: 'D', audio: 'd.wav', label: 'D', img: 'a.jpg'},
    {name: 'E', audio: 'e.wav', label: 'E', img: 'a.jpg'},
    {name: 'F', audio: 'f.wav', label: 'F', img: 'a.jpg'},
    {name: 'G', audio: 'g.wav', label: 'G', img: 'a.jpg'},
    {name: 'H', audio: 'h.wav', label: 'H', img: 'a.jpg'},
    {name: 'I', audio: 'i.wav', label: 'I', img: 'a.jpg'},
    {name: 'J', audio: 'j.wav', label: 'J', img: 'a.jpg'},
    {name: 'K', audio: 'k.wav', label: 'K', img: 'a.jpg'},
    {name: 'L', audio: 'l.wav', label: 'L', img: 'a.jpg'},
    {name: 'M', audio: 'm.wav', label: 'M', img: 'a.jpg'},
    {name: 'N', audio: 'n.wav', label: 'N', img: 'a.jpg'},
    {name: 'O', audio: 'o.wav', label: 'O', img: 'a.jpg'},
    {name: 'P', audio: 'p.wav', label: 'P', img: 'a.jpg'},
    {name: 'Q', audio: 'q.wav', label: 'Q', img: 'a.jpg'},
    {name: 'R', audio: 'r.wav', label: 'R', img: 'a.jpg'},
    {name: 'S', audio: 's.wav', label: 'S', img: 'a.jpg'},
    {name: 'T', audio: 't.wav', label: 'T', img: 'a.jpg'},
    {name: 'U', audio: 'u.wav', label: 'U', img: 'a.jpg'},
    {name: 'V', audio: 'v.wav', label: 'V', img: 'a.jpg'},
    {name: 'W', audio: 'w.wav', label: 'W', img: 'a.jpg'},
    {name: 'X', audio: 'x.wav', label: 'X', img: 'a.jpg'},
    {name: 'Y', audio: 'y.wav', label: 'Y', img: 'a.jpg'},
    {name: 'Z', audio: 'z.wav', label: 'Z', img: 'a.jpg'},
    {name: 'SPACE', audio: 'space.wav', label: 'Space', img: 'space.jpg'},
  ]
  const width = 1200;
  const height = 720;
  let app = new PIXI.Application({
    width,
    height,
    antialias: true,
    backgroundColor: 0xff393a,
  });

  // app.renderer.view.style.position = "absolute";
  // app.renderer.view.style.display = "block";
  // app.renderer.autoResize = true;
  // app.renderer.resize(window.innerWidth, window.innerHeight);

  document.body.appendChild(app.view);

  // Keyboard Grid


  const leftMar = 100;
  const boxSize = 100;
  const margin = 10;

  let drawX = 100;
  let drawY = 200;
  sounds.forEach(({label}) => {
    const box = new DrumBox(drawX, drawY, label, boxSize);
    box.draw(app.stage);
    drawX = drawX + boxSize + margin;
    if (drawX + boxSize > width + margin) {
      drawX = 100;
      drawY = drawY + boxSize + margin;
    }
  })\
})()
