$(function(){function a(){$("#textContainer").html(""),$("#buttons").html(""),q=$("#query").val();var a="http://api.brewerydb.com/v2/search",n={q:q,key:"758086eed7b9e97ad41b21d18b37b4a7"},i=function(a){t=a.data,console.log(a),$.each(a.data,function(a,t){var n=e(t);$("#textContainer").append(n)});var n=getButtons(prePageToken,nextPageToken);$("#buttons").append(n)};$.get(a,n,i)}function e(a){var e=(a.id,a.data.nameDisplay,a.data.beerDescription,a.data.abv,a.data.ibu,a.data.style.category.name,a.data.labels.icon),t=($("<li>",{class:"text-container"}),$("<div>",{class:"list-left"})),n=$("<a>",{class:"beerLink"}),i={src:e};n.append(i),t.append(n)}var t=[];$("#query");$("#search-form").submit(function(e){e.preventDefault(),a()}),$("#results").on("click",".beerLink",function(a){a.preventDefault();$(this).data("id")})});