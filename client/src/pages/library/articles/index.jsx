import React, { useEffect } from 'react';
import {
  Typography,
  Paper,
  Box,
  Button,
  Container
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import isEmpty from 'is-empty';
import Title from '../../../components/template/titleComponent'
import ArticleCard from '../../../components/library/article/articleCard';
import LoadContent from '../../../components/loaders/loadContent'
import ShowCategories from '../../../components/categories/showElementCategories'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAllItems } from '../../../actions/itemActions';
import { fetchAllCategories } from '../../../actions/categoryAction';
import styled from 'styled-components';

const Grid = styled.div`
display: grid;
grid-template-columns: repeat(5, 1fr);
gap: 30px 20px;
`

function Articles({fetchAllItems, fetchAllCategories, articles, categories}) {
  useEffect(() => {
    fetchAllItems({type: "article"})
    fetchAllCategories()
  }, [fetchAllItems, fetchAllCategories])


  return (
    <>
      <Title title="Artigos" />
      <Box pt={2} pb={5} style={{background: "rgba(0, 0, 0, 0.05)"}}>
        <Container>
          <Box mb={3} display="flex" justifyContent="space-between">
            <Typography variant="h4" component="h2">
            Artigos
            </Typography>
              <Button
                component={Link}
                to="/contribute/article"
                variant="contained"
                disableElevation
                size="small"
                color="secondary">
                <AddIcon />
              </Button>
          </Box>
          <Box mb={3} display="flex" justifyContent="center">

          <LoadContent loading={categories.loading}>
           <ShowCategories categories={categories.allCategories} />
          </LoadContent>
          </Box>
        </Container>
      </Box>


      <Container style={{marginTop: -28}}>
        <LoadContent loading={articles.loading}>
          {!isEmpty(articles.allItems.items) ? (
            <Grid>
              {articles.allItems.items.map((article, index) => (
                <>
                  <ArticleCard article={article} key={index} />
                  </>
              ))}
            </Grid>
          ) : (
              <Paper>
                <Box p={2}>
                  Nenhum artigo encontrado.
              </Box>
              </Paper>
            )}
        </LoadContent>
      </Container>
    </>
  );
}

const mapDispatchToProps = dispatch => bindActionCreators({fetchAllItems, fetchAllCategories}, dispatch)
const mapStateToProps = state => ({
  articles: state.items,
  categories: state.categories
});
export default connect(mapStateToProps, mapDispatchToProps)(Articles);
