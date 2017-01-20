/* eslint-env jquery */

// Clicking the swatch and moving answer to Your Choice

	$(".swatch").click(function(){
		var color = $(this).data("color");
		$("#selectedColor").text(color);
		window.location = window.location + "#close";
		// console.log($(this).class());
	});

	// ADDING SELECTED OPTION TO 'YOUR CHOICE' COLUMN
	// hoppyness
	
	// $(".hoppyness").clone().insertAfter(".selectedHoppyness");

$( "select" )
  .change(function () {
    var str = "";
    $( "select option:selected" ).each(function() {
      str += $( this ).text() + " ";
    });
    $( "#selectedHoppyness" ).text( str );
  })
  .change();
	

	// Alcohol
	$(".alcohol").clone().insertAfter(".selectedAlcohol");

	// Bitterness
	$(".bitterness").clone().insertAfter(".selectedBitterness");



// Searchbar Handler

$(function() {
	var beerList =[];

	const searchField = $("#query");

	$("#search-form").submit(function(e) {
		e.preventDefault();
		search();
	});

	$("#results").on("click", ".beerLink", function(e){
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
 
		var url = "http://api.brewerydb.com/v2/search";
 
		var beerData = {
	 q: q,
			key: "758086eed7b9e97ad41b21d18b37b4a7"
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

	 var buttons = getButtons(prePageToken, nextPageToken);

	 // Display buttons
	 $("#buttons").append(buttons);
	
		};
		$.get(url,beerData,success);

	}



// Get Beer data
	function loadBeer(beerId) { 
		var url = "http://api.brewerydb.com/v2/search?q=fat tire&type=beer&key=758086eed7b9e97ad41b21d18b37b4a7";
	}

	// beerList = data.items;



	// $("#textContainer").append(output);

	// Build output

	function getOutput(item) {
		var beerID = item.id;
		var beerName = item.data.nameDisplay;
		var beerDescription = item.data.beerDescription;
		var beerAbv = item.data.abv;
		var beerIbu = item.data.ibu;
		var beerStyle = item.data.style.category.name;
		var beerPicIcon = item.data.labels.icon;

		var li = $("<li>", {class:"text-container"});
		var listLeft = $("<div>",{class:"list-left"});
		var a = $("<a>", {class:"beerLink"});
		var img = ("<img>", {src:beerPicIcon});
		a.append(img);
		listLeft.append(a);

	}

});