
$(function() {

	display();
	render(16);
	showMine();
	// $(".grid").click(play);

});

function showMine() {
	const Mines = randMine();
	const l = Mines.length;
	let i;
	for (i = 0; i < l; i++) {
		$(".row").eq(Mines[i][0]).find(".grid").eq(Mines[i][1]).addClass("mine")
	}
	$("p").eq(0).append(": " + l);
}

function randMine() {
	let randPos = [];
	randPos.push(randxy());
	randPos.push(randxy());
	let i;
	let l = randPos.length;
	while (l < 16) {
		for (i = 0; i < l - 1; i++) {
			if (randPos[l - 1][0] === randPos[i][0] &&
				  randPos[l - 1][1] === randPos[i][1]) {
				randPos[l - 1] = randxy();
			}
		}
		randPos.push(randxy());
		l = randPos.length;
	}
	return randPos;
}

function randxy() {
	return[randNum(), randNum()];
}

function randNum() {
	return Math.floor(Math.random()*16);
}

function display() {
	const container = $(".container")
	container.append("<h4>Have Fun^</h4>");
	container.append("<p>Mine number</p>");
	container.append("<p>Smile face</p>");
	container.append("<p>time</p>");
}

function render(gridNum) {
	$(".container").append("<div class='box'></div>");
	const box = $(".box");
	let i = 0;
	for ( ; i < gridNum; i++) {
		box.append("<div class='row'></div>");
	}
	const row = $(".row");
	i = 0;
	for ( ; i < gridNum; i++) {
		row.append("<div class='grid' /*tabindex='0'*/></div>");
	}
}
