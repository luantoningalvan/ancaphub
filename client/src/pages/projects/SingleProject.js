import React, { Suspense, lazy } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import TwitterLogo from 'react-ionicons/lib/LogoTwitter';
import FacebookLogo from 'react-ionicons/lib/LogoFacebook';
import InstagramLogo from 'react-ionicons/lib/LogoInstagram';
import YoutubeLogo from 'react-ionicons/lib/LogoYoutube';
import EmailLogo from 'react-ionicons/lib/IosMail';
import SiteLogo from 'react-ionicons/lib/IosLink';
import Container from '../../components/ui/Container';
import Card from '../../components/ui/Card';
import CardBody from '../../components/ui/CardBody';
import CardHeader from '../../components/ui/CardHeader';
import IconButton from '../../components/ui/IconButton';
import Button from '../../components/ui/Button';
import GridContainer from '../../components/ui/GridContainer';
import GridItem from '../../components/ui/GridItem';
import Paper from '../../components/ui/Paper';
import Loader from '../../components/ui/Loader';
import Dropdown from '../../components/ui/Dropdown';
import DropdownListContainer from '../../components/ui/DropdownListContainer';
import DropdownListItem from '../../components/ui/DropdownListItem';
import ShareButton from 'react-ionicons/lib/MdShareAlt'

const ProjectFeed = lazy(() => import('./ProjectFeed'));
const ProjectFAQ = lazy(() => import('./ProjectFAQ'));
const ProjectAbout = lazy(() => import('./ProjectAbout'));
const ProjectDonations = lazy(() => import('./ProjectDonations'));

const Tabs = styled.ul`
  display: flex;

  > li {
    list-style: none;
    border-bottom: 3px solid transparent;

    &:hover {
      border-bottom: 3px solid ${(props) => props.theme.palette.border};
    }
  }

  > li.current {
    border-bottom: 3px solid ${(props) => props.theme.palette.secondary};
  }
  > li a {
    display: block;
    color: ${(props) => props.theme.palette.text.primary};
    text-decoration: none;
    padding: 16px 32px;
  }
`;

const ProjectBanner = styled.div`
  height: 200px;
  background: url("${(props) => props.cover}") rgba(0,0,0,.5);
  background-size: cover;
  background-blend-mode: overlay;
  display: flex;
  align-items: center;
  justify-content: center;
  background-position: center;

  h2 {
    color: ${(props) => props.theme.palette.text.contrast};
    font-size: 1.9em;
    margin-bottom: 8px;
  }

  .icon{
    height:96px;
    width:96px;
    margin-right: 16px;
    border-radius:100%;
  }

  .category {
    color: ${(props) => props.theme.palette.text.contrast};
    background: ${(props) => props.theme.palette.secondary};
    font-size: 0.8em;
    font-weight: lighter;
    padding:4px;
    border-radius:4px;
  }
`;

const ProjectSocialMedia = styled(Card)`
  ul {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 8px 0px;
  }
  ul li { padding: 8px 16px; }
  ul li a {
    color: ${(props) => props.theme.palette.text.primary};
  }
  ul li svg {
    float: left;
    fill: ${(props) => props.theme.palette.text.primary};
    margin-right: 8px;
  }
`;

const SingleProject = () => {
  const { page: projectPage, projectId } = useParams();
  const [page, setPage] = React.useState();
  const pages = {
    undefined: <ProjectFeed />,
    faq: <ProjectFAQ />,
    about: <ProjectAbout />,
    donate: <ProjectDonations />
  };

  React.useEffect(() => {
    setPage(pages[projectPage]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectPage]);

  return (
    <>
      <ProjectBanner cover="https://pbs.twimg.com/profile_banners/1085703204141260800/1585659841/1500x500">
        <Container>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{display: 'flex',alignItems: 'center'}}>
              <img className="icon" src="https://pbs.twimg.com/profile_images/1244861875109715968/HxaDA0Pu_400x400.jpg" />
              <div>
              <h2>AncapHub</h2>
              <Link className="category">Website</Link>
              </div>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <Button color="primary" style={{marginRight: 8}}>Acompanhar</Button>
              <Dropdown  toggle={<IconButton><ShareButton /></IconButton>}  >
                <DropdownListContainer>
                  <DropdownListItem>Publicar</DropdownListItem>
                  <DropdownListItem>Enviar Mensagem</DropdownListItem>
                </DropdownListContainer>
              </Dropdown>
              
            </div>
          </div>
        </Container>
      </ProjectBanner>
      <Container>
        <GridContainer style={{ marginTop: 16 }} spacing={2}>
          <GridItem xs={3}>
            <ProjectSocialMedia padding style={{ width: '100%', position: 'sticky', top: 80 }}>
              <CardHeader>
                <h3>Links úteis</h3>
              </CardHeader>

                <ul>
                  <li>
                    <TwitterLogo />
                    <a href="http://twitter.com/ancap_hub" target="_blank">Twitter</a>
                  </li>
                  <li>
                    <FacebookLogo />
                    <a href="http://facebook.com/ancaphub" target="_blank">Facebook</a>
                  </li>
                  <li>
                    <InstagramLogo />
                    <a href="http://instagram.com/ancaphub" target="_blank">Instagram</a>
                  </li>
                  <li>
                    <YoutubeLogo />
                    <a href="http://youtube.com/ancaphub" target="_blank">YouTube</a>
                  </li>
                  <li>
                    <SiteLogo />
                    <a href="http://ancaphub.com" target="_blank">Website</a>
                  </li>
                  <li>
                    <EmailLogo />
                    <span>contato@ancaphub.com</span>
                  </li>
                </ul>
            </ProjectSocialMedia>
          </GridItem>
          <GridItem xs={9}>
            <Paper style={{ width: '100%' }}>
              <Tabs>
                <li className={projectPage === undefined ? 'current' : ''}>
                  <Link to={`/projects/${projectId}`}>Novidades</Link>
                </li>
                <li className={projectPage === 'faq' ? 'current' : ''}>
                  <Link to={`/projects/${projectId}/faq`}>FAQ</Link>
                </li>
                <li className={projectPage === 'about' ? 'current' : ''}>
                  <Link to={`/projects/${projectId}/about`}>Sobre</Link>
                </li>
                <li className={projectPage === 'donate' ? 'current' : ''}>
                  <Link to={`/projects/${projectId}/donate`}>Doar</Link>
                </li>
              </Tabs>
            </Paper>
            <div style={{ width: '100%', margin: '16px 0' }}>
              <Suspense fallback={<Loader size={96} />}>
                {page}
              </Suspense>
            </div>
          </GridItem>
        </GridContainer>
      </Container>
    </>
  );
};

export default SingleProject;
