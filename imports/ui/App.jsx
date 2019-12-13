import React from 'react';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import BalanceSheet from '/imports/ui/pages/BalanceSheet';

const theme = createMuiTheme();

const getDevice = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth < 900
  };
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = getDevice();
  }

  onResize = () => { this.setState(getDevice); }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  render () {
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
