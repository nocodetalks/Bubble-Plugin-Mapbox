function(instance, properties, context) {
    const { 
        marker_longitude_list: markerLongitudeList, 
        marker_latitude_list: markerLatitudeList, 
        marker_geographic_address_list: markerGeographicAddressList,
        marker_icon_single: markerImageSingle,
        marker_icon_multiple: markerImageList,
        width: markerWidth,
        height: markerHeight,
        popup_content: popupContentList,
        background_color: backgroundColor,
        font_color:fontColor,
        font_size:fontSize
    } = properties;
 
    // Get Mapbox instance
    const mapbox = instance.data.mapbox;
    if (!mapbox) {
        console.error("Mapbox instance not found.");
        return;
    }

    // Determine if latitude/longitude list exists or if we need to extract from addresses
    let locations = [];
    
    //fetch the Longitude data List
    var markerLongitudeListLength = markerLongitudeList.length(); //lenght of input list
    var markerLongitudeListData = markerLongitudeList.get(0, markerLongitudeListLength); //input data list

    //fetch the Latitude data list
    var markerLatitudeListLength = markerLatitudeList.length(); //lenght of input list
    var markerLatitudeListData = markerLatitudeList.get(0, markerLatitudeListLength); //input data list

    //fetch the popup Content
    var popupContentListLength = popupContentList.length(); //lenght of input list
    var popupContentListData = popupContentList.get(0, popupContentListLength); //input data list

    //fetch the marker Image Content List
    var markerImageListLength = markerImageList.length(); //lenght of input list
    var markerImageListData = markerImageList.get(0, markerImageListLength); //input data list

     //fetch the marker Geo Graphic Address
     var markerGeographicAddressListLength = markerGeographicAddressList.length(); //lenght of input list
     var markerGeographicAddressListData = markerGeographicAddressList.get(0, markerGeographicAddressListLength); //input data list

    
    console.log("markerLongitudeList",markerLongitudeListData);
    console.log("markerLatitudeList",markerLatitudeListData);
    console.log("Long Length ",markerLongitudeListData.length);
    console.log("Lat Length ",markerLatitudeListData.length);


    if (markerLongitudeListData && markerLatitudeListData && markerLongitudeListData.length === markerLatitudeListData.length) {
        // Use provided longitude and latitude lists
        for (let i = 0; i < markerLongitudeListData.length; i++) {
            locations.push({
                lat: markerLatitudeListData[i],
                lng: markerLongitudeListData[i],
                popup_content: popupContentListData ? popupContentListData[i] : "",
                icon: Array.isArray(markerImageListData) && markerImageListData[i] ? markerImageListData[i] : markerImageSingle
            });
        }
    } else if (markerGeographicAddressListData && markerGeographicAddressListData.length) {
        // Use uploaded address list with lat/lng
        for (let i = 0; i < markerGeographicAddressListData.length; i++) {
            const markerGeographicAddress = markerGeographicAddressListData[i];
            if (markerGeographicAddress.lat && markerGeographicAddress.lng) {
                locations.push({
                    lat: markerGeographicAddress.lat,
                    lng: markerGeographicAddress.lng,
                    popup_content: popupContentListData ? popupContentListData[i] : "",
                    icon: Array.isArray(markerImageListData) && markerImageListData[i] ? markerImageListData[i] : markerImageSingle
                });
            } else {
                console.warn(`Invalid address data at index ${i}:`, markerGeographicAddress);
            }
        }
    } else {
        console.error("No valid marker data provided.");
        return;
    }

    // Add markers to the map
    locations.forEach(({ lat, lng, popup_content, icon }) => {

        let popupInstance = null;
        // Add popup if content exists
    if (popup_content) {
        const popupHTML = `
            <div style="background-color: ${backgroundColor}; color: ${fontColor}; font-size: ${fontSize}px; padding: 8px; border-radius: 5px;">
               ${popup_content}
         </div>
        `;
        popupInstance = new mapboxgl.Popup({ offset: 25 }).setHTML(popupHTML);
    }

        if (icon) {
            // Custom icon provided
            const markerElement = document.createElement('img');
            markerElement.style.width = markerWidth ? `${markerWidth}px` : '60px';
            markerElement.style.height = markerHeight ? `${markerHeight}px` : '60px';
            markerElement.src = icon;

            const marker = new mapboxgl.Marker(markerElement).setLngLat([lng, lat]);
            if (popupInstance) marker.setPopup(popupInstance);
            marker.addTo(mapbox);
        } else {
           // Default Mapbox marker
           const marker = new mapboxgl.Marker().setLngLat([lng, lat]);
           if (popupInstance) marker.setPopup(popupInstance);
           marker.addTo(mapbox);
        }
    });
}
