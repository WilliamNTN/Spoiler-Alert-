

function getTagsList(callBackFunction){
	chrome.runtime.sendMessage({subject:"requestTags"},function(response){
		callBackFunction(response.data);
	});
}

function DOMModificationHandler(){
    $(this).unbind('DOMSubtreeModified.event1');
    setTimeout(function(){
        modify();
        $('#timeline').bind('DOMSubtreeModified.event1',DOMModificationHandler);
    },10);
}
$('#timeline').bind('DOMSubtreeModified.event1',DOMModificationHandler);


function modify(){  
  $('.tweet').each(function(index){

  	var elem = $(this);
  	var t = $(this).html();
    var text = $(this).text();
    text = text.toLowerCase();


	var regex = /[.,\s]/g;
	text = text.replace(regex,' ');

	var words = text.split(" ");

	getTagsList(function(tags){
		var check = 0;
		for(i in words){
			if(tags.includes(words[i]))
				check = 1;
		}

		if(!elem.hasClass("spoiler") && check == 1){
	  		elem.addClass("spoiler");
	 		elem.html(`<h1 style="color:red"> Spoiler Alert! </h1> <br> <button class="squish-button EdgeButton EdgeButton--primary" data-original-content="${encodeURI(t)}">Show Spoiler</button>`);
	 		chrome.runtime.sendMessage({subject: "listeners"}, function(response) {
		 
		 	});
	  }
		else{
		}
	});
    
  });
}
