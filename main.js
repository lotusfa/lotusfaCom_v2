let dataURL = "./data.json";
main ();

function main () {

	updateContainer ();

	loadProfolio ( (data)=>{
	  
	  setProfolios (data.Profolio);
	  
	  updateMasonry ();

	  setTimeout(()=>{ updateProfolio (); }, 50);
	  setTimeout(()=>{ updateProfolio (); }, 500);
	  setInterval(()=>{ updateMasonry (); }, 1500);
	});
}

function setProfolios (pArray) {
	let p = pArray;

	document.getElementById("profolios").innerHTML = "";

	for (var i = 0; i < p.length; i++) {

	  var proNode = document.createElement("div");
	  proNode.className = "profolio col-xs-6 col-sm-4 nopadding container";
	  proNode.style.display = "none";

	  var cardNode = document.createElement("div");
	  cardNode.className = "pad card";

	  var aNode = document.createElement("a");
	  aNode.href = p[i].url;

	  var imgNode = new Image();
	  imgNode.addEventListener('load', function() {
	    this.parentNode.parentNode.parentNode.style.display = "block";
	  });

	  imgNode.src = p[i].image;

	  var textNode = document.createElement("div");
	  textNode.className = "containercard";
	  textNode.innerHTML = p[i].name;

	  aNode.appendChild(imgNode);
	  aNode.appendChild(textNode);
	  cardNode.appendChild(aNode);
	  proNode.appendChild(cardNode);

	  document.getElementById("profolios").appendChild(proNode);
	}
}

function imgLoaded(pNode,callback){
	callback(pNode);
}

function loadProfolio (callback) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
	    var myObj = JSON.parse(this.responseText);
	    return callback(myObj);
	  }
	};
	xmlhttp.open("GET", dataURL , true);
	xmlhttp.send();
}

function updateMasonry () {
	updateContainer ();
	updateProfolio ();
}

function updateContainer () {
$('.grid-container').masonry({
  itemSelector: '.grid-item',
  columnWidth: 1
});
}

function updateProfolio () {
$('.profolios').masonry({
  itemSelector: '.profolio',
  columnWidth: '.profolio'
});
}