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

const MenuWrapper = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Menu = () => {
  const { url } = useRouteMatch()

  return (
    <MenuWrapper>
      <MenuItem
        current={url === "/"}
        icon={<NewsFeedIcon/>}
        label="Home"
        link="/"
      />

      <MenuItem
        current={url.includes("/library")}
        icon={<LibraryIcon />}
        label="Biblioteca"
        link="/library"
      />

      <MenuItem
        current={url.includes("/groups")}
        icon={<GroupIcon />}
        label="Grupos"
        link="/groups"
      />

      <MenuItem
        current={url.includes("/events")}
        icon={<EventIcon />}
        label="Eventos"
        link="/events"
      />

      <MenuItem
        current={url.includes("/projects")}
        icon={<ProjectIcon />}
        label="Projetos"
        link="/projects"
      />
    </MenuWrapper>
  );
};

export default Menu;
