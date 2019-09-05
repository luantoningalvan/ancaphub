import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import isEmpty from 'is-empty';
import BeforeIcon from '@material-ui/icons/NavigateBefore';
import NextIcon from '@material-ui/icons/NavigateNext';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAllCategories } from '../../components/categories/categoriesAction';
import {
  fetchAllItems,
  selectCategory,
  selectOrder,
  selectPage
} from './itemActions';

const useStyles = makeStyles(theme => ({
  media: {
    height: 200
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  formControl: {
    minWidth: 200
  }
}));

function Filter(props) {
  const classes = useStyles();
  const {
    fetchAllItems,
    fetchAllCategories,
    selectPage,
    selectCategory,
    selectOrder,
    categories,
    items,
    type
  } = props;
  const { category, order, page } = items.filters;

  useEffect(() => fetchAllItems({ type, category, order, page }), [
    category,
    order,
    page
  ]);
  useEffect(() => fetchAllCategories(), []);

  const { pageSize, total } = items.allItems;

  const checkHowManyItemsAreAlreadyLoaded = () => {
    return page <= parseInt(total / pageSize) ? page * pageSize : total;
  };

  const beforePageButton = () => {
    return (
      <IconButton
        color="primary"
        aria-label="Próxima"
        component="span"
        size="small"
        disabled={page == 1}
        onClick={() => selectPage(page - 1)}>
        <BeforeIcon />
      </IconButton>
    );
  };

  const nextPageButton = () => {
    return (
      <IconButton
        color="primary"
        aria-label="Próxima"
        component="span"
        size="small"
        disabled={checkHowManyItemsAreAlreadyLoaded() == total}
        onClick={() => selectPage(page + 1)}>
        <NextIcon />
      </IconButton>
    );
  };

  return (
    <Box mb={3}>
      <Paper style={{ paddingRight: '10px', paddingLeft: '10px' }}>
        <Grid container spacing={2} alignItems="center" justify="space-between">
          <Grid item xs={3}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-simple">
                Filtrar por categoria
              </InputLabel>
              <Select
                value={category}
                onChange={e => selectCategory(e.target.value)}>
                <MenuItem value="">Todas</MenuItem>
                {!isEmpty(categories) &&
                  categories.allCategories.map(category => (
                    <MenuItem value={category._id} key={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl className={classes.formControl}>
              <InputLabel>Ordem</InputLabel>
              <Select value={order} onChange={e => selectOrder(e.target.value)}>
                <MenuItem value="asc">Crescente</MenuItem>
                <MenuItem value="desc">Decrescente</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <span
              style={{
                marginRight: '10px'
              }}>{`Total de itens: ${checkHowManyItemsAreAlreadyLoaded()} - ${total}`}</span>
            {beforePageButton()}
            {nextPageButton()}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
const mapStateToProps = state => ({
  categories: state.categories,
  items: state.items
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchAllCategories,
      fetchAllItems,
      selectCategory,
      selectOrder,
      selectPage
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
