// var ll1={lat:12.0353557,lng:77.59878739999999} ;        //hebbal,banglore
var ll;
var ll2={lat:28.5355,lng: 77.3910}   //noida
var map = new google.maps.Map(document.getElementById('map'), {
    center:ll2,
    zoom: 12
})
var marker31 = new google.maps.Marker({
    position: ll2,
    map: map,
   // icon:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/512px-Map_marker.svg.png",
   
    title: "Property Location",

})
marker31.setVisible(true)
initAutocomplete(map)
var service;
var infowindow;
    
function initialize(e) {
    let nearby;
    let arr=localStorage.getItem("coordinates").split(",");
    console.log(arr);
     ll={lat:parseFloat(arr[0]),lng:parseFloat(arr[1])};
    
    if(e)
        nearby=e.target.id
    map = new google.maps.Map(document.getElementById('map'), {
        center:ll ,
        zoom: 16
    })
    marker31 = new google.maps.Marker({
        position: ll,
        map: map,
       // icon:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/512px-Map_marker.svg.png",
       // icon:<i class='fas fa-university' style='font-size:24px;'></i>,
        title: "Property Location",
    
    })
    marker31.setVisible(true)
//    if(nearby){ console.log(nearby);}
     console.log("ll",ll);
     

    let request;
    if(nearby){request={                
                //location:place.geometry.location, { lat: 28.5324428, lng: 77.4052229 }
               location:ll,
                radius: '1500',
                 type: [nearby]
        }
     }
   
    //  console.log("nearby",nearby);
     initAutocomplete(map);
    
    service = new google.maps.places.PlacesService(map)
    service.nearbySearch(request, callback)
}
 
function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
                console.log(place,"hey");
                createMarker(place);
            }
        }
}
 
 
function createMarker(place) {
        // var map2 = new google.maps.Map(document.getElementById('map'), {
        //     center:ll ,
        //     zoom: 8
        // })
        console.log("createMarker",place.geometry.location);
        var loc=place.geometry.location
        let latl={lat: (loc.lat()), lng: ( loc.lng())}
        console.log(latl,map);
        var marker3 = new google.maps.Marker({
            position: latl,
            map: map,
            title: "Hello hii!",
    
        })
       marker3.setVisible(true)
        console.log("loc",latl);
        google.maps.event.addListener(marker3, 'click', function () {
            alert(place.name);
            
        });
}
function initAutocomplete(map) {
    // const map = new google.maps.Map(document.getElementById("map"), {
    //   center: { lat: 28.7041, lng: 77.1025 },
    //   zoom: 13,
    //   mapTypeId: "roadmap",
    // });
    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input2");
    const searchBox = new google.maps.places.SearchBox(input);
  
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });
  
   // let markers = [];
  
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
  
      if (places.length == 0) {
        return;
      }
  
      // Clear out the old markers.
     
      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();
  
      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }
  
        const icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };
  
        // Create a marker for each place.
      //  markers.push(
        var marker= new google.maps.Marker({
            map,
            title: place.name,
            position: place.geometry.location,
            
          })
          //localStorage.setItem("place",place.geometry.location);
      //  );
      console.log(place.geometry.location);
        console.log(place.geometry.location.lat()," ",place.geometry.location.lng());
       // localStorage.setItem("latlong",place.geometry.location.lat()+" "+place.geometry.location.lng());
        // $(".coordinates").val(place.geometry.location.lat()+" "+place.geometry.location.lng());
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
         bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }
function calcRoute() {
    //create a DirectionsService object to use the route method and get a result for our request
      var directionsService = new google.maps.DirectionsService();

      //create a DirectionsRenderer object which we will use to display the route
      var directionsDisplay = new google.maps.DirectionsRenderer();

      //bind the DirectionsRenderer to the map
      directionsDisplay.setMap(map);

      var input1 = document.querySelector(".from").value;
      console.log(input1,"hey out");

          //create request
          console.log(document.querySelector("#pac-input2").value);
          var request = {
              origin: document.querySelector("#pac-input2").value,
              destination: ll,
              travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
              unitSystem: google.maps.UnitSystem.IMPERIAL
          }

          //pass the request to the route method
          directionsService.route(request, function (result, status) {
              if (status == google.maps.DirectionsStatus.OK) {

                  //Get distance and time
                  const output = document.querySelector('#output');
                  let x=result.routes[0].legs[0].distance.text.split(" ");
                  let y=Number(x[0]);
                  console.log(x,y );
                  console.log(result.routes[0].legs[0].duration.text );
                  output.innerHTML = "<div class='alert-info'>From: " +document.querySelector(".from").value + ".<br />To: " +localStorage.getItem("addr") + ".<br /> Driving distance: " + (y*1.6).toPrecision(2) + ".<br /> TravelTime: " + result.routes[0].legs[0].duration.text + ".</div>";

                  //display route
                  directionsDisplay.setDirections(result);
              } else {
                  //delete route from map
                  directionsDisplay.setDirections({ routes: [] });
                  //center map in London
                  map.setCenter(ll);

                  //show error message
                  output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
              }
          });

}
document.querySelector("#getdir").addEventListener("click",calcRoute)
document.querySelector("#collapseOne").addEventListener("click",initialize)
document.querySelector("#collapseTwo").addEventListener("click",initialize)
document.querySelector("#collapseThree").addEventListener("click",initialize)



   //google.maps.event.addDomListener(window, 'load', initialize('cafe'))
// window.initialize=initialize();