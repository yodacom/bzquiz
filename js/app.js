require("../styles/main.styl");
var $ = require("jquery");
var documents = require("./documents");


var beerList =[];
var selectedBeer = null;
var userChoices = {
	color:null,
	bitterness:null,
	alcohol:null,
	hoppyness:null
};
var colors = {
	2: {
		srm: [1, 2],
		name: "Pale Straw",
		style: "paleStraw"
	},
	3: {
		srm: [3],
		name: "straw",
		style: "straw"
	},
	4: {
		srm: [4, 5],
		name: "Pale Gold",
		style: "paleGold"
	},
	6: {
		srm: [6, 7, 8],
		name: "Deep Gold",
		style: "deepGold"
	},
	9: {
		srm: [9, 10, 11],
		name: "Pale Amber",
		style: "paleAmber"
	},
	12: {
		srm: [12, 13, 14],
		name: "Medium Amber",
		style: "mediumAmber"
	},
	15: {
		srm: [15, 16, 17],
		name: "Deep Amber",
		style: "deepAmber"
	},
	18: {
		srm: [18, 19],
		name: "Amber Brown",
		style: "amberBrown"
	},
	20: {
		srm: [20, 21, 22, 23],
		name: "Brown",
		style: "brown"
	},
	24: {
		srm: [24, 25, 26, 27, 28, 29],
		name: "Ruby Brown",
		style: "rubyBrown"
	},
	30: {
		srm: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
		name: "Deep Brown",
		style: "deepBrown"
	},
	40: {
		srm: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
		name: "Black",
		style: "black"
	}
};




// SEARCH FUNCTION

function search() {
    $('.loader_wrapper').show();

	// clear results first
	$("#textContainer").html("");
	$("#buttons").html("");


	//get data from form
	q = $("#query").val();

	//Get Request FROM API

	// === this is the digital ocean URI pointer ===
    //var url = "http://138.68.49.141:3000/beers";

	// ==== this is the local host version ====
	var url = "http://localhost:3000/beers";


	var beerData = {
		q:q
	};

	var success = function(data) {
		beerList = data.data;
	// Log data
		console.log(data);

		$.each(beerList, function(i, item) {

			if(item.nameDisplay) {
                    // Get output
				var output = getOutput(item);

                    // Display results
				$("#textContainer").append(output);
			}

		});

             //var buttons = getButtons(prePageToken, nextPageToken);

             // Display buttons
             //$("#buttons").append(buttons);
        $('.loader_wrapper').hide();

	};
	$.get(url,beerData,success);

}



// Get Beer data
function loadBeer(beerId) {

        // Using localhost:3000 express server
	var url = "http://api.brewerydb.com/v2/search?q=fat tire&type=beer&key=758086eed7b9e97ad41b21d18b37b4a7";
}

function getOutput(item) {
	var beerID = item.id;
	var beerName = item.nameDisplay;
	var beerDescription = item.description ? item.description : "";
	var beerAbv = item.abv ? item.abv : "UNKNOWN";
	var beerIbu = item.ibu ? item.ibu : "UNKNOWN";
	var beerStyle = item.style ? item.style.category.name : "UNKNOWN";
	var beerPicIcon = item.labels ? item.labels.icon : "http://beerzap.s3.amazonaws.com/beer_no_image_64x64.png";

	var result = $(".templates > .search-result").clone();
	result.data("id", beerID);

	var image = result.find(".beerImage");

	var a = $("<a>", {class:"beerImg"});

	var img = $("<img>", {src:beerPicIcon});
	a.append(img);
	image.append(a);

	var name = result.find(".beerName");
	var beerNameDisplay = $("<h4>", {class:"beerName", text:beerName});

	var readmore = beerDescription.length > 50;

	beerDescription = beerDescription.length < 50
            ? beerDescription
            : beerDescription.substr(0, 60) + "...";

	var description = $("<div>", {class:"beerDescription", html:beerDescription});
	name.append(beerNameDisplay);
	name.append(description);

	var wrapper = $("<div>", {class:"search-result-wrapper"});
	wrapper.append(result);


	if(readmore){
		var readlink = $("<a>", {class:"readMore", text:"Read More"});
		readlink.data("id", beerID);
		wrapper.append(readlink);
	}

	return wrapper;
}

// =====  Clicking the swatch and moving answer to Your Choice ======

$(function() {

	$("body").on("click", ".readMore", function(e){
		e.preventDefault();
		e.stopPropagation();
		var beerId = $(this).data("id");
		selectedBeer = beerList.find(function(beer){
			return beer.id === beerId;
		});

		if($(this).text() === "Less"){
			$(this).text("Read More");
			$(this).parent().find(".beerDescription").text(selectedBeer.description.substr(0, 60) + "...");
		}else{
			$(this).parent().find(".beerDescription").text(selectedBeer.description);
			$(this).text("Less");
		}

	});

	$("#contents").on("click", ".swatch", function(){
		var srm = $(this).data("color");
		var color = colors[srm];
		$("#selectedColor > .color-value").html($("<div>", {class:color.style, text:color.name}));
		$(".modal").hide();
		userChoices.color = color;
	});

	// ADDING SELECTED OPTION TO 'YOUR CHOICE' COLUMN

//  Hoppyness selection

	$("#beerAttributes").change(function(e) {
		e.preventDefault();
		var answer = $(this).val();
		$("#selectedHoppyness").text(answer);
		userChoices.hoppyness = answer;
	});

// bitterness selection

	$("#beerBitterness").change(function(e) {
		e.preventDefault();
		var answer = $(this).val();
		$("#selectedBitterness").text(answer);
		userChoices.bitterness = answer;
	});

// Alcohol selection

	$("#alcoholContent").change(function(e) {
		e.preventDefault();
		var answer = $(this).val();
		$("#selectedAlcohol").text(answer);
		userChoices.alcohol = answer;
	});

// ===== Modal Window functions ========
	$(".modalTrigger").click(function(e){
		e.preventDefault();

		$("#contents").html(documents[$(this).data("page")]);

		$(".modal").show();
	});

	$(".dialogs").on("click", "#btnClose", function(e){
		e.preventDefault();
		console.log("Close the modal");
		$(".modal").hide();
	});

//  ===== Search form functions ==========

	const searchField = $("#query");

	$("#search-form").submit(function(e) {
		e.preventDefault();
		search();
	});

	$("#results").on("click", ".search-result", function(e){
		e.preventDefault();
		var beerId = $(this).data("id");
		selectedBeer = beerList.find(function(beer){
			return beer.id === beerId;
		});
		$(".selectedBeer").html(getOutput(selectedBeer));
		$("#textContainer").html("");
		userChoices = {
			color:null,
			bitterness:null,
			alcohol:null,
			hoppyness:null
		};

// ====== Reset "Choose Your Value" to origional values with each new beer selection
		$('#beerBitterness').prop('selectedIndex',0);
		$('#beerAttributes').prop('selectedIndex',0);
		$('#alcoholContent').prop('selectedIndex',0);


// =======  Reset "Your Choices"" to empty when choose new beer =====

		$("#alcoholContent").val(0);
		$("#selectedAlcohol").text("");
		$("#bitternessContent").val(0);
		$("#selectedBitterness").text("");
		$("#hoppynessContent").val(0);
		$("#selectedHoppyness").text("");
		$("#selectedColor > .color-value").html("");

	// ======== clear Comparison column Values ==============

		$("#comparisonAlcohol").text("");
		$("#comparisonBitterness").text("");
		$("#comparisonHoppyness").text("");
		$("#comparisonColor").text("");

	});

// ======= Get Image to Zoom up When Hovered over ====== //

	$("#results").on("mouseenter", ".beerImg > img", function() {
		$(this).addClass("transition");
	});
	$("#results").on("mouseleave", ".beerImg > img", function() {
		$(this).removeClass("transition");
	});

   // ===== quizButton Actions ==========  //

	$("#quizBtn").click(function(e){
	    if(validate(userChoices) > 0){
            $('.validation-message').text("Please choose something first.");
            return;
        }
	    if(selectedBeer) {
            $(".beerAttribute").removeClass("s-grid-cell-md-4 s-grid-cell-sm-6");
            $(".beerAttribute").addClass("s-grid-cell-md-3 s-grid-cell-sm-4");
            $(".quizResults").show();
            console.log("The selected beer:", selectedBeer);
            console.log("The users choices", userChoices);
            compare();
        }else{
	        $('.validation-message').text("Please select a beer");
        }
	});

});

// ====== Attribute Variables for lookup and reduction to one of three answers =========

var alcoholContent = {
	abv: {
		"Low":[0, 3],
		"Average":[3, 5],
		"High":[5, 14]
	}
};

var bitternessContent = {
	ibu: {
		"Low":[0, 30],
		"Medium":[31, 70],
		"Strong":[71, 2500]
	}
};

var hoppinessContent = {

// bzh is the beerzap hoppiness scale since there is not a formal scale for this
	bzh: {
		"Low":[0, 3],
		"Medium":[4, 6],
		"Strong":[7, 10]
	}
};
// End Attribute summaries defined ============

function getAbv(value) {
	var abvValue;
	abvValue = Object.keys(alcoholContent.abv).find(function(a){
		var r = alcoholContent.abv[a];
		return value > r[0] && value <= r[1];
	});
	return abvValue;
}

function getIbu(value) {
	var ibuValue;
	ibuValue = Object.keys(bitternessContent.ibu).find(function(a){
		var r = bitternessContent.ibu[a];
		return value > r[0] && value <= r[1];
	});
	return ibuValue;
}

var bzhValue = "Medium";
// function getBzh(value) {
// 	var bzhValue = "* Correct";
// 	// var bzhValue = Object.keys(hoppinessContent.bzh).find(function(a) {
// 	// 	var r = bzhContent.bzh[a];
// 	// 	return value > r[0] && value <= r[1];
// 	// });
// 	return bzhValue;
// }

// compare Results

function compare(){
	var numCorrect = 0;

	// color compare
	if(selectedBeer.srm) {
		var color = userChoices.color.srm.includes(selectedBeer.srm.id);
		$("#comparisonColor").text(color ? "Correct" : "Wrong");
		numCorrect += color ? 1 : 0;
	}else{
		numCorrect++;
		$("#comparisonColor").text("Not Provided");
	}

	// Alcohol compare
	var selectedAbv = selectedBeer.abv;
	var abvValue = getAbv(selectedAbv);
	var alcohol = userChoices.alcohol === abvValue;
	numCorrect += alcohol?1:0;
	$("#comparisonAlcohol").text(alcohol?"Correct":"Wrong");

	// Bitterness Compare
	var selectedIbu = selectedBeer.ibu;
	if (selectedIbu){
		var ibuValue = getIbu(selectedIbu);
		var bitterness = userChoices.bitterness === ibuValue;
		numCorrect += bitterness?1:0;
		$("#comparisonBitterness").text(bitterness?"Correct":"Wrong");
	} else {
		numCorrect++;
		$("#comparisonBitterness").text("Not Provided");
	}
	// Hoppyness Compare
	var selectedBzh = selectedBzh;
	var hoppyness = userChoices.hoppyness === bzhValue;
	numCorrect += hoppyness?0:0;
	$("#comparisonHoppyness").text(hoppyness?"* Recorded":"* Recorded");

	console.log(numCorrect);
	quizFinalResults(numCorrect);
}

	// Calculate Results and show text

	function quizFinalResults (numCorrect) {
        switch(numCorrect){
            case 0: $("#resultsText").html(documents.keepTasting); break;
            case 1:
            case 2: $("#resultsText").html(documents.gettingThere); break;
            default: $("#resultsText").html(documents.youWin); break;
        }
    }

    function validate(userChoices){
        var errs = Object.keys(userChoices).reduce(function(a, b){

            return a + (userChoices[b]?0:1);
        }, 0);
        console.log(errs);
        return errs;
    }
