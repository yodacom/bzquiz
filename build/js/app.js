$(function(){function t(){$("#textContainer").html(""),$("#buttons").html(""),q=$("#query").val();var t="http://api.brewerydb.com/v2/search",n={q:q,key:"758086eed7b9e97ad41b21d18b37b4a7"},o=function(t){e=t.data,console.log(t),$.each(t.data,function(t,e){var n=a(e);$("#textContainer").append(n)});var n=getButtons(prePageToken,nextPageToken);$("#buttons").append(n)};$.get(t,n,o)}function a(t){var a=(t.id,t.data.nameDisplay,t.data.beerDescription,t.data.abv,t.data.ibu,t.data.style.category.name,t.data.labels.icon),e=($("<li>",{class:"text-container"}),$("<div>",{class:"list-left"})),n=$("<a>",{class:"beerLink"}),o={src:a};n.append(o),e.append(n)}var e=[];$("#query");$("#search-form").submit(function(a){a.preventDefault(),t()}),$("#results").on("click",".beerLink",function(t){t.preventDefault();$(this).data("id")}),$(".swatch").click(function(){var t=$(this).data("color");$("#selectedColor").text(t),window.location=window.location+"#close",console.log($(this).class())})});