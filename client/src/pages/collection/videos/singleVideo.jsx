import React, { useEffect, Fragment } from 'react';
import { Typography, Box, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import isEmpty from 'is-empty';
import ReactPlayer from 'react-player';
import Template from '../../../components/template';
import Title from '../../../components/template/titleComponent'
import Categories from '../../../components/categories/showElementCategories';
import LoadContent from '../../../components/loaders/loadContent'
import InvitedBy from '../../../components/profile/invitedBy'
import UnavaliableContent from '../../../components/error/unavaliableContent'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchItem } from '../../../actions/itemActions';

function SingleVideo({match, fetchItem, video}) {
  const { id } = match.params;
  useEffect(() => fetchItem(id), [fetchItem, id]);

  const { title, author, categories, content, user, extraFields } = video.item;

  const useStyles = makeStyles(theme => ({
    banner: {
      background: `#111111`,
      width: '100%',
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4)
    },
    videoPlayer: {
      position: 'absolute',
      top: 0,
      left: 0,
      boxShadow: '0px 0px 30px rgba(0,0,0,.7)'
    },
    playerWrapper: {
      position: 'relative',
      paddingTop: '56.25%' /* Player ratio: 100 / (1280 / 720) */
    },
    title: {
      fontWeight: 'bold',
      color: 'white'
    },
    author: {
      fontWeight: 'light',
      color: 'white'
    }
  }));

  const classes = useStyles();

  return (
    <Template noPadding>
      <LoadContent loading={video.loading}>
        {!isEmpty(video.item) && video.item.type === 'video' ? (
          <Fragment>
            <Title title={title} />
            <Box className={classes.banner}>
              <Container>
                <div className={classes.playerWrapper}>
                  <ReactPlayer
                    url={extraFields.videoUrl}
                    className={classes.videoPlayer}
                    width='100%'
                    height='100%'
                  />
                </div>
                <Box mt={4}>
                  <Categories categories={categories} />
                  <Typography
                    variant="h4"
                    component="h2"
                    className={classes.title}>
                    {title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="p"
                    className={classes.author}>
                    Participantes: {author}
                  </Typography>
                </Box>
              </Container>
            </Box>
            <Container>
              <Box my={2}>
                <Typography variant="body1" component="p">
                  {content}
                </Typography>
                <InvitedBy user={user} />
              </Box>
            </Container>
          </Fragment>
        ) : (
            <Container>
              <Box mt={2}>
                <UnavaliableContent />
              </Box>
            </Container>
          )}
      </LoadContent>
    </Template>
  );
}
const mapStateToProps = state => ({ video: state.items });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchItem }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleVideo);
