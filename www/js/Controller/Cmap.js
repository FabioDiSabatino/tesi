var cmap={


initMap:function(){	
	console.log('init map entered');
   
	map = new L.map('map');
	
	var infodevice=cdevice.getInfo();	
	var myPosition;
	var myPositionMarker;	
	
	
	
	 offlineLayer= new OfflineLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', 
	{
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors Tiles © HOT ',
    onReady: function(){
    	map.addLayer(offlineLayer);
    	map.locate({
    		watch:true,
    		enableHighAccuracy:true,
    		timeout:10000
    		
    	});
    	
    },
    onError: function(){console.log('errore db')},
    storeName:"LocalTiles", 
    dbOption:"WebSQL"   
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
	myPosition=e.latlng;
	console.log(e.latlng);
	
	var coordinates=L.latLng(e.latlng.lat+0.0001,e.latlng.lng+0.0001);
	
	console.log("distanza haversine:"+e.latlng.distanceTo(coordinates)+"m");	
	console.log( "distanza vincenty:"+distVincenty(e.latlng,coordinates)+"m" );
	
		if(typeof myPositionMarker !== "undefined")
			{
			 var speed= e.speed*3.6;
			 var zoom=map.getZoom();
			 if(speed>20)
				 map.setView(e.latlng,zoom);
			 map.removeLayer(myPosition);
			}
		else	
	     {		     
			  map.setView(e.latlng,17);
		   
		     
	    }	     
		myPositionMarker= L.marker(e.latlng,{icon:blueMarker}).addTo(map);
	    
		
			
	};
	
	
	
	function onLocationError(e) {
		/*if(infodevice.platform=='Android')
			cordova.plugins.diagnostic.switchToLocationSettings();
		else if (infodevice.platform=='iOS')
			{cordova.plugins.diagnostic.switchToSettings(function(){
			    console.log("Successfully switched to Settings app")
			}, function(error){
			    console.error("The following error occurred: "+error)
			    })}*/
	};

	map.on('locationfound', onLocationFound);
	map.on('locationerror', onLocationError);

	$(window ).on( "orientationchange", function( event ) {
	    	   
		infodevice=cdevice.getInfo();
		vmap.setMapContainer(infodevice);
	});
	
	$("#button_cache").on("tap",function(){
		alert("disegno la griglia...");
		cgrid.calcGrid();
	});
	
	$("#button_save").on("tap",function(){
		cmap.saveMap();
	})
	
	

	
	
	
	

	
	
  },
  saveMap:function(){
	   offlineLayer.saveTiles(17,function(){ console.log('salvataggio in corso..')},
	    		 function(){console.log('salvataggio completato!')},
	    		 function(){console.log('errore!')});
  }
}





