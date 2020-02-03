import React from 'react';
import {
  Grid,
  Container,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  pageHero: {
    backgroundColor: '#e4e4e4',
    height: '60px',
    display: 'flex',
    alignItems: 'center'
  }
});

export default props => {
  const classes = useStyles();

  return (
    <div className={classes.pageHero}>
      <Container>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center">
          <Grid>
            <Typography variant="h6" component="h2" noWrap>
              {props.title}
            </Typography>
          </Grid>
          <Grid>{props.children}</Grid>
        </Grid>
      </Container>
    </div>
  );
};
