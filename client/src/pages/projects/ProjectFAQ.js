import React from 'react';
import styled from 'styled-components';
import ArrowIcon from 'react-ionicons/lib/IosArrowDown';
import Paper from '../../components/ui/Paper';
import Collapse from '../../components/ui/Collapse';

const FAQQuestion = styled.div`
  margin-bottom: 1em;

  svg {
    cursor: pointer;
    transform: rotate${(props) => (props.open ? '(180deg)' : '(0deg)')};
  }
`;

export default () => {
  const [openQuestions, setOpenQuestions] = React.useState({ 0: false, 1: false });
  return (
    <>
      <FAQQuestion open={openQuestions[0]}>
        <Paper padding style={{ display: 'flex', width: '100%' }}>
          <h3>Você é soça?</h3>
          <div style={{ marginLeft: 'auto' }}>
            <ArrowIcon onClick={() => setOpenQuestions({ ...openQuestions, 0: !openQuestions[0] })} color="white" style={{ marginLeft: 'auto' }} />
          </div>
        </Paper>
        <Collapse expanded={openQuestions[0]}>
          <Paper padding style={{ marginTop: 16 }}>
            <p>Eu sou totalmente contra esse negócio de estado</p>
          </Paper>
        </Collapse>
      </FAQQuestion>
      <FAQQuestion open={openQuestions[1]}>
        <Paper padding style={{ display: 'flex', width: '100%' }}>
          <h3>CHT dá pau em AP?</h3>
          <div style={{ marginLeft: 'auto' }}>
            <ArrowIcon onClick={() => setOpenQuestions({ ...openQuestions, 1: !openQuestions[1] })} color="white" style={{ marginLeft: 'auto' }} />
          </div>
        </Paper>
        <Collapse expanded={openQuestions[1]}>
          <Paper padding style={{ marginTop: 16 }}>
            <p>Há controvérsias</p>
          </Paper>
        </Collapse>
      </FAQQuestion>
    </>
  );
};
