import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddToLibraryIcon from '@material-ui/icons/LibraryAdd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateLibrary } from '../users/userActions'

function addToLibraryButton(props) {
	if(props.added){
		return (
			<IconButton size="small" color="secondary" onClick={() => props.updateLibrary(props.item, props.type, 'remove')}>
				<AddToLibraryIcon />
			</IconButton>
		)
	} else {
		return (
			<IconButton size="small" color="primary" onClick={() => props.updateLibrary(props.item, props.type, 'add')}>
				<AddToLibraryIcon />
			</IconButton>
		)
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ updateLibrary }, dispatch)
export default connect(null, mapDispatchToProps)(addToLibraryButton)
