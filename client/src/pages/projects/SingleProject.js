import React, { Suspense, lazy } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import TwitterLogo from 'react-ionicons/lib/LogoTwitter';
import FacebookLogo from 'react-ionicons/lib/LogoFacebook';
import InstagramLogo from 'react-ionicons/lib/LogoInstagram';
import YoutubeLogo from 'react-ionicons/lib/LogoYoutube';
import EmailLogo from 'react-ionicons/lib/IosMail';
import SiteLogo from 'react-ionicons/lib/IosLink';
import ShareButton from 'react-ionicons/lib/MdShareAlt';
import Container from '../../components/ui/Container';
import Card from '../../components/ui/Card';
// import CardBody from '../../components/ui/CardBody';
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
    donate: <ProjectDonations />,
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img className="icon" src="https://pbs.twimg.com/profile_images/1244861875109715968/HxaDA0Pu_400x400.jpg" alt="profile pic" />
              <div>
                <h2>AncapHub</h2>
                <Link className="category" href="http://ancaphub.com" rel="noopener noreferrer"><FormattedMessage id="common.website" /></Link>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button color="primary" style={{ marginRight: 8 }}>
                <FormattedMessage id="projects.enroll" />
              </Button>
              <Dropdown toggle={<IconButton><ShareButton /></IconButton>}>
                <DropdownListContainer>
                  <DropdownListItem><FormattedMessage id="common.publish" /></DropdownListItem>
                  <DropdownListItem><FormattedMessage id="common.sendMessage" /></DropdownListItem>
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
                <h3>
                  <FormattedMessage id="projects.usefulLinks" />
                </h3>
              </CardHeader>

              <ul>
                <li>
                  <TwitterLogo />
                  <a href="http://twitter.com/ancap_hub" target="_blank" rel="noopener noreferrer">Twitter</a>
                </li>
                <li>
                  <FacebookLogo />
                  <a href="http://facebook.com/ancaphub" target="_blank" rel="noopener noreferrer">Facebook</a>
                </li>
                <li>
                  <InstagramLogo />
                  <a href="http://instagram.com/ancaphub" target="_blank" rel="noopener noreferrer">Instagram</a>
                </li>
                <li>
                  <YoutubeLogo />
                  <a href="http://youtube.com/ancaphub" target="_blank" rel="noopener noreferrer">YouTube</a>
                </li>
                <li>
                  <SiteLogo />
                  <a href="http://ancaphub.com" target="_blank" rel="noopener noreferrer">
                    <FormattedMessage id="common.website" />
                  </a>
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
                  <Link to={`/projects/${projectId}`}>
                    <FormattedMessage id="projects.news" />
                  </Link>
                </li>
                <li className={projectPage === 'faq' ? 'current' : ''}>
                  <Link to={`/projects/${projectId}/faq`}>
                    <FormattedMessage id="projects.faq" />
                  </Link>
                </li>
                <li className={projectPage === 'about' ? 'current' : ''}>
                  <Link to={`/projects/${projectId}/about`}>
                    <FormattedMessage id="projects.about" />
                  </Link>
                </li>
                <li className={projectPage === 'donate' ? 'current' : ''}>
                  <Link to={`/projects/${projectId}/donate`}>
                    <FormattedMessage id="projects.donate" />
                  </Link>
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
