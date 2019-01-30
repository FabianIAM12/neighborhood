import React, {Component} from 'react';
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react';
import Stars from "./Stars";
import api from '../api';
import PlaceDetail from "./PlaceDetail";

export class Container extends Component {
    state = {
        showInfoWindow: false,
        showSinglePlaceDetails: false,
        activeMarker: {},
        allMarkerObj: {},
        locationDetails: {},
    };

    ClickMarker = (props, marker, e) => {

        this.setState({
            showInfoWindow: true,
            activeMarker: marker
        })
    };

    InfoWindowClose = () => {
        this.setState({
            activeMarker: {},
            showInfoWindow: false,
        });
    };

    GetFurtherLocationInformation = (marker) => {
        const url_search = `https://api.foursquare.com/v2/venues/search?ll=${marker.position.lat},${marker.position.lng}&limit=1&client_id=${api["client_id"]}&client_secret=${api["client_secret"]}&v=${api["version"]}`;

        fetch(url_search)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                /*
                TODO: GET PICTURES FROM FOURSQUARE API, doesnt work at the moment
                const venue_page = `https://api.foursquare.com/v2/venues/412d2800f964a520df0c1fe3&client_id=${api["client_id"]}&client_secret=${api["client_secret"]}&v=${api["version"]}`;
                fetch(venue_page)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (myJson) {
                        const venue_id = myJson.response;
                        console.log(venue_id);
                    }.bind(this));
                */
                this.setState({
                    locationDetails: {
                        address: myJson.response.venues[0].location.address,
                        category: myJson.response.venues[0].categories[0].name
                    },
                    details_visible: true
                })
            }.bind(this));
    };

    render() {
        const style = {
            width: '100%',
            height: '100%'
        };

        let {markers, menu_visible} = this.props;
        let {activeMarker, details_visible, locationDetails, showInfoWindow} = this.state;

        return (
            <div>
                <div>
                    <Map
                        className="map"
                        role="application"
                        aria-label="map"
                        google={this.props.google}
                        onReady={this.mapIsReady}
                        style={style}
                        zoom={14}
                        initialCenter={{
                            lat: 48.371620,
                            lng: 10.883740
                        }}>
                        {markers.map(marker => (
                            <Marker
                                role='application'
                                aria-label='map'
                                key={marker.key}
                                title={marker.title}
                                name={marker.name}
                                rating={marker.rating}
                                url={marker.url}
                                position={marker.position}
                                onClick={this.ClickMarker}
                            />
                        ))}
                        <InfoWindow
                            marker={activeMarker}
                            visible={showInfoWindow}
                            onClose={this.InfoWindowClose}>
                            <div className='info-window'>
                                <h1>{activeMarker.title}</h1>
                                <Stars rating={activeMarker.rating} class={"info-window-stars"}/>
                                <p>{activeMarker.url}</p>
                                <h2>{activeMarker.address}</h2>
                            </div>
                        </InfoWindow>
                    </Map>
                </div>
                {menu_visible && (
                    <div className="menu">
                        <input type="text"
                               name="filter"
                               placeholder="Filter best Beer Locations..."
                               onChange={(e) => {
                                   this.props.SearchQuery(e.target.value);
                                   this.setState({details_visible: false})
                               }}>
                        </input>
                        <ul>
                            {markers.map(marker => (
                                <li key={marker.key} onClick={() => this.GetFurtherLocationInformation(marker)}>
                                    {marker.title}
                                    <Stars rating={marker.rating} class={"star-rating-menu"}/>
                                </li>
                            ))}
                        </ul>
                        {details_visible && (
                            <PlaceDetail locationDetails={locationDetails}/>
                        )}
                    </div>
                )}
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyA6JimwHwGDliaoQCzD6-5hDIv8B9S56qc')
})(Container)
