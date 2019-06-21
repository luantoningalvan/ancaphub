import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Template from '../template/template'
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchAllBooks } from './bookActions'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import BookCard from './bookCard'

const useStyles = makeStyles(theme => ({
  media: {
    height: 200,
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
}));

function BooksList(props) {
  useEffect(() => props.fetchAllBooks(), []);
  const classes = useStyles();

  return (
    <Template>
      <Box mb={2}>
        <Typography variant="h4" component="h2">Livros</Typography>
      </Box>
      
      <Grid container spacing={2}>
      {props.books.map((book, index) => (
        <BookCard book={book} key={index}/>
      ))}
      </Grid>
    </Template>
  )
}

const mapStateToProps = (state) => ({ books: state.books.allBooks })
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchAllBooks }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BooksList)