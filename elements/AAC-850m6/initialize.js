function(instance, context) {
    

    const mapboxAccessKey = context.keys.ACCESS_KEY.trim();
        
     if (!mapboxAccessKey)
         return context.reportDebugger("Error: An API access token is required to use Mapbox Plugin.");
 
    mapboxgl.accessToken = mapboxAccessKey;
     
    const {data: data, canvas: canvas} = instance;
 
     
    const map = new mapboxgl.Map({
         container: canvas[0],
         style: 'mapbox://styles/mapbox/streets-v12'
     });
     
    map.on('load', function() {
        instance.triggerEvent("map_loaded");
    });
     
    
     //show my location
    const geolocate = new mapboxgl.GeolocateControl({
         positionOptions: { enableHighAccuracy: true },
         trackUserLocation: false,
         showUserHeading: true
     });
     
     // Event listener to get current location when clicked
     geolocate.on('geolocate', (e) => {
         const latitude = e.coords.latitude;
         const longitude = e.coords.longitude;
          
          instance.publishState("current_location_latitude",e.coords.latitude);
          instance.publishState("current_location_longitude",e.coords.longitude);
 
         // Move the map to user's location
         map.flyTo({ center: [longitude, latitude], zoom: 16 });
     });
     
    // Add Mapbox Directions control (for routing)
    const directions = new MapboxDirections({
        accessToken: mapboxAccessKey,
        unit: 'metric',
        profile: 'mapbox/driving',
        interactive: true
    });

    // Add navigation controls (zoom & rotation) in the top-right
    const navControl = new mapboxgl.NavigationControl();

    // Convert "Bottom Right" to the "bottom-right"
    function formatPosition(text) {
        return text.toLowerCase().replace(/\s+/g, '-');
    }
 
     data.mapbox=map;
     data.geoLocationControl=geolocate;
     data.directionsControl = directions;
     data.navigationControl = navControl;
     data.formatPosition=formatPosition;

 }