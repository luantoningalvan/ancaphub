import React, { useState } from "react";
import Paper from "../../components/ui/Paper";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import ArticleIcon from "react-ionicons/lib/IosPaper";
import BookIcon from "react-ionicons/lib/IosBook";
import VideoIcon from "react-ionicons/lib/IosPlay";
import styled from "styled-components";
import TextField from "../../components/ui/TextField";
import Stepper from "../../components/ui/Stepper";
import GridContainer from "../../components/ui/GridContainer";
import GridItem from "../../components/ui/GridItem";
import LibraryCard from "../../components/library/LibraryCard";

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
  const [form, setForm] = useState("");
  const [step, setStep] = useState(1);

  const handleForm = (form) => {
    setForm(form);
    setStep(2);
  };

  const steps = [
    {
      label: "Tipo",
      description: "Escolha um tipo de material para contribuir.",
    },
    { label: "Conteúdo", description: "Preencha o conteúdo" },
    { label: "Exibição", description: "Configure uma capa pro seu item" },
    { label: "Confirmar", description: "Tudo certo?" },
  ];

  return (
    <Container>
      <div style={{ margin: "32px 0px" }}>
        <Stepper steps={steps} currentStep={step} setStepAction={setStep} />
      </div>

      <Contribute>
        <h3>{steps[step - 1].description}</h3>

        {step === 1 && (
          <Paper padding>
            <ul>
              <li>
                <button onClick={() => handleForm("article")}>
                  <ArticleIcon />
                  <h4>Artigo</h4>
                </button>
              </li>

              <li>
                <button onClick={() => handleForm("book")}>
                  <BookIcon />
                  <h4>Livro</h4>
                </button>
              </li>

              <li>
                <button onClick={() => handleForm("video")}>
                  <VideoIcon />
                  <h4>Vídeo</h4>
                </button>
              </li>
            </ul>
          </Paper>
        )}

        {step === 2 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Paper padding style={{ width: "100%" }}>
              <TextField placeholder="Título" style={{ marginBottom: 8 }} />
              <TextField placeholder="Autor" style={{ marginBottom: 8 }} />
              <TextField
                placeholder="Descrição"
                style={{ marginBottom: 8, paddingBottom: 80 }}
              />
              <TextField placeholder="Categorias" style={{ marginBottom: 8 }} />

              <h3 style={{ fontSize: "1em", margin: "16px 0px" }}>
                Opções de download
              </h3>
              <UploadBox>Nenhuma opção selecionada</UploadBox>
            </Paper>

            <Button
              color="primary"
              onClick={() => setStep(3)}
              style={{ margin: '16px 0px' }}
            >
              Próximo
            </Button>
          </div>
        )}

        {step === 3 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <GridContainer spacing={4} style={{ width: "600px" }}>
              <GridItem xs={7}>
                <Paper padding style={{ width: "100%" }}>
                  <UploadBox>Nenhuma imagem selecionada</UploadBox>
                  <Button
                    color="primary"
                    onClick={() => setStep(3)}
                    style={{ marginTop: 16 }}
                  >
                    Próximo
                  </Button>
                </Paper>
              </GridItem>
              <GridItem xs={5}>
                <h3
                  style={{
                    fontSize: "0.9em",
                    fontWeight: "normal",
                    marginBottom: "16px",
                  }}
                >
                  Pré-visualização
                </h3>
                <LibraryCard
                  item={{
                    type: form,
                    title: "Sem título",
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
