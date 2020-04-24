import React, { Suspense, lazy } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import Container from "../../components/ui/Container";
import Tabs from "../../components/ui/Tabs";
import Tab from "../../components/ui/Tab";
import Paper from "../../components/ui/Paper";
import GridContainer from "../../components/ui/GridContainer";
import GridItem from "../../components/ui/GridItem";
import Loader from "../../components/ui/Loader";
import SettingIcon from 'react-ionicons/lib/IosSettings'

const GroupBoard = lazy(() => import("./GroupBoard"));
const GroupChat = lazy(() => import("./GroupChat"));
const GroupFiles = lazy(() => import("./GroupFiles"));
const GroupMembers = lazy(() => import("./GroupMembers"));
const GroupManage = lazy(() => import("./GroupManage"));

const GroupHeader = styled.div`
  height: 64px;
  width: 100%;
  background: ${props => props.theme.palette.paperDark};
  border-bottom: 1px solid ${props => props.theme.palette.border};

  h2 {
    color: ${(props) => props.theme.palette.text.primary};
    font-size: 1.3em;
  }

  .group-header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64px;
    width: 100%;
  }
`;

const SingleGroup = () => {
  const [Page, setPage] = React.useState();
  const { id: groupId, page: groupPage } = useParams();

  const pages = {
    undefined: <GroupBoard />,
    chat: <GroupChat />,
    files: <GroupFiles />,
    members: <GroupMembers />,
    manage: <GroupManage />,
  };

  React.useEffect(() => {
    setPage(pages[groupPage]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupPage]);

  return (
    <>
      <GroupHeader>
        <Container>
          <div className="group-header-wrapper">
            <h2>Anarco Bagualismo</h2>

            <Tabs style={{height: 64}}>
              <Tab
                current={groupPage === undefined}
                link={`/groups/${groupId}`}
                label="Quadro"
              />
              <Tab
                current={groupPage === "chat"}
                link={`/groups/${groupId}/chat`}
                label="Chat"
              />
              <Tab
                current={groupPage === "files"}
                link={`/groups/${groupId}/files`}
                label="Arquivos"
              />
              <Tab
                current={groupPage === "members"}
                link={`/groups/${groupId}/members`}
                label="Membros"
              />
               <Tab
                current={groupPage === "manage"}
                link={`/groups/${groupId}/manage`}
                label={<SettingIcon />}
              />
            </Tabs>
          </div>
        </Container>
      </GroupHeader>
      <Container>
        <Paper style={{ width: "100%" }}></Paper>
        <div
          style={{
            width: "100%",
            margin: "16px 0",
          }}
        >
          <Suspense fallback={<Loader size={96} />}>{Page}</Suspense>
        </div>
      </Container>
    </>
  );
};

export default SingleGroup;
