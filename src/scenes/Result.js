
// You can write more code here

/* START OF COMPILED CODE */

class Result extends Phaser.Scene {

	constructor() {
		super("Result");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// popup
		const popup = this.add.image(540, 865, "popup");
		popup.scaleX = 2;
		popup.scaleY = 1.8;

		// home_btn
		const home_btn = this.add.image(340, 1289.5, "home");
		home_btn.scaleX = 1.5;
		home_btn.scaleY = 1.5;

		// repeat_btn
		const repeat_btn = this.add.image(740, 1289.5, "repeat-");
		repeat_btn.scaleX = 1.5;
		repeat_btn.scaleY = 1.5;

		// score
		this.add.image(540, 664, "Score");

		// stage
		this.add.image(540, 1014, "Stage-");

		// score_txt
		const score_txt = this.add.text(540, 801, "", {});
		score_txt.scaleX = 2;
		score_txt.scaleY = 2;
		score_txt.setOrigin(0.5, 0.5);
		score_txt.text = "0";
		score_txt.setStyle({ "color": "#fcdebf", "fontSize": "50px" });

		// stage_txt
		const stage_txt = this.add.text(540, 1142, "", {});
		stage_txt.scaleX = 2;
		stage_txt.scaleY = 2;
		stage_txt.setOrigin(0.5, 0.5);
		stage_txt.text = "0";
		stage_txt.setStyle({ "color": "#fcdebf", "fontSize": "50px" });

		// congratulation
		const congratulation = this.add.image(537, 304, "congratulation");
		congratulation.scaleX = 2;
		congratulation.scaleY = 2;
		congratulation.visible = false;

		// failed_
		const failed_ = this.add.image(530, 246, "failed-");
		failed_.scaleX = 2;
		failed_.scaleY = 2;
		failed_.visible = false;

		this.home_btn = home_btn;
		this.repeat_btn = repeat_btn;
		this.score_txt = score_txt;
		this.stage_txt = stage_txt;
		this.congratulation = congratulation;
		this.failed_ = failed_;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	home_btn;
	/** @type {Phaser.GameObjects.Image} */
	repeat_btn;
	/** @type {Phaser.GameObjects.Text} */
	score_txt;
	/** @type {Phaser.GameObjects.Text} */
	stage_txt;
	/** @type {Phaser.GameObjects.Image} */
	congratulation;
	/** @type {Phaser.GameObjects.Image} */
	failed_;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
		this.isCompleted = false;
		console.log(stage, score);
		if (stage > 10) {
			this.congratulation.visible = true;
			this.failed_.visible = false;
			stage = 10;
			this.isCompleted = true;
			const count = 180,
			defaults = {
			  origin: { y: 0.7 },
			};

		  function fire(particleRatio, opts) {
			confetti(
			  Object.assign({}, defaults, opts, {
				particleCount: Math.floor(count * particleRatio),
			  })
			);
		  }
		  fire(0.25, {
			spread: 26,
			startVelocity: 55,
		  });

		  fire(0.2, {
			spread: 60,
		  });

		  fire(0.35, {
			spread: 100,
			decay: 10,
			scalar: 0.8,
		  });

		  fire(0.1, {
			spread: 120,
			startVelocity: 25,
			decay: 0.92,
			scalar: 1.2,
		  });

		  fire(0.1, {
			spread: 120,
			startVelocity: 45,
		  });
		}else{
			this.congratulation.visible = false;
			this.failed_.visible = true;
		}
		this.home_btn.on('pointerover', function () {
			this.pointerOverTween(this.home_btn, 1.5);
		}, this)
		this.home_btn.on('pointerout', function () {
			this.pointerOutTween(this.home_btn, 1.5);
		}, this)
		this.repeat_btn.on('pointerover', function () {
			this.pointerOverTween(this.repeat_btn, 1.5);
		}, this)
		this.repeat_btn.on('pointerout', function () {
			this.pointerOutTween(this.repeat_btn, 1.5);
		}, this)
		this.stage_txt.text = stage;
		this.score_txt.text = score;
		this.home_btn.setInteractive().on("pointerdown", () => {
			stage = 1;
			score = 0;
			collectedObject = 0
			this.scene.start("Splace");
		})
		this.repeat_btn.setInteractive().on("pointerdown", () => {
		    if(this.isCompleted){
				stage = 1;
			}
			// stage = 1;
			score = 0;
			collectedObject = 0
			this.scene.start("Level");
		})

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
	pointerOutTween(btn, initSclae) {
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
