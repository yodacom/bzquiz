function search(){$("#textContainer").html(""),$("#buttons").html(""),q=$("#query").val();var e="http://localhost:3000/beers",t={q:q},n=function(e){beerList=e.data,console.log(e),$.each(e.data,function(e,t){if(t.nameDisplay){var n=getOutput(t);$("#textContainer").append(n)}})};$.get(e,t,n)}function loadBeer(e){}function getOutput(e){var t=(e.id,e.nameDisplay),n=e.description?e.description:"",a=(e.abv?e.abv:"UNKNOWN",e.ibu?e.ibu:"UNKNOWN",e.style?e.style.category.name:"UNKNOWN",e.labels?e.labels.icon:"http://beerzap.s3.amazonaws.com/beer_no_image_64x64.png"),s=$(".templates > .search-result").clone(),o=s.find(".beerImage"),l=$("<a>",{class:"beerImg"}),i=$("<img>",{src:a});l.append(i),o.append(l);var r=s.find(".beerName"),c=$("<h4>",{class:"beerName",text:t});n=n.length<50?n:n.substr(0,60)+" ... ";var u=$("<div>",{class:"beerDescription",text:n});return r.append(c),r.append(u),s}$(function(){$("#contents").on("click",".swatch",function(){var e=$(this).data("color");$("#selectedColor").text(e),$(".modal").hide()}),$("#beerAttributes").change(function(e){e.preventDefault();var t=$(this).val();$("#selectedHoppyness").text(t)}),$("#beerBitterness").change(function(e){e.preventDefault();var t=$(this).val();$("#selectedBitterness").text(t)}),$("#alcoholContent").change(function(e){e.preventDefault();var t=$(this).val();$("#selectedAlcohol").append(t)}),$(".modalTrigger").click(function(e){e.preventDefault(),$.get("js/documents/"+$(this).data("page")).success(function(e){$("#contents").html(e)}),$(".modal").show()}),$(".dialogs").on("click","#btnClose",function(e){e.preventDefault(),console.log("Close the modal"),$(".modal").hide()});$("#query");$("#search-form").submit(function(e){e.preventDefault(),search()}),$("#results").on("click",".beerImg",function(e){e.preventDefault();$(this).data("id")}),$("#results").on("hover",".beerImg",function(){$(this).addClass("transition")}),$("#results").on("mouseleave",".beerImg",function(){$(this).removeClass("transition")})});