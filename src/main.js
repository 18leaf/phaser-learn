import './style.css'
import Phaser from 'phaser'

const config = {
  type: Phaser.AUTO, // Which renderer to use
  width: 400, // Canvas width in pixels
  height: 200, // Canvas height in pixels
  zoom: 1,
  pixelArt: true,

  parent: "game-container", // ID of the DOM element to add the canvas to
  scene: {
    preload: preload,
    create: create,
    update: update,
  }
};

const game = new Phaser.Game(config);
let controls;

function preload() {
  // Runs once, loads up assets like images and audio
  this.load.image("objects", "../public/assets/interior.png");
  this.load.image("room-builder", "../public/assets/rooms.png");
  this.load.tilemapTiledJSON("map", "../public/assets/demoOffice.json");
}

function create() {
  // Runs once, after all assets in preload are loaded

  const map = this.make.tilemap({ key: "map" });
  const objects = map.addTilesetImage("objects");
  const background = map.addTilesetImage("room-builder");

  const belowLayer = map.createLayer("Tile Layer 1", background, 0, 0);
  const objLayer = map.createLayer("Collisions", objects, 0, 0);
  objLayer.setCollisionByProperty();

  // default camera
  const camera = this.cameras.main;

  // Set up the arrows to control the camera
  const cursors = this.input.keyboard.createCursorKeys();
  controls = new Phaser.Cameras.Controls.FixedKeyControl({
    camera: camera,
    left: cursors.left,
    right: cursors.right,
    up: cursors.up,
    down: cursors.down,
    speed: 0.5
  });

  // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  // Help text that has a "fixed" position on the screen
  this.add
    .text(16, 16, "Arrow keys to scroll", {
      font: "18px monospace",
      fill: "#ffffff",
      padding: { x: 20, y: 10 },
      backgroundColor: "#000000"
    })
    .setScrollFactor(0);
}

function update(time, delta) {
  // Runs once per frame for the duration of the scene
  controls.update(delta);
}