import { injectGlobal } from 'styled-components';

// eslint-disable-next-line
injectGlobal`
  /* Optional Makes the sample page fill the window. */
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-family: sans-serif;
}

div[data-reactroot] {
  height: 100%;
}

#app {
  height: 100%;
}

/* Always set the map height explicitly to define the size of the div
 * element that contains the map. */
#map-container {
  display: inline-block;
  float: left;
  height: 100%;
  width: 60%;
}

/**
 Some adaptive
 */
@media screen and (max-width: 768px) {
  #map-container {
    height: 73%;
    width: 100%;
  }
  
}

`;
