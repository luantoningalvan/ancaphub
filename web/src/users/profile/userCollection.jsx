import React, { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import BookCard from '../../books/bookCard'
import ArticleCard from '../../articles/articleCard'
import isEmpty from 'is-empty'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUserCollection } from "../userActions"

function UserCollection(props) {
  useEffect(() => props.getUserCollection(props.user._id), [props.user._id])

  return (
    <>
      <Box mb={2}>
        <Typography variant="h5" component="h2">Coleção</Typography>
      </Box>

      <Grid container spacing={2}>
        {props.collection && !isEmpty(props.collection) ? props.collection.map(item => (
          <Grid item xs={12} sm={8} md={6} lg={4}>
            {item.type == "book" && (
              <BookCard book={item} />
            )}

            {item.type == "article" && (
              <ArticleCard article={item} />
            )}
          </Grid>
        )) : (
            <Grid item xs={12}>
              <Paper>
                <Box p={2}>
                  Esse usuário não possui nenhum item na coleção.
                </Box>
              </Paper>
            </Grid>
          )}
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => ({ collection: state.users.user.personalCollection })
const mapDispatchToProps = (dispatch) => bindActionCreators({ getUserCollection }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserCollection)
