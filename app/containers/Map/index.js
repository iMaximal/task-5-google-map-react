import React, { PureComponent } from 'react';
import GoogleMap from '../../components/GoogleMap/GoogleMap';
import { API_MAP_KEY } from '../../constants';

class Map extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      mapApiLoaded: false,
    };
  }

  /**
   * If Google Maps API loaded -> Show component (Google Map)
   */
  componentDidMount() {
    this.loadApiScript()
      .then(() => {
        this.setState({
          mapApiLoaded: true,
        });
      });
  }

  loadApiScript = () => new Promise((resolve, reject) => {
    const script = document.createElement('script');

    script.type = 'text/javascript';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_MAP_KEY}`;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;

    document.head.appendChild(script);
  });

  render() {
    return (
      this.state.mapApiLoaded && <GoogleMap />
    );
  }
}


export default Map;
