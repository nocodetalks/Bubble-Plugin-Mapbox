function(instance, properties, context) {

    const { 
        marker_longitude: markerLongitude, 
        marker_latitude: markerLatitude, 
        marker_geographic_address: markerGeographicAddress,
        marker_image: markerImage,
        marker_width: markerWidth,
        marker_height: markerHeight,
        popup_content: popupContent,
        background_color: backgroundColor,
        font_color: fontColor,
        font_size: fontSize,
        marker_id: markerId,
        fly_to_marker: flyToMarker
    } = properties;
    
    // Get Mapbox instance
    const mapbox = instance.data.mapbox;
    if (!mapbox) {
        console.error("Mapbox instance not found.");
        return;
    }
    
    // Determine latitude and longitude
    let latitude = markerLatitude;
    let longitude = markerLongitude;
    
    if ((!latitude || !longitude) && markerGeographicAddress) {
        latitude = markerGeographicAddress.lat;
        longitude = markerGeographicAddress.lng;
    }
    
    // Validate coordinates
    if (!latitude || !longitude) {
        console.error("Latitude and longitude are missing.");
        return;
    }
    
    class CustomMarker extends mapboxgl.Marker {
        constructor(options) {
          super(options);
          this.id = options.id; // Add ID property
        }
      }
    
      // Create a custom marker with an ID
    const marker = new CustomMarker({ id: markerId })
    .setLngLat([longitude, latitude])
    .addTo(mapbox);

// Access the ID later
marker.getElement().addEventListener('click', () => {
    console.log(`Marker ID: ${marker.id}`); // Output: "Marker ID: marker1"
  });

}

