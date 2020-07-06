import React from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createPost } from './postActions';
import { Formik, Form } from 'formik';

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
                  placeholder="Publicar Status"
                  fullWidth
                  multiline
                  rows="2"
                  required
                  id="post-content"
                  label="Publicar Status"
                  name="content"
                  value={values.content}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.content && touched.content && errors.content
                  }
                />
                <Box pt={2}>
                  <Button
                    color="primary"
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
