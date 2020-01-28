import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Grid,
  TextField
} from '@material-ui/core';
import {
  Edit as EditIcon,
  Close as CloseIcon
} from '@material-ui/icons';
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import UpdateProfilePicture from './updateProfilePicture';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/userActions';

function EditProfile(props) {

  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  const ProfileSchema = Yup.object().shape({
    name: Yup.string()
    .min(3, 'Nome muito curto!')
    .max(30, 'Nome muito longo!')
    .required('O campo nome é obrigatório!'),
    bio: Yup.string().max(160, 'Sua bio deve ter máximo 160 caracteres.!'),
    site: Yup.string().url('URL inválida!'),
    birthday: Yup.date().max(new Date(), 'Tu é viajante do tempo por acaso?')
  });

  return (
    <div>
      <Button variant="outlined" fullWidth onClick={handleClickOpen}>
        <EditIcon style={{ marginRight: '10px' }} /> Editar Perfil
      </Button>

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Formik
          initialValues={{
            name: props.data.name,
            bio: props.data.bio || '',
            currentCity: props.data.currentCity || '',
            site: props.data.site || '',
            birthday: props.data.birthday || ''
          }}
          validationSchema={ProfileSchema}
          onSubmit={(values, actions) => {
            props.updateUser(values);
          }}
          render={formProps => {
            const {
              values,
              touched,
              errors,
              handleChange,
              handleBlur
            } = formProps;

            return (
              <Form>
              <DialogTitle disableTypography style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
              
              <IconButton
                aria-label="Close"
                color="secondary"
                size="small"
                onClick={handleClose}>
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" style={{marginLeft: 8}}>Editar Perfil</Typography>
              </div>
              <Button type="submit" color="secondary" variant="contained">
                    Salvar
                  </Button>
            </DialogTitle>

                <DialogContent dividers>
                  <Grid container>
                    <Grid item xs={12}>
                      <UpdateProfilePicture />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        type="text"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Nome"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.name && touched.name && errors.name}
                        color="secondary"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        multiline
                        rows="2"
                        type="text"
                        margin="normal"
                        fullWidth
                        id="bio"
                        label="Bio"
                        name="bio"
                        value={values.bio}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.bio && touched.bio && errors.bio}
                        color="secondary"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        type="text"
                        margin="normal"
                        fullWidth
                        id="currentCity"
                        label="Cidade Atual"
                        name="currentCity"
                        autoComplete="currentCity"
                        value={values.currentCity}
                        onChange={handleChange}
                        color="secondary"
                        onBlur={handleBlur}
                        helperText={
                          errors.currentCity &&
                          touched.currentCity &&
                          errors.currentCity
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        type="text"
                        margin="normal"
                        fullWidth
                        id="site"
                        label="Site"
                        name="site"
                        autoComplete="site"
                        color="secondary"
                        value={values.site}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.site && touched.site && errors.site}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        id="birthday"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Data de Nascimento"
                        color="secondary"
                        type="date"
                        name="birthday"
                        InputLabelProps={{
                          shrink: true
                        }}
                        autoComplete="birthday"
                        defaultValue={values.birthday.substring(0, 10)}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.birthday && touched.birthday && errors.birthday
                        }
                      />
                    </Grid>
                  </Grid>
                </DialogContent>
              </Form>
            );
          }}
        />
      </Dialog>
    </div>
  );
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateUser }, dispatch);
export default connect(
  null,
  mapDispatchToProps
)(EditProfile);
