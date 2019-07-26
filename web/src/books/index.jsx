import React from 'react'
import Template from '../template/template'
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchAllBooks, selectCategory, selectOrder, selectPage } from './bookActions'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import BookCard from './bookCard'
import isEmpty from 'is-empty'
import Filter from '../components/filter/filter'

function BooksList(props) {
  const { books } = props
  return (
    <Template>
      <Box mb={3}>
        <Typography variant="h4" component="h2">Livros</Typography>
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
        {!isEmpty(books.allBooks.books) ? books.allBooks.books.map((book, index) => (
          <BookCard book={book} user={props.user} key={index} />
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
