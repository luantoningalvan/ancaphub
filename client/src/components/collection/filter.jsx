import React, { useEffect } from 'react';

import {
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  Box,
  Grid
} from '@material-ui/core';
import {
  NavigateBefore as BeforeIcon,
  NavigateNext as NextIcon
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import isEmpty from 'is-empty';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAllCategories } from '../../actions/categoriesAction';
import {
  fetchAllItems,
  selectCategory,
  selectOrder,
  selectPage
} from '../../actions/itemActions';

const useStyles = makeStyles(theme => ({
  media: {
    height: 200
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  formControl: {
    minWidth: '200px',
    marginRight: '15px'
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
        disabled={page === 1}
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
        disabled={checkHowManyItemsAreAlreadyLoaded() === total}
        onClick={() => selectPage(page + 1)}>
        <NextIcon />
      </IconButton>
    );
  };

  return (
    <Box mb={3}>
      <Paper style={{ padding: '10px' }}>
        <Grid container spacing={2} alignItems="center" justify="space-between">
          <Grid item >
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-simple">
                Filtrar por categoria
              </InputLabel>
              <Select
                value={category}
                onChange={e => selectCategory(e.target.value)}
                fullWidth
              >
                <MenuItem value="all">Todas</MenuItem>
                {!isEmpty(categories) &&
                  categories.allCategories.map(category => (
                    <MenuItem value={category._id} key={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel>Ordem</InputLabel>
              <Select value={order} onChange={e => selectOrder(e.target.value)} fullWidth>
                <MenuItem value="asc">Crescente</MenuItem>
                <MenuItem value="desc">Decrescente</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item>
            {beforePageButton()}
            <span
              style={{
                marginRight: '10px'
              }}>{`${page} / ${total > 0 ? parseInt(total / pageSize) + (total % pageSize > 0 ? 1 : 0) : 1}`}</span>

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
