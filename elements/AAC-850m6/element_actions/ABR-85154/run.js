function(instance, properties, context) {


 	//remove all the marker list
	instance.data.marker_list.forEach(marker => marker.remove());
	instance.data.marker_list = []; // Clear the array
	
    //remove the single marker 
    
    if (instance.data.markers) {
        Object.values(instance.data.markers).forEach(marker => marker.remove()); // Remove each marker from the map
        instance.data.markers = {}; // Clear the storage
        //console.log("All markers removed.");
    }

}