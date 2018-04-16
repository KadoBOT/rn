import React, { Component } from "react";
import {
  Animated,
  Button,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  View,
  StyleSheet,
  ScrollView,
  Text
} from "react-native";
import { getMeasures } from "../../utils/setStyle";
import {
  margin,
  imageHeight,
  thumbHeightAndWidth
} from "../../utils/constants";
import Morph from "../Morph";

const { width, height } = Dimensions.get("window");

export default class HomeScreen extends Component {
  nodes = {};

  handleAnimations = id => {
    const translateTitle = Animated.timing(this.props.thumbTitleTranslate, {
      toValue: width,
      useNativeDriver: true
    });

    const animationX = () => {
      const toValue = { x: width / 2 - 37.5, y: 0 };
      let options = {
        toValue,
        useNativeDriver: true
      };

      return Animated.timing(this.props.translateXY[id], options);
    };

    const animateMorph = Animated.timing(this.props.translateMorph, {
      useNativeDriver: true,
      toValue: width
    });

    const animationY = itemId => {
      const toValue = itemId < id ? { y: -height, x: 0 } : { y: height, x: 0 };
      let options = {
        toValue,
        useNativeDriver: true
      };

      return Animated.timing(this.props.translateXY[itemId], options);
    };

    const animations = this.props.data.reduce(
      (acc, item, index) =>
        item.id !== id ? [...acc, animationY(item.id)] : acc,
      []
    );

    const parallel = Animated.parallel(animations);

    Animated.sequence([
      Animated.parallel([animateMorph, translateTitle]),
      parallel,
      animationX()
    ]).start(() => {
      this.props.onPress(id);
    });
  };

  animatedImageStyle = id => {
    const translateY = this.props.translateXY[id].y;
    const translateX = this.props.translateXY[id].x;

    const transform = [{ translateY }, { translateX }];

    return {
      position: "relative",
      flexDirection: "row",
      alignItems: "center",
      transform
    };
  };

  animateViewStyle = () => {
    const ioRange = { inputRange: [0, 0.05, 0.995], outputRange: [1, 0, 0] };
    const opacity = this.props.opacity.interpolate(ioRange);

    return { opacity };
  };

  animatedTitleStyle = () => {
    const transform = {
      transform: [{ translateX: this.props.thumbTitleTranslate }]
    };

    return transform;
  };

  renderItems = item => {
    const handlePress = () => {
      const options = {
        id: item.id,
        nodes: this.nodes,
        callback: this.props.onLayout
      };
      this.handleAnimations(item.id);
      return getMeasures(options);
    };

    Image.prefetch(item.uri);

    return (
      <View key={item.id}>
        <Animated.View style={[this.animatedImageStyle(item.id)]}>
          <Image
            ref={node => (this.nodes[item.id] = node)}
            source={{ uri: item.uri }}
            style={[styles.image]}
          />
          <Animated.Text style={[styles.title, this.animatedTitleStyle()]}>
            {item.title}
          </Animated.Text>
        </Animated.View>
        <TouchableWithoutFeedback onPress={handlePress}>
          <Animated.View
            style={[
              styles.image,
              { opacity: 0, marginTop: -thumbHeightAndWidth }
            ]}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  };

  render() {
    return (
      <ScrollView
        onLayout={({ nativeEvent }) =>
          this.props.scrollView({ scrollView: nativeEvent.layout })
        }
      >
        <Animated.View style={[styles.view, this.animateViewStyle()]}>
          <Morph translate={this.props.translateMorph} />
          <Animated.View
            pointEvents="none"
            style={{
              transform: [
                {
                  translateX: this.props.translateMorph.interpolate({
                    inputRange: [0, width],
                    outputRange: [0, -width]
                  })
                }
              ]
            }}
          >
            <Text>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa
              porro nulla blanditiis aliquid at, magni dignissimos odio
              reiciendis ratione quibusdam quod animi repellat nostrum eius enim
              harum sit. Nam, nemo. Lorem ipsum dolor, sit amet consectetur
              adipisicing elit. Culpa porro nulla blanditiis aliquid at, magni
              dignissimos odio reiciendis ratione quibusdam quod animi repellat
              nostrum eius enim harum sit.
            </Text>
          </Animated.View>
          {/*<FlatList
            data={this.props.data}
            keyExtractor={item => item.id}
            renderItem={this.renderItems}
          />*/}
          {this.props.data.map(item => this.renderItems(item))}
        </Animated.View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignSelf: "flex-start",
    justifyContent: "flex-end"
  },
  image: {
    height: thumbHeightAndWidth,
    width: thumbHeightAndWidth,
    borderRadius: 8
  },
  title: {
    padding: 5,
    width: "80%"
  }
});
