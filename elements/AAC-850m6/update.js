function(instance, properties, context) {

	
    const mapbox= instance.data.mapbox;
    
    
    const {zoom:zoom, map_style:style, hide_mapbox_branding:hide_branding, default_location:center_location} = properties;

    mapbox.setStyle(style);
	mapbox.setZoom(zoom);
    
    
    if(hide_branding){
        document.querySelector('.mapboxgl-ctrl-logo')?.remove();
    	document.querySelector('.mapboxgl-control-container .mapboxgl-ctrl-attrib')?.remove();
    }
        
    if(center_location){
         
		mapbox.flyTo({
    		center: center_location, // Mumbai, India
    		speed: 0.8, // Adjust speed (0-1)
    		curve: 1.5 // Adjust transition curve	
			});

  }


     
}