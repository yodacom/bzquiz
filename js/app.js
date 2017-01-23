/* eslint-env jquery */

// Clicking the swatch and moving answer to Your Choice



	// Alcohol
	$(".alcohol").clone().insertAfter(".selectedAlcohol");

	// Bitterness
	$(".bitterness").clone().insertAfter(".selectedBitterness");



// Searchbar Handler

$(function() {

	$('#contents').on('click', '.swatch', function(){
		var color = $(this).data("color");
		$("#selectedColor").text(color);
		$(".modal").hide();
		// console.log($(this).class());
	});

	// ADDING SELECTED OPTION TO 'YOUR CHOICE' COLUMN
	// hoppyness

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
