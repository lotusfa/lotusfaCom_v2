let dataURL = "./data.json";
main ();

let $grid;
let $profolios;
function main () {

	$( document ).ready(function() {

		updateContainer ();

		loadProfolio ( (data)=>{
		  setProfolios (data.Profolio);
		});
		
	    // init Masonry
    	$profolios = $('.profolios').masonry({
		  itemSelector: '.profolio',
		  columnWidth: 10
		});

		$grid = $('.grid-container').masonry({
		  	itemSelector: '.grid-item',
		  	columnWidth: 1
		});

    	// layout Masonry after each image loads
    	$grid.imagesLoaded().progress( function() {
    	  updateContainer();
    	});

    	// layout Masonry after each image loads
    	$profolios.imagesLoaded()
    	.always( function( instance ) {
			updateProfolio();
		})
		.done( function( instance ) {
			// updateProfolio();
		})
		.fail( function() {
			console.log('all images loaded, at least one is broken');
		})
		.progress( function() {
			updateProfolio();
    	});

		setInterval(()=>{
			updateProfolio();
		},500);

    		// var $profolios = $('.profolios').imagesLoaded( function() {
    		//   // init Masonry after all images have loaded
    		//   $profolios.masonry({
    	 //  		  	itemSelector: '.profolio',
    	 //  		  	columnWidth: '.profolio'
    	 //  		});	
    		// });

    		// var $grid = $('.grid-container').imagesLoaded( function() {
    		//   // init Masonry after all images have loaded
    		//   $grid.masonry({
    		// 	  	itemSelector: '.grid-item',
    		// 	  	columnWidth: 1
    		// 	});
    		// });
	});
}

function setProfolios (pArray) {
	let p = pArray;

	document.getElementById("profolios").innerHTML = "";

	for (var i = 0; i < p.length; i++) {

	  var proNode = document.createElement("div");
	  proNode.className = "profolio nopadding container";
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

	  // document.getElementById("profolios").appendChild(proNode);

	  // append items to grid
	  	$profolios.append( proNode )
	      // add and lay out newly appended items
	      .masonry( 'appended', proNode ).masonry();
	}

	setTimeout(()=>{
		updateProfolio();
	},200);
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
	console.log('updateMasonry');
	updateContainer ();
	updateProfolio ();
}

function updateContainer () {
	console.log('updateContainer');
$('.grid-container').masonry({
  itemSelector: '.grid-item',
  columnWidth: 1
});
}

function updateProfolio () {
	console.log('updateProfolio');
	$profolios.masonry();
// $('.profolios').masonry({
//   itemSelector: '.profolio',
//   columnWidth: 1
// });
}