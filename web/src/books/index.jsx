import React from 'react'
import Template from '../template/template'
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchAllBooks, selectCategory, selectOrder, selectPage } from './bookActions'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import BookCard from './bookCard'
import isEmpty from 'is-empty'
import { Link } from 'react-router-dom'
import Filter from '../components/filter/filter'

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
        fetchAction={props.fetchAllBooks}
        filters={books.filters}
        selectCategory={props.selectCategory}
        selectOrder={props.selectOrder}
        selectPage={props.selectPage}
        totalItens={books.allBooks.total}
        pageSize={books.allBooks.pageSize}
      />

      <Grid container spacing={2}>
        {!isEmpty(books.allBooks.items) ? books.allBooks.items.map((book, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <BookCard book={book} user={props.user} key={index} />
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

const mapStateToProps = (state) => ({ books: state.books, user: state.auth.user })
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchAllBooks, selectCategory, selectOrder, selectPage }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BooksList)
