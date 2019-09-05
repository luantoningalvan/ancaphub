import React, { useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import { emphasize, makeStyles, useTheme } from '@material-ui/core/styles';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAllCategories, setCategoriesLoading } from './categoriesAction';
import isEmpty from 'is-empty';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: 250
  },
  input: {
    display: 'flex',
    padding: 0,
    height: 'auto'
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden'
  },
  chip: {
    margin: theme.spacing(0.5, 0.25)
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light'
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    )
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2)
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    bottom: 6,
    fontSize: 16
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing(2)
  }
}));

function ChooseCategory({ field, form, ...props }) {
  const classes = useStyles();
  useEffect(() => {
    props.fetchAllCategories();
  }, []);

  const mapAllCategories = props.categories.allCategories.map(category => ({
    value: category._id,
    label: category.name
  }));
  const mapSelectedCategories = field.value.map(v => ({
    value: v.category,
    label: v.name
  }));

  function handleChangeMulti(value) {
    form.setFieldValue(
      field.name,
      isEmpty(value)
        ? []
        : value.map(v => ({ name: v.label, category: v.value }))
    );
  }

  async function handleCreate(inputValue) {
    axios
      .post('http://localhost:3000/api/categories', { name: inputValue })
      .then(function(categoryAdded) {
        props.fetchAllCategories();
        const newOption = {
          name: categoryAdded.data.name,
          category: categoryAdded.data._id
        };
        form.setFieldValue(field.name, [...field.value, newOption]);
      })
      .catch(function(error) {
        console.error('Erro ao adicionar categoria: ', error);
      });
  }

  return (
    <CreatableSelect
      classes={classes}
      inputId="react-select-multiple"
      TextFieldProps={{
        label: 'Categorias',
        InputLabelProps: {
          htmlFor: 'react-select-multiple',
          shrink: true
        },
        placeholder: 'Selecionar Categorias'
      }}
      options={mapAllCategories}
      value={mapSelectedCategories}
      onChange={handleChangeMulti}
      onCreateOption={handleCreate}
      isLoading={props.categories.isLoading}
      isMulti
    />
  );
}

const mapStateToProps = state => ({ categories: state.categories });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchAllCategories, setCategoriesLoading }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseCategory);
