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

const SearchResults = ({searchTerm, search}) => {
  const getSearchTerm = () => {
    const urlString = window.location.href
    const url = new URL(urlString);
    const searchTerm = url.searchParams.get("s");
    return searchTerm
  }

  const term = getSearchTerm()

  useEffect(() => {
    if (searchTerm !== "") {
      searchTerm(term)
    }
  }, [term, searchTerm])

  return (
    <Template>
      <Box mb={3}>
        <Typography variant="h4" component="h2" noWrap>
          Resultados para: {term}
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

      <LoadContent loading={search.loading}>
        {!isEmpty(search.searchResults.users) || !isEmpty(search.searchResults.items) ? (
          <Box mt={3}>
            <Grid container spacing={2}>
              {search.searchResults.users.map(user => (
                <Grid item xs={12} md={4} lg={3}  key={user._id}>
                  <UserCard user={user} />
                </Grid>
              ))}

              {search.searchResults.items.items.map(item => (
                <Grid item xs={12} md={4} lg={3} key={item._id}>
                  {item.type === "book" && <BookCard book={item} location="search" />}
                  {item.type === "article" && <ArticleCard article={item} location="search" />}
                  {item.type === "video" && <VideoCard video={item} location="search" />}
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