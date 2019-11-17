import React from 'react';
import {
  Paper,
  Box,
  TextField,
  Button
} from '@material-ui/core';
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
                <Box pt={2} width="100%" display="flex" flexDirection="row-reverse">
                  <Button
                    color="secondary"
                    variant="outlined"
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
