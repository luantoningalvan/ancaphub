import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import DownloadIcon from '@material-ui/icons/CloudDownload'
import { Link } from 'react-router-dom'
import striptags from 'striptags'

const useStyles = makeStyles(theme => ({
    media: {
        height: 200,
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
}));

export default function ArticleCard(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

    function handleClick(event) {
      setAnchorEl(event.currentTarget);
    }

    function handleClose() {
      setAnchorEl(null);
    }

    const { _id, title, author, cover, content } = props.article
    return (
        <Grid item xs={3}>
            <Card>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={cover}
                        title={`Capa do artigo ${title}`}
                    />
                    <CardContent>
                        <Typography variant="h5" component="h2" noWrap>
                            {title}
                        </Typography>
                        <Typography className={classes.pos} variant="subtitle1" gutterBottom>
                            {author}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {(content.length > 200) ? `${striptags(content.substring(0, 200))}..` : striptags(content)}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary" component={AdapterLink} to={`/artigos/${_id}`}>
                    Ver Artigo
                  </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}
