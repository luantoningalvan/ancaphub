import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  IconButton,
  Slider
} from '@material-ui/core';
import { Refresh as RefreshIcon } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import isEmpty from 'is-empty';
import Title from '../../components/template/titleComponent'
import UserCard from '../../components/profile/userCard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setLastLocation, searchUsers } from '../../actions/searchActions';

const PrettoSlider = withStyles(theme => ({
  root: {
    color: theme.palette.secondary.main,
    height: 8,
    width: 'calc(100% - 200px)'
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit'
    }
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)'
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
}))(Slider);

function FindPeople({auth, users, searchUsers, setLastLocation}) {
  const [radius, setRadius] = useState(50);

  useEffect(() => {
    if (auth.user.geoLocation) {
      searchUsers(radius)
    }
  }, [radius, auth.user.geoLocation, searchUsers]);

  function updateLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(location => {
        setLastLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        });
      });
    }
  }

  return (
    <>
      <Title title="Encontrar Pessoas Próximas" />
      {auth.user.geoLocation ? (
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}>
            <Typography variant="h4" component="h2">
              Pessoas Próximas
            </Typography>
            <IconButton
              component={Link}
              onClick={() => updateLocation()}
              variant="outlined"
              color="primary">
              <RefreshIcon />
            </IconButton>
          </Box>
          <Paper>
            <Box mb={3} p={2} display="flex" justifyContent="space-between">
              <Typography component="span" style={{ lineHeight: '1.8' }}>
                Raio de Pesquisa (km)
              </Typography>
              <PrettoSlider
                valueLabelDisplay="auto"
                defaultValue={50}
                step={10}
                max={300}
                onChangeCommitted={(e, v) => setRadius(v)}
              />
            </Box>
          </Paper>

          {!isEmpty(users.allUsers) ? (
            <Box>
              <Typography
                style={{ marginBottom: '16px' }}
                variant="body2"
                component="p">
                Resultados com base na última localização sua e dos demais
                usuários com o recurso de localização ativado e que correspondam
                ao raio especificado.
              </Typography>

              <Grid container spacing={2}>
                {users.allUsers.map(user => (
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={user._id}>
                    <UserCard user={user} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
              <Paper>
                <Box p={2}>
                  Nenhum usuário próximo a você com localização ativida
                  encontrado.
              </Box>
              </Paper>
            )}
        </Box>
      ) : (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%">
            <Typography
              variant="body1"
              gutterBottom
              style={{ textAlign: 'center' }}>
              <strong>
                Para utilizar este recurso é necessário habilitá-lo.
            </strong>
              <br />
              Após habilitá-lo, sempre que acessar esta págia sua localização será
              pública e estará disponível para outros usuários.
            <br />É possível desabilitar o recurso quando quiser na página de
                                                    configurações.
          </Typography>
            <Button variant="outlined" onClick={() => updateLocation()}>
              Habilitar e Obter Localização
          </Button>
          </Box>
        )}
    </>
  );
}
const mapStateToProps = state => ({ auth: state.auth, users: state.users });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ setLastLocation, searchUsers }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FindPeople);
