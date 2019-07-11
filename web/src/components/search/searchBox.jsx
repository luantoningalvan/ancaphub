import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchAllBooks } from '../../books/bookActions'
import { fetchAllArticles } from '../../articles/articleActions'

const useStyles = makeStyles(theme => ({
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
	searchIcon: {
		width: theme.spacing(7),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 7),
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: 200,
		},
	}
}));

function SearchBox(props) {
	const classes = useStyles();

	const search = (text) => {
		console.log(text)
	}

	return(
		<div className={classes.search}>
			<div className={classes.searchIcon}>
				<SearchIcon />
			</div>
			<InputBase
				placeholder="Buscar…"
				classes={{
					root: classes.inputRoot,
					input: classes.inputInput,
				}}
				inputProps={{ 'aria-label': 'Buscar' }}
				onChange={(t) => search(t.target.value)}
			/>
		</div>
	)
}

const mapStateToProps = (state) => ({ books: state.books, articles: state.articles})
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchAllBooks, fetchAllArticles }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(SearchBox)