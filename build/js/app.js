$(".alcohol").clone().insertAfter(".selectedAlcohol"),$(".bitterness").clone().insertAfter(".selectedBitterness"),$(function(){function e(){$("#textContainer").html(""),$("#buttons").html(""),q=$("#query").val();var e="http://localhost:3000/beers",a={q:q},s=function(e){n=e.data,console.log(e),$.each(e.data,function(e,n){var a=t(n);$("#textContainer").append(a)})};$.get(e,a,s)}function t(e){var t=(e.id,e.nameDisplay,e.beerDescription,e.abv?e.abv:"UNKNOWN",e.ibu?e.ibu:"UNKNOWN",e.style?e.style.category.name:"UNKNOWN",e.labels?e.labels.icon:"http://beerzap.s3.amazonaws.com/beer_no_image_64x64.png"),n=$(".templates > .search-result").clone(),a=n.find(".beerName"),s=$("<a>",{class:"beerImg"}),l=$("<img>",{src:t}),o=$("<h3>",{class:"beerName"});return s.append(l),a.append(s),a.append(o),n}$("#contents").on("click",".swatch",function(){var e=$(this).data("color");$("#selectedColor").text(e),$(".modal").hide()}),$("#beerAttributes").change(function(e){e.preventDefault();var t=$(this).val();$("#selectedHoppyness").append(t)}),$("#beerAttributes").change(function(e){e.preventDefault();var t=$(this).val();$("#selectedBitterness").append(t)}),$("#beerAttributes").change(function(e){e.preventDefault();var t=$(this).val();$("#selectedAlcohol").append(t)}),$(".modalTrigger").click(function(e){e.preventDefault(),$.get("js/documents/"+$(this).data("page")).success(function(e){$("#contents").html(e)}),$(".modal").show()}),$(".dialogs").on("click","#btnClose",function(e){e.preventDefault(),console.log("Close the modal"),$(".modal").hide()});var n=[];$("#query");$("#search-form").submit(function(t){t.preventDefault(),e()}),$("#results").on("click",".beerImg",function(e){e.preventDefault();$(this).data("id")})});