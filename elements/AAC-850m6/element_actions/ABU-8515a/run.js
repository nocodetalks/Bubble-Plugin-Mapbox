function(instance, properties, context) {
    const { 
        polygon: isPolygon, 
        line: isLine, 
        point: isPoint,
        trash: isTrash,
        enable_by_default: enableByDefault,
        default_selection:defaultSelection
    } = properties;

     // Get Mapbox instance
     const mapbox = instance.data.mapbox;
     if (!mapbox) {
         console.error("Mapbox instance not found.");
         return;
     }

     function getDrawMode(selectionType) {
        const modeMapping = {
            "Polygon": "draw_polygon",
            "Line": "draw_line_string",
            "Point": "draw_point"
        };
    
        return modeMapping[selectionType] || "simple_select";
    }

    // Ensure no duplicate Draw controls
    if (instance.data.draw) {
        console.log("instance draw",instance.data.draw);
        mapbox.removeControl(instance.data.draw);
    }
    
     // Add drawing control
const draw = new MapboxDraw({
    displayControlsDefault: enableByDefault,
    controls: {
        polygon: isPolygon, // Enable polygon drawing
        line_string: isLine, // Enable line drawing
        point: isPoint, // Enable point drawing
        trash: isTrash
    },
    defaultMode: getDrawMode(defaultSelection) // Set default mode here

});
mapbox.addControl(draw);
instance.data.draw = draw;  // Store reference to avoid duplicate controls

    
mapbox.on('draw.create', updateArea);
mapbox.on('draw.delete', updateArea);
mapbox.on('draw.update', updateArea);

// Listen for when the user clicks the trash button
mapbox.on('draw.modechange', function (e) {
    if (e.mode === 'trash') {
        console.log("Trash mode activated, forcing delete...");
        draw.trash();  // Force delete selected feature
    }
});
function updateArea(e) {
   //console.log("Type",e.type);
   console.log("Area",e);

   if(e.features.length > 0){

     const drawingUniqueID= e.features[0].id;
     const drawingType=e.features[0].geometry.type;
     const drawingCoordinates=e.features[0].geometry.coordinates;

     console.log("Unique ID",drawingUniqueID);
     console.log("Type",drawingType);
     console.log("Coordinates",drawingCoordinates);
    
     instance.publishState("drawing_unique_id",drawingUniqueID);
     instance.publishState("drawing_type",drawingType);
     instance.publishState("drawing_geojson",JSON.stringify(drawingCoordinates));
   }

   if(e.type === 'draw.create'){
     instance.triggerEvent('drawing_created');
   }else if(e.type === 'draw.delete'){
     instance.triggerEvent('drawing_deleted');
   }else if(e.type === 'draw.update'){
     instance.triggerEvent('drawing_updated');
   }  
   
   
}

}