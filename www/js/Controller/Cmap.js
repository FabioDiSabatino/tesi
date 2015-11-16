var Cmap=function(){}


Cmap.prototype.initMap=function(){	
	var singleton= new Singleton();
	var cdevice=singleton.getInstance(Cdevice,"Cdevice");
	var vmap=singleton.getInstance(Vmap,"Vmap");	   
	var map = new L.map('map');
	var infodevice=cdevice.getInfo();	
	var myPosition;	
	var boolean="true";
	console.log(cdevice.getInfo());

	

	var offlineLayer= new OfflineLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', 
	{
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    onReady: function(){
    	map.addLayer(offlineLayer);
		map.locate({
			watch:true,
    		enableHighAccuracy:true,
    		timeout:10000
    		
    	});
		var blueMarker = L.icon({
	        iconUrl: './img/marker-icon.png',
	        iconRetinaUrl: './img/marker-icon-2x.png',
	        iconSize: [25, 41],
	        popupAnchor: [-3, -76],
	        shadowUrl: './img/marker-shadow.png',
	        shadowRetinaUrl: './img/marker-shadow.png',
	        shadowSize: [30, 45],
	        shadowAnchor: [10, 20]
	    });

		function onLocationFound(e) {
			
			console.log('posizione individuata...');		
			if(typeof myPosition !== "undefined")
				{
				console.log('cancello il vecchio marker..');
				map.removeLayer(myPosition);
				}
			else	
		     {
		     map.setView(e.latlng,16);
		     offlineLayer.saveTiles(17,function(){ console.log('salvataggio in corso..')},
		    		 function(){console.log('salvataggio completato!')},
		    		 function(){console.log('errore!')});
		    }	     
		  myPosition= L.marker(e.latlng,{icon:blueMarker}).addTo(map)	
		};
		
		function onLocationError(e) {
			if(infodevice.platform=='Android')
				cordova.plugins.diagnostic.switchToLocationSettings();
			else if (infodevice.platform=='iOS')
				{cordova.plugins.diagnostic.switchToSettings(function(){
				    console.log("Successfully switched to Settings app")
				}, function(error){
				    console.error("The following error occurred: "+error)
				    })}
		};

		map.on('locationfound', onLocationFound);
		map.on('locationerror', onLocationError);

		$(window ).on( "orientationchange", function( event ) {
		    var vmap=singleton.getInstance(Vmap,"Vmap");	   
			infodevice=cdevice.getInfo();
			vmap.setMapContainer(infodevice);
		})

    	

    },
    onError: function(){console.log('errore db')},
    storeName:"LocalTiles", 
    dbOption:"IndexedDB"   
	})
	
	
}


