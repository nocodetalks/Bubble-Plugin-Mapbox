function(instance, properties, context) {


  
function removeMarker(markerId) {
    if (instance.data.markers && instance.data.markers[markerId]) {
        instance.data.markers[markerId].remove(); // Remove marker from map
        delete instance.data.markers[markerId]; // Remove from storage
        console.log(`Marker ${markerId} removed.`);
    } else {
        console.log(`Marker ${markerId} not found.`);
    }
}

// Example usage:
removeMarker(properties.marker_unique_id);


}