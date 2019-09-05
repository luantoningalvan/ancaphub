import React from 'react';
import Template from '../../../template/template';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ArticleCard from './articleCard';
import isEmpty from 'is-empty';
import Filter from '../filter';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function ArticlesList(props) {
  const { articles } = props;
  return (
    <Template>
      <Box mb={3} display="flex" justifyContent="space-between">
        <Typography variant="h4" component="h2">
          Artigos
        </Typography>
        <Button
          component={Link}
          to={`artigos/contribuir`}
          variant="contained"
          color="primary">
          <AddIcon style={{ marginRight: '10px' }} />
          Contribuir
        </Button>
      </Box>

      <Filter type="article" />

      <Grid container spacing={2}>
        {!isEmpty(articles.allItems.items) ? (
          articles.allItems.items.map((article, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <ArticleCard article={article} user={props.user} />
            </Grid>
          ))
        ) : (
          <p>Nenhum artigo disponível.</p>
        )}
      </Grid>
    </Template>
  );
}

const mapStateToProps = state => ({
  articles: state.items,
  user: state.auth.user
});
export default connect(mapStateToProps)(ArticlesList);
