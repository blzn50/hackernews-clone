// import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const TimeTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.grey[900],
  },
}))(Tooltip);

export default TimeTooltip;
