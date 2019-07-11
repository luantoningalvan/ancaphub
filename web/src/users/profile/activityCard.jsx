import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
	avatar: {
		backgroundColor: "#f9a825",
	},
}));

function ActivityCard(props) {
	const classes = useStyles();
	return (
		<Box mt={2}>
			<Card>
				<CardHeader
					avatar={
						<Avatar aria-label="Recipe" className={classes.avatar}>
							L
            </Avatar>
					}
					action={
						<IconButton aria-label="Settings">
							<MoreVertIcon />
						</IconButton>
					}
					title="Nome do Usuário"
					subheader="Hoje às 17:30"
				/>
				<CardContent>
					<Typography variant="body2" color="textSecondary" component="p">
						A população ela precisa da Zona Franca de Manaus, porque na Zona franca de Manaus, não é uma zona de exportação, é uma zona para o Brasil. Portanto ela tem um objetivo, ela evita o desmatamento, que é altamente lucravito. Derrubar arvores da natureza é muito lucrativo!
            </Typography>
				</CardContent>
				<CardActions disableSpacing>
					<IconButton aria-label="Add to favorites">
						<FavoriteIcon />
					</IconButton>
					<IconButton aria-label="Share">
						<ShareIcon />
					</IconButton>
				</CardActions>
			</Card>
		</Box>
	);
}

export default ActivityCard
