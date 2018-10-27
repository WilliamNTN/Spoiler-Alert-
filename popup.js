

var mainDiv = document.getElementById('mainDiv');
var addDiv = document.getElementById('addDiv');
var deleteDiv = document.getElementById('deleteDiv');
var showDiv = document.getElementById('showDiv');


window.onload = function(){
	addDiv.style.display = "none";
	deleteDiv.style.display = "none";
	showDiv.style.display = "none";
};

function getTagsList(callBackFunction){
	chrome.runtime.sendMessage({subject:"requestTags"},function(response){
		callBackFunction(response.data);
	});
}

document.getElementById('addPageButton').onclick = function(){
	mainDiv.style.display = "none";
	addDiv.style.display = "block";
};

document.getElementById('deletePageButton').onclick = function(){
	mainDiv.style.display = "none";
	deleteDiv.style.display = "block";

	getTagsList(function(tags){

		var ul = document.createElement('ul');
		ul.setAttribute("id","deleteUl");

		document.getElementById('deleteDiv').appendChild(ul);
		
		tags.forEach(function(item){
			var checkBox = document.createElement('input');
			checkBox.setAttribute("type","checkbox");

			var par = document.createElement('p');
			par.innerHTML = item;

			var smallDiv = document.createElement('div');
			smallDiv.appendChild(par);
			smallDiv.appendChild(checkBox);
			var li = document.createElement('li');
			li.appendChild(smallDiv);
			ul.appendChild(li);
		});

	});
};

document.getElementById('showPageButton').onclick = function(){
	mainDiv.style.display = "none";
	showDiv.style.display = "block";


	getTagsList(function(tags){

		var ul = document.createElement('ul');
		ul.setAttribute("id","showUl");

		document.getElementById('showDiv').appendChild(ul);

		tags.forEach(function(item){
			var li = document.createElement('li');
			ul.appendChild(li);

			li.innerHTML += item;
		});
	});

};

document.getElementById('doneButtonAdd').onclick = function(){
	addDiv.style.display = "none";
	deleteDiv.style.display = "none";
	showDiv.style.display = "none";
	mainDiv.style.display = "block";
};

document.getElementById('doneButtonDelete').onclick = function(){
	var ul = document.getElementById('deleteUl');
	document.getElementById('deleteDiv').removeChild(ul);
	deleteDiv.style.display = "none";
	mainDiv.style.display = "block";
};

document.getElementById('doneButtonShow').onclick = function(){
	var elem = document.getElementById("showUl");
	elem.parentNode.removeChild(elem);
	showDiv.style.display = "none";
	mainDiv.style.display = "block";
};

document.getElementById('addTagButton').onclick = function(){
	var text = document.getElementById('tagInput').value;
	document.getElementById('tagInput').value = "";
	chrome.runtime.sendMessage({
		subject:"inputTag",
		value:text
	});
};

document.getElementById('deleteButton').onclick = function(){
	var lis = document.getElementById('deleteUl').getElementsByTagName('li');

	var toDelete = [];
	for(var i = 0; i < lis.length; i++){
		if(lis[i].getElementsByTagName("input")[0].checked)
			toDelete.push(lis[i].getElementsByTagName("p")[0].innerHTML);
	}


	chrome.runtime.sendMessage({subject:"deleteTags",data:toDelete},function(response){
	});

	var ul = document.getElementById('deleteUl');
	document.getElementById('deleteDiv').removeChild(ul);
	deleteDiv.style.display = "none";
	mainDiv.style.display = "block";

}
