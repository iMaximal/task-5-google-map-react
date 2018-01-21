import {
    ADD_MARKER,
    CHANGE_MARKER,
    CHECK_MARKER,
    DELETE_MARKER,
    CHANGE_MAP_STORE,
} from './constants';

export const addMarkerToStore = (marker) => ({
  type: ADD_MARKER,
  payload: marker,
});


export const changeMarker = (markerName, markerDescription) => ({
  type: CHANGE_MARKER,
  payload: {
    markerName,
    markerDescription,
  },
});


export const deleteMarker = (id) => ({
  type: DELETE_MARKER,
  payload: {
    id,
  },
});


export const checkMarker = (id) => ({
  type: CHECK_MARKER,
  payload: id,
});

/**
 * @param obj - Object for insert in store
 * @returns {{type, payload: *}}
 */
export const changeMarkersStore = (obj) => ({
  type: CHANGE_MAP_STORE,
  payload: obj,
});
