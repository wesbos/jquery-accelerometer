jQuery(function($) {
    $(window).bind('acc', function(e) {
    	//console.log('wat');
        //console.log(e.originalEvent.beta);
        console.log(e.accX);
        $('span').html(Math.round(e.accX));
    });
    
});
jQuery.event.special.acc = {
    setup: function(data, namespaces) {
        console.log('setup');
        var elem = this, $elem = jQuery(elem);
        $elem.bind('deviceorientation MozOrientation devicemotion',  jQuery.event.special.acc.handler);
    },
    teardown: function(namespaces) {
        console.log('teardown');
        var elem = this, $elem = jQuery(elem);
        $elem.unbind('deviceorientation',  jQuery.event.special.acc.handler);
    },
    handler: function(e) {
		// console.log('event handler!');
        var elem = this, $elem = jQuery(elem), oe = e.originalEvent;
        e.type = "acc";
		
		console.log('Event Type: ' + e.originalEvent.type);
		switch(e.originalEvent.type) {
			// Firefox 3.6
			case 'MozOrientation':
				e.accX  = -(e.originalEvent.x * (180 / Math.PI));
				e.accY  = -(e.originalEvent.y * (180 / Math.PI));
				console.log('Logged for Firefox 36!');		
				break;
			// Google Chrome, iPhone 4
			case 'deviceorientation':
				e.accX = e.originalEvent.gamma;
				e.accY = e.originalEvent.beta;
				console.log('Logged for chrome / iphone 4 / Android 3.1');
				break;
			// iPad 1 / Firefox 6
			case 'devicemotion':
				e.accX = -(e.originalEvent.accelerationIncludingGravity.x * (180 / Math.PI));
				e.accY = -(e.originalEvent.accelerationIncludingGravity.y * (180 / Math.PI));
				e.accZ = -(e.originalEvent.accelerationIncludingGravity.z * (180 / Math.PI));
				console.log('iPad browser / Firefox');
				break;
			case 'acceleration':
				console.log(e);
				break;
			default:
				console.log('Could not find anything...');
		}
        
        jQuery.event.handle.apply(this, arguments)
    }
};