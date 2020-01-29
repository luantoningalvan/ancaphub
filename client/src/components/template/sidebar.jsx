import React, { useEffect } from 'react';
import {
  Box,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom';
import deafaultCover from '../../assets/images/default-thumbnail.jpg'
import LoadingItems from '../../components/loaders/loadingItems'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAllItems } from '../../actions/itemActions';

const useStyles = makeStyles(theme => ({
  lastItems: {
    padding:0,
    margin:0,
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  item: {
    listStyle: 'none',
    marginTop: 10,
    display: 'flex',
    borderRadius: 4,
    background: theme.palette.background.paper,
    overflow: 'hidden',
    cursor: 'pointer',
    textDecoration: 'none',
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.03)",
    }
  },
  itemCover: {
    width: 75,
    height: 75,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 17,
    color: theme.palette.text.primary
  },
  author: {
    fontWeight: 'light',
    fontSize: 14,
    color: theme.palette.text.secondary
  },
  itemContent: { 
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'flex-start', 
    justifyContent: 'center', 
    padding: 10
  }
}))

const Sidebar = ({items, fetchAllItems}) => {
  const classes = useStyles()
  useEffect(() => {
    fetchAllItems({ pageSize: 5, order: 'desc'});
  }, [fetchAllItems])

  return (
    <>
      <Box mb={0.5}>
        <Typography variant="h6" component="h2">
          Itens Recentes
        </Typography>
      </Box>
      {items.loading ? (
        <Box pt={2}>
          <LoadingItems />
        </Box>
      ) : (
          <div className={classes.lastItems}>
            {items.allItems.items &&
              items.allItems.items.map(item => (
                <Link className={classes.item} to={`/${item.type}s/${item._id}`} key={item._id}>
                    <div className={classes.itemCover}>
                      <img 
                        src={ item.cover !== "" ? item.cover.url : deafaultCover }
                        style={{ width: '100%'}}
                      />
                      
                    </div>
                    <div className={classes.itemContent}>
                      <span className={classes.title}>{item.title}</span>
                      <span className={classes.author}>{item.author}</span>
                    </div>
                </Link>
              ))}
          </div>
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
