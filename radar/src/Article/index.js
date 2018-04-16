import React, { Component, Fragment } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native";

import headerDetails from "../../assets/HeaderDetails.png";
import text from "../../assets/text.png";

const SCREEN_HEIGHT = Dimensions.get("window").height;

class Article extends Component {
  componentWillMount() {
    // "Preload" static image
    this.renderImage = (
      <Image source={require("../../assets/FeaturedPost.png")} />
    );

    this.text = new Animated.ValueXY(0, 0);
    this.image = new Animated.ValueXY(0, 0);
    this.headerDetails = new Animated.ValueXY(0, 0);

    Animated.spring(this.text, {
      toValue: { x: 0, y: -SCREEN_HEIGHT }
    }).start();
    Animated.spring(this.image, {
      toValue: { x: 0, y: 50 }
    }).start();
    Animated.spring(this.headerDetails, {
      toValue: { x: 0, y: 250 }
    }).start();
  }

  render() {
    const { params } = this.props.navigation.state;

    return (
      <Fragment>
        <Animated.View
          style={[this.headerDetails.getLayout(), styles.default, styles.top]}
        >
          <Image source={headerDetails} />
        </Animated.View>
        <TouchableWithoutFeedback>{this.renderImage}</TouchableWithoutFeedback>
        <Animated.View
          style={[this.text.getLayout(), styles.default, styles.bottom]}
        >
          <Image source={text} />
        </Animated.View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  default: {
    marginLeft: 30,
    marginBottom: 30
  },
  top: {
    transform: [{ translateY: -250 }]
  },
  bottom: {
    transform: [{ translateY: SCREEN_HEIGHT }]
  }
});

export default Article;
