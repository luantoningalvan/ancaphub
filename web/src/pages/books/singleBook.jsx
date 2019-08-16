import React, { useEffect } from 'react'
import Template from '../../template/template'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchBook } from './bookActions'
import { Typography, Box, Grid } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DownloadIcon from '@material-ui/icons/CloudDownload'
import IconButton from '@material-ui/core/IconButton';
import Categories from '../../components/categories/showElementCategories'
import isEmpty from 'is-empty'

function SingleBook(props) {
  const { id } = props.match.params;
  useEffect(() => props.fetchBook(id), []);

  const { _id, title, author, categories, content, cover, extraFields } = props.book.book;

  return (
    <Template>
      {!props.book.loading && !isEmpty(props.book.book) && (
        <>
          <Box mb={2}>
            <Typography variant="h4" component="h2" gutterBottom>{title} - {author}</Typography>
          </Box>

          <Categories categories={categories} />

          <Grid container spacing={3}>
            <Grid item xs={3}>
              <img src={cover} alt={`Capa do livro ${title}`} style={{ width: '100%' }} />
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle2" gutterBottom component="h3">Sinopse</Typography>
              {content}
            </Grid>

            <Grid item xs={3}>
              <Typography variant="subtitle2" gutterBottom component="h3">Opções de Download</Typography>

              <List>
                {extraFields.downloadOptions && extraFields.downloadOptions.map(download => (
                  <ListItem key={`${_id} ${download.type}`}>
                    <ListItemText
                      primary={download.type.toUpperCase()}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="Delete" href={download.file} target="_blank">
                        <DownloadIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </>
      )}
    </Template>

  )
}


const mapStateToProps = (state) => ({ book: state.books })
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchBook }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SingleBook)
