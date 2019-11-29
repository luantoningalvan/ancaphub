import React, { useEffect, Fragment } from 'react';
import {
  Button,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Grid,
  Paper
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { RateReview as RateIcon } from '@material-ui/icons';
import isEmpty from 'is-empty';
import ProfilePicture from '../profile/profilePicture';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchRates, addRate } from '../../actions/itemActions';

function Ratings(props) {
  const [open, setOpen] = React.useState(false);

  const [value, setValue] = React.useState(0);
  const [comment, setComment] = React.useState('');

  useEffect(() => props.fetchRates(props.item._id), [props.item._id]);
  function handleClickOpen() {
    setOpen(true);
  }

  const userRate =
    props.auth.isAuthenticated &&
    props.rates &&
    props.rates.filter(value => {
      return value.user._id === props.auth.user._id;
    });

  function handleClose() {
    setOpen(false);
  }

  function handleAddRate() {
    handleClose();
    setValue(0);
    setComment('');
    props.addRate({ item: props.item._id, value, comment });
  }

  return (
    <div>
      {props.auth.isAuthenticated && (
        <Box mb={3}>
          {!isEmpty(userRate) ? (
            <Fragment>
              <Typography variant="h6" component="h3" gutterBottom>
                Sua Avaliação
              </Typography>
              {userRate.map(rate => (
                <Paper>
                  <Box p={1.5}>
                    <Grid container spacing={2}>
                      <Grid item>
                        <ProfilePicture
                          avatar={rate.user.avatar}
                          width="40px"
                          height="40px"
                        />
                      </Grid>
                      <Grid item>
                        <Typography
                          gutterBottom
                          variant="subtitle2"
                          style={{ fontWeight: 'bold' }}>
                          {rate.user.name}
                        </Typography>
                        <Rating value={rate.value} readOnly />
                        <Typography
                          variant="body2"
                          style={{ marginTop: '5px' }}>
                          {rate.comment}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              ))}
            </Fragment>
          ) : (
              <Box display="flex" justifyContent="center" mt={4}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleClickOpen}>
                  <RateIcon style={{ marginRight: '10px' }} />
                  Avaliar
              </Button>
              </Box>
            )}
        </Box>
      )}

      <Box>
        {!isEmpty(props.rates) ? (
          <Box mb={2}>
            <Typography
              variant="h6"
              component="h3">{`Todas Avaliações`}</Typography>

            {props.rates.map(rate => (
              <Box key={rate._id} my={1}>
                <Paper>
                  <Box p={1.5}>
                    <Grid container spacing={2}>
                      <Grid item>
                        <ProfilePicture avatar={rate.user.avatar} />
                      </Grid>
                      <Grid item>
                        <Typography
                          gutterBottom
                          variant="subtitle2"
                          style={{ fontWeight: 'bold' }}>
                          {rate.user.name}
                        </Typography>
                        <Rating value={rate.value} readOnly />
                        <Typography
                          variant="body2"
                          style={{ marginTop: '5px' }}>
                          {rate.comment}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Box>
            ))}
          </Box>
        ) : (
            <Box display="flex" justifyContent="center" mb={2}>
              Nenhuma avaliação disponível
          </Box>
          )}
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="xs">
        <DialogTitle id="form-dialog-title">
          Avaliar {props.item.title}
        </DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="center" mb={2}>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              size="large"
            />
          </Box>
          <TextField
            multiline
            rows="5"
            id="name"
            label="Deixe um comentário"
            type="email"
            color="secondary"
            fullWidth
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default">
            Cancelar
          </Button>
          <Button
            onClick={() => handleAddRate()}
            color="secondary"
            variant="contained">
            Avaliar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const mapStateToProps = state => ({
  rates: state.items.item.rates,
  auth: state.auth
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchRates, addRate }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ratings);
