$(".swatch").click(function(){var e=$(this).data("color");$("#selectedColor").text(e),window.location=window.location+"#close"}),$(".hoppyness").clone().insertAfter(".selectedHoppyness"),$(".alcohol").clone().insertAfter(".selectedAlcohol"),$(".bitterness").clone().insertAfter(".selectedBitterness"),$(function(){function e(){$("#textContainer").html(""),$("#buttons").html(""),q=$("#query").val();var e="http://api.brewerydb.com/v2/search",n={q:q,key:"758086eed7b9e97ad41b21d18b37b4a7"},o=function(e){a=e.data,console.log(e),$.each(e.data,function(e,a){var n=t(a);$("#textContainer").append(n)});var n=getButtons(prePageToken,nextPageToken);$("#buttons").append(n)};$.get(e,n,o)}function t(e){var t=(e.id,e.data.nameDisplay,e.data.beerDescription,e.data.abv,e.data.ibu,e.data.style.category.name,e.data.labels.icon),a=($("<li>",{class:"text-container"}),$("<div>",{class:"list-left"})),n=$("<a>",{class:"beerLink"}),o={src:t};n.append(o),a.append(n)}var a=[];$("#query");$("#search-form").submit(function(t){t.preventDefault(),e()}),$("#results").on("click",".beerLink",function(e){e.preventDefault();$(this).data("id")})});