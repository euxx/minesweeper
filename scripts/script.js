
$(function() {

	display();
	render(16);
	showMine();
	showNum();
	$(".grid").click(play);

});

function play(event) {
	let key = event.which;
	if (key === 1) {
		if ($(this).hasClass("mine")) {
			showMine;
			confirm("Oh,Game Over...Play again?");
			return;
		}
	} else if (key === 3) {
		event.preventDefault();
		$(this).text("f");
	}
}

function showNum() {
	let i, j, k, m, n;
	let count = 0;
	let near = [];
	for (i = 0; i < 16; i++) {
		for (j = 0; j < 16; j++) {
			near = [[i - 1, j - 1],[i - 1, j], [i - 1, j + 1],
							[i + 1, j - 1],[i + 1, j], [i + 1, j + 1],
							[i, j - 1], [i, j + 1]];
			const currentGrid = $(".row").eq(i).find(".grid").eq(j);
			if (!currentGrid.hasClass("mine")) {
				for (k = 0; k < 8; k ++) {
					m = near[k][0];
					n = near[k][1];
					let nearGrid = $(".row").eq(m).find(".grid").eq(n);
					if(nearGrid.hasClass("mine")) {
						count++;
					}
				}
				if (count > 0) {
					currentGrid.text(count);
					count = 0;
				}
			}
		}
	}
}

function showMine() {
	const Mines = randMine();
	const l = Mines.length;
	let i;
	for (i = 0; i < l; i++) {
		$(".row").eq(Mines[i][0]).find(".grid").eq(Mines[i][1]).addClass("mine")
	}
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
	$("p").eq(0).append(": " + l);
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
