import React from 'react';
import {
  Paper,
  Box,
  TextField,
  Button,
  IconButton
} from '@material-ui/core';
import {
Image as ImageIcon,
Poll as PollIcon,
} from '@material-ui/icons'
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createPost } from '../../actions/postActions';

function PostNewStatus(props) {
  return (
    <Paper>
      <Box p={2} mb={2}>
        <Formik
          initialValues={{ content: '' }}
          onSubmit={(values, actions) => {
            actions.resetForm({ content: '' });
            props.createPost(values);
          }}
          render={props => {
            const { values, touched, errors, handleChange, handleBlur } = props;

            return (
              <Form>
                <TextField
                  fullWidth
                  multiline
                  color="secondary"
                  rows="2"
                  id="post-content"
                  label="No que você está pensando?"
                  name="content"
                  value={values.content}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.content && touched.content && errors.content
                  }
                />
                <Box pt={2} width="100%" display="flex" justifyContent="space-between" alignItems="center">
                  <div>
                    <IconButton size="small" color="secondary">
                    <ImageIcon />
                    </IconButton>
                    <IconButton size="small" color="secondary">
                    <PollIcon />
                    </IconButton>
                  </div>
                  <Button
                    color="secondary"
                    disabled={values.content === ""}
                    variant="contained"
                    size="small"
                    type="submit">
                    Publicar
                  </Button>
                </Box>
              </Form>
            );
          }}
        />
      </Box>
    </Paper>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createPost }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(PostNewStatus);
