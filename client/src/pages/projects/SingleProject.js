import React, { Suspense, lazy } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import TwitterLogo from 'react-ionicons/lib/LogoTwitter';
import FacebookLogo from 'react-ionicons/lib/LogoFacebook';
import InstagramLogo from 'react-ionicons/lib/LogoInstagram';
import YoutubeLogo from 'react-ionicons/lib/LogoYoutube';
import Container from '../../components/ui/Container';
// import Hero from '../../components/ui/Hero';
import Button from '../../components/ui/Button';
import GridContainer from '../../components/ui/GridContainer';
import GridItem from '../../components/ui/GridItem';
import Paper from '../../components/ui/Paper';
import Loader from '../../components/ui/Loader';

const ProjectFeed = lazy(() => import('./ProjectFeed'));
const ProjectFAQ = lazy(() => import('./ProjectFAQ'));
const ProjectAbout = lazy(() => import('./ProjectAbout'));

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
    margin-bottom: 5px;
  }

  span {
    color: ${(props) => props.theme.palette.text.contrast};
    font-size: 1.1em;
    font-weight: lighter;
  }
`;

const ProjectSocialMedia = styled.div`
  width: 100%;
  > p {
    margin: 10px 0px;
  }
  > ul {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  > ul li {
    list-style: none;
    margin: 10px 0px;
  }
  > ul li a {
    color: ${(props) => props.theme.palette.text.primary};
  }
  > ul li svg {
    float: left;
    fill: ${(props) => props.theme.palette.text.primary};
    margin-right: 10px;
  }
`;

const SingleProject = () => {
  const { page: projectPage, projectId } = useParams();
  const [page, setPage] = React.useState();
  const pages = {
    undefined: <ProjectFeed />,
    faq: <ProjectFAQ />,
    about: <ProjectAbout />,
  };

  React.useEffect(() => {
    setPage(pages[projectPage]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectPage]);

  return (
    <>
      <ProjectBanner cover="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F2.bp.blogspot.com%2F-G70MTXne61E%2FVYqaDqsttMI%2FAAAAAAAAADE%2FmTojlIVFhkQ%2Fs1600%2Fford-escort-xr3-antigo-de-coleco-restaurado-padro-original-10490-MLB20028759938_012014-F.jpg">
        <Container>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <h2>Escorts Ancap</h2>
              <span>Projeto</span>
            </div>
            <div>
              <Button color="secondary">Acompanhar</Button>
            </div>
          </div>
        </Container>
      </ProjectBanner>
      <Container>
        <GridContainer style={{ marginTop: 16 }} spacing={2}>
          <GridItem xs={4}>
            <Paper padding style={{ width: '100%' }}>
              <ProjectSocialMedia>
                <h3>Redes sociais do projeto</h3>
                <ul>
                  <li>
                    <TwitterLogo />
                    <span>Twitter</span>
                  </li>
                  <li>
                    <FacebookLogo />
                    <span>Facebook</span>
                  </li>
                  <li>
                    <InstagramLogo />
                    <span>Instagram</span>
                  </li>
                  <li>
                    <YoutubeLogo />
                    <span>YouTube</span>
                  </li>
                </ul>
              </ProjectSocialMedia>
            </Paper>
          </GridItem>
          <GridItem xs={8}>
            <Paper style={{ width: '100%' }}>
              <Tabs>
                <li className={projectPage === undefined ? 'current' : ''}>
                  <Link to={`/projects/${projectId}`}>Feed</Link>
                </li>
                <li className={projectPage === 'faq' ? 'current' : ''}>
                  <Link to={`/projects/${projectId}/faq`}>FAQ</Link>
                </li>
                <li className={projectPage === 'about' ? 'current' : ''}>
                  <Link to={`/projects/${projectId}/about`}>Sobre</Link>
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
