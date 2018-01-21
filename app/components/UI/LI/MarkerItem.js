import styled from 'styled-components';

const MarkerItem = styled.li`
  background: ${(props) => props.checked ? 'rgba(238,238,238,0.23)' : 'white'};
  border: ${(props) => props.checked ? '1px solid #aaa;' : ''};
  &:hover {
    box-shadow: 0 0 6px #b1b1b1;
  }
`;

export default MarkerItem;
