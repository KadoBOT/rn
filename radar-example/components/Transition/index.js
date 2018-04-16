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
        // delay: 400,
        // duration: 10000,
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

    const defaultInput = [0, 1];
    const oTY = [-20, dest.py - source.py + 40];
    const oTX = [
      -dest.px + width / 2 - 75,
      (dest.width - source.width) / 2 - source.px
    ];
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
    console.log({ data, dest, source });
    return data && dest.height && source.height ? (
      <View pointerEvents="none" style={[styles.view, StyleSheet.absoluteFill]}>
        <Animated.View
          style={[
            this.handleSourceStyle(),
            this.getAnimatedViewStyle({ dest, source })
          ]}
        >
          <Animated.Image
            onLayout={this.handleAnimation}
            prefetch={data.uri}
            resizeMethod="scale"
            resizeMode="stretch"
            source={{ uri: data.uri, cache: "force-cache" }}
            style={this.getAnimatedImageStyle({ dest })}
          />
        </Animated.View>
      </View>
    ) : (
      <View />
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1
  },
  animatedView: {
    position: "absolute",
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
