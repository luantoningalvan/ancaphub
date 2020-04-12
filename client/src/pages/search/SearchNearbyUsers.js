import React, { useEffect, useState } from "react";
import Container from "../../components/ui/Container";
import Hero from "../../components/ui/Hero";
import Paper from "../../components/ui/Paper";
import GridContainer from "../../components/ui/GridContainer";
import GridItem from "../../components/ui/GridItem";
import Switch from "../../components/ui/FlipSwitch";
import UserCard from "../../components/users/UserCard";
import Slider from "rc-slider";
import { useDispatch, useSelector } from "react-redux";
import { searchNearbyUserRequest } from "../../actions/search";
import { updateGeoLocationsRequest } from "../../actions/settings";
import { isEmpty } from "lodash";
import LocateIcon from 'react-ionicons/lib/MdLocate';
import styled from 'styled-components'
import "rc-slider/assets/index.css";

export default () => {
  const [radius, setRadius] = useState(50);
  const [location, setLastLocation] = useState({});
  const dispatch = useDispatch();
  const geoLocation = useSelector((state) => state.auth.user.geoLocation);
  const { results, loading } = useSelector((state) => state.search);

  useEffect(() => {
    if (geoLocation) {
      if (!isEmpty(location) && location !== false) {
        dispatch(searchNearbyUserRequest({radius, lastLocation: location}));
      } else {
        updateLocation();
      }
    }
  }, [geoLocation, location]);

  const handleRadius = (value) => setRadius(value);

  const handleSearch = () => {
    dispatch(searchNearbyUserRequest({radius, lastLocation: location}));
  };

  function updateLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          setLastLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        },
        (err) => {
          setLastLocation(false);
        }
      );
    }
  }

  const switchPreferences = (value) => {
    dispatch(updateGeoLocationsRequest(value));
  };

  const Message = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size:1.2em;
    text-align:center;

    svg{
      fill: ${props => props.theme.palette.text.primary };
      height: 40px;
      width: 40px;
      margin-bottom:16px;
    }
  `

  return (
    <Container>
      <Hero
        title="Pessoas Próximas"
        description="Encontre pessoas próximas a você que tenham o recurso de localização ativado."
        actions={
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ display: "block", marginRight: 8 }}>
              Localização
            </span>
            <Switch value={geoLocation} onChange={switchPreferences} />
          </div>
        }
      />

      <div style={{ marginTop: 16 }}>
        {!loading ? (
        <>
        {!geoLocation ? (
          <Paper padding>
            <Message>
            <LocateIcon color="" />
            <p>Ative o recurso de geolocalização em sua conta para utilizar esta função. Você pode desativá-lo a qualquer momento.</p>
            </Message>
          </Paper>
        ) : (
          <>
            {isEmpty(location) || location === false ? (
              <Paper padding>
                <p>
                  A geolocalização está ativada para a sua conta, porém o nosso
                  site não possui acesso à sua localização. Ative este recurso
                  no navegador para prosseguir.
                </p>
              </Paper>
            ) : (
              <div>
              <Paper padding>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Raio: </span>
                  <Slider
                    style={{ width: "100%", margin: "0px 16px" }}
                    value={radius}
                    min={10}
                    max={300}
                    step={10}
                    onChange={handleRadius}
                    onAfterChange={handleSearch}
                  />
                  <span>{radius}Km </span>
                </div>
              </Paper>

              {!isEmpty(results) ? (
                <GridContainer spacing={2} style={{marginTop: 8}}>
                  {Array.isArray(results) && results.map(user =>(
                    <GridItem xs={3}>
                      <UserCard user={user.user} />
                    </GridItem>
                  ))}
                </GridContainer>
              ) : (
                <Paper padding>
                  Nenhum usuário encontrado.
                </Paper>
              )}
              </div>
            )}
          </>
        )}
        </>
        ) : (
          <p>Carregando</p>
        )}
      </div>
    </Container>
  );
};
