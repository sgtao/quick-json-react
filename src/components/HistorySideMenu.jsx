// HistorySideMenu.jsx
import styled from 'styled-components';

const StyledDivision = styled.div({
  height: '100vh',
  width: '100%',
  maxWidth: '20rem',
  borderRight: '1px solid #777',
});
const HistorySideMenu = () => {
  return (
    <StyledDivision>
      <h4>Hisotry of JSONs</h4>
    </StyledDivision>
  );
};

export default HistorySideMenu;
