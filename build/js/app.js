$(function(){function t(){$("#textContainer").html(""),$("#buttons").html(""),q=$("#query").val();var t="http://api.brewerydb.com/v2/search",n=({q:q,key:"758086eed7b9e97ad41b21d18b37b4a7"},function(t){a=t.items,console.log(t),$.each(t.items,function(t,a){var n=e(a);$("#textContainer").append(n)});var n=getButtons(prePageToken,nextPageToken);$("#buttons").append(n)});$.get(t,data,n)}function e(t){var e=(t.id,t.data.nameDisplay,t.data.beerDescription,t.data.abv,t.data.ibu,t.data.style.category.name,t.data.labels.icon),a=($("<li>",{class:"text-container"}),$("<div>",{class:"list-left"})),n=$("<a>",{class:"beerLink"}),i={src:e};n.append(i),a.append(n)}var a=[];$("#query");$("#search-form").submit(function(e){e.preventDefault(),t()}),$("#results").on("click",".beerLink",function(t){t.preventDefault();$(this).data("id")}),a=data.items,$("#textContainer").append(output)});