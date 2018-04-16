import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Easing,
  View,
  ScrollView,
  StyleSheet
} from "react-native";
import { getStyle } from "../../utils/setStyle";
import {
  margin,
  imageHeight,
  thumbHeightAndWidth
} from "../../utils/constants";

const { height, width } = Dimensions.get("window");

export default class Transition extends Component {
  componentWillReceiveProps(nextProps) {
    const { dest, source } = nextProps.position;
    // if (dest && source) this.handleAnimation();
  }

  handleAnimation = () => {
    const defaultAnimation = (animated, toValue) =>
      Animated.timing(animated, {
        toValue,
        // duration: 3000,
        useNativeDriver: true
      });

    const opacityAnimation = defaultAnimation(this.props.opacity, 1);
    const titleAnimation = defaultAnimation(this.props.titleTranslate, 0);
    const contentAnimation = defaultAnimation(this.props.contentTranslate, 0);

    Animated.sequence([
      opacityAnimation,
      Animated.parallel([titleAnimation, contentAnimation])
    ]).start();
  };
  // handleDestStyle = () => getStyle({ measure: this.props.position.dest });
  handleSourceStyle = () => getStyle({ measure: this.props.position.source });
  getViewTransform = ({ dest, source }) => {
    const t = this.opacityInterpolate;

    console.log({ dest, source });

    const defaultInput = [0, 1];
    const oTY = [source.py, dest.py + 60];
    const oTX = [width / 2 - 37.5, (dest.width - source.width) / 2 - source.px];
    const oSY = [1, dest.height / source.height];
    const oSX = [1, dest.width / source.width];

    const translateY = t(defaultInput, oTY);
    const translateX = t(defaultInput, oTX);
    const scaleY = t(defaultInput, oSY);
    const scaleX = t(defaultInput, oSX);
    const transform = [{ translateY }, { translateX }, { scaleY }, { scaleX }];

    return { transform };
  };
  getImageTransform = ({ dest }) => {
    const t = this.opacityInterpolate;
    const iSX = [0, dest.height / dest.width, 1];
    const oSX = [1.77, 1.15, 1.05];
    const scaleX = { scaleX: t(iSX, oSX) };
    const transform = [scaleX];

    return { transform };
  };
  getAnimatedViewStyle = ({ dest, source }) => [
    styles.animatedView,
    this.getViewTransform({ dest, source })
  ];
  getAnimatedImageStyle = ({ dest }) => [
    styles.image,
    this.getImageTransform({ dest })
  ];
  opacityInterpolate = (inputRange, outputRange) =>
    this.props.opacity.interpolate({
      inputRange,
      outputRange
    });

  render() {
    const { dest, source } = this.props.position;
    const data = this.props.data[this.props.selected];
    return data && dest.height && source.height ? (
      <Animated.View
        collapsable={true}
        removeClippedSubviews={true}
        onLayout={this.handleAnimation}
        style={[
          StyleSheet.absoluteFill,
          this.handleSourceStyle(),
          this.getAnimatedViewStyle({ dest, source })
        ]}
      >
        <Animated.Image
          prefetch={data.uri}
          resizeMethod="scale"
          resizeMode="stretch"
          source={{ uri: data.uri, cache: "force-cache" }}
          style={this.getAnimatedImageStyle({ dest })}
        />
      </Animated.View>
    ) : (
      <Animated.View />
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1
  },
  animatedView: {
    overflow: "hidden",
    borderRadius: 4
    // borderColor: "red",
    // borderWidth: 1,
    // borderStyle: "solid",
  },
  image: {
    alignSelf: "center",
    flex: 1,
    minWidth: thumbHeightAndWidth,
    borderRadius: 4
  }
});
