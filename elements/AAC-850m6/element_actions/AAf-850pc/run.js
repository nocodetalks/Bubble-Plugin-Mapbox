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

    // Create a marker element if a custom image is provided
    let markerElement = null;
    if (markerImage) {
        markerElement = document.createElement('img');
        markerElement.src = markerImage;
        markerElement.style.width = markerWidth ? `${markerWidth}px` : '60px';
        markerElement.style.height = markerHeight ? `${markerHeight}px` : '60px';
        markerElement.dataset.markerId = markerId; // Set marker ID as a data attribute
    }

    // Create and add the marker
    const marker = new mapboxgl.Marker(markerImage ? markerElement : undefined)
        .setLngLat([longitude, latitude])
        .addTo(mapbox);

    // Add popup if content exists
    if (popupContent) {
        const popupHTML = `
            <div style="background-color: ${backgroundColor}; color: ${fontColor}; font-size: ${fontSize}px; padding: 8px; border-radius: 5px;">
               ${popupContent}
         </div>
        `;

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupHTML);
        marker.setPopup(popup);
    }
    
     // Store the marker for later reference
    if (!instance.data.markers) {
        instance.data.markers = {};
    }
    instance.data.markers[markerId] = marker;


    // Add click event listener to marker
    marker.getElement().addEventListener('click', (event) => {
        
        const clickedMarkerId = event.target.dataset.markerId;
        console.log(`Marker clicked: ${clickedMarkerId}`);

        const { lng, lat } = marker.getLngLat(); // Fetch latitude & longitude


        instance.publishState("clicked_marker_lat",lat);
        instance.publishState("clicked_marker_lng",lng)
        instance.publishState("clicked_marker_id",clickedMarkerId)
        instance.triggerEvent("marker_clicked");
        
        
    });

    // Fly to marker if enabled
    if (flyToMarker) {
        mapbox.flyTo({
            center: [longitude, latitude],
         });
    }
    
    
    
 }
