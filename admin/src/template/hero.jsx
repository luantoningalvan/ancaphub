import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
    pageHero: {
        backgroundColor: '#e4e4e4',
        height: '60px',
        display: 'flex',
        alignItems: "center"
    },
});

export default props => {
    const classes = useStyles()

    return (
        <div className={classes.pageHero}>
            <Container>
                <Grid container>
                    <Grid item sm={8}>
                        <Typography variant="h6" component="h2" noWrap>
                            {props.title}
                        </Typography>
                    </Grid>
                    <Grid item sm={4}>{props.children}</Grid>
                </Grid>
            </Container>
        </div>
    )
}
