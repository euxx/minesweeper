
$(function() {

	display();
	render(16);
	putMine();
	// showNum();
	$(".grid").on("mousedown contextmenu", play);

});

function play(event) {
	const rowIndex = $(this).parent().index();
	const gridIndex = $(this).index();
	let i, j, k, x, y;
	i = rowIndex;
	j = gridIndex;
	let nearPos = [[i - 1, j - 1], [i - 1, j], [i - 1, j + 1],
								 [i + 1, j - 1], [i + 1, j], [i + 1, j + 1],
								 [i, j - 1], [i, j + 1]];

	let key = event.which;
	let nowGrid = $(this);
	if (key === 1) {
		if (nowGrid.hasClass("mark-mine")) {
			nowGrid.addClass("now-mine");
			$(".mark-mine").addClass("mine");

			const conf = confirm("Sorry...Game Over...Play again?");
			if (conf) {
				$(".grid").empty().removeClass("mark-mine now-mine mine blank");
				putMine();
			}

			return;
		} else if (!nowGrid.hasClass("blank")) {
			nowGrid.addClass("blank");

			for (k = 0; k < 8; k++) {
				x = nearPos[k][0];
				y = nearPos[k][1];
				nearNum(x, y);
			}
		}
	} else if (key === 3) {
		event.preventDefault();
		nowGrid.text("x");
	}

	if ($(".grid").filter(".mark-mine").hasClass("blank").length) {
		const conf = confirm("Congratulation! You win! Play again?");
			if (conf) {
				$(".grid").empty().removeClass("mark-mine now-mine mine blank");
				putMine();
			}
	}
}

	function nearNum(i, j) {
		let count = 0;
		let k, x, y;
		let nearPos = [[i - 1, j - 1], [i - 1, j], [i - 1, j + 1],
									 [i + 1, j - 1], [i + 1, j], [i + 1, j + 1],
									 [i, j - 1], [i, j + 1]];
		for (k = 0; k < 8; k++) {
			x = nearPos[k][0];
			y = nearPos[k][1];
			let nearGrid = $(".row").eq(x).find(".grid").eq(y);
			if(nearGrid.hasClass("mark-mine")) {
				count++;
			}
		}
		let newGrid = $(".row").eq(i).find(".grid").eq(j);
		if (count === 0) {
			newGrid.addClass("blank");
			// for (k = 0; k < 8; k++) {
			// 	x = nearPos[k][0];
			// 	y = nearPos[k][1];
				// nearNum(x, y);
			// }
		} else {
				newGrid.text(count);
		}
	}

function showNum() {
	let i, j, k, x, y;
	let count = 0;
	let nearPos = [];
	for (i = 0; i < 16; i++) {
		for (j = 0; j < 16; j++) {
			nearPos = [[i - 1, j - 1], [i - 1, j], [i - 1, j + 1],
								 [i + 1, j - 1], [i + 1, j], [i + 1, j + 1],
								 [i, j - 1], [i, j + 1]];
			const currentGrid = $(".row").eq(i).find(".grid").eq(j);
			if (!currentGrid.hasClass("mark-mine")) {
				for (k = 0; k < 8; k++) {
					x = nearPos[k][0];
					y = nearPos[k][1];
					let nearGrid = $(".row").eq(x).find(".grid").eq(y);
					if(x >= 0 && y >= 0 && nearGrid.hasClass("mark-mine")) {
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

function putMine() {
	const Mines = randMine(30);
	const l = Mines.length;
	let i, x, y;
	for (i = 0; i < l; i++) {
		x = Mines[i][0];
		y = Mines[i][1];
		$(".row").eq(x).find(".grid").eq(y).addClass("mark-mine")
	}
}

function randMine(mineNum) {
	let randPos = [randxy()];
	let nextxy;
	while (randPos.length < mineNum) {
		nextxy = randxy();
		if (isUnique(nextxy, randPos)) {
			randPos.push(nextxy);
		}
	}
	return randPos;
}

function isUnique(nextxy, randPos) {
	let i;
	let l = randPos.length;
	for (i = 0; i < l; i++) {
		if (nextxy[0] === randPos[i][0] &&
			  nextxy[1] === randPos[i][1]) {
			return false;
		}
	}
	return true;
}

function randxy() {
	return[randNum(16), randNum(16)];
}

function randNum(num) {
	return Math.floor(Math.random()*num);
}

function display() {
	const container = $(".container")
	container.append("<h4>Have Fun^</h4>");
	container.append("<p>Mine number: 30</p>");
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
