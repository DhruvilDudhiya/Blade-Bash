
// You can write more code here
//  import Phaser from "phaser";
/* START OF COMPILED CODE */
 class Level extends Phaser.Scene {
	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// score_holder
		const score_holder = this.add.image(155, 83, "stage-and-score-");
		score_holder.scaleX = 1.4;
		score_holder.scaleY = 1.4;

		// stage_holder
		const stage_holder = this.add.image(930, 83, "stage-and-score-");
		stage_holder.scaleX = 1.4;
		stage_holder.scaleY = 1.4;

		// score_txt
		const score_txt = this.add.text(152, 85, "", {});
		score_txt.scaleX = 1.4;
		score_txt.scaleY = 1.4;
		score_txt.setOrigin(0.5, 0.5);
		score_txt.text = "Score:0";
		score_txt.setStyle({ "color": "#fdefb4", "fontSize": "30px" });

		// level_txt
		const level_txt = this.add.text(934, 84, "", {});
		level_txt.scaleX = 1.4;
		level_txt.scaleY = 1.4;
		level_txt.setOrigin(0.5, 0.5);
		level_txt.text = "stage:0";
		level_txt.setStyle({ "color": "#fdefb4", "fontSize": "30px" });

		// container_kinfeDisplay
		const container_kinfeDisplay = this.add.container(0, 0);

		// container_knifes
		const container_knifes = this.add.container(0, 0);

		// tomato_txt
		const tomato_txt = this.add.text(605, 93, "", {});
		tomato_txt.setOrigin(0.5, 0.5);
		tomato_txt.text = "0";
		tomato_txt.setStyle({ "color": "#fdefb4", "fontSize": "40px" });

		// tomato1
		const tomato1 = this.add.image(550, 85, "tomato", 1);

		this.score_holder = score_holder;
		this.stage_holder = stage_holder;
		this.score_txt = score_txt;
		this.level_txt = level_txt;
		this.container_kinfeDisplay = container_kinfeDisplay;
		this.container_knifes = container_knifes;
		this.tomato_txt = tomato_txt;
		this.tomato1 = tomato1;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	score_holder;
	/** @type {Phaser.GameObjects.Image} */
	stage_holder;
	/** @type {Phaser.GameObjects.Text} */
	score_txt;
	/** @type {Phaser.GameObjects.Text} */
	level_txt;
	/** @type {Phaser.GameObjects.Container} */
	container_kinfeDisplay;
	/** @type {Phaser.GameObjects.Container} */
	container_knifes;
	/** @type {Phaser.GameObjects.Text} */
	tomato_txt;
	/** @type {Phaser.GameObjects.Image} */
	tomato1;

	/* START-USER-CODE */

	// Write more your code here

	create() {
		this.editorCreate();
		this.oGm = new GameManager();
		this.obstaclesArray = [];
		this.knifeObsArray = [];
		this.firstknife = [];
		this.obstacleGroup = this.add.group();
		this.knifeCount = 0;
		this.gameWidth = 750;
		this.gameHeight = 1330;
		this.throwSpeed = 140;// knife throwing duration; in milliseconds
		this.minAngle = 10;	// minimum angle between two knives
		// this.rotationVariation = 1;	// max rotation speed variation; in degrees per frame
		this.changeTime = 2000;	// interval before next rotation speed variation; in milliseconds
		// this.maxRotationSpeed = 130;	// maximum rotation speed; in degrees per frame

		this.flash = this.add.graphics();
		this.flash.fillStyle(0xffffff, 1);
		this.flash.fillRect(0, 0, this.game.config.width, this.game.config.height, 128, 128);
		this.flash.setAlpha(0); // Make it invisible
		this.level_txt.text = "Stage : " + stage;
		this.setupLevel(stage);

		this.currentRotationSpeed = this.rotationSpeed;
		this.newRotationSpeed = this.rotationSpeed;
		this.particles = this.add.particles('particles');

		this.particleEmitter = this.particles.createEmitter({
			speed: { min: 200, max: 400 }, // Configure the particle speed
			angle: { min: 0, max: 360 }, // Configure the particle angle
			scale: { start: 1, end: 0 }, // Configure the particle scale
			blendMode: 'ADD', // Blend mode for particles (optional)    
			lifespan: 2000, // Particle lifespan
		});
		this.particleEmitter.stop();

		this.input.on("pointerdown", () => {
			if (this.totalKnife != this.knifeCount) {
				this.throwKnife();
			}
		});
		var timedEvent = this.time.addEvent({
			delay: this.changeTime,
			callback: this.changeSpeed,
			callbackScope: this,
			loop: true
		});

	}
	setLevelData = (speed, changeTime, knifeCount, totalKnife, Variation) => {
		this.rotationSpeed = speed;
		this.changeTime = changeTime;
		this.knifeCount = knifeCount;
		this.totalKnife = totalKnife;
		this.rotationVariation = Variation;
	}
	initialBlast = (targetTexture) => {
		switch (targetTexture) {
			case "target4":
				this.omlateImages = ['omlate1', 'omlate2', 'omlate3', 'omlate4'];
				break;
			case "target2":
				//pizza
				this.omlateImages = ['pizza1', 'pizza2', 'pizza3', 'pizza4'];
				break;
			case "target3":
				//burger
				this.omlateImages = ['burger1', 'burger2', 'burger3', 'burger4'];
				break;
			case "target9":
				//jalebi
				this.omlateImages = ['jalebi1', 'jalebi2', 'jalebi3', 'jalebi4'];
				break;
			case "target5":
				//donutes
				this.omlateImages = ['donut1', 'donut2', 'donut3', 'donut4'];
				break;
			case "target1":
				//sandwhich
				this.omlateImages = ['sandwich1', 'sandwich2', 'sandwich3', 'sandwich4'];
				break;
			case "target8":
				//samosa
				this.omlateImages = ['samosa1', 'samosa2', 'samosa3', 'samosa4'];
				break;
			case "target6":
				//cake
				this.omlateImages = ['cake1', 'cake2', 'cake3', 'cake4'];
				break;
			case "target7":
				//woffels
				this.omlateImages = ['waffle1', 'waffle2', 'waffle3', 'waffle4'];
				break;
			case "target10":
				//nuddels
				this.omlateImages = ['noodles1', 'noodles2', 'noodles3', 'noodles4'];
				break;
			default:
				break;
		}
		const omlateSprites = this.omlateImages.map((omlateImage) => this.add.image(this.target.x, this.target.y, omlateImage).setScale(1.5));
		const randomXPositions = this.omlateImages.map(() => Phaser.Math.Between(this.target.x - 1000, this.target.x + 1000));
		const randomY = Phaser.Math.Between(this.target.y + 850, this.target.y + 1800);
		omlateSprites.forEach((omlateSprite, index) => {
			this.tweens.add({
				targets: omlateSprite,
				x: randomXPositions[index],
				y: randomY,
				angle: 45,
				duration: 1000,
				alpha:  { from: 2, to : 0},
				onComplete: function (tween) {
				},
				onStart: () => {
					this.target.destroy();
					this.knifeGroup.clear(true, true);
					if(this.obstacleGroup.getLength() >= 0){
						this.obstacleGroup.clear(true, true);
					}
				}
			});
		});
	}

	setupLevel(level) {
		switch (level) {
			case 1:
				//omlate 
				this.setLevelData(6, 1500, 0, 10, 1); //speed , changeTime , knifeCount , totalKnife , Variation
				score = 0;
				this.addKnife("knife_1");
				this.addTarget("target4");
				this.target.setScale(1.5);
				this.remainingKnifes(10, this.knife.texture.key);
				break;
			case 2:
				//pizza
				if (this.target) {
					this.target.destroy();
					this.target = null;
				}
				this.setLevelData(7,2000, 0,12, 2); //speed , changeTime , knifeCount , totalKnife , Variation
				this.addKnife("knife_3");
				this.addTarget("target2");
				this.target.setScale(1.5);
				setTimeout(() => {
					this.addObstacles(2, "tomato");
				}, 500);
				this.remainingKnifes(12, this.knife.texture.key);
				break;
			case 3:
				//burger
				if (this.target) {
					this.target.destroy();
					this.target = null;
				}
				this.setLevelData(6, 2500, 0, 12, 2); //speed , changeTime , knifeCount , totalKnife , Variation
				this.addKnife("knife_2");
				this.addTarget("target3");
				this.target.setScale(1.5);
				this.addknifeObstacle(0);
				this.remainingKnifes(12, this.knife.texture.key);
				setTimeout(() => {
					this.addObstacles(3, "tomato");
				}, 500);
				break;
			case 4:
				//jalebi
				if (this.target) {
					this.target.destroy();
					this.target = null;
				}
				this.setLevelData(6, 1500, 0, 12, 1); //speed , changeTime , knifeCount , totalKnife , Variation
				this.addKnife("knife_4");
				this.addTarget("target9");
				this.target.setScale(1.3);
				this.remainingKnifes(12, this.knife.texture.key);
				break;
			case 5:
				//donutes
				if (this.target) {
					this.target.destroy();
					this.target = null;
				}
				this.setLevelData(7, 1500, 0, 12, 1); //speed , changeTime , knifeCount , totalKnife , Variation
				this.addKnife("knife_1");
				this.addTarget("target5");
				this.target.setScale(1.5);
				this.remainingKnifes(12, this.knife.texture.key);
				setTimeout(() => {
					this.addObstacles(3, "choco");
				}, 500);
				break;
			case 6:
				//sandwhich
				if (this.target) {
					this.target.destroy();
					this.target = null;
				}
				this.setLevelData(8, 2500, 0, 10, 1); //speed , changeTime , knifeCount , totalKnife , Variation
				this.addKnife("knife_1");
				this.addTarget("target1");
				this.target.setScale(1.5);
				this.remainingKnifes(10, this.knife.texture.key);
				setTimeout(() => {
					this.addObstacles(6, "tomato");
				}, 500);
				break;
			case 7:
				//samosa
				if (this.target) {
					this.target.destroy();
					this.target = null;
				}
				this.setLevelData(7, 2500, 0, 10, 1); //speed , changeTime , knifeCount , totalKnife , Variation
				this.addKnife("knife_1");
				this.addTarget("target8");
				this.target.setScale(1.4);
				this.remainingKnifes(10, this.knife.texture.key);
				break;
			case 8:
				//cake
				if (this.target) {
					this.target.destroy();
					this.target = null;
				}
				this.setLevelData(6, 2500, 0, 12, 1); //speed , changeTime , knifeCount , totalKnife , Variation
				this.tomato1.setTexture("choco")
				this.addKnife("knife_1");
				this.addTarget("target6");
				this.target.setScale(1.2, 1.3);
				this.remainingKnifes(12, this.knife.texture.key);
				setTimeout(() => {
					this.addObstacles(6, "choco");
				}, 500);
				break;
			case 9:
				//woffels
				if (this.target) {
					this.target.destroy();
					this.target = null;
				}
				this.setLevelData(7, 2500, 0, 12, 1); //speed , changeTime , knifeCount , totalKnife , Variation
				this.addKnife("knife_1");
				this.addTarget("target7");
				this.target.setScale(1.35);
				this.remainingKnifes(12, this.knife.texture.key);
				setTimeout(() => {
					this.addObstacles(6, "strawberry");
				}, 500);
				break;
			case 10:
				if (this.target) {
					this.target.destroy();
					this.target = null;
				}
				this.setLevelData(5, 2500, 0, 10, 1); //speed , changeTime , knifeCount , totalKnife , Variation
				this.addKnife("knife_1");
				this.addTarget("target10");
				this.target.setScale(1.5);
				this.remainingKnifes(9, this.knife.texture.key);
				setTimeout(() => {
					this.addknifeObstacle(4);
				}, 500);

				break;
			default:
				this.scene.start("Result");
				break;
		}
	}
	moveTargetToCenter(level) {
		this.tweens.add({
			targets: this.target,
			x: this.target.x - 1000,
			duration: 300, // adjust the duration as needed
			onComplete: () => {
				this.setupLevel(stage);
			},
		});
	}
	addObstacles(numberOfObstacles, obstacleTexture) {
		
		const gapAngle = 360 / numberOfObstacles; // Calculate the angle between each obstacle
		for (let i = 0; i < numberOfObstacles; i++) {
			const obstacle = this.add.sprite(1080 / 2, 1920, obstacleTexture, "0"); // Replace 'obstacleTexture' with the actual texture key
			obstacle.setScale(1.1);
			obstacle.setOrigin(0.5, 1);
			obstacle.setAngle(-45);
			obstacle.depth = 1;
			obstacle.hit = false;
			// Set the initial angle for the obstacle to distribute them evenly
			obstacle.angle = gapAngle * i;
			// Add them to the obstaclesArray for later reference
			this.obstaclesArray.push(obstacle);
			this.obstacleGroup.add(obstacle);
			console.log("obstaclesArray",this.obstacleGroup.getLength());
		}
	}
	addTarget(targetTexture) {
		this.target = this.add.sprite(2000, 1920 / 3.5, targetTexture);
		this.target.setScale(0, 0);
		this.tweens.add({
			targets: this.target,
			x: { from: 2000, to: 1080 / 2 },
			duration: 300,
		})

		this.target.depth = 1;
	}
	remainingKnifes(knifes, texture) {
		this.knifeImages = [];
		knifes >= 12 ? this.startY = 1000 : this.startY = 1105;
		knifes >= 12 ? this.gapY = 65 : this.gapY = 75;
		for (let i = 0; i < knifes; i++) {
			const knifeImage = this.add.sprite(100, this.startY + (i * this.gapY), texture);
			knifeImage.setScale(0.8);
			knifeImage.setAngle(30);
			this.knifeImages.push(knifeImage);
			this.container_kinfeDisplay.add(knifeImage);
		}
	}
	addKnife(knifeTexture) {
		this.currentTextureKnife = knifeTexture;
		this.canThrow = true;
		this.knifeGroup = this.add.group();
		this.knife = this.add.sprite(1080 / 2, 1400, this.currentTextureKnife);
		// this.tweens.add({
		// 	targets: this.knife,
		// 	y: { from: 2500, to: 1330 / 1 },
		// 	duration: 100,
		// 	delay : 500,
		// })
		this.knife.setScale(1.5);
	}
	addknifeObstacle = (knife) => {
		const objectGap = 360 / knife;
		for (let i = 0; i < knife; i++) {
			const knifObs = this.add.sprite(1080 / 2, 1920, "spoon");
			knifObs.setScale(1);
			knifObs.setOrigin(0, 0.8);
			knifObs.setAngle(-45);
			// knifObs.depth = 1;
			knifObs.hit = false;
			knifObs.angle = objectGap * i;
			this.knifeObsArray.push(knifObs);
			this.obstacleGroup.add(knifObs);
		}
	}
	goToNextLevel() {
		score++;
		stage++;
		this.container_kinfeDisplay.removeAll(true);
		this.knifeGroup.clear(true, true);
		this.input.off("pointerdown");
		this.moveTargetToCenter(stage);
		this.rotationSpeed = 0;
		this.changeTime = 0;
		this.tweens.add({
			targets: this.target,
			angle: this.target.angle, // Keep the target at the current angle
			delay: 300,
			// duration: 100, // Pause for 3 seconds (adjust the duration as needed)
			onComplete: () => {
				this.input.on("pointerdown", () => {
					if (this.totalKnife != this.knifeCount) {
						this.throwKnife();
					}
				});

			},
		});
		// this.knife.setTexture();
		for (this.obstacle of this.obstaclesArray) {
			this.obstacle.destroy();
		}
		for (this.knifObs of this.knifeObsArray) {
			this.knifObs.destroy();
		}
		console.log("obstaclesArray", this.obstaclesArray);
		this.obstaclesArray = [];
		this.knifeObsArray = []
		this.level_txt.text = "Stage : " + stage;
		this.container_knifes.removeAll(true);
	}
	changeSpeed() {
		this.maxRotationSpeed = 200;
		var sign = Phaser.Math.Between(0, 1) == 0 ? -1 : 1;// ternary operator to choose from +1 and -1
		// random number between -gameOptions.rotationVariation and gameOptions.rotationVariation
		var variation = Phaser.Math.FloatBetween(- this.rotationVariation, this.rotationVariation);
		this.newRotationSpeed = (this.currentRotationSpeed + variation) * sign;	// new rotation speed
		// setting new rotation speed limits
		this.newRotationSpeed = Phaser.Math.Clamp(this.newRotationSpeed, -this.maxRotationSpeed, this.maxRotationSpeed);
	}
	throwKnife() {
		if (this.canThrow && this.totalKnife > 0) {
			this.totalKnife--;
			this.knifeImages[this.totalKnife].setTint(0x444444);

			this.canThrow = false;

			this.tweens.add({
				targets: [this.knife],
				y: this.target.y + this.target.width / 2,
				duration: this.throwSpeed,
				callbackScope: this,
				onComplete: function (tween) {
					var legalHit = true;
					var children = this.knifeGroup.getChildren();
					for (var i = 0; i < children.length; i++) {
						// is the knife too close to the i-th knife?
						if (Math.abs(Phaser.Math.Angle.ShortestBetween(this.target.angle, children[i].impactAngle)) < this.minAngle) {
							legalHit = false;
							break;
						}
					}
					for (var i = 0; i < this.knifeObsArray.length; i++) {
						var obstacle = this.knifeObsArray[i];
						if (!obstacle.hit && Phaser.Math.Distance.Between(this.knife.x, this.knife.y, obstacle.x, obstacle.y) < obstacle.width / 2) {
							legalHit = false;
							break;
						}
					}
					const originalTint = this.target.tint;
					if (legalHit) {
						this.particleEmitter.start();
						this.particleEmitter.explode(100, this.knife.x, this.knife.y);
						score++;
						this.score_txt.text = "Score : " + score;
						this.tweens.add({
							targets: this.target,
							y: this.target.y - 40,
							duration: 80,
							yoyo: true,
						})
						for (const obstacle of this.obstaclesArray) {
							if (!obstacle.hit) {
								if (Phaser.Math.Distance.Between(this.knife.x, this.knife.y, obstacle.x, obstacle.y) < obstacle.width / 2) {
									// Knife has hit the tomato
									obstacle.hit = true; // Mark the tomato as hit
									collectedObject++;
									this.tomato_txt.text = collectedObject;
									obstacle.setFrame(1); // Change tomato frame to show one slice

									// Create another tomato slice
									switch (obstacle.texture.key) {
										case "choco":
											var slice = this.add.sprite(obstacle.x, obstacle.y, 'choco', 2);
											break;
										case "tomato":
											var slice = this.add.sprite(obstacle.x, obstacle.y, 'tomato', 2);
											break;
										case "strawberry":
											var slice = this.add.sprite(obstacle.x, obstacle.y, 'strawberry', 2);
										default:
											break;
									}
									slice.angle = obstacle.angle;
									slice.setOrigin(0.5, 1);

									// Tween to make tomato slices fall down
									this.tweens.add({
										targets: [obstacle, slice],
										y: 1920 + obstacle.height,
										x: {
											getEnd: function (target, key, value) {
												return Phaser.Math.Between(0, 750 / 2) + (750 / 2 * (target.frame.name - 1));
											}
										},
										angle: 45,
										duration: this.throwSpeed * 3,
										callbackScope: this,
										onComplete: function (tween) {
											// Handle the completion of the tomato slice animation
										}
									});
								}
							}
						}
						this.canThrow = true;// player can now throw again
						// adding the rotating knife in the same place of the knife just landed on target
						switch (this.knife.texture.key) {
							case 'knife_1':
								this.addToTarget(this.knife.texture.key)
								break;
							case 'knife_2':
								this.addToTarget(this.knife.texture.key)
								break;
							case 'knife_3':
								this.addToTarget(this.knife.texture.key)
								break;
							case 'knife_4':
								this.addToTarget(this.knife.texture.key)
								break;
							default:
								break;
						}
						this.knife.y = 1400;
						if (this.totalKnife <= 0) {
							this.knife.destroy();
							this.initialBlast(this.target.texture.key);
							setTimeout(() => {
								this.goToNextLevel();
							}, 1000);
						}
					}
					// in case this is not a legal hit
					else {
						// tween to make the knife fall down
						this.tweens.add({
							targets: [this.knife],	// adding the knife to tween targets
							y: 1330 + this.knife.height,// y destination
							rotation: 5,// rotation destination, in radians
							duration: this.throwSpeed * 4,// tween duration
							callbackScope: this,	// callback scope
							// function to be executed once the tween has been completed
							onComplete: function (tween) {
								this.scene.start("Result")// restart the game
							}
						});
					}
					if (this.totalKnife == 0) {
						// Initiate the blast tween
						
					}

				}
			});
		}
	}
	addToTarget = (kinfe1) => {
		var knife = this.add.sprite(this.knife.x, this.knife.y, kinfe1);
		knife.impactAngle = this.target.angle;
		knife.setScale(1.5);
		this.knifeGroup.add(knife);
	}
	// method to be executed at each frame. Please notice the arguments.
	update(time, delta) {
		if (this.target) {
			// setTimeout(() => {
			this.target.angle += this.currentRotationSpeed;// rotating the target
			for (this.obstacle of this.obstaclesArray) {
				if (!this.obstacle.hit) {
					this.obstacle.angle += this.currentRotationSpeed;// adjusting apple rotation
					var radians = Phaser.Math.DegToRad(this.obstacle.angle - 90);// turning apple angle in radians
					// adjusting apple position
					this.obstacle.x = this.target.x + (this.target.width / 2) * Math.cos(radians);
					this.obstacle.y = this.target.y + (this.target.width / 2) * Math.sin(radians);
				}
			}
			for (this.knifObs of this.knifeObsArray) {
				if (!this.knifObs.hit) {
					this.knifObs.angle += this.currentRotationSpeed;
					var radians = Phaser.Math.DegToRad(this.knifObs.angle - 100);

					this.knifObs.x = this.target.x + (this.target.width / 2) * Math.cos(radians);
					this.knifObs.y = this.target.y + (this.target.width / 2) * Math.sin(radians);
				}
			}
			var children = this.knifeGroup.getChildren();	// getting an array with all rotating knives
			for (var i = 0; i < children.length; i++) {	// looping through rotating knives
				children[i].angle += this.currentRotationSpeed;	// rotating the knife
				var radians = Phaser.Math.DegToRad(children[i].angle + 90);// turning knife angle in radians
				// trigonometry to make the knife rotate around target center
				children[i].x = this.target.x + (this.target.width / 2) * Math.cos(radians);
				children[i].y = this.target.y + (this.target.width / 2) * Math.sin(radians);
			}
			this.currentRotationSpeed = Phaser.Math.Linear(this.currentRotationSpeed, this.newRotationSpeed, delta / 1000);
		}
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
