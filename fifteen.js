var empty = 15;
var tiles;
var ifstart_bool = false;
var total_scores = 500;
var total;

window.onload=function() {
	total = document.getElementById("score")
	creat_block();
	start();
	mouse();
	end();
}

function creat_block() {
	var ko = document.getElementById('all');
	for (var i = 0; i < 15; i++) {
		var new_block = document.createElement('div');
		ko.appendChild(new_block);
		new_block.origin = i;
		new_block.current_ = i;
		var top = 0;
		var left = 0;
		if (i < 4) top = 0;
		else if (i < 8) top = 88;
		else if (i < 12) top = 176;
		else top = 264;
		new_block.style.top=top+"px";
		left = (i%4)*88;
		new_block.style.left=left+"px";
		new_block.className = "block";
		new_block.addEventListener("click", clicked);
		new_block.addEventListener("mouseover", bigger);
		new_block.addEventListener("mouseout", smaller);
		new_block.style.backgroundPosition="-"+left+"px -" +top+"px";
	}
	tiles = document.getElementsByClassName("block");;
}

function exchange(ko) {
	var tmp = ko.current_;
	ko.current_ = empty;
	empty = tmp;
	var top = Math.floor(ko.current_/4)*88;
	var left = (ko.current_%4)*88;
	ko.style.top=top+'px';
	ko.style.left=left+'px';
}

function clicked(event) {
	if (ifstart_bool == true) {
		var curr = event.target;
		if (curr.current_ == empty+1&&curr.current_%4 != 0) {
			exchange(curr);
		} else if (curr.current_ == empty-1&&empty%4 != 0) {
			exchange(curr);
		} else if (curr.current_ == empty+4 || curr.current_ == empty-4) {
			exchange(curr);
		}
		display_score();
		ifwon();
	}
	
}

function upset() {
	var arr = [];
	for (var i = 0; i < 16; i++) {
		arr[i] = i;
	}
	var oo = 15;
	for (var j = 0; j < 500; j++) {
		var k = Math.floor(Math.random()*4);
		if (k == 0 && Math.floor(oo/4) != 3) {
			arr[oo] = arr[oo+4];
			oo = oo+4;
		} else if (k == 1 && Math.floor(oo/4) != 0) {
			arr[oo] = arr[oo-4];
			oo = oo-4;
		} else if (k == 2 && oo%4 != 3) {
			arr[oo] = arr[oo+1];
			oo = oo+1;
		} else if (k == 3 && oo%4 != 0) {
			arr[oo] = arr[oo-1];
			oo = oo-1;
		}
	}

	while (oo % 4 != 3) {
		arr[oo] = arr[oo+1];
		oo = oo+1;
	}
	while (oo != 15) {
		arr[oo] = arr[oo+4];
		oo = oo+4;
	}
	console.log("hehe2");

	for (i = 0; i < 16; i++) {
		if (i == oo) continue;
		tiles[arr[i]].current_ = i;
		var top = Math.floor(i/4)*88;
		var left = (i%4)*88;
		tiles[arr[i]].style.top=top+'px';
		tiles[arr[i]].style.left=left+'px';
	}
	console.log("hehe3");
	
	empty = oo;
}

function bigger(event) {
	event.target.classList.add("big");
}
function smaller(event) {
	event.target.classList.remove("big");
}
function start() {
	var ss = document.getElementById("start");
	ss.onclick = function() {
		if (ifstart_bool == false) {
			upset();
			ifstart_bool = true;
			total_scores = 501;
			display_score();
		} else {
			alert("The game has started....If you want to restart, please end the game first.")
		}
	}
}
function end() {
	var ee = document.getElementById("end");
	ee.onclick=function() {
		if (ifstart_bool == true) {
			restore();
			ifstart_bool = false;
			alert("You have quiz the game.");
			total_scores = 501;
			display_score();
		}
	}
}
function mouse() {
	var ss1 = document.getElementsByClassName("button");
	for (var p = 0; p < ss1.length; p++) {
		ss1[p].onmouseover=function() {
		this.style.cursor = "pointer";
	}
	}
	
}
function won() {
	if (ifstart_bool == true) {
		for (var i = 0; i < tiles.length; i++) {
			if (tiles[i].current_ != tiles[i].origin)
				return false;
		}
		return true;
	}
	return false;
}
function ifwon() {
	if (won() == true) {
		alert("You Win!");
		ifstart_bool = false;
	}
}
function restore() {
	for (var l = 0; l < tiles.length; l++) {
		tiles[l].current_ = l;
		var top = Math.floor(l/4)*88;
		var left = (l%4)*88;
		tiles[l].style.top=top+'px';
		tiles[l].style.left=left+'px';
	}
	empty = 15;
}
function display_score() {
	total_scores--;
	total.textContent=total_scores.toString();
}