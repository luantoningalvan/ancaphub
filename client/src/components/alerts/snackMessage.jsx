import React from 'react';
import {
  Snackbar,
  IconButton,
  SnackbarContent
} from '@material-ui/core';
import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Close as CloseIcon,
  Warning as WarningIcon,
} from '@material-ui/icons';
import { amber, green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { clearAlerts } from '../../actions/alertActions';
import isEmpty from 'is-empty'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}

function SnackMessage(props) {
  return (
    <>
      {!isEmpty(props.alerts) && (
        <>
        {props.alerts.map(alert => (
        <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        open={true}
        onClose={() => props.clearAlerts()}
        autoHideDuration={6000}
        ClickAwayListenerProps={{ onClickAway: () => null }}>
        <MySnackbarContentWrapper
          variant={alert.status}
          message={alert.msg}
          onClose={() => props.clearAlerts()}
        />
      </Snackbar>
        ))}
        </>
      )}
    </>
  );
}

const mapStateToProps = state => ({ alerts: state.alerts.snackAlerts });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ clearAlerts }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SnackMessage);
