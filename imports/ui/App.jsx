import React from 'react';
import { _ } from 'meteor/underscore';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import BalanceSheet from '/imports/ui/pages/BalanceSheet';

const theme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        padding: '16px 12px',
      },
    },
  },
});

const getDevice = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth < 900,
  };
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = getDevice();
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
          device={{ ...this.state }}
        />
      </MuiThemeProvider>
    );
  }
}

export default App;
