import React, {Component} from 'react';
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react';


export class Container extends Component {
    state = {
        map: null,
        activeMarker: {},
        activeMarkerProps: {},
        showDetails: false,
        selectedLocation: {},
        locationData: {}
    }

    mapIsReady = (props, map) => {
        this.setState({map})
    }

    onClickMarker = (props, marker, e) => {
        this.setState({showInfoWindow: true,
            activeMarker: marker,
            activeMarkerProps: props})
    }

    onInfoWindowClose = () =>
        this.setState({ activeMarker: {},
            showingInfoWindow:
            false, activeMarkerProps: {} });

    render() {
        const style = {
            width: '100%',
            height: '100%'
        }

        let { markers} = this.props
        let { activeMarker, activeMarkerProps} = this.state;

        return (

            <Map
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
                        position={marker.position}
                        onClick={this.onClickMarker}
                    />
                    ))}
                    <InfoWindow
                        marker={activeMarker}
                        visible={this.state.showInfoWindow}
                        onClose={this.state.onInfoWindowClose}>
                        <div className='info-window'>
                            <h4>{activeMarkerProps.name}</h4>
                            <p>{activeMarkerProps.address}</p>
                        </div>
                    </InfoWindow>

            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyA6JimwHwGDliaoQCzD6-5hDIv8B9S56qc')
})(Container)
