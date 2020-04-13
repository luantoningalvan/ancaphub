import React from "react";
import { FormattedMessage } from "react-intl";
import Container from "../../../components/ui/Container";
import Paper from "../../../components/ui/Paper";
import Hero from "../../../components/ui/Hero";
import GridContainer from "../../../components/ui/GridContainer";
import GridItem from "../../../components/ui/GridItem";
import Menu from "../../../components/ui/Menu";
import MenuItem from "../../../components/ui/MenuItem";
import AccountIcon from "react-ionicons/lib/IosPerson";
import NotificationsIcon from "react-ionicons/lib/IosNotifications";
import PrivacyIcon from "react-ionicons/lib/IosLock";
import { useLocation } from 'react-router-dom'
import Notifications from './Notifications'
import Privacy from './Privacy'
import AccessAndSecurity from './AccessAndSecurity'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default () => {
  let query = useQuery().get('tab');

  const settigsMap = {
    "notifications": <Notifications />,
    "privacy": <Privacy />,
    "access_and_security": <AccessAndSecurity />,
  }
  
  const Tab = () => query !== null ? (settigsMap[query] === undefined ?<AccessAndSecurity /> : settigsMap[query]) : <AccessAndSecurity /> 

  return (
    <Container>
      <Hero
        title={
          <FormattedMessage
            id="common.settings"
            description="Título da página de configurações"
          />
        }
      />
      <div style={{ marginTop: 16 }}>
        <GridContainer>
          <GridItem xs={3}>
            <Paper style={{ width: "100%" }}>
              <Menu>
                <MenuItem
                  current={query === "access_and_security" || query === null || settigsMap[query] === undefined}
                  label="Conta"
                  link="/settings?tab=access_and_security"
                  icon={<AccountIcon />}
                />
                <MenuItem
                  current={query === "notifications"}
                  label="Notificações"
                  link="/settings?tab=notifications"
                  icon={<NotificationsIcon />}
                />
                <MenuItem
                  current={query === "privacy"}
                  label="Privacidade"
                  link="/settings?tab=privacy"
                  icon={<PrivacyIcon />}
                />
              </Menu>
            </Paper>
          </GridItem>

          <GridItem xs={9}>
            <div style={{ width: "100%", marginLeft: 16 }}>
              <Tab />
            </div>
          </GridItem>
        </GridContainer>
      </div>
    </Container>
  );
};
