import React from "react";
import styled from "styled-components";
import MenuItem from "./MenuItem";
import { useRouteMatch } from "react-router-dom";

// Icons
import NewsFeedIcon from "react-ionicons/lib/IosPaper";
import LibraryIcon from "react-ionicons/lib/IosFolderOpen";
import GroupIcon from "react-ionicons/lib/IosPeople";
import EventIcon from "react-ionicons/lib/IosCalendar";
import ProjectIcon from "react-ionicons/lib/IosBrush";

// i18n
import { FormattedMessage } from "react-intl";

const MenuWrapper = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Menu = () => {
  const { url } = useRouteMatch();

  return (
    <MenuWrapper>
      <MenuItem
        current={url === "/"}
        icon={<NewsFeedIcon />}
        label={
          <FormattedMessage
            id="common.home"
            description="Label do menu - Home"
          />
        }
        link="/"
      />

      <MenuItem
        current={url.includes("/library")}
        icon={<LibraryIcon />}
        label={
          <FormattedMessage
            id="common.library"
            description="Label do menu - Biblioteca"
          />
        }
        link="/library"
      />

      <MenuItem
        current={url.includes("/groups")}
        icon={<GroupIcon />}
        label={
          <FormattedMessage
            id="common.groups"
            description="Label do menu - Grupos"
          />
        }
        link="/groups"
      />

      <MenuItem
        current={url.includes("/events")}
        icon={<EventIcon />}
        label={
          <FormattedMessage
            id="common.events"
            description="Label do menu - Eventos"
          />
        }
        link="/events"
      />

      <MenuItem
        current={url.includes("/projects")}
        icon={<ProjectIcon />}
        label={
          <FormattedMessage
            id="common.projects"
            description="Label do menu - Projetos"
          />
        }
        link="/projects"
      />
    </MenuWrapper>
  );
};

export default Menu;
