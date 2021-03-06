import React from 'react';
import { _ } from 'meteor/underscore';

import { grey } from '@material-ui/core/colors';
import { MuiThemeProvider, createMuiTheme, fade, lighten } from '@material-ui/core/styles';

import BalanceSheet from '/imports/ui/pages/BalanceSheet';

let borderColor = lighten(fade('rgba(0, 0, 0, 0.12)', 1), 0.88);

const theme = createMuiTheme({
  palette: {
    border: borderColor,
  },
  overrides: {
    MuiButton: {
      contained: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
          '@media (hover: none)': {
            boxShadow: 'none',
          },
        },
        '&$focusVisible': {
          boxShadow: 'none',
        },
        '&:active': {
          boxShadow: 'none',
        },
        '&$disabled': {
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
      elevation1: {
        boxShadow: `0px 0px 0px 1px ${borderColor}`,
      },
    },
    MuiTableCell: {
      root: {
        padding: '16px 12px',
      },
      stickyHeader: {
        backgroundColor: grey[100],
      },
    },
  },
});

const getDevice = () => {
  return {
    size: (window.innerWidth < 900) ? 'mobile' : 'desktop',
  };
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = getDevice();

    // Make the app respond to changing screen sizes,
    // but only have it run when a user is likely finished adjusting their window size.
    this.onResize = _.debounce(this.onResize.bind(this), 250);
  }

  onResize() {
    this.setState(getDevice);
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BalanceSheet
          size={this.state.size}
        />
      </MuiThemeProvider>
    );
  }
}

export default App;
