import React, { useEffect, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Template from '../../../template/template'
import Categories from '../../../components/categories/showElementCategories'
import ReactPlayer from 'react-player'
import isEmpty from 'is-empty'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchItem } from '../itemActions'
import { Typography, Box, Grid } from '@material-ui/core';

function SingleVideo(props) {
  const { id } = props.match.params;
  useEffect(() => props.fetchItem(id), []);

  const { title, author, categories, content, extraFields } = props.video.item;

  const useStyles = makeStyles(theme => ({
    banner: {
      background: `#111111`,
      width: "100%",
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4)
    },
    videoPlayer: {
      margin: 'auto',
      boxShadow: '0px 0px 30px rgba(0,0,0,.7)'
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
      {!isEmpty(props.video.item) && props.video.item.type == "video" && (
        <Fragment>
          <Box className={classes.banner}>
            <Container>
              <ReactPlayer
                url={extraFields.videoUrl}
                className={classes.videoPlayer}
              />
              <Box mt={4}>
                <Categories categories={categories} />
                <Typography variant="h4" component="h2" className={classes.title}>{title}</Typography>
                <Typography variant="subtitle1" component="p" className={classes.author}>Participantes: {author}</Typography>
              </Box>
            </Container>
          </Box>
          <Container>
            <Box my={2}>
              <Typography variant="body1" component="p">{content}</Typography>
            </Box>
          </Container>
        </Fragment>
      )}
    </Template>

  )
}


const mapStateToProps = (state) => ({ video: state.items })
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchItem }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SingleVideo)
