var cconnection={

request_time:0,

checkConnection:function(x){
	    
			
		for(i=1;i<x+1;i++)
		{var start_time= new Date().getTime();	
			$.ajax({
			
			url:'http://c.tile.openstreetmap.fr/hot/9/'+i+'/'+i+'.png',
			type:'GET',
			async:false,
			mimeType:'image/png',
			accepts:'image/webp,image/*,*/*;q=0.8',
			success:function(){
								
				cconnection.request_time = (cconnection.request_time+(new Date().getTime()- start_time));			  
				if(i == x)
					{
					cconnection.request_time= cconnection.request_time/i;
					console.log('tempo medio di '+i+' richieste: '+cconnection.request_time);
					}
			    	
			},
			error:function(){
				console.log('errore richiesta ajax')
			}
			
		});
			 }
		
		
	},

clearCache:function(){
	window.cache.clear(function(){
		console.log('cache pulita con successo')
	}, function(){
		console.log('errore pulizia cache')
	});
	window.cache.clearTemp();
}





}
