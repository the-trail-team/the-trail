const tips = [
	"You can press SHIFT when the text window is open to view a message backlog.",
	"Pay attention to your surroundings. You can find hidden chests in the most bizarre of places.",
	"The options menu has a wide variety of... well, options. Give it a look and personalize your experience.",
	"You can retry battles, but at a tax of 10% of your Bit balance. Don't take losing too lightly.",
	"Party members wake up after resting with varying moods. The Status menu can enlighten you in regards to how they're feeling.",
	"Certain inns are \"premium\" inns. These will cost an extra 50% Bits to rest at, but will give the very useful Well Rested buff.",
	"Dark enemies grow stronger after the sun sets. They become much stronger but have a better chance of dropping powerful equipment.",
	"Legends speak of eons-old crystals formed when the universe was created. They still exist... somewhere.",
	"Boosting an item won't do anything. Make sure you haven't consumed any boosts before using an item!",
	"The heat of battle is enough to get anyone nervous. Don't let pressure cloud your judgement.",
	"Buffs and debuffs can increase or decrease a stat by 50% max. Don't underestimate them!",
	"Don't forget item upgraders exist. If you find yourself stuck on a difficult fight, consider min-maxing your equipment.",
	"AP is gained exponentially. Growth starts slow, but a level 100 party member would have 2500 AP!",
	"Every level up gives you more AP and JP. Don't forget to see what new allocations you can make after every new level.",
	"Skills are separated into Special, Magic, and Passive skills.",
	"Shops contain many, many useful items to aid your adventure. Be sure to check them out!",
	"With the link between the Above and the Overworld severed, the Immortals can no longer reach us.",
	"Adon is just the one continent in the Overworld, and its culture is largely separated from Telluria's.",
	"The continent of Telluria is split into many regions. Telluria Castle is located in Telluria Field, the heart of the continent.",
	"The Gulf of Telluria borders many unique regions. Taking a ship into it is a quick way to reach many new places.",
	"These Tutorial Tips used to show up in-game and interrupt you. Doesn't that sound annoying?",
	"These Tutorial Tips were added in Alpha 14!",
	"Sleeping in your own bed will always be free.",
	"The sun falls at 21:00 and rises at 5:00. Plan out your days efficiently!",
	"There are rumors of a mysterious merchant that sets up shop in the Blazing Sands at night.",
	"Every copy of The Trail is personalized.",
	"Sleeping at a premium inn will neutralize the entire team's moods.",
	"Areas of the Overworld with a blue arrow over them need to be interacted with to be entered. They're not inaccessible!",
	"",
	"The Quick Access Menu is a helpful utility. Check it out using your configured key for it (Q by default).",
	"Anything that regrows has its own unique timer that ticks down every hour.",
	"Blueberries regrow after a mere 16 hours, while flowers take an entire week to sprout once more.",
	"Oreleaf can be found in the mine north of Bladesville. It's a mysterious metallic plant that yields ore and regrows every few days."
]

tips[28] = "There's a total of " + tips.length + " Tutorial Tips that you can see here. Have you seen all of them?"; // tips.length is first defined with the array, so it cannot be used initially

Scene_Preload.prototype.create = function() {
	Scene_Base.prototype.create.call(this);
	this.createBackground();
	this.createSubtitle();
	this.createTip();
	ImageManager.clear();
};

Scene_Preload.prototype.createTip = function() {
	this._tipHeight = Graphics.boxHeight;
	this._tip = new Sprite(new Bitmap(Graphics.boxWidth, this._tipHeight));
	this._tip.bitmap.fontSize = 20;
	this._tip.y = -400;
	this._tip.move = 0;
	this._tip.tipSpeed = 1.1; // speed that tutorial tip slides in/out
	this._tip.tipWait = 4000; // wait time between sliding tip in/out and refreshing tip
	this.addChild(this._tip);
	setTimeout(() => {  this.newTip(); }, 750);
}

Scene_Preload.prototype.newTip = function() {
	this._tip.chosenTip = Math.floor(Math.random() * tips.length);
	this._tip.y = -400;
	this._tip.move = 0;
	this.drawTipIn();
}

Scene_Preload.prototype.refreshTip = function() {
	this._tip.bitmap.clear();
	this._tip.bitmap.drawText("TUTORIAL TIP", 0, -30, Graphics.boxWidth, this._tipHeight, 'center');
	this._tip.bitmap.drawText("#" + (this._tip.chosenTip + 1) + ": " + tips[this._tip.chosenTip], 0, 0, Graphics.boxWidth, this._tipHeight, 'center');
}

Scene_Preload.prototype.drawTipIn = function() {
	this._tip.move++;
	if (this._tip.move < 250) {
		this._tip.y += (this._tip.tipSpeed / (this._tip.move * 0.04));
		this.refreshTip();
		setTimeout(() => {  this.drawTipIn(); }, 1);
	} else {
		this._tip.move = 0;
		setTimeout(() => {  this.drawTipOut(); }, this._tip.tipWait);
	}
}

Scene_Preload.prototype.drawTipOut = function () {
	this._tip.move++;
	if (this._tip.move < 250) {
		this._tip.y -= (this._tip.tipSpeed / (this._tip.move * 0.04));
		this.refreshTip();
		setTimeout(() => {  this.drawTipOut(); }, 1);
	} else {
		this._tip.move = 0;
		setTimeout(() => {  this.newTip(); }, this._tip.tipWait / 4);
    }
}