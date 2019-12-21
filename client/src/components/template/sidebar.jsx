import React, { Fragment, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Link as MDLink
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import deafaultCover from '../../assets/images/default-thumbnail.jpg'
import LoadingItems from '../../components/loaders/loadingItems'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAllItems } from '../../actions/itemActions';

const Sidebar = props => {
  useEffect(() => {
    props.fetchAllItems({ pageSize: 5, order: 'desc'});
  }, [])

  return (
    <>
      <Box mb={0.5}>
        <Typography variant="h6" component="h2">
          Últimas contribuições
            </Typography>
      </Box>
      {props.items.loading ? (
        <Box pt={2}>
          <LoadingItems />
        </Box>
      ) : (
          <List disablePadding>
            {props.items.allItems.items &&
              props.items.allItems.items.map(item => (
                <ListItem alignItems="flex-start" disableGutters key={item._id}>
                  <ListItemAvatar
                    style={{
                      height: '60px',
                      width: '40px',
                      background: `url(${item.cover ? item.cover.url : deafaultCover})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      marginRight: '10px'
                    }}
                  />
                  <ListItemText
                    primary={
                      <Typography
                        variant="subtitle2"
                        noWrap>
                        <MDLink
                          color="textPrimary"
                          component={Link}
                          to={`/${item.type}s/${item._id}`}>
                          {item.title}
                        </MDLink>
                      </Typography>
                    }
                    secondary={item.author}
                  />
                </ListItem>
              ))}
          </List>
        )}
    </>
  )
}

const mapStateToProps = state => ({
  items: state.items
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchAllItems }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
