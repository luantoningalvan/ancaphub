import React, { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import isEmpty from 'is-empty'
import BookCard from '../../books/bookCard'
import ArticleCard from '../../articles/articleCard'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUserLibrary } from '../userActions'

function UserLibrary(props) {
  useEffect(() => props.getUserLibrary(), []);
  console.log(props.library)
  return (
    <Box mb={2}>
      <Typography variant="h5" component="h2">Biblioteca</Typography>
      <Box mt={2}>
        <Typography variant="h6" component="h2">Livros</Typography>

        <Grid container spacing={2}>
          { props.library && !isEmpty(props.library) ? props.library[0].books.map((book, index) => 
            <BookCard book={book} key={index} user={props.authUser}/>
          ): (<p>Nenhum livro cadastrado na biblioteca.</p>)}
        </Grid>
      </Box>

      <Box mt={2}>
        <Typography variant="h6" component="h2">Artigos</Typography>
        
        <Grid container spacing={2}>
          { props.library && !isEmpty(props.library) ? props.library[0].articles.map((article, index) => 
            <ArticleCard article={article} key={index} user={props.authUser} />
          ): (<p>Nenhum artigo cadastrado na biblioteca.</p>)}
        </Grid>
      </Box>
    </Box>
  );
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ getUserLibrary }, dispatch)
const mapStateToProps = (state) => ({
  library: state.users.userLibrary
})


export default connect(mapStateToProps, mapDispatchToProps)(UserLibrary)
