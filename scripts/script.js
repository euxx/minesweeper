
$(function() {

	display();
	render(16);
	putMine();
	$(".grid").on("mousedown contextmenu", play);
	$(".face").on("click", reStart);

});

function play(event) {
	const nowGrid = $(this);
	const rowIndex = nowGrid.parent().index();
	const colIndex = nowGrid.index();
	let i, j, k, x, y;
	i = rowIndex;
	j = colIndex;
	let nearPos = [[i - 1, j - 1], [i - 1, j], [i - 1, j + 1],
								 [i + 1, j - 1], [i + 1, j], [i + 1, j + 1],
								 [i, j - 1], [i, j + 1]];

	let key = event.which;
	if (key === 1) {
		if (nowGrid.hasClass("mark-mine")) {
			$(".mark-mine").addClass("mine");
			nowGrid.addClass("now-mine");
			$(".face").text("Unhappy face");

			const conf = confirm("Sorry...Game Over...Try again?");
			if (conf) {
				reStart();
			}

			// return;
		} else if (!nowGrid.hasClass("blank") &&
							 !nowGrid.hasClass("num-blank")) {
			nowGrid.addClass("blank").text("");

			for (k = 0; k < 8; k++) {
				x = nearPos[k][0];
				y = nearPos[k][1];
				if (x >= 0 && y >= 0 && x < 16 && y < 16) {
					nearNum(x, y);
				}
			}
		}
	} else if (key === 3) {
		event.preventDefault();
		let flagNum = parseInt($(".flag-num").text(), 10);
		if (!nowGrid.hasClass("blank")) {
			if (nowGrid.text() === "") {
				nowGrid.text("x");
				flagNum--;
				$(".flag-num").text(flagNum);
			} else if (nowGrid.text() === "x") {
				nowGrid.text("");
				flagNum++;
				$(".flag-num").text(flagNum);
			}
		}
	}
	const blankNum = $(".mark-blank").length;
	const safeNum = $(".blank").length + $(".num-blank").length;
	if (blankNum === safeNum) {
		const conf = confirm("Congratulation! You win! Play again?");
			if (conf) {
				reStart();
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
		if(x >= 0 && y >= 0 && x < 16 && y < 16) {
			let nearGrid = $(".row").eq(x).find(".grid").eq(y);
			if (nearGrid.hasClass("mark-mine")) {
				count++;
			}
		}
	}
	let newGrid = $(".row").eq(i).find(".grid").eq(j);
	if (count === 0 && !newGrid.hasClass("num-blank") &&
										 !newGrid.hasClass("mark-mine")) {
		newGrid.addClass("blank");
		// for (k = 0; k < 8; k++) {
		// 	x = nearPos[k][0];
		// 	y = nearPos[k][1];
			// nearNum(x, y);
		// }
	} else if (newGrid.hasClass("mark-blank")) {
			newGrid.addClass("num-blank");
			newGrid.text(count);
	}
}

function reStart() {
	$(".grid").empty().removeClass("mark-mine now-mine mine mark-blank num-blank blank");
	$("p").eq(1).text("Smiley face");
	putMine();
}

function putMine() {
	const Mines = randMine(30);
	const l = Mines.length;
	let i, x, y;
	for (i = 0; i < l; i++) {
		x = Mines[i][0];
		y = Mines[i][1];
		$(".row").eq(x).find(".grid").eq(y).addClass("mark-mine");
	}
	$(".grid").not(".mark-mine").addClass("mark-blank");
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
	return [randNum(16), randNum(16)];
}

function randNum(num) {
	return Math.floor(Math.random()*num);
}

function display() {
	const container = $(".container")
	container.append("<h4>Have Fun^</h4>");
	container.append("<p>Flag number: <span class='flag-num'>30</span></p>");
	container.append("<p class='face'>Smiley face</p>");
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
