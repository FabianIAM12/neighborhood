import React, {Component} from 'react';
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react';
import {FaStar} from "react-icons/fa";


export class Container extends Component {
    state = {
        map: null,
        showInfoWindow: false,
        activeMarker: {},
        allMarkerObj: [],
        showDetails: false,
        selectedLocation: {},
    };

    mapIsReady = (props, map) => {
        this.setState({map})
    };

    ClickMarker = (props, marker, e) => {
        console.log(props);

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

    };

    render() {
        const style = {
            width: '100%',
            height: '100%'
        };

        let {markers, menu_visible} = this.props;
        let {activeMarker} = this.state;

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
                            visible={this.state.showInfoWindow}
                            onClose={this.InfoWindowClose}>
                            <div className='info-window'>
                                <h1>{activeMarker.title}</h1>
                                <span className="info-window-stars">
                                {Array.from(Array(activeMarker.rating), (e, i) => {
                                    return <FaStar key={i}>{i}</FaStar>
                                })}
                                </span>
                                <p>{activeMarker.url}</p>
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
                                   this.setState({showDetails: false})
                               }}>
                        </input>
                        <ul>
                            {markers.map(marker => (
                                <li key={marker.key} onClick={() => this.GetFurtherLocationInformation(marker)}>
                                    {marker.title}
                                    <span className="star-rating-menu">
                                    {Array.from(Array(marker.rating), (e, i) => {
                                        return <FaStar key={i}>{i}</FaStar>
                                    })}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyA6JimwHwGDliaoQCzD6-5hDIv8B9S56qc')
})(Container)
