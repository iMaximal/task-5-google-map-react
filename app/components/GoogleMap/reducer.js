import * as ACTIONS from './constants';

const initialState = {
  checkedMarker: '',
  editableMarker: '',
  markers: [],
};

const changeMarker = (state, payload) => {
  const { markerName, markerDescription } = payload;
  const newMarkers = state.markers.map((marker) => {
    if (marker.id === state.editableMarker) {
      marker.name = markerName; // eslint-disable-line
      marker.description = markerDescription; // eslint-disable-line
    }
    return marker;
  });

  return {
    ...state,
    editableMarker: '',
    markers: newMarkers,
  };
};

export default function markers(state = initialState, action) {
  switch (action.type) {

    case ACTIONS.ADD_MARKER: {
      const marker = action.payload;
      return {
        ...state,
        editableMarker: marker.id,
        markers: [marker, ...state.markers],
      };
    }

    case ACTIONS.CHANGE_MARKER: {
      return changeMarker(state, action.payload);
    }

    case ACTIONS.DELETE_MARKER: {
      const { id } = action.payload;
      return {
        ...state,
        markers: state.markers.filter((marker) => marker.id !== id),
      };
    }

    case ACTIONS.CHANGE_MAP_STORE: {
      return { ...state, ...action.payload };
    }


    case ACTIONS.CHECK_MARKER: {
      return { ...state, checkedMarker: action.payload };
    }


    default:
      return state;
  }
}
