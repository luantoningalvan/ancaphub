import React, { useEffect } from 'react';
import Template from '../../template/template';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ShowPosts from '../../components/posts/showPosts';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import MaterialLink from '@material-ui/core/Link';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadUserFeed } from '../../components/posts/postActions';
import { fetchAllItems } from '../collection/itemActions';

function Home(props) {
  const AdapterLink = React.forwardRef((props, ref) => (
    <Link innerRef={ref} {...props} />
  ));
  const types = {
    book: 'livro',
    article: 'artigo',
    video: 'video',
    podcast: 'podcast'
  };

  useEffect(() => {
    props.loadUserFeed();
    props.fetchAllItems({ pageSize: 5 });
  }, []);

  return (
    <Template>
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <ShowPosts posts={props.posts} />
        </Grid>
        <Grid item xs={4}>
          <Box mb={0.5}>
            <Typography variant="h6" component="h2">
              Últimas contribuições
            </Typography>
          </Box>
          <List disablePadding>
            {props.lastItems &&
              props.lastItems.map(item => (
                <>
                  <ListItem alignItems="flex-start" disableGutters>
                    <ListItemAvatar
                      style={{
                        height: '60px',
                        width: '40px',
                        background: `url(${item.cover})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        marginRight: '10px'
                      }}
                    />
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle2"
                          color="textPrimary"
                          noWrap>
                          <MaterialLink
                            component={AdapterLink}
                            to={`/${types[item.type]}s/${types[item.type]}/${
                              item._id
                            }`}>
                            {item.title}
                          </MaterialLink>
                        </Typography>
                      }
                      secondary={item.author}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
              ))}
          </List>
        </Grid>
      </Grid>
    </Template>
  );
}

const mapStateToProps = state => ({
  posts: state.posts.posts,
  lastItems: state.items.allItems.items
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadUserFeed, fetchAllItems }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
