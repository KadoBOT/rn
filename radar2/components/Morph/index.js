import React, { Component } from "react";
import {
  Animated,
  Button,
  Dimensions,
  FlatList,
  Platform,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  View,
  StyleSheet,
  Text
} from "react-native";

const { width } = Dimensions.get("window");

export default class Morph extends Component {
  state = {
    source: {},
    dest: {},
    initialVal: 1
  };

  opacity = new Animated.Value(1);

  handleLayout = ({ nativeEvent, name }) => {
    this.setState({ [name]: nativeEvent.layout });
  };

  morph = () => {
    const val = this.state.initialVal === 1 ? 0 : 1;
    Animated.timing(this.opacity, {
      toValue: val,
      useNativeDriver: true
      // duration: 4000
    }).start();
    this.setState({ initialVal: val });
  };

  render() {
    return (
      <Animated.View
        style={{
          marginTop: Platform.OS === "ios" ? 40 : 0,
          transform: [
            {
              translateX: this.props.translate
            }
          ]
        }}
      >
        <Animated.View
          style={{
            borderRadius: 20,
            transform: [
              {
                scaleX: this.opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 125 / width]
                })
              },
              {
                scaleY: this.opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 125 / 200]
                })
              }
            ],
            width,
            height: 200,
            // borderColor: "red",
            // borderWidth: 1,
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden"
          }}
        >
          <Animated.Image
            resizeMode="stretch"
            onLayout={({ nativeEvent }) =>
              this.handleLayout({ nativeEvent, name: "dest" })
            }
            source={{
              uri:
                "https://nerdist.com/wp-content/uploads/2015/12/Nicolas-Cage-Con-Air.jpg"
            }}
            style={{
              opacity: this.opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0]
              }),
              width,
              height: 200,
              position: "absolute"
            }}
          />
          <Animated.Image
            resizeMode="stretch"
            onLayout={({ nativeEvent }) =>
              this.handleLayout({ nativeEvent, name: "source" })
            }
            source={{
              uri: "http://s3.crackedcdn.com/blogimages/2009/03/cage5.jpg"
            }}
            style={{
              opacity: this.opacity,
              width,
              height: 200,
              transform: [
                {
                  scaleY: this.opacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [200 / 125, 1]
                  })
                }
              ],
              position: "absolute"
            }}
          />
        </Animated.View>
        <View>
          <Button title="Morph" style={{ height: 50 }} onPress={this.morph} />
        </View>
      </Animated.View>
    );
  }
}
