class DrumBox {
  constructor(x, y, char, size, color, textColor) {
    this.x = x;
    this.y = y;
    this.char = char || 'A';
    this.size = size || 100;
    this.color = color || 0xe74cfc;
    this.textColor = textColor || 0xffffff;
  }

  _getText() {
    var style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 46,
        // fontStyle: 'italic',
        fontWeight: 'bold',
        textAlign: 'center',
        fill: this.textColor, // gradient
        // stroke: '#4a1850',
        // strokeThickness: 5,
        // dropShadow: true,
        // dropShadowColor: '#000000',
        // dropShadowBlur: 4,
        // dropShadowAngle: Math.PI / 6,
        // dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: this.size
    });
    const text = new PIXI.Text(this.char, style);
    text.anchor.set(0.5, 0.5);
    text.position.set(this.size * 0.5, this.size * 0.5);
    return text;
    // text.x = this.size * 0.5;
  }
  draw(parentEl) {
    if (!parentEl || typeof(parentEl.addChild) !== 'function') {
      return;
    }
    const rect = new PIXI.Graphics();
    rect.beginFill(this.color);
    const box = rect.drawRect(0, 0, this.size, this.size);
    rect.x = this.x;
    rect.y = this.y;
    rect.endFill();

    // basicText.y = this.size * 0.5;
    box.addChild(this._getText());
    parentEl.addChild(rect);
  }
}
