import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  TextField,
  Grid,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core'
import { Form, Formik } from 'formik'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllUsers } from '../../actions/userActions'
import { createGroup } from '../../actions/groupActions'

const NewGroup = props => {
  console.log(props)
  const loadResults = (filter) => {
    props.getAllUsers(filter)
  }

  return (
    <Formik
      initialValues={{ name: "", members: [], visibility: "private" }}
      onSubmit={(values, actions) => {
        props.createGroup(values);
      }}
      render={formProps => {
        const { values, handleBlur, handleChange } = formProps

        return (
          <Form>
            <Grid container spacing={2} >
              <Grid item xs={12}>
                <TextField
                  label="Nome do Grupo"
                  fullWidth
                  color="secondary"
                  variant="outlined"
                  margin="none"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  value={values.members}
                  onChange={(e, value) => formProps.setFieldValue('members', value.map(value => ({_id: value._id, name: value.name})))}
                  multiple
                  options={props.users.allUsers}
                  getOptionLabel={option => option.name}
                  loading={props.users.loading}
                  loadingText="Carregando..."
                  noOptionsText="Nenhum usuário encontrado"
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="outlined"
                      color="secondary"
                      label="Adicionar Participantes"
                      placeholder="Insira o nome de usuário"
                      fullWidth
                      onChange={(e) => loadResults(e.target.value)}
                      margin="none"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Visibilidade</InputLabel>
                  <Select
                    color="secondary"
                    name="visibility"
                    value={values.visibility}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value={'public'}>Público</MenuItem>
                    <MenuItem value={'private'}>Privado</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <DialogActions>
              <Button variant='contained' color="secondary" type="submit">Adicionar</Button>
            </DialogActions>
          </Form>
        )
      }} />
  )
}

const mapStateToProps = state => ({ users: state.users })
const mapDispatchToProps = dispatch => bindActionCreators({ getAllUsers, createGroup }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewGroup);