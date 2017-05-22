//
var map;
var markers = [];

var trailRoutes = [{
        number: 1, 
        title: '1.  Turku - Pargas',
		description: "Heading in a southerly direction from Turku runs Highway 118 through the city of Kaarina and on to the Archipelago town Pargas. On the way you can take a 6 km detour to see the historic Kuusisto Castle Ruins.",
		coordinates: {
		    lat: 60.3921903,
		    lng: 22.3955011
		}
},{ 
        number: 2,
        title: '2.  Pargas - Nagu',
		description: "After getting to know Pargas town centre, the journey onto Sattmark Caf&eacute; is 10 km, where you&apos;ll find lovely nature paths, among other things. On the way to the Lillm&auml;l&ouml; ferry landing (8km) you&apos;ll see the Lenholm Conservation Area. The crossing from Lillm&auml;l&ouml; to Prostvik takes ten minutes and a further 15 km from the ferry landing onto the centre of Nagu.",
		coordinates: {
		    lat: 60.237120,
		    lng: 22.114530
		}
},{ 
        number: 3,
        title: '3.  Nagu - Korpo - Houtskär',
		description: "Nagu is very popular with guests for its harbourfront restaurants and services. Also in Nagu explore the exhibitions of the new Maritime House. It is 14 km to the P&auml;rn&auml;s ferry landing from Nagu and 7 km on the other side from Retais to the Korpo Galtby ferry landing. On the way you can stop by at the Korpostr&ouml;mt Archipelago Centre. The crossing from Korpo to Kittuis on Houtsk&auml;r island takes half an hour. On the way to the N&auml;sby village don&apos;t forget to stop at the J&auml;rvis Observation Tower. In N&auml;sby there is also an interesting Archipelago Museum.",
		coordinates: {
		    lat: 60.178846,
		    lng: 21.627125
		}
},{ 
        number: 4,
        title: '4.  Houtskär - Iniö',
		description: "There are two ferries on the way from the centre of Houtsk&auml;r to the Mossala inter-island ferry landing (14 km). Next to the Mossala inter-island ferry landing there's a camping area. Travellers can enjoy e.g. refreshments in the camping area's cafeteria. Mossala–Dalen ferry crossing takes less than an hour. It is then only 3 km from Dalen to Ini&ouml; village centre. In the centre of Ini&ouml; in Norrby is the summer market as well as the Sophia Wilhelmina church.",
		coordinates: {
		    lat: 60.288345,
		    lng: 21.439268
		}
},{ 
        number: 5,
        title: '5.  Iniö - Kustavi - Taivassalo', 
		description: "It is 8 km and one ferry crossing from Ini&ouml; to the Kannvik inter-island ferry landing. The trip from Kannvik to Heponiemi on Kustavi takes approximately 25 minutes. It is 17 km from Heponiemi to Taivassalo. Restaurant Raitti, in Taivassalo, offers a good place to eat and relax. In Kustavi it is recommended to visit Kustavi Handicraft Village and Peterz&eacute;n&apos;s shops and to overnight in the exotic Boathouse Hotel." ,
		coordinates: {
		    lat: 60.488133,
		    lng: 21.440557
		}
},{ 
        number: 6,
        title: '6.  Taivassalo - Askainen - Merimasku',
		description: "On the way to Merimasku in Naantali (40 km) you&apos;ll see the war-time base and Motti shelter as well as the historic Muntti Bridge.  In Askainen you can stop off at the Louhisaari Manor, which is known for being marshal Mannerheim's birthplace." ,
		coordinates: {
		    lat: 60.591585,
		    lng: 21.882055
		}
},{ 
        number: 7,
        title: '7.  Merimasku - Naantali - Turku', 
		description: "On the way to the Naantali city centre (11 km) take a detour to visit the Finnish President&apos;s summer residence, Kultaranta. With the wooden houses of the old town and numerous other sights, Naantali is really worth a visit. From there it&apos;s about 17 kilometres to Turku." ,
		coordinates: {
		    lat: 60.466402,
		    lng: 22.123127
		}
}];

var Trail = function() {
	this.headline = ko.observable("The Archipelago Trail");
	this.trailDescription = ko.observable("The Archipelago Trail is a route in the Archipelago Sea in Finland, which uses roads and ferry connections to visit many of the major island in this archipelago. The trail is some 250 km in length. Along the way you will find 12 bridges, 9 ferries, local history museums and village churches from the Middle Ages. The route is usually begun and ended in Turku, although other starting points are possible.");
	this.selectInstruction = ko.observable(' (please search for a route or choose it from the list)');
	   
};

var ViewModel = function() {
	var self = this;
	self.trail = ko.observable(new Trail());
    
// initialize map
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer({
		polylineOptions: {
			strokeColor: "red"
		}
	});
	var customStyle = [{
					"elementType": "geometry",
					"stylers": [{
							"color": "#ebe3cd"
						}]
				},{
					"elementType": "labels.text.fill",
					"stylers": [{
							"color": "#523735"
						}]
				},{
					"elementType": "labels.text.stroke",
					"stylers": [{
							"color": "#f5f1e6"
						}]
				},{
					"featureType": "landscape.natural",
					"elementType": "geometry",
					"stylers": [{
							"color": "#dfc5aa"
						}]
				},{
					"featureType": "road",
					"elementType": "geometry",
					"stylers": [{
							"color": "#f5f1e6"
						}]
				},{
					"featureType": "road",
					"elementType": "labels",
					"stylers": [{
							"visibility": "off"
						}]
				},{
					"featureType": "road",
					"elementType": "labels.icon",
					"stylers": [{
							"visibility": "off"
						}]
				},{
					"featureType": "road.arterial",
					"elementType": "geometry",
					"stylers": [{
							"color": "#ccffe8"
						},{
							"visibility": "simplified"
						}]
				},{
					"featureType": "road.highway",
					"elementType": "geometry",
					"stylers": [{
							"visibility": "off"
						}]
				},{
					"featureType": "road.highway.controlled_access",
					"elementType": "geometry",
					"stylers": [{
							"visibility": "off"
						}]
				},{
					"featureType": "road.local",
					"elementType": "labels.text.fill",
					"stylers": [{
							"color": "#806b63"
						}]
				},{
					"featureType": "water",
					"elementType": "geometry.fill",
					"stylers": [{
						"color": "#3ea7d3"
						}]
				}];

	map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 60.4001749, lng: 21.777534},
			zoom: 10,
			mapTypeId: 'terrain',
			mapTypeControl: false,
			styles: customStyle, 
	});
	
	directionsDisplay.setMap(map);
	
	// display all routes in the trail when opening an app
 	displayAllRoute(directionsService, directionsDisplay);
 	
	self.searchTerm = ko.observable('');
	self.routes = ko.observableArray(trailRoutes);
	
	
	// infowindow object for a marker to show route information
	var infowindow = new google.maps.InfoWindow({
        maxWidth: 300,
    });
    
     // Limits the map to display all the locations on the screen
    var bounds = new google.maps.LatLngBounds();
   
	// function for listview
	self.filteredList = ko.computed(function() {
        var searchStr = self.searchTerm().toLowerCase();
        if (searchStr === "") {
            return self.routes();           
        } else {
            infowindow.close();
            return ko.utils.arrayFilter(self.routes(), function(route) {
                var title = route.title.toLowerCase();
                return (title.indexOf(searchStr) !== -1);
            });
        }
    });

    // show full map with markers or searched route
	self.showMarker = ko.computed(function() {
		var searchStr = self.searchTerm().toLowerCase();
		if (!searchStr) {
			createMarker(searchStr);
		} else {	
		    clearMarkers();
			createMarker(searchStr);
		}
	});
    	
	// show a marker when selecting a route
	self.selectedRoute = function(route) {
		displayInfowindow(route.marker, infowindow);
		map.setCenter(route.marker.getPosition());
        route.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
      		route.marker.setAnimation(null);
     	}, 1400);
    };    
       
    // show infowindow and image from flickr
	function displayInfowindow(marker, infowindow) {
	    
        if (infowindow.marker != marker) {
            infowindow.setContent('');
            infowindow.marker = marker;
		
			var method = 'flickr.photos.search';
			var query = marker.title.replace(/(\d\.\s)/, '');
			var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=d0a155691c7ca5de826eaa4357fd6c64&user_id=20275866%40N00&text=' + query + '&format=json&nojsoncallback=1';
           
            fetch(url)
            .then(function(response) {
                if (response.status === 200) {
                    response.json().then(function(data) {
            
                var flickrPhoto = data.photos.photo[0];
                var infoContent = '<div><strong>' + marker.title + '</strong><br><p id="info-description"><img id="info-img" src="https://farm' + flickrPhoto.farm + '.staticflickr.com/' + flickrPhoto.server + '/' + flickrPhoto.id + '_' + flickrPhoto.secret + '_n.jpg">' + marker.description + '</p></div>';
                    
                var noImgError = 'No Flickr Image Found for this place';
                    
                    (flickrPhoto) ? infowindow.setContent(infoContent) : infowindow.setContent(noImgError)
                    
                    })
                } else {
                    infowindow.setContent('your status is: ' + response.status);
                }
                    
            }).catch(function(err) {
                window.alert('It seems that you have a network issue to receive Flickr Image.');
            });
			
			infowindow.open(map, marker);
			
			 infowindow.addListener('closeclick', function() {
                infowindow.marker = null;
            });
		}
	}
		
    function createMarker(searchStr) {    
        self.routes().forEach(function(route) {
            var position = route.coordinates;
            var title = route.title;
            var description = route.description;
            var icon = "http://maps.google.com/mapfiles/kml/paddle/" + route.number + ".png";
            var filteredPlace = route.title.toLowerCase();
            if (searchStr === "") {
                route.marker = new google.maps.Marker({
                    map: map,
                    position: position,
                    title: title,
                    description: description,
                    icon: icon,
                   // animation: google.maps.Animation.DROP,
                    id: route
                });
                markers.push(route.marker);
                route.marker.addListener('click', function() {
                    displayInfowindow(this, infowindow);
                    route.marker.setAnimation(google.maps.Animation.DROP);
                    map.setCenter(route.marker.getPosition());
                });
         // Extend the boundaries of the map for each marker and display the marker
                bounds.extend(route.marker.position);
                
            } else {
                if (filteredPlace.indexOf(searchStr) !== -1) {
                    route.marker.setVisible(true);
                    markers.push(route.marker);
                    route.marker.addListener('click', function() {
                        displayInfowindow(this, infowindow);
                        map.setCenter(route.marker.getPosition());
                    });
                }
            }
        });
        
       google.maps.event.addDomListener(window, 'resize', function() {
            map.fitBounds(bounds); 
        }); 
    }
    
    function clearMarkers() {
        markers.forEach(function(marker) {
            marker.setVisible(false);
        });
        markers = [];
    }
    
    function displayAllRoute(directionsService, directionsDisplay) {
	    var waypts = [{location: {lat: 60.3010824, lng: 22.3022414}}, {location: {lat: 60.1927157, lng: 21.9091942}}, {location: {lat: 60.162672, lng: 21.5620048}}, {location: {lat: 60.2228907, lng: 21.3722884}}, {location: {lat: 60.3968738, lng: 21.3869553}}, {location: {lat: 60.5449963, lng: 21.3553431}}, {location: {lat: 60.5616121, lng: 21.6133239}}, {location: {lat: 60.5711454, lng: 21.831107}}, {location: {lat: 60.4810769, lng: 21.8712123}}, {location: {lat: 60.4660876, lng: 22.0250873}} ];

	directionsService.route({
		origin:{lat:60.446524, lng:22.283711}, 
		destination:{lat: 60.451802, lng:22.248483}, 
		waypoints: waypts,
		travelMode: 'BICYCLING'
	}, function(response, status) {
		if (status === 'OK') {
			directionsDisplay.setDirections(response);
		} else {
			window.alert('Directions request failed due to ' + status);
		}
	});
}

};

function initApp() {
	ko.applyBindings(new ViewModel());
}

function mapError() {
	alert("Google Maps has failed to load due to your fault.");
}
