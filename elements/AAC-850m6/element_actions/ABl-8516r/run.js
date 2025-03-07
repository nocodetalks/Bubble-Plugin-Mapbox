function(instance, properties, context) {

 	
    if(instance.data.mapbox && instance.data.draw){
     	
        instance.data.mapbox.removeControl(instance.data.draw);
        
        instance.data.draw=null;
        
    }



}