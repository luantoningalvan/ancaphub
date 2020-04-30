import React from 'react';
import { FormattedMessage } from 'react-intl';
import CloseButton from 'react-ionicons/lib/MdClose';
import Dialog from '../ui/Dialog';
import Button from '../ui/Button';
import CardHeader from '../ui/CardHeader';
import GridContainer from '../ui/GridContainer';
import GridItem from '../ui/GridItem';
import CardBody from '../ui/CardBody';
import TextField from '../ui/TextField';
import UploadBox from '../ui/UploadBox';
import IconButton from '../ui/IconButton';

export default ({ open, onClose }) => (
  <Dialog show={open} onClose={onClose}>
    <div style={{ width: 400 }}>
      <CardHeader>
        <h3>
          <FormattedMessage id="events.create" />
        </h3>
        <IconButton onClick={onClose}>
          <CloseButton />
        </IconButton>
      </CardHeader>

      <CardBody>
        <GridContainer spacing={2} style={{ marginLeft: 8 }}>
          <GridItem xs={12}>
            <FormattedMessage id="common.title">
              {(msg) => <TextField placeholder={msg} />}
            </FormattedMessage>
          </GridItem>
          <GridItem xs={12}>
            <FormattedMessage id="nearby.location">
              {(msg) => <TextField placeholder={msg} />}
            </FormattedMessage>
          </GridItem>
          <GridItem xs={12}>
            <FormattedMessage id="common.description">
              {(msg) => <TextField placeholder={msg} style={{ paddingBottom: 40 }} />}
            </FormattedMessage>
          </GridItem>
          <GridItem xs={6}>
            <FormattedMessage id="events.starts">
              {(msg) => <TextField placeholder={msg} />}
            </FormattedMessage>
          </GridItem>
          <GridItem xs={6}>
            <FormattedMessage id="events.ends">
              {(msg) => <TextField placeholder={msg} />}
            </FormattedMessage>
          </GridItem>
          <GridItem xs={12}>
            <h4 style={{ marginBottom: 8, fontSize: '0.8em' }}>
              <FormattedMessage id="common.cover" />
            </h4>
            <UploadBox>
              <FormattedMessage id="components.imageUpload.dragHere" />
            </UploadBox>
          </GridItem>
          <GridItem xs={12}>
            <Button fullwidth color="secondary">
              <FormattedMessage id="common.publish" />
            </Button>
          </GridItem>
        </GridContainer>
      </CardBody>
    </div>
  </Dialog>
);
