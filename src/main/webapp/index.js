// index.js
// request message on server
//Calls SimpleServlet to get the "Hello World" message
/*
xhrGet("SimpleServlet", function(responseText){
	// add to document
	var myMessage = document.getElementById('msg');
	myMessage.innerHTML = responseText;

}, function(err){
	console.log(err);
});
*/

// search
function search(){

	var inputtext = document.forms.inputForm.inputText.value;
	var url = "GetNlcServlet?inputtext=" + encodeURIComponent(inputtext) ;
	getMessage(url);
}

function getMessage(url){
	var xhr = new createXHR();
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if(xhr.status == 200){
				var out = document.getElementById('nlcresult');
				var res = parseJson(xhr.responseText);
				var output = "";

				output += "<table border=1>";				
				output += "<tr><td>Class</td><td>Confidence</td></tr><br>";
				
				for (i = 0; i < res.classes.length; i++) {
					output += "<tr>\n";
					output += "<td>";
					output += res.classes[i].class_name;
					output += "</td>\n";
					output += "<td>";
					output += res.classes[i].confidence;
					output += "</td>\n";
					output += "</tr>\n";
				}

				output += "</table>";				

				out.innerHTML = output;	
			}
		}
	};
	xhr.timeout = 300000;
//	xhr.ontimeout = errback;
	xhr.send();
}


//utilities
function createXHR(){
	if(typeof XMLHttpRequest != 'undefined'){
		return new XMLHttpRequest();
	}else{
		try{
			return new ActiveXObject('Msxml2.XMLHTTP');
		}catch(e){
			try{
				return new ActiveXObject('Microsoft.XMLHTTP');
			}catch(e){}
		}
	}
	return null;
}
function xhrGet(url, callback, errback){
	var xhr = new createXHR();
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if(xhr.status == 200){
				callback(xhr.responseText);
			}else{
				errback('service not available');
			}
		}
	};
	xhr.timeout = 3000;
	xhr.ontimeout = errback;
	xhr.send();
}

function parseJson(str){
	return window.JSON ? JSON.parse(str) : eval('(' + str + ')');
}
function prettyJson(str){
	// If browser does not have JSON utilities, just print the raw string value.
	return window.JSON ? JSON.stringify(JSON.parse(str), null, '  ') : str;
}

