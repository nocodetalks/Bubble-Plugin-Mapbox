function(instance, properties, context) {

	
    const mapbox= instance.data.mapbox;
    
    //console.log("Mapbox",mapbox);
    
    const {zoom:zoom, default_map_style:style, custom_style_url:customerMapStyle, hide_mapbox_branding:hideBranding, longitude:defaultLocationLang, latitude:defaultLocationLat, show_navigation:isNavigationVisible, nav_location:navigationControlPostion, show_directions:isDirectionsVisible, directions_location:directionControlPostion, geolocation_control:isGeoLocationVisible, geolocation_location:geoLocationControlPostion } = properties;

    if(customerMapStyle?.trim()){
        console.log("Setting custom style");
        mapbox.setStyle(customerMapStyle);
    }else{
       console.log("Setting style",style);
        mapbox.setStyle(style);
    }

	mapbox.setZoom(zoom);
    
    //hide the branding
    const hide_branding = hideBranding || false;
    if(hide_branding){
        document.querySelector('.mapboxgl-ctrl-logo')?.remove();
    	document.querySelector('.mapboxgl-control-container .mapboxgl-ctrl-attrib')?.remove();
    }
     
    //fly to default location
    if(defaultLocationLang && defaultLocationLat){     
		mapbox.flyTo({
    		center: [defaultLocationLang,defaultLocationLat], // Mumbai, India
    		speed: 0.8, // Adjust speed (0-1)
    		curve: 1.5 // Adjust transition curve	
		});
    }

    //show navigation control
    if(isNavigationVisible){
        if (!mapbox.hasControl(instance.data.navigationControl)) {
            mapbox.addControl(instance.data.navigationControl, instance.data.formatPosition(navigationControlPostion));
        }
    }else{
        if(mapbox.hasControl(instance.data.navigationControl)) {
            mapbox.removeControl(instance.data.navigationControl);

        }
    }

    //show direction control
    if(isDirectionsVisible){
        if (!mapbox.hasControl(instance.data.directionsControl)) {
        	console.log("Directions control");
        	mapbox.addControl(instance.data.directionsControl,  instance.data.formatPosition(directionControlPostion));
        }
    }else{
        if(mapbox.hasControl(instance.data.directionsControl)) {
            mapbox.removeControl(instance.data.directionsControl);
        }
    }

    //show geolocation
    if(isGeoLocationVisible){
        
       	if (!mapbox.hasControl(instance.data.geoLocationControl)) {
            mapbox.addControl(instance.data.geoLocationControl, instance.data.formatPosition(geoLocationControlPostion));
        }

    }else{
        if(mapbox.hasControl(instance.data.geoLocationControl)) {
            mapbox.removeControl(instance.data.geoLocationControl);
        }
    }
     
}