import React from 'react';
import { Text, View, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import randomcolor from 'randomcolor';

const Wrap = styled.View`
  flex: 1;
  background-color: ${props => props.color};
`;

const Body = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Clock = styled.Text`
  color: ${props => props.color};
  font-size: 40;
  font-weight: bold;
  font-family: KohinoorBangla-Light;
`;

const getBarStyle = luminosity =>
  luminosity === 'light' ? 'dark-content' : 'light-content';

const getClockColor = luminosity =>
  luminosity === 'light' ? 'black' : 'white';

const pad = x => String(x).padStart(2, '0');

export default class App extends React.Component {

  state = {
    time: '...',
    color: '#FBFBFB',
    luminosity: 'light',
  }

  componentWillMount() {
    setInterval(() => {
      const now = new Date();
      const hours = pad(now.getHours());
      const minutes = pad(now.getMinutes());
      const seconds = pad(now.getSeconds());
      const luminosity = Math.random() <= 0.5 ? 'light' : 'dark';
      const color = randomcolor({
        luminosity,
      });

      this.setState({
        time: `${hours}:${minutes}:${seconds}`,
        color,
        luminosity,
      });
    }, 1000);
  }

  render() {
    return (
      <Wrap
        color={this.state.color}
      >
        <StatusBar barStyle={getBarStyle(this.state.luminosity)} />
        <Body>
          <Clock color={getClockColor(this.state.luminosity)}>{this.state.time}</Clock>
        </Body>
      </Wrap>
    );
  }
}
