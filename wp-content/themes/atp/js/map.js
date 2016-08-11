map.addControl(L.mapbox.legendControl());

$.getJSON('../kml/atpExpRoute.json', function(data){
	prjRoute = data;
	
	var polyline_options = {
	    color: '#000',
	    title: 'Projected Route'
	};
	
	var atpRoute = L.polyline(prjRoute, polyline_options).addTo(map);
});
		
L.mapbox.markerLayer({
    // this feature is in the GeoJSON format: see geojson.org
    // for the full specification
    type: 'Feature',
    geometry: {
        type: 'Point',
        // coordinates here are in longitude, latitude order because
        // x, y is the standard for GeoJSON and many formats
        coordinates: [-0.119777, 51.511162]
    },
    properties: {
        // http://mapbox.com/developers/simplestyle
        'title'			: 'London, United Kingdom',
        'description'	: 'The Adventure Begins Here!',
        'marker-size'	: 'small',
        'marker-color'	: '#000'
    }
}).addTo(map);

L.mapbox.markerLayer({
    type: 'Feature',
    geometry: {
        type: 'Point',
        coordinates: [106.906174, 47.921417]
    },
    properties: {
        'title'			: 'Ulaanbaatar, Mongolia',
        'description'	: 'If all goes well, we\'ll end our journey here.',
        'marker-size'	: 'small',
        'marker-color'	: '#000'
    }
}).addTo(map);

L.mapbox.markerLayer({
    type: 'Feature',
    geometry: {
        type: 'Point',
        coordinates: [-73.97, 40.78]
    },
    properties: {
        'title'			: 'New York, NY, United States',
        'marker-size'	: 'small',
        'marker-color'	: '#A05D2C'
    }
}).addTo(map);


L.mapbox.markerLayer({
    type: 'Feature',
    geometry: {
        type: 'Point',
        coordinates: [-21.93, 64.14]
    },
    properties: {
        'title'			: 'Reykjavik, Iceland',
        'marker-size'	: 'small',
        'marker-color'	: '#A05D2C'
    }
}).addTo(map);


$.getJSON('../kml/atpTrack.json', function(data){
	atpTrack = [ [40.78, -73.97], [64.14, -21.93] ];
	//start first trackin point
	$trackingPoint = 1;
	//get the total number of points
	$numPoints = Object.keys(data.LocationData).length;
	//loop through the points
	$.each(data.LocationData, function(x, y){
		//add the marker to the map
		var lastKnown = '';
		var message = '';
		var markerColor = '#A05D2C';
		var markerSymbol = null;
		var markerSize = 'small';
		
		if(y['Message'] != ''){
			message = '<br /><strong>Message: </strong>' + y['Message'];
		}
		if(y['Type'] == 'Text messaging'){
			//markerColor = '#000';
			markerSymbol = 'post';
			markerSize = 'large';
		}
		if($trackingPoint == $numPoints){
			markerSize = 'large';
			markerSymbol = 'star';
			lastKnown = '<br /><strong>Last Known Position</strong>';
		}
		
		L.mapbox.markerLayer({
		    type: 'Feature',
		    geometry: {
		        type: 'Point',
		        coordinates: [y['Longitude'], y['Latitude']]
		    },
		    properties: {
		        'title'			: 'Position - ' + $trackingPoint,
		        'marker-size'	: markerSize,
		        'marker-symbol' : markerSymbol,
		        'marker-color'	: markerColor,
		        'description'	: '<strong>Date: </strong>' + y['Date'] + '<br /><strong>Latitude: </strong>' + y['Latitude'] + '<br /><strong>Longitude: </strong>' + y['Longitude'] + '<br /><strong>Elevation: </strong>' + y['Altitude'] + ' meters' + message + lastKnown
		    }
		}).addTo(map);
		//add the coordinate to the polyline array
		atpTrack.push([ y['Latitude'], y['Longitude'] ]);
		$trackingPoint++;
	});
	
	var polyline_options = {
	    color: '#A05D2C',
	};
	
	var atpTracking = L.polyline(atpTrack, polyline_options).addTo(map);
});	


