import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import LocationSearchIcon from '@material-ui/icons/LocationSearching';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchAllBooks } from '../../books/bookActions'
import { fetchAllArticles } from '../../articles/articleActions'

const useStyles = makeStyles(theme => ({
  search: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  locationSearchIcon: {
    paddingLeft: theme.spacing(1),
    height: '24px',
    color: "#757575"
  },
  searchIcon: {
    paddingRight: theme.spacing(1),
    height: '24px',
    color: "#757575"
  },
  inputRoot: {
    color: "#757575",
  },
  inputInput: {
    padding: theme.spacing(1),
  }
}));

function SearchBox(props) {
  const classes = useStyles();

  const search = (text) => {
    console.log(text)
  }

  return (
    <div className={classes.search}>
      <div className={classes.locationSearchIcon}>
        <LocationSearchIcon />
      </div>
      <InputBase
        placeholder="Buscar…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'Buscar' }}
        onChange={(t) => search(t.target.value)}
      />
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({ books: state.books, articles: state.articles })
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchAllBooks, fetchAllArticles }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(SearchBox)