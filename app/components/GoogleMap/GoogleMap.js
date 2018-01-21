import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectMap } from './selectors';
import Markers from '../Markers/Markers';
import * as actions from './actions';
import { MAP_CONTAINER_ID } from './constants';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';


class GoogleMap extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      mapInitialized: false,
    };

    this._map = null; // eslint-disable-line
    this._infoWindow = null; // eslint-disable-line
  }

  // Adds a marker to the map and push to the array (Global store).
  addMarker = (location) => {
    const markerId = Date.now() + Math.random().toString();
    const marker = new window.google.maps.Marker({
      position: location,
      map: this._map, // eslint-disable-line
      draggable: true,
      animation: window.google.maps.Animation.DROP,
      id: markerId,
      name: '',
      description: '',
    });

    marker.addListener('click', () => {
      const contentString = marker.name;
      // Set the info window's content and position.
      this._infoWindow.setContent(contentString); // eslint-disable-line
      this._infoWindow.open(this._map, marker); // eslint-disable-line
      this.markMarkerFromMap(marker);
    });

    this.props.actions.addMarkerToStore(marker);
  };

  /**
   *  If click on Map -> Mark checked Marker in List
   * @param id - Marker id
   */
  markMarkerFromMap = ({ id }) => {
    this.props.actions.checkMarker(id);
  };

  /**
   * If click on List -> Mark & Center map
   * @param markerId
   */
  markMarkerFromList = (markerId) => {
    if (this.props.map.checkedMarker !== markerId) {
      this.props.actions.checkMarker(markerId);
    }

    const targetMarker = this.props.map.markers.find((marker) => marker.id === markerId);
    this._map.setCenter(targetMarker.position); // eslint-disable-line
  };

  /**
   * Create Map Object if Google API loaded
   * @private
   */
  _initMap() {
    this._map = new window.google.maps.Map( // eslint-disable-line
      document.getElementById(MAP_CONTAINER_ID),
      {
        zoom: 14,
        center: { lat: 56.840375, lng: 60.568951 },
        mapTypeId: 'terrain',
      });

    // Define an info window on the map.
    this._infoWindow = new window.google.maps.InfoWindow(); // eslint-disable-line

    // This event listener will call addMarker() when the map is clicked.
    this._map.addListener('click', (event) => { // eslint-disable-line
      // if editable field is exist -> nothing
      if (this.props.map.editableMarker) return;
      this.addMarker(event.latLng);
    });

    this.setState({
      mapInitialized: true,
    });
  }

  render() {
    if (this.state.mapInitialized === false) {
      setTimeout(() => {
        this._initMap(); // eslint-disable-line
      }, 40);
    }

    const { map } = this.props;

    return (

      <Auxiliary>
        {/**
         * Show the Google map
         */}
        <div
          id={MAP_CONTAINER_ID}
        />

        <Markers
          actions={this.props.actions}
          map={map}
          onMarkMarkerFromList={this.markMarkerFromList}
        />

      </Auxiliary>
    );
  }
}

GoogleMap.propTypes = {
  actions: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  map: makeSelectMap(),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMap);
