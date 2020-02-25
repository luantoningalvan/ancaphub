import React, { useEffect } from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  FormControlLabel,
  Switch,
  Divider
} from "@material-ui/core";
import { VerifiedUser } from "@material-ui/icons";
import Hero from "../../components/template/hero";
import TitleComponent from "../../components/template/titleComponent";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../../actions/userActions";

function SingleUser({ fetchUser, users, match }) {
  const { id: userId } = match.params;
  const { _id, username, isVerified } = users.user;

  useEffect(() => fetchUser(userId), [fetchUser, userId]);

  const verifyUser = () => {
    return true
  };

  return (
    <>
      <TitleComponent title={`@${username} - Usuários`} />
      <Hero title={`@${username} - Gerenciar Usuário`} />

      <Box mt={3}>
        <Container>
          <Paper>
            <Box p={2}>
              <Typography variant="h6" gutterBottom>
                <VerifiedUser
                  style={{
                    float: "left",
                    lineHeight: "1.6",
                    margin: "3 10 0 0"
                  }}
                />
                <span>Verificação de Conta</span>
              </Typography>
              <Divider />
              {isVerified && "sim"}
              <FormControlLabel
                control={
                  <Switch
                    checked={isVerified}
                    onChange={verifyUser()}
                    color="secondary"
                  />
                }
                label="Este é um usuário verificado"
                labelPlacement="start"
                style={{ margin: "10px 0px" }}
              />
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}

const mapStateToProps = state => ({ users: state.users });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser);
