
// You can write more code here

/* START OF COMPILED CODE */

class Splace extends Phaser.Scene {

	constructor() {
		super("Splace");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// play_button
		const play_button = this.add.image(540, 1410, "play-button");
		play_button.scaleX = 2;
		play_button.scaleY = 2;

		// container_logo
		const container_logo = this.add.container(537.5429542941627, 281.57011891598995);

		// bash_
		const bash_ = this.add.image(2.457045705837345, 246.42988108401005, "Bash-");
		bash_.scaleX = 1.5;
		bash_.scaleY = 1.5;
		container_logo.add(bash_);

		// knife_img
		const knife_img = this.add.image(-182.54295429416266, -415.57011891598995, "knife-");
		container_logo.add(knife_img);

		// blade_with_cuts
		const blade_with_cuts = this.add.image(2.457045705837345, 38.42988108401005, "blade-with-cuts");
		blade_with_cuts.scaleX = 1.5;
		blade_with_cuts.scaleY = 1.5;
		blade_with_cuts.visible = false;
		container_logo.add(blade_with_cuts);

		// blade_text
		const blade_text = this.add.image(2.457045705837345, 38.42988108401005, "blade-");
		blade_text.scaleX = 1.5;
		blade_text.scaleY = 1.5;
		container_logo.add(blade_text);

		this.play_button = play_button;
		this.container_logo = container_logo;
		this.knife_img = knife_img;
		this.blade_with_cuts = blade_with_cuts;
		this.blade_text = blade_text;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	play_button;
	/** @type {Phaser.GameObjects.Container} */
	container_logo;
	/** @type {Phaser.GameObjects.Image} */
	knife_img;
	/** @type {Phaser.GameObjects.Image} */
	blade_with_cuts;
	/** @type {Phaser.GameObjects.Image} */
	blade_text;

	/* START-USER-CODE */ 

	// Write your code here

	create() {

		this.editorCreate();

		// this.blade_with_cuts.visible = true;
		this.tweens.add({
			targets: this.container_logo,
			scaleX: { from: 1, to: 1.05 },
			scaleY : {from : 1 , to : 1.05},
			duration: 500,
			// angle : {from : 1810 , to : 0} ,
			yoyo: true,
			repeat: -1,
		})
		this.tweens.add({
			targets: this.knife_img,
			x: this.blade_with_cuts.x - 45,
			y: this.blade_with_cuts.y - 120,
			duration: 200,
			onComplete: () => {
				this.blade_with_cuts.visible = true;
				this.blade_text.visible = false;
			}
		})
		this.play_button.setInteractive().on("pointerdown", () => {
			this.scene.start("Level");
		})
		this.play_button.on('pointerover', function () {
			this.pointerOverTween(this.play_button, 2);
		}, this)
		this.play_button.on('pointerout', function () {
			this.pointerOutTween(this.play_button, 2);
		}, this)
	}
	pointerOverTween(btn, initSclae) {
		this.input.setDefaultCursor('pointer');
		this.tweens.add({
			targets: btn,
			scaleX: initSclae + 0.05,
			scaleY: initSclae + 0.05,
			duration: 50
		})
	}
	pointerOutTween(btn , initSclae){
		this.input.setDefaultCursor('default');
		this.tweens.add({
			targets: btn,
			scaleX: initSclae,
			scaleY: initSclae,
			duration: 50
		})
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
