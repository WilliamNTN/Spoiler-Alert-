


chrome.runtime.onInstalled.addListener(function(){ // called when extension is installed, updated, or chrome is updated.

	chrome.declarativeContent.onPageChanged.removeRules(undefined,function(){ // as page_action is declared in manifest, we need to say when the popup can be used
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [new chrome.declarativeContent.PageStateMatcher({
				pageUrl: {hostEquals: 'twitter.com'},
			})],

			actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);
	});
});


chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
	if(message.subject == "inputTag"){
		chrome.storage.local.get({spoilerTags:[]},function(response){
			var tags = response.spoilerTags;
			tags.push(message.value);

			chrome.storage.local.set({spoilerTags:tags},function(){
			});
		});
	}
	else if(message.subject == "requestTags"){
		var tags = [];
		chrome.storage.local.get({spoilerTags:[]},function(data){
			tags = data.spoilerTags;
			sendResponse({confirmation: "OK",data:tags});
		});
		
		return true;
	}
	else if(message.subject == "deleteTags"){
		chrome.storage.local.get({spoilerTags:[]},function(data){
			tags = data.spoilerTags;

			message.data.forEach(function(item){
				var index = tags.indexOf(item);
				if(index != -1) tags.splice(index,1);
			})

			chrome.storage.local.set({spoilerTags:tags},function(){

			});
		});
	}
	else if (message.subject == "listeners"){
      //add event handler for button click
      chrome.tabs.executeScript(null, {file: "injectedScript.js"});
      sendResponse({message: "OK"});
}
	
})
