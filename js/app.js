/* eslint-env jquery */





// Clicking the swatch and moving answer to Your Choice






$(function() {

	$('#contents').on('click', '.swatch', function(){
		var color = $(this).data("color");
		$("#selectedColor").text(color);
		$(".modal").hide();
		// console.log($(this).class());
	});

	// ADDING SELECTED OPTION TO 'YOUR CHOICE' COLUMN
	
    // // Alcohol
	// $(".alcohol").clone().insertAfter(".selectedAlcohol");

	// // Bitterness
	// $(".bitterness").clone().insertAfter(".selectedBitterness");
    
    // // hoppyness
    // $(".hoppyness").clone().insertAfter(".selectedHoppyness");

$("#beerAttributes").change(function(e) {
  e.preventDefault();
  var answer = $(this).val();
  $("#selectedHoppyness").append(answer);
});

// bitterness selection

$("#beerAttributes").change(function(e) {
  e.preventDefault();
  var answer = $(this).val();
  $("#selectedBitterness").append(answer);
});

// Alcohol selection

$("#beerAttributes").change(function(e) {
  e.preventDefault();
  var answer = $(this).val();
  $("#selectedAlcohol").append(answer);
});

$(".modalTrigger").click(function(e){
    e.preventDefault();
    $.get("js/documents/" + $(this).data("page"))
        .success(function(data){
            $("#contents").html(data);
        });
    $(".modal").show();
});

$(".dialogs").on('click', '#btnClose', function(e){
    e.preventDefault();
    console.log("Close the modal");
    $(".modal").hide();
});

	var beerList =[];

	const searchField = $("#query");

	$("#search-form").submit(function(e) {
		e.preventDefault();
		search();
	});

	$("#results").on("click", ".beerImg", function(e){
		e.preventDefault();
		var beerId = $(this).data("id");
	});

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

	        $.each(data.data, function(i, item) {

                // Get output
		        var output = getOutput(item);

                // Display results
		        $("#textContainer").append(output);

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
		var beerDescription = item.beerDescription;
		var beerAbv = item.abv ? item.abv : 'UNKNOWN';
		var beerIbu = item.ibu ? item.ibu : 'UNKNOWN';
		var beerStyle = item.style ? item.style.category.name : 'UNKNOWN';
		var beerPicIcon = item.labels ? item.labels.icon : 'http://beerzap.s3.amazonaws.com/beer_no_image_64x64.png';

		var result = $('.templates > .search-result').clone();
		var name = result.find('.beerName');

        var a = $("<a>", {class:"beerImg"});
        var img = $("<img>", {src:beerPicIcon});
        var beerNameDisplay =$("<h3>", {class:"beerName"});
        a.append(img);
		name.append(a);
		name.append(beerNameDisplay);

		return result;
	}

});
