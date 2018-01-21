import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as text from '../constants';
import MarkerName from '../../UI/P/MarkerName';
import TEXTAREA from '../../UI/TEXTAREA';
import DivEditable from '../../UI/DIV/Editable';
import ControlsContainer from '../../UI/DIV/ControlsContainer';
import Ok from '../../UI/Button/Ok';
import Controls from '../../UI/A/Controls';
import MarkerItem from '../../UI/LI/MarkerItem';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import SHADOW from '../../UI/SHADOW';


export default class Marker extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      markerName: '',
      markerDescription: '',
    };
  }

  /**
   * If click on List -> Mark & Center map
   */
  markMarker = () => {
    this.props.onMarkMarkerFromList(this.props.marker.id);
  };

  /**
   * Save New Marker Name (from Local state to Global state)
   * @param event
   */
  markerSave = (event) => {
    event.preventDefault();

    const { markerName, markerDescription } = this.state;
    this.props.onMarkerSave(markerName, markerDescription);
    this.setState({
      markerName: '',
      markerDescription: '',
    });
  };

  /**
   * Write name and desc to local state
   * @param event
   */
  handleChangeMarker = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };


  /**
   * If click Edit Marker -> Global state mark Marker editable
   * @param event
   */
  toggleMarkerEditing = (event) => {
    event.preventDefault();
    // if editable field is exist -> nothing
    if (this.props.editableMarker) return;

    this.props.actions.changeMarkersStore({
      editableMarker: this.props.marker.id,
    });

    const { name, description } = this.props.marker;
    this.setState({
      markerName: name,
      markerDescription: description,
    });
  };

  /**
   * Remove Marker from Global store and from Map
   * @param event
   */
  markerRemoveHandler = (event) => {
    event.preventDefault();
    // if is being edited -> no ACTION
    if (this.state.markerName) return;
    const targetMarker = this.props.markers.find((marker) => marker.id === this.props.marker.id);
    targetMarker.setMap(null);
    this.props.actions.deleteMarker(this.props.marker.id);
  };


  render() {
    const { markerName, markerDescription } = this.state;
    const { editableMarker, checked } = this.props;
    const { id, name, description } = this.props.marker;

    let markerBody;
    if (editableMarker === id) {
      markerBody = (
        <Auxiliary>
          <DivEditable>
            <form onSubmit={this.markerSave}>
              <TEXTAREA
                autoFocus
                onChange={this.handleChangeMarker}
                value={markerName}
                name="markerName"
                placeholder={text.PLACEHOLDER_MARKER_NAME}
              >
              </TEXTAREA>
              <TEXTAREA
                onChange={this.handleChangeMarker}
                value={markerDescription}
                name="markerDescription"
                placeholder={text.PLACEHOLDER_MARKER_DESCRIPTION}
              >
              </TEXTAREA>
              <div>
                <Ok>
                  {text.BUTTON_OK}
                </Ok>
              </div>
            </form>
          </DivEditable>
          <SHADOW />
        </Auxiliary>
      );
    } else {
      markerBody = (
        <div>
          <MarkerName>{name}</MarkerName>
          <p>{description}</p>
        </div>
      );
    }

    const controlButtons = (
      <ControlsContainer>
        <Controls
          onClick={this.toggleMarkerEditing}
          href=""
          title={text.BUTTON_EDIT}
        >
          {text.BUTTON_EDIT}
        </Controls>
        &nbsp;
        <Controls
          onClick={this.markerRemoveHandler}
          href=""
          title={text.BUTTON_REMOVE}
        >
          {text.BUTTON_REMOVE}
        </Controls>
      </ControlsContainer>
    );

    return (
      <MarkerItem
        onClick={this.markMarker}
        key={id}
        checked={checked}
      >

        {markerBody}

        {controlButtons}

      </MarkerItem>
    );
  }
}

Marker.propTypes = {
  actions: PropTypes.object.isRequired,
  checked: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  editableMarker: PropTypes.string,
  marker: PropTypes.object.isRequired,
  markers: PropTypes.array.isRequired,
  onMarkMarkerFromList: PropTypes.func.isRequired,
  onMarkerSave: PropTypes.func.isRequired,
};
