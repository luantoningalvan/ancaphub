import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import ArticleIcon from 'react-ionicons/lib/IosPaper';
import BookIcon from 'react-ionicons/lib/IosBook';
import VideoIcon from 'react-ionicons/lib/IosPlay';
import styled from 'styled-components';
import Button from '../../components/ui/Button';
import Container from '../../components/ui/Container';
import Paper from '../../components/ui/Paper';
import TextField from '../../components/ui/TextField';
import Stepper from '../../components/ui/Stepper';
import GridContainer from '../../components/ui/GridContainer';
import GridItem from '../../components/ui/GridItem';
import LibraryCard from '../../components/library/LibraryCard';

const UploadBox = styled.div`
  height: 100px;
  width: 100%;
  border-radius: 8px;
  border: 1px dashed ${(props) => props.theme.palette.text.secondary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  text-align: center;
  cursor: pointer;

  input {
    display: none;
  }

  svg {
    fill: ${(props) => props.theme.palette.text.secondary};
    height: 40px;
    width: 40px;
    margin-bottom: 16px;
  }
`;

const Contribute = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 40px;

  h3 {
    font-size: 1.5em;
    color: ${(props) => props.theme.palette.text.primary};
    margin-bottom: 32px;
  }

  ul {
    display: flex;

    li {
      list-style: none;
      border: 1px solid ${(props) => props.theme.palette.border};
      margin: 16px;
      border-radius: 8px;
      overflow: hidden;
      button {
        padding: 48px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        background: transparent;
        color: ${(props) => props.theme.palette.text.secondary};
        border: none;
        cursor: pointer;

        &:hover {
          background: rgba(0, 0, 0, 0.1);
        }

        h4 {
          font-weight: normal;
          margin-top: 8px;
        }

        svg {
          fill: ${(props) => props.theme.palette.text.primary};
          height: 64px;
          width: 64px;
        }
      }
    }
  }
`;

export default (props) => {
  const [form, setForm] = useState('');
  const [step, setStep] = useState(1);

  const handleForm = (form) => {
    setForm(form);
    setStep(2);
  };

  const steps = [
    {
      label: <FormattedMessage id="library.contribute.type" />,
      description: <FormattedMessage id="library.contribute.typeDescription" />,
    },
    { label: <FormattedMessage id="library.contribute.content" />, description: <FormattedMessage id="library.contribute.contentDescription" /> },
    { label: <FormattedMessage id="library.contribute.exhibition" />, description: <FormattedMessage id="library.contribute.exhibitionDescription" /> },
    { label: <FormattedMessage id="library.contribute.confirm" />, description: <FormattedMessage id="library.contribute.confirmDescription" /> },
  ];

  return (
    <Container>
      <div style={{ margin: '32px 0px' }}>
        <Stepper steps={steps} currentStep={step} setStepAction={setStep} />
      </div>

      <Contribute>
        <h3>{steps[step - 1].description}</h3>

        {step === 1 && (
          <Paper padding>
            <ul>
              <li>
                <button onClick={() => handleForm('article')}>
                  <ArticleIcon />
                  <h4>
                    <FormattedMessage id="common.article" />
                  </h4>
                </button>
              </li>

              <li>
                <button onClick={() => handleForm('book')}>
                  <BookIcon />
                  <h4>
                    <FormattedMessage id="common.book" />
                  </h4>
                </button>
              </li>

              <li>
                <button onClick={() => handleForm('video')}>
                  <VideoIcon />
                  <h4>
                    <FormattedMessage id="common.video" />
                  </h4>
                </button>
              </li>
            </ul>
          </Paper>
        )}

        {step === 2 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Paper padding style={{ width: '100%' }}>
              <FormattedMessage id="common.title">
                {(msg) => (
                  <TextField placeholder={msg} style={{ marginBottom: 8 }} />
                )}
              </FormattedMessage>
              <FormattedMessage id="common.author">
                {(msg) => (
                  <TextField placeholder={msg} style={{ marginBottom: 8 }} />
                )}
              </FormattedMessage>
              <FormattedMessage id="common.description">
                {(msg) => (
                  <TextField
                    placeholder={msg}
                    style={{ marginBottom: 8, paddingBottom: 80 }}
                  />
                )}
              </FormattedMessage>
              <FormattedMessage id="common.categories">
                {(msg) => (
                  <TextField placeholder={msg} style={{ marginBottom: 8 }} />
                )}
              </FormattedMessage>

              <h3 style={{ fontSize: '1em', margin: '16px 0px' }}>
                <FormattedMessage id="library.contribute.downloadOptions" />
              </h3>
              <UploadBox>
                <FormattedMessage id="library.contribute.noneSelected" />
              </UploadBox>
            </Paper>

            <Button
              color="primary"
              onClick={() => setStep(3)}
              style={{ margin: '16px 0px' }}
            >
              <FormattedMessage id="common.next" />
            </Button>
          </div>
        )}

        {step === 3 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <GridContainer spacing={4} style={{ width: '600px' }}>
              <GridItem xs={7}>
                <Paper padding style={{ width: '100%' }}>
                  <UploadBox>
                    <FormattedMessage id="library.contribute.noneSelected" />
                  </UploadBox>
                  <Button
                    color="primary"
                    onClick={() => setStep(3)}
                    style={{ marginTop: 16 }}
                  >
                    <FormattedMessage id="common.next" />
                  </Button>
                </Paper>
              </GridItem>
              <GridItem xs={5}>
                <h3
                  style={{
                    fontSize: '0.9em',
                    fontWeight: 'normal',
                    marginBottom: '16px',
                  }}
                >
                  <FormattedMessage id="common.preview" />
                </h3>
                <LibraryCard
                  item={{
                    type: form,
                    title: <FormattedMessage id="common.untitled" />,
                  }}
                />
              </GridItem>
            </GridContainer>
          </div>
        )}
      </Contribute>
    </Container>
  );
};
