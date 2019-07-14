import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddToLibraryIcon from '@material-ui/icons/LibraryAdd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateLibrary } from '../auth/authActions'
import isEmpty from 'is-empty'

function addToLibraryButton(props) {
	var isAdded = false

	if(props.type == "book"){
		isAdded = !isEmpty(props.library) && props.library[0].books.includes(props.item)
	} else if(props.type == "article") {
		isAdded = !isEmpty(props.library) && props.library[0].articles.includes(props.item)
	}

	console.log(props.library)

	return (
		<IconButton size="small" color={isAdded ? "secondary" : "primary"} onClick={() => props.updateLibrary(props.item, props.type)}>
			<AddToLibraryIcon />
		</IconButton>
	)

}
const mapStateToProps = (state) => ({
	library: state.auth.user.library
})

const mapDispatchToProps = (dispatch) => bindActionCreators({ updateLibrary }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(addToLibraryButton)
