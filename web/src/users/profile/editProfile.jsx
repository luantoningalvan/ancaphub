
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit'
import Grid from '@material-ui/core/Grid'
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField'
import { Formik, Form } from 'formik'

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

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
      .max(50, 'Nome muito longo!')
      .required('O campo nome é obrigatório!'),
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
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Editar Perfil
        </DialogTitle>

        <DialogContent dividers>
          <Formik
            initialValues={{ name: props.data.name }}
            validationSchema={ProfileSchema}
            onSubmit={(values, actions) => {
              console.log('ta')
            }}
            render={formProps => {
              const { values, touched, errors, handleChange, handleBlur } = formProps;

              return (
                <Form>
                  <Grid container>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        type="text"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Nome Completo"
                        name="name"
                        autoComplete="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={(errors.name && touched.name) && errors.name}
                      />
                    </Grid></Grid>
                </Form>
              )
            }
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Salvar
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditProfile;
