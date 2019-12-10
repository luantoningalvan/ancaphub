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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllUsers } from '../../actions/userActions'

const NewGroup = props => {
  const [visibility, setVisibility] = React.useState('private');

  const loadResults = (filter) => {
    props.getAllUsers(filter)
  }

  const handleChange = event => {
    setVisibility(event.target.value);
  };

  return (
    <form>
      <Grid container spacing={2} >
        <Grid item xs="12">
          <TextField
            label="Nome do Grupo"
            fullWidth
            color="secondary"
            variant="outlined"
            margin="none"
          />
        </Grid>
        <Grid item xs="12">
          <Autocomplete
            multiple
            id="tags-standard"
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
        <Grid item xs="12">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Visibilidade</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={visibility}
              color="secondary"
              onChange={handleChange}
            >
              <MenuItem value={'public'}>Público</MenuItem>
              <MenuItem value={'private'}>Privado</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <DialogActions>
        <Button variant='contained' color="secondary">Adicionar</Button>
      </DialogActions>
    </form>
  )
}

const mapStateToProps = state => ({ users: state.users })
const mapDispatchToProps = dispatch => bindActionCreators({ getAllUsers }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewGroup);