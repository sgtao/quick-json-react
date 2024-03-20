// HistorySideMenu.jsx
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

const StyledListDivision = styled.div({
  height: '100vh',
  width: '100%',
  maxWidth: '20rem',
  borderRight: '1px solid #777',
});
const StyledListItem = styled.li({
  height: '3rem',
  width: '100%',
  textAlign: 'left',
  borderTop: '1px dotted #777',
  borderBottom: '1px dotted #777',
  '&:hover': {
    cursor: 'pointer',
  },
  listStyle: 'none',
});
const customStyles = {
  content: {
    maxWidth: '80%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '1em',
  },
};
const StyledModalTitle = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'nowrap',
  '& h4': {
    color: '#1100ff',
    alignItems: 'center',
  },
});
const StyledModalCard = styled.article({
  height: '90%',
  width: '90%',
  maxWidth: '32rem',
  textAlign: 'left',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});
const ModalCloseButton = styled.button({
  fontSize: '1.5rem',
  padding: '0.2rem',
  margin: '0 0.3rem auto',
  color: '#1100ff',
  backgroundColor: 'inherit',
  border: 'none',
  transition: 'transform 0.3s',
  alignItems: 'center',
  '&:hover': {
    cursor: 'pointer',
  },
});

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
//eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');
// Modal.setAppElement('#app-board');

// eslint-disable-next-line react/prop-types
const HistorySideMenu = ({ jsonHistory }) => {
  const [jsonList, setJsonList] = useState([]);
  useEffect(() => {
    console.log(JSON.stringify(jsonHistory));
    if (Array.isArray(jsonHistory)) {
      setJsonList(jsonHistory);
      console.log(`jsonList is changed: ${JSON.stringify(jsonHistory)}`);
    }
  }, [jsonHistory]);

  // クリックしたアイテムをモーダル画面で表示
  const itemFormat = {
    key: 'key',
    value: {},
  };
  const [shownItem, setShownItem] = useState(itemFormat);
  const clickHandler = (jsonItem) => {
    setShownItem({
      key: jsonItem.key,
      value: JSON.parse(jsonItem.value),
    });
    console.log(`in clickHandler:`);
    console.dir(jsonItem.key);
    console.dir(jsonItem.value);
    openModal();
  };

  const modalRef = useRef();
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <StyledListDivision>
        <h4 role="heading">History of JSONs</h4>
        <ul role="list" style={{ paddingLeft: '0px' }}>
          {jsonList.map((jsonItem) => (
            <StyledListItem
              key={jsonItem.key}
              onClick={() => {
                clickHandler(jsonItem);
              }}
              role="listitem"
            >
              {jsonItem.key}
            </StyledListItem>
          ))}
        </ul>
      </StyledListDivision>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ref={modalRef}
      >
        <StyledModalTitle>
          <h4 role="heading">Key:{shownItem.key}</h4>
          <ModalCloseButton onClick={closeModal} aria-label="Close Button">
            X
          </ModalCloseButton>
        </StyledModalTitle>
        <StyledModalCard role="article">
          {JSON.stringify(shownItem.value.json)}
        </StyledModalCard>
      </Modal>
    </>
  );
};

export default HistorySideMenu;
