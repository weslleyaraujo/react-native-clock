import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native';
import styled from 'styled-components/native';
import { invert, complement, saturate } from 'polished';

const Title = styled.Text`
  font-weight: bold;
  color: ${props => props.color};
`;

const Wrap = styled.View`
  flex: 1;
  background-color: ${props => props.color};
`;

const Header = styled.View`
  background-color: ${props => props.color};
  height: 60;
  padding: 30 5 0 5;
  align-items: center;
`;

const Body = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Clock = styled.Text`
  color: white;
  font-size: 40;
  font-weight: bold;
`;

export default class App extends React.Component {

  state = {
    time: '...',
    color: '#FBFBFB',
    secondary: 'white',
    thirdy: '#FBFBFB',
  }

  componentWillMount() {
    setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const color = `hsl(${(hours * 60) * 0.25}, ${minutes + 20}%, ${seconds + 15}%)`;
      const secondary = complement(color);
      const thirdy = invert(secondary);

      this.setState({
        time: `${hours}:${minutes}:${seconds}`,
        color,
        secondary,
        thirdy,
      });
    }, 1000);
  }

  render() {
    return (
      <Wrap
        color={this.state.color}
      >
        <StatusBar
          backgroundColor={this.state.secondary}
        />
        <Header
          color={this.state.secondary}
        >
          <Title
            color={this.state.thirdy}
          >
            HELLO CLOCK
          </Title>
        </Header>
        <Body>
          <Clock>{this.state.time}</Clock>
          <Image
            style={{
              width: 100,
              height: 100,
            }}
            source={require('./dick.svg')}
          />
        </Body>
      </Wrap>
    );
  }
}
