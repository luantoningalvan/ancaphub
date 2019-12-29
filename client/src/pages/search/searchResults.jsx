import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Grid
} from '@material-ui/core';
import Template from '../../components/template';
import LoadContent from '../../components/loaders/loadContent'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { searchTerm } from '../../actions/searchActions';
import isEmpty from 'is-empty'
import UserCard from '../../components/profile/userCard'
import BookCard from '../../components/collection/book/bookCard'
import ArticleCard from '../../components/collection/article/articleCard'
import VideoCard from '../../components/collection/video/videoCard'

const SearchResults = props => {
  const getSearchTheme = () => {
    const urlString = window.location.href
    const url = new URL(urlString);
    const searchTerm = url.searchParams.get("s");
    return searchTerm
  }

  const searchTerm = getSearchTheme()
  console.log(searchTerm)

  useEffect(() => {
    if (searchTerm !== "") {
      props.searchTerm(searchTerm)
    }
  }, [searchTerm])

  return (
    <Template>
      <Box mb={3}>
        <Typography variant="h4" component="h2" noWrap>
          Resultados para: {searchTerm}
        </Typography>
      </Box>

      <Paper>
        <Tabs value="all" variant="fullWidth">
          <Tab label="Tudo" value="all" />
          <Tab disabled label="Coleção" value="collection" />
          <Tab disabled label="Usuários" value="users" />
          <Tab disabled label="Grupos" />
          <Tab disabled label="Eventos" />
          <Tab disabled label="Projetos" />
        </Tabs>
      </Paper>

      <LoadContent loading={props.search.loading}>
        {!isEmpty(props.search.searchResults.users) || !isEmpty(props.search.searchResults.items) ? (
          <Box mt={3}>
            <Grid container spacing={2}>
              {props.search.searchResults.users.map(user => (
                <Grid item xs={12} md={4} lg={3}>
                  <UserCard user={user} />
                </Grid>
              ))}

              {props.search.searchResults.items.map(item => (
                <Grid item xs={12} md={4} lg={3}>
                  {item.type == "book" && <BookCard book={item} />}
                  {item.type == "article" && <ArticleCard article={item} />}
                  {item.type == "video" && <VideoCard video={item} />}
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
            <Paper>
              <Box p={2}>
                Nenhum resultado encontrado o termo pesquisado
              </Box>
            </Paper>
          )}
      </LoadContent>
    </Template>
  )
};

const mapStateToProps = state => ({
  search: state.search,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ searchTerm }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults);