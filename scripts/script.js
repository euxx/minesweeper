
$(function() {

	content();
	render(16);
	putMine();
	$(".grid").on("contextmenu", function() { event.preventDefault(); });
	$(".grid").on("mousedown", play);
	$(".face").on("click", reStart);

});

function play(event) {
	const nowGrid = $(this);
	const rowIndex = nowGrid.parent().index();
	const colIndex = nowGrid.index();
	let i = rowIndex;
	let j = colIndex;
	let nearPos = [[i - 1, j - 1], [i - 1, j], [i - 1, j + 1], [i, j - 1],
								 [i + 1, j - 1], [i + 1, j], [i + 1, j + 1], [i, j + 1]];

	let key = event.which;
	if (key === 1) {
		if (nowGrid.hasClass("mine-mark")) {
			nowGrid.addClass("now-mine");
			$(".mine-mark").addClass("show-mine");
			$(".face").text("Unhappy Face");

			const conf = confirm("Sorry...Game Over...Try again?");
			if (conf) {
				reStart();
			}

		} else if (!nowGrid.is(".safe-blank, .num-mark")) {
			nowGrid.addClass("safe-blank");

			let x, y;
			for (let k = 0; k < 8; k++) {
				x = nearPos[k][0];
				y = nearPos[k][1];
				if (x >= 0 && y >= 0 && x < 16 && y < 16) {
					nearNum(x, y);
				}
			}
		}
	} else if (key === 3) {
		let flagNum = parseInt($(".flag-num").text(), 10);
		if (nowGrid.text() === "" && !nowGrid.hasClass("safe-blank")) {
			nowGrid.text("x");
			flagNum--;
			$(".flag-num").text(flagNum);
		} else if (nowGrid.text() === "x") {
			nowGrid.text("");
			flagNum++;
			$(".flag-num").text(flagNum);
		}
	}
	const blankNum = $(".blank-mark").length;
	const safeNum = $(".safe-blank").length + $(".num-mark").length;
	if (blankNum === safeNum) {
		const conf = confirm("Congratulation! You win! Play again?");
			if (conf) {
				reStart();
			}
	}
}

function nearNum(i, j) {
	let nearPos = [[i - 1, j - 1], [i - 1, j], [i - 1, j + 1], [i, j - 1],
								 [i + 1, j - 1], [i + 1, j], [i + 1, j + 1], [i, j + 1]];
	let count = 0;
	let x, y, nearGrid;
	for (let k = 0; k < 8; k++) {
		x = nearPos[k][0];
		y = nearPos[k][1];
		if(x >= 0 && y >= 0 && x < 16 && y < 16) {
			nearGrid = $(".row").eq(x).find(".grid").eq(y);
			if (nearGrid.hasClass("mine-mark")) {
				count++;
			}
		}
	}
	let newGrid = $(".row").eq(i).find(".grid").eq(j);
	if (count === 0 && !newGrid.is(".num-mark, .mine-mark")) {
		newGrid.addClass("safe-blank");
		// for (k = 0; k < 8; k++) {
		// 	x = nearPos[k][0];
		// 	y = nearPos[k][1];
		// 	nearNum(x, y);
		// }
	} else if (newGrid.hasClass("blank-mark")) {
			newGrid.addClass("num-mark");
			newGrid.text(count);
	}
}

function reStart() {
	$(".grid").empty().removeClass("mine-mark show-mine now-mine " +
																 "blank-mark safe-blank num-mark");
	$("p").eq(1).text("Smiley Face");
	$(".flag-num").text(30);
	putMine();
}

function putMine() {
	const Mines = randMine(30);
	let x, y;
	for (let k = 0; k < Mines.length; k++) {
		x = Mines[k][0];
		y = Mines[k][1];
		$(".row").eq(x).find(".grid").eq(y).addClass("mine-mark");
	}
	$(".grid").not(".mine-mark").addClass("blank-mark");
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
	for (let i = 0; i < randPos.length; i++) {
		if (nextxy[0] === randPos[i][0] && nextxy[1] === randPos[i][1]) {
			return false;
		}
	}
	return true;
}

function randxy() {
	return [randNum(16), randNum(16)];
}

function randNum(num) {
	return Math.floor(Math.random()*num);
}

function content() {
	$(".container").append("<h4>Have Fun^</h4>" +
		"<p>Remain Flag: <span class='flag-num'>30</span></p>" +
		"<p class='face'>Smiley Face</p>" +
		"<p>Time</p>" +
		"<div class='box'></div>");
}

function render(gridNum) {
	const $box = $(".box");
	for (let i = 0; i < gridNum; i++) {
		$box.append("<div class='row'></div>");
	}
	const $row = $(".row");
	for (let i = 0; i < gridNum; i++) {
		$row.append("<div class='grid' /*tabindex='0'*/></div>");
	}
}
