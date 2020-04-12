import React, { useEffect, useState } from "react";
import {
  Paper,
  Container,
  Box,
  IconButton,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import {
  Delete as DeleteIcon,
} from "@material-ui/icons";
import Hero from "../../components/template/hero";
import TitleComponent from "../../components/template/titleComponent";
import FullTable from "../../components/table/fullTable";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchAllInvites,
  generateNewInvites,
} from "../../actions/inviteActions";
import isEmpty from "is-empty";

function Users({ fetchAllInvites, generateNewInvites, invites }) {
  useEffect(() => fetchAllInvites(), [fetchAllInvites]);
  const [invitesQuantity, setInvitesQuantity] = useState(1);

  const handleGenerateNewInvites = (e) => {
    e.preventDefault();
    generateNewInvites(invitesQuantity);
  };

  return (
    <>
      <TitleComponent title="Convites" />
      <Hero title={`Convites(${invites.invites.length})`} />

      <Box mt={3}>
        <Container>
          <Box mb={2}>
            <Paper>
              <Box
                p={2}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h5">Gerar Códigos</Typography>
                <form onSubmit={handleGenerateNewInvites}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <TextField
                      label="Número de convites"
                      type="number"
                      size="small"
                      min="1"
                      max="20"
                      variant="outlined"
                      value={invitesQuantity}
                      onChange={(e) => setInvitesQuantity(e.target.value)}
                      style={{marginRight: 8}}
                    />
                    <Button
                      disableElevation
                      color="secondary"
                      variant="contained"
                      type="submit"
                    >
                      Gerar
                    </Button>
                  </Box>
                </form>
              </Box>
            </Paper>
          </Box>
          <Paper>
            {invites.invites && !isEmpty(invites.invites) ? (
              <FullTable
                fields={[
                  { label: "Codigo", key: "code" },
                  { label: "Utilizado", key: "used", align: "left", map: { false: "Não", true: "Sim"} },
                ]}
                data={invites.invites}
                actions={(user) => (
                  <>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              />
            ) : (
              <Box p={2}>Nenhum convite gerado</Box>
            )}
          </Paper>
        </Container>
      </Box>
    </>
  );
}

const mapStateToProps = (state) => ({ invites: state.invites });
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchAllInvites, generateNewInvites }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Users);
