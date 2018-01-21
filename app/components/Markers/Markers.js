import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Marker from './Marker/Marker';
import * as text from './constants';
import MarkersContainer from '../UI/DIV/MarkersContainer';
import MarkersList from '../UI/UL/MarkersList';


class Markers extends PureComponent {

  markerSaveHandler = (markerName, markerDescription) => {
    const markerNameChecked = markerName.trim() || text.ERROR_EMPTY_MARKER_NAME_FIELD;
    const markerDescriptionChecked = markerDescription.trim() || text.ERROR_EMPTY_MARKER_DESCRIPTION_FIELD;

    this.props.actions.changeMarker(markerNameChecked, markerDescriptionChecked);
  };

  render() {
    const { checkedMarker, editableMarker, markers } = this.props.map;

    return (
      <MarkersContainer>
        <MarkersList>

          {/**
         * Show exist Points
         */}
          {markers.map((marker) =>
           (<Marker
             actions={this.props.actions}
             key={marker.id}
             checked={checkedMarker === marker.id ? 'checked' : null}
             editableMarker={editableMarker}
             marker={marker}
             markers={markers}
             onMarkMarkerFromList={this.props.onMarkMarkerFromList}
             onMarkerSave={this.markerSaveHandler}
           />)
           )}
        </MarkersList>
      </MarkersContainer>
    );
  }
}

Markers.propTypes = {
  actions: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired,
  onMarkMarkerFromList: PropTypes.func.isRequired,
};

export default Markers;
