import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import isEmpty from 'is-empty';
import Template from '../../components/template';
import Title from '../../components/template/titleComponent'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getContributions } from '../../actions/itemActions';

const useStyles = makeStyles(theme => ({
  pending: {
    color: 'blue'
  },
  published: {
    color: 'green'
  },
  waiting: {
    color: 'yellow'
  },
  rejected: {
    color: 'red'
  },
  draft: {
    fontStyle: 'italic'
  }
}));

const ContributionsPanel = props => {
  useEffect(() => props.getContributions(), []);

  const classes = useStyles();
  const statusText = {
    pending: 'Em análise',
    published: 'Publicado',
    waiting: 'Aguardando Alterações',
    rejected: 'Rejeitado',
    draft: 'Rascunho'
  };

  return (
    <Template>
      <Title title="Painel de Contribuições" />
      <Box mb={3}>
        <Typography variant="h4" component="h2">
          Painel de contribuições
        </Typography>
      </Box>

      <Paper>
        {!isEmpty(props.contributions) && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Título</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.contributions.map(contribution => (
                <TableRow key={contribution._id}>
                  <TableCell component="th" scope="row">
                    {contribution.title}
                  </TableCell>

                  <TableCell component="th" scope="row" align="right">
                    <span className={classes[contribution.status]}>
                      {statusText[contribution.status]}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Template>
  );
};

const mapStateToProps = state => ({
  contributions: state.auth.user.contributions
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getContributions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContributionsPanel);
