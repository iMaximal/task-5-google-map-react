import styled from 'styled-components';

const MarkersContainer = styled.div`
  display: inline-block;
  float: left;
  box-sizing: border-box;
  padding: 1% 0 0 0.5%;
  width: 40%;
  
  @media screen and (max-width: 768px) {
    box-sizing: border-box;
    padding: 1% 0 0 0;
    width: 100%;
  }

`;

export default MarkersContainer;
