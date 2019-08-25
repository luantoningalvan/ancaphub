import React from 'react'
import Template from '../../../template/template'
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import BookCard from './bookCard'
import isEmpty from 'is-empty'
import { Link } from 'react-router-dom'
import Filter from '../filter'

function BooksList(props) {
  const { books } = props
  return (
    <Template>
      <Box mb={3} display="flex" justifyContent="space-between">
        <Typography variant="h4" component="h2">Livros</Typography>
        <Button component={Link} to={`livros/contribuir`} variant="contained" color="primary">
          <AddIcon style={{ marginRight: '10px' }} />
          Contribuir
          </Button>
      </Box>

      <Filter
        type="book"
      />

      <Grid container spacing={2}>
        {!isEmpty(books.allItems.items) && books.allItems.type == "book" ? books.allItems.items.map((book, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index} >
            <BookCard book={book} user={props.user} />
          </Grid>
        )) :
          (
            <p>Nenhum livro disponível.</p>
          )
        }
      </Grid>
    </Template>
  )
}

const mapStateToProps = (state) => ({ books: state.items, user: state.auth.user })
export default connect(mapStateToProps)(BooksList)
