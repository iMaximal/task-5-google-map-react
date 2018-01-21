import styled from 'styled-components';

const MarkersList = styled.ul`
  list-style: none;
  padding: 0;
  margin-left: 15px;

  & li {
    margin-top: 10px;
    margin-bottom: 2px;
    padding: 10px;
    border-bottom: 1px solid #e7e7e7;
  }
  
  @media screen and (max-width: 768px) {
    margin-left: 0;
  }

`;

export default MarkersList;
