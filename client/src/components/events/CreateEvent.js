import React from "react";
import Dialog from "../ui/Dialog";
import Button from "../ui/Button";
import CardHeader from "../ui/CardHeader";
import GridContainer from "../ui/GridContainer";
import GridItem from "../ui/GridItem";
import CardBody from "../ui/CardBody";
import TextField from "../ui/TextField";
import UploadBox from "../ui/UploadBox";
import IconButton from "../ui/IconButton";
import CloseButton from "react-ionicons/lib/MdClose";

export default ({ open, onClose }) => (
  <Dialog show={open} onClose={onClose}>
    <div style={{ width: 400 }}>
      <CardHeader>
        <h3>Criar evento</h3>
        <IconButton onClick={onClose}>
          <CloseButton />
        </IconButton>
      </CardHeader>

      <CardBody>
        <GridContainer spacing={2} style={{marginrLeft: 8}}>
          <GridItem xs={12}>
            <TextField placeholder="Título" />
          </GridItem>
          <GridItem xs={12}>
            <TextField placeholder="Local" />
          </GridItem>
          <GridItem xs={12}>
            <TextField placeholder="Descrição" style={{paddingBottom: 40}}/>
          </GridItem>
          <GridItem xs={6}>
            <TextField placeholder="Início" />
          </GridItem>
          <GridItem xs={6}>
            <TextField placeholder="Término" />
          </GridItem>
          <GridItem xs={12}>
            <h4 style={{marginBottom: 8, fontSize: '0.8em'}}>Capa</h4>
            <UploadBox>Enviar Imagem</UploadBox>
          </GridItem>
          <GridItem xs={12}>
            <Button fullwidth color="secondary">Publicar</Button>
          </GridItem>
        </GridContainer>
      </CardBody>
    </div>
  </Dialog>
);


