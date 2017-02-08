/* eslint-env jquery */

var beerList =[];
var selectedBeer = null;
var userChoices = {
	color:null,
	bitterness:null,
	alcohol:null,
	hoppyness:null
};
var colors = {
	2:{
		srm:[1, 2],
		name:"Pale Straw",
		style:"paleStraw"
	},
	3:{
		srm:[3],
		name:"straw",
		style:"straw"
	},
	4:{
		srm:[4, 5],
		name:"Pale Gold",
		style:"paleGold"
	},
	6:{
		srm:[6,7,8],
		name:"Deep Gold",
		style:"deepGold"
	},
	9:{
		srm:[9,10,11],
		name:"Pale Amber",
		style:"paleAmber"
	},
	12:{
		srm:[12,13,14],
		name:"Medium Amber",
		style:"mediumAmber"
	},
	15:{
		srm:[15,16,17],
		name:"Deep Amber",
		style:"deepAmber"
	},
	18:{
		srm:[18,19],
		name:"Amber Brown",
		style:"amberBrown"
	},
	20:{
		srm:[20,21,22,23],
		name:"Brown",
		style:"brown"
	},
	24:{
		srm:[24,25,26,27,28,29],
		name:"Ruby Brown",
		style:"rubyBrown"
	},
	30:{
		srm:[30,31,32,33,34,35,36,37,38,39],
		name:"Deep Brown",
		style:"deepBrown"
	},
	40:{
		srm:[40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90],
		name:"Black",
		style:"black"
	}

};

// SEARCH FUNCTION

function search() {
	// clear results first
	$("#textContainer").html("");
	$("#buttons").html("");


	    //get data from form
	q = $("#query").val();


	    //Get Request FROM API
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

	};
	$.get(url,beerData,success);

}



// Get Beer data
function loadBeer(beerId) {

        // Using localhost:3000 express server
	var url = "http://api.brewerydb.com/v2/search?q=fat tire&type=beer&key=758086eed7b9e97ad41b21d18b37b4a7";
}

	// beerList = data.items;



	// $("#textContainer").append(output);

	// Build output

    /*
     var item = {
     "id": "vJCXKD",
     "name": "Coors Banquet",
     "nameDisplay": "Coors Banquet",
     "description": "Coors, nicknamed the \"Banquet Beer,\" was first introduced by Adolph Coors 1873. According to legend, thirsty miners in the late 1800s threw celebratory banquets with Coors as the honorary beer because of its superior craftsmanship. Prior to its nationwide distribution in 1981, Coors built a cult following, with presidents, movie stars and many others making special trips out west to buy it. Coors is brewed in the Rockies for a uniquely crisp, clean and drinkable taste.",
     "abv": "5",
     "glasswareId": 5,
     "availableId": 1,
     "styleId": 94,
     "isOrganic": "N",
     "labels": {
     "icon": "https://s3.amazonaws.com/brewerydbapi/beer/vJCXKD/upload_E7cekQ-icon.png",
     "medium": "https://s3.amazonaws.com/brewerydbapi/beer/vJCXKD/upload_E7cekQ-medium.png",
     "large": "https://s3.amazonaws.com/brewerydbapi/beer/vJCXKD/upload_E7cekQ-large.png"
     },
     "status": "verified",
     "statusDisplay": "Verified",
     "createDate": "2012-01-03 02:43:01",
     "updateDate": "2015-12-15 23:20:59",
     "glass": {
     "id": 5,
     "name": "Pint",
     "createDate": "2012-01-03 02:41:33"
     },
     "available": {
     "id": 1,
     "name": "Year Round",
     "description": "Available year round as a staple beer."
     },
     "style": {
     "id": 94,
     "categoryId": 8,
     "category": {
     "id": 8,
     "name": "North American Lager",
     "createDate": "2012-03-21 20:06:46"
     },
     "name": "American-Style Light (Low Calorie) Lager",
     "shortName": "American Light Lager",
     "description": "These beers are extremely light colored, light in body, and high in carbonation. Calorie level should not exceed 125 per 12 ounce serving. Corn, rice, or other grain or sugar adjuncts are often used. Flavor is mild and hop bitterness and aroma is negligible to very low. Light fruity esters are acceptable. Chill haze and diacetyl should be absent.",
     "ibuMin": "5",
     "ibuMax": "10",
     "abvMin": "3.5",
     "abvMax": "4.4",
     "srmMin": "2",
     "srmMax": "4",
     "ogMin": "1.024",
     "fgMin": "1.002",
     "fgMax": "1.008",
     "createDate": "2012-03-21 20:06:46",
     "updateDate": "2015-04-07 15:39:35"
     },
     "type": "beer"
     }
     */

function getOutput(item) {
	var beerID = item.id;
	var beerName = item.nameDisplay;
	var beerDescription = item.description ? item.description : "";
	var beerAbv = item.abv ? item.abv : "UNKNOWN";
	var beerIbu = item.ibu ? item.ibu : "UNKNOWN";
	var beerStyle = item.style ? item.style.category.name : "UNKNOWN";
	var beerPicIcon = item.labels ? item.labels.icon : "http://beerzap.s3.amazonaws.com/beer_no_image_64x64.png";

	var result = $(".templates > .search-result").clone();
	var image = result.find(".beerImage");

	var a = $("<a>", {class:"beerImg"});
	a.data("id", beerID);
	var img = $("<img>", {src:beerPicIcon});
	a.append(img);
	image.append(a);

	var name = result.find(".beerName");
	var beerNameDisplay = $("<h4>", {class:"beerName", text:beerName});
	beerDescription = beerDescription.length < 50
            ? beerDescription
            : beerDescription.substr(0, 60) + " ... ";

	var description = $("<div>", {class:"beerDescription", text:beerDescription});
	name.append(beerNameDisplay);
	name.append(description);

	return result;
}

// =====  Clicking the swatch and moving answer to Your Choice ======

$(function() {

	$("#contents").on("click", ".swatch", function(){
		var srm = $(this).data("color");
		var color = colors[srm];
		$("#selectedColor").html($("<div>", {class:color.style, text:color.name}));
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
		$.get("js/documents/" + $(this).data("page"))
        .success(function(data){
	        $("#contents").html(data);
});
		$(".modal").show();
	});

	$(".dialogs").on("click", "#btnClose", function(e){
		e.preventDefault();
		console.log("Close the modal");
		$(".modal").hide();
	});

//  ===== Search form functions ===========

	const searchField = $("#query");

	$("#search-form").submit(function(e) {
		e.preventDefault();
		search();
	});

	$("#results").on("click", ".beerImg", function(e){
		e.preventDefault();
		var beerId = $(this).data("id");
		selectedBeer = beerList.find(function(beer){
		    return beer.id == beerId;
			});
		$(".selectedBeer").html(getOutput(selectedBeer));
		$("#textContainer").html("");

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
		$(".beerAttribute").removeClass("s-grid-cell-md-4");
		$(".beerAttribute").addClass("s-grid-cell-md-3");
	    $(".quizResults").show();
	    console.log("The selected beer:", selectedBeer);
	    console.log("The users choices", userChoices);
	    compare();
	});

});

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

var bzhValue = "Medium"
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
	    var color = userChoices.color.srm.includes(selectedBeer.srm.id);
	    $("#comparisonColor").text(color?"Correct":"Wrong");
	numCorrect += color?1:0;

	// alcohol compare
	    var selectedAbv = selectedBeer.abv;
	    var abvValue = getAbv(selectedAbv);
	    var alcohol = userChoices.alcohol == abvValue;
	    numCorrect += alcohol?1:0;
	    $("#comparisonAlcohol").text(alcohol?"Correct":"Wrong");

	// Bitterness Compare
	var selectedIbu = selectedBeer.ibu;
	    var ibuValue = getIbu(selectedIbu);
	    var bitterness = userChoices.bitterness == ibuValue;
	    numCorrect += bitterness?1:0;
	    $("#comparisonBitterness").text(bitterness?"Correct":"Wrong");
	
	// Hoppyness Compare
		var selectedBzh = selectedBzh;
		var hoppyness = userChoices.hoppyness == bzhValue;
		numCorrect += hoppyness?0:0;
		$("#comparisonHoppyness").text(hoppyness?"* Always Correct":"* Always Correct")

	    console.log(numCorrect);

}
