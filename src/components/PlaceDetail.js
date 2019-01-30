import React, {Component} from 'react';


export class PlaceDetail extends Component {

    render() {
        const {locationDetails} = this.props;

        return (
            <div className='info-window'>
                <h2>Further Informations:</h2>
                <p className="further_details">{locationDetails.category}</p>
                <p className="further_details">{locationDetails.address}</p>
            </div>
        );
    }
}

export default PlaceDetail;
