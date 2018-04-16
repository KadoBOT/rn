import React from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { StackNavigator } from "react-navigation";

import Article from "./src/Article";
import header from "./assets/Header.png";
import featured from "./assets/FeaturedPost.png";
import horizontal from "./assets/HorizontalItems.png";
import tabbar from "./assets/tabbar.png";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class Home extends React.Component {
  static navigationOptions = {
    title: "Welcome"
  };

  componentWillMount() {
    this.header = new Animated.ValueXY(0, 0);
    this.content = new Animated.ValueXY(0, 0);
  }

  handlePress = () => {
    const { navigate } = this.props.navigation;

    Animated.spring(this.header, {
      toValue: { x: 0, y: -SCREEN_HEIGHT }
    }).start();
    Animated.spring(this.content, {
      toValue: { x: 0, y: SCREEN_HEIGHT }
    }).start();
    navigate("Article");
  };

  render() {
    return (
      <React.Fragment>
        <View style={styles.container}>
          <Animated.View style={this.header.getLayout()}>
            <Image style={styles.header} source={header} />
          </Animated.View>
          <TouchableWithoutFeedback onPress={this.handlePress}>
            <Image source={featured} />
          </TouchableWithoutFeedback>
          <Animated.View style={this.content.getLayout()}>
            <Image style={styles.horizontal} source={horizontal} />
          </Animated.View>
        </View>
      </React.Fragment>
    );
  }
}

const transitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    easing: Easing.inOut(Easing.ease),
    timing: Animated.timing,
    useNativeDriver: true
  },
  screenInterpolator: sceneProps => {
    const { position, scene } = sceneProps;

    const index = scene.index;

    const opacity = position.interpolate({
      inputRange: [index - 1, index - 0.99, index, index + 0.99, index + 1],
      outputRange: [0, 1, 1, 1, 1]
    });

    return { opacity };
  }
});

export default StackNavigator(
  {
    Home: { screen: Home },
    Article: { screen: Article }
  },
  {
    initialRouteName: "Home",
    cardStyle: {
      opacity: 1
    },
    transitionConfig
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    marginLeft: 30,
    marginBottom: 30
  },
  horizontal: {
    marginLeft: 30
  },
  tabbar: {
    marginTop: 40
  }
});
