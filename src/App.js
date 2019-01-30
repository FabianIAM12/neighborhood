import React, {Component} from 'react';
import './Style.css';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import Container from "./components/Container";
import location_data from './locations';
import {FaGlasses} from "react-icons/fa";


class App extends Component {
    state = {
        menu_visible: true,
        search_query: '',
        locations: [],
    };

    componentWillMount() {
        this.setState({locations: this.SortData(location_data)})
    }

    ToggleMenu = () => {
        this.setState({menu_visible: !this.state.menu_visible})
    };

    /* always sorts the data by stars - from much to less*/
    SortData = (data) => {
      return data.sort(sortBy('rating')).reverse()
    };

    /* search function for static data */
    SearchQuery = (query) => {
        this.setState({query: query.trim()});
        let showingLocations = '';

        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i');
            showingLocations = location_data.filter((location) =>
                match.test(location.title));
            this.setState({locations: this.SortData(showingLocations)})
        } else {
            this.setState({locations: this.SortData(location_data) })
        }
    };

    render() {
        return (
            <div className="App">
                <div className="header">
                    <h1 className="headline">
                        Best Beer Locations in Augsburg
                    </h1>
                    <button className="side-menu-button" onClick={this.ToggleMenu}><FaGlasses/></button>
                </div>
                <Container
                    menu_visible={this.state.menu_visible}
                    markers={this.state.locations}
                    SearchQuery={this.SearchQuery}>
                </Container>
            </div>
        );
    }
}

export default App;
