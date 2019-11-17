import React, { Fragment } from 'react';
import {
  Typography,
  Grid,
  Box,
  Paper,
  Button
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import isEmpty from 'is-empty';
import Template from '../../../components/template';
import ArticleCard from '../../../components/collection/article/articleCard';
import Filter from '../../../components/collection/filter';
import Title from '../../../components/template/titleComponent'
import LoadingItems from '../../../components/loaders/loadingItems'
import { connect } from 'react-redux';

function ArticlesList(props) {
  const { articles } = props;
  return (
    <Template>
      <Box display="flex" flexDirection="column" height="100%">
        <Title title="Artigos" />
        <Box mb={3} display="flex" justifyContent="space-between">
          <Typography variant="h4" component="h2">
            Artigos
        </Typography>
          <Button
            component={Link}
            to={`artigos/contribuir`}
            variant="outlined"
            color="secondary">
            <AddIcon style={{ marginRight: '10px' }} />
            Contribuir
        </Button>
        </Box>

        <Filter type="article" />

        {!articles.loading ? (
          <Fragment>
            {!isEmpty(articles.allItems.items) ? (
              <Grid container spacing={2}>
                {articles.allItems.items.map((article, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <ArticleCard article={article} user={props.user} />
                  </Grid>
                ))}
              </Grid>
            ) : (
                <Paper>
                  <Box p={2}>
                    Nenhum artigo encontrado.
              </Box>
                </Paper>
              )}
          </Fragment>
        ) : (
            <Box flex="1">
              <LoadingItems />
            </Box>
          )}
      </Box>
    </Template>
  );
}

const mapStateToProps = state => ({
  articles: state.items,
  user: state.auth.user
});
export default connect(mapStateToProps)(ArticlesList);
