function(instance, properties) {
    let box = $(`<div></div>`);
    instance.canvas.append(box);
    
    box.css({
        'background-image': 'url(https://meta-q.cdn.bubble.io/f1741161315071x558707261539545200/Screenshot%202025-03-05%20at%201.25.02%E2%80%AFPM.png)',
        'background-size': 'cover',
        'background-position': 'center',
        'background-repeat': 'no-repeat',
        'position': 'absolute',
        'height': properties.bubble.height,
        'width': properties.bubble.width
    });

    if (instance.isResponsive) {
        instance.setHeight(properties.bubble.width);
    }
}
