$(document).ready(function(){
	document.addEventListener("deviceready",function(){
	

			
		var singleton=new Singleton();	
		var widget=singleton.getInstance(Chome,"Chome");
		widget.init();
	
	
	}, false)})


