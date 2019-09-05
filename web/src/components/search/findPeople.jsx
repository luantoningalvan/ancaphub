import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Template from '../../template/template';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import UserCard from '../../pages/users/userCard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setLastLocation, searchUsers } from './searchActions';
import { Link } from 'react-router-dom';
import isEmpty from 'is-empty';
import Slider from '@material-ui/core/Slider';

const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
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
})(Slider);

function FindPeople(props) {
  const [radius, setRadius] = useState(50);

  useEffect(() => {
    if (props.auth.user.geoLocation) {
      getUsers(radius);
    }
  }, [radius, props.auth.user.geoLocation]);

  function getUsers(radius) {
    props.searchUsers(radius);
  }

  function updateLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(location => {
        props.setLastLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        });
      });
    }
  }

  return (
    <Template>
      {props.auth.user.geoLocation ? (
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}>
            <Typography variant="h4" component="h2">
              Pessoas Próximas
            </Typography>
            <Button
              component={Link}
              onClick={() => updateLocation()}
              variant="outlined"
              color="primary">
              Atualizar Localização
            </Button>
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

          {!isEmpty(props.users.allUsers) ? (
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
                {props.users.allUsers.map(user => (
                  <Grid item xs={2}>
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
    </Template>
  );
}
const mapStateToProps = state => ({ auth: state.auth, users: state.users });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ setLastLocation, searchUsers }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FindPeople);
