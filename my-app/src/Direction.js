import React, {Component} from 'react'
import {compose, withProps, lifecycle} from 'recompose'
import {withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer} from 'react-google-maps'


class Direction extends Component {

    constructor(props){
        super(props);
        window.sessionStorage.setItem("city",this.props.city)
        this.state={city:this.props.city}


    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({city:nextProps.city})
        window.sessionStorage.setItem("city",nextProps.city)
    }

    componentDidMount() {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log("Latitude is :", position.coords.latitude);
                console.log("Longitude is :", position.coords.longitude);
                window.localStorage.setItem("userLatitude", position.coords.latitude);
                window.localStorage.setItem("userLongitude", position.coords.longitude)

            });
        }
    }

    render() {

        const DirectionsComponent = compose(
            withProps({
                googleMapURL: `https://maps.google.com/maps/api/js?key=` + "AIzaSyCSUwBnxHW718hSGOoTy9ktY37rD_6-wew" + "&libraries=places",
                loadingElement: <div style={{height: `400px`}}/>,
                containerElement: <div style={{width: `100%`}}/>,
                mapElement: <div style={{marginLeft: "30px", height: `400px`, width: `600px`}}/>,
            }),
            withScriptjs,
            withGoogleMap,
            lifecycle({
                componentDidMount() {
                    const userPosition = {
                        lat: 45.897890,
                        lng: 27.622680
                    };
                    const DirectionsService = new window.google.maps.DirectionsService();
                    var currentLocation = {
                        lat: 45.897890,
                        lng: 27.622680
                    };

                    if( window.localStorage.getItem("userLatitude")){
                        currentLocation.lat=parseFloat(window.localStorage.getItem("userLatitude"));
                        currentLocation.lng =parseFloat(window.localStorage.getItem("userLongitude"));
                    }
                    DirectionsService.route({
                        origin: window.sessionStorage.getItem("city"),
                        destination: currentLocation,
                        travelMode: window.google.maps.TravelMode.DRIVING,
                    }, (result, status) => {
                        if (status === window.google.maps.DirectionsStatus.OK) {
                            this.setState({
                                directions: {...result},
                                markers: true
                            })
                        } else {
                            console.error(`error fetching directions ${result}`);
                        }
                    });
                }
            })
        )(props =>
            <GoogleMap

                defaultZoom={3}

            >
                {props.directions &&
                <DirectionsRenderer directions={props.directions} suppressMarkers={props.markers}/>}
            </GoogleMap>
        );

        return (

            <DirectionsComponent
            />
        )
    }
}

export default Direction
