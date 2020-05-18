import React from 'react';
import styled from 'styled-components';
import ArrowIcon from 'react-ionicons/lib/IosArrowDown';
import Card from '../../components/ui/Card';
import CardBody from '../../components/ui/CardBody';
import CardHeader from '../../components/ui/CardHeader';
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
        <Card>
          <CardHeader style={{ padding: 16 }}>
            <h3>A plataforma será gratuita?</h3>
            <ArrowIcon onClick={() => setOpenQuestions({ ...openQuestions, 0: !openQuestions[0] })} color="white" style={{ marginLeft: 'auto' }} />
          </CardHeader>
          <Collapse expanded={openQuestions[0]}>
            <CardBody>
              <p>Sim, será gratuita. É possível que no futuro haja um plano PRO, mas este traria funções que nunca sequer foram anunciadas.</p>
            </CardBody>
          </Collapse>
        </Card>
      </FAQQuestion>
      <FAQQuestion open={openQuestions[1]}>
        <Card>
          <CardHeader style={{ padding: 16 }}>
            <h3>Vai ter aplicativo?</h3>
            <ArrowIcon onClick={() => setOpenQuestions({ ...openQuestions, 1: !openQuestions[1] })} color="white" style={{ marginLeft: 'auto' }} />
          </CardHeader>
          <Collapse expanded={openQuestions[1]}>
            <CardBody>
              <p>Sim, além do nosso site ser 100% compatível com dispositivos móveis teremos também aplicativos nativos para Android e iOS.</p>
            </CardBody>
          </Collapse>
        </Card>
      </FAQQuestion>
    </>
  );
};
