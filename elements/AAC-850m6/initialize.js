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
           
           console.log("map loaded successfully");
           
        // Example: Trigger a custom event if needed
           instance.triggerEvent("map_loaded");

       });
    
    // Add zoom in/out and rotation controls
    
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    
    //show my location
   const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: false,
        showUserHeading: true
    });

    // Add geolocation control to the map
    map.addControl(geolocate, 'bottom-right');

    // Event listener to get current location when clicked
    geolocate.on('geolocate', (e) => {
        const latitude = e.coords.latitude;
        const longitude = e.coords.longitude;
        console.log(`User's location: ${latitude}, ${longitude}`);

        // Move the map to user's location
        map.flyTo({ center: [longitude, latitude], zoom: 16 });
    });
    

	data.mapbox=map;
    
    data.geoLocationControl=geolocate;

// Function to get the user's location
    function getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    
                    instance.publishState("current_location_latitude",position.coords.latitude);
                    instance.publishState("current_location_longitude",position.coords.longitude);

                    const userCoords = [position.coords.longitude, position.coords.latitude];

                    // Update map center
                    map.setCenter(userCoords);
                    map.setZoom(16);
                    
                    console.log("Current location",userCoords);

                    // Add marker at user's location
                    new mapboxgl.Marker()
                        .setLngLat(userCoords)
                        .setPopup(new mapboxgl.Popup().setText("Current Location"))
                        .addTo(map);
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
    
    instance.data.getUserLocation=getUserLocation;


}