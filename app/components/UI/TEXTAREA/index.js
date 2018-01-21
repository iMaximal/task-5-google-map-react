import styled from 'styled-components';

const TEXTAREA = styled.textarea`
  display: block;
  width: 98%;
  min-height: 30px;
  border: 1px solid #888;
  margin: 0 0 10px 0;
  padding: 5px;
  resize: none;
/* remove resizing handle in Firefox */;
`;

export default TEXTAREA;
