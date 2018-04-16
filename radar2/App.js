import React from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  UIManager
} from "react-native";

import HomeScreen from "./components/HomeScreen";
import Transition from "./components/Transition";
import DetailsScreen from "./components/DetailsScreen";
import { ScrollView } from "react-native-gesture-handler";

const data = [
  {
    id: 1,
    title: "This is a title 1!",
    uri:
      "https://www.walldevil.com/wallpapers/a85/actors-faces-portraits-men-nicolas-wallpapers-smiling-wallpaper.jpg",
    text:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus tempora distinctio atque doloribus architecto a quisquam, natus nostrum nam excepturi expedita aspernatur voluptates voluptate quod veniam. Dolorum similique nulla maxime. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus tempora distinctio atque doloribus architecto a quisquam, natus nostrum nam excepturi expedita aspernatur voluptates voluptate quod veniam. Dolorum similique nulla maxime.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus tempora distinctio atque doloribus architecto a quisquam, natus nostrum nam excepturi expedita aspernatur voluptates voluptate quod veniam. Dolorum similique nulla maxime.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus tempora distinctio atque doloribus architecto a quisquam, natus nostrum nam excepturi expedita aspernatur voluptates voluptate quod veniam. Dolorum similique nulla maxime.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus tempora distinctio atque doloribus architecto a quisquam, natus nostrum nam excepturi expedita aspernatur voluptates voluptate quod veniam. Dolorum similique nulla maxime."
  },
  {
    id: 2,
    title: "This is a title 2!",
    uri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2Ja8hOA6-An-HFi_DaGbZtUoZ72UqtrSKdq8u4b0lmDST08UC",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus quod perferendis autem illo eligendi praesentium veritatis architecto modi voluptas distinctio provident est reiciendis, ea libero, expedita rerum exercitationem omnis sunt!"
  },
  {
    id: 3,
    title: "This is a title that should take more then one line!",
    uri:
      "https://i.kinja-img.com/gawker-media/image/upload/s--2wKOFE_v--/c_scale,fl_progressive,q_80,w_800/iwpzjy3ggdpapoagr8av.jpg",
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos asperiores blanditiis iste odio error, libero eum nobis reiciendis suscipit voluptatem quas totam ut, quaerat dolores provident vel adipisci! Accusantium, voluptas?"
  },
  {
    id: 4,
    title: "This is a title 1!",
    uri:
      "https://www.walldevil.com/wallpapers/a85/actors-faces-portraits-men-nicolas-wallpapers-smiling-wallpaper.jpg",
    text:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus tempora distinctio atque doloribus architecto a quisquam, natus nostrum nam excepturi expedita aspernatur voluptates voluptate quod veniam. Dolorum similique nulla maxime. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus tempora distinctio atque doloribus architecto a quisquam, natus nostrum nam excepturi expedita aspernatur voluptates voluptate quod veniam. Dolorum similique nulla maxime.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus tempora distinctio atque doloribus architecto a quisquam, natus nostrum nam excepturi expedita aspernatur voluptates voluptate quod veniam. Dolorum similique nulla maxime.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus tempora distinctio atque doloribus architecto a quisquam, natus nostrum nam excepturi expedita aspernatur voluptates voluptate quod veniam. Dolorum similique nulla maxime.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus tempora distinctio atque doloribus architecto a quisquam, natus nostrum nam excepturi expedita aspernatur voluptates voluptate quod veniam. Dolorum similique nulla maxime."
  },
  {
    id: 5,
    title: "This is a title 2!",
    uri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2Ja8hOA6-An-HFi_DaGbZtUoZ72UqtrSKdq8u4b0lmDST08UC",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus quod perferendis autem illo eligendi praesentium veritatis architecto modi voluptas distinctio provident est reiciendis, ea libero, expedita rerum exercitationem omnis sunt!"
  },
  {
    id: 6,
    title: "This is a title that should take more then one line!",
    uri:
      "https://i.kinja-img.com/gawker-media/image/upload/s--2wKOFE_v--/c_scale,fl_progressive,q_80,w_800/iwpzjy3ggdpapoagr8av.jpg",
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos asperiores blanditiis iste odio error, libero eum nobis reiciendis suscipit voluptatem quas totam ut, quaerat dolores provident vel adipisci! Accusantium, voluptas?"
  }
];

const { width, height } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    selected: null,
    dest: {},
    source: {},
    scrollView: {}
  };

  // componentWillMount() {
  //   UIManager.setLayoutAnimationEnabledExperimental &&
  //     UIManager.setLayoutAnimationEnabledExperimental(true);
  // }

  opacity = new Animated.Value(0);

  translateXY = data.reduce(
    (acc, item) => ({ ...acc, [item.id]: new Animated.ValueXY(0, 0) }),
    {}
  );
  titleTranslate = new Animated.Value(-height);
  contentTranslate = new Animated.Value(height);
  thumbTitleTranslate = new Animated.Value(0);
  translateMorph = new Animated.Value(0);

  handleSelected = selected => this.setState({ selected: selected - 1 });
  handleClose = () => {
    const thumbTitle = Animated.timing(this.thumbTitleTranslate, {
      toValue: 0,
      useNativeDriver: true
    });

    const animations = data.map((item, index) =>
      Animated.timing(this.translateXY[item.id], {
        toValue: { x: 0, y: 0 },
        useNativeDriver: true
      })
    );

    const titleAnimation = Animated.timing(this.titleTranslate, {
      toValue: -height,
      useNativeDriver: true
    });

    const contentAnimation = Animated.timing(this.contentTranslate, {
      toValue: height,
      useNativeDriver: true
    });

    const opacityAnimation = Animated.timing(this.opacity, {
      toValue: 0,
      // duration: 4000,
      useNativeDriver: true
    });

    const translateMorph = Animated.timing(this.translateMorph, {
      toValue: 0,
      // duration: 4000,
      useNativeDriver: true
    });

    Animated.sequence([
      Animated.parallel([titleAnimation, contentAnimation]),
      opacityAnimation
    ]).start(() => {
      this.setState(
        { selected: null },
        Animated.sequence([
          Animated.parallel(animations),
          Animated.parallel([translateMorph, thumbTitle])
        ]).start
      );
    });
  };

  destLayout = ({ nativeEvent }) => this.setState({ dest: nativeEvent.layout });
  sourceLayout = ({ id, nativeEvent }) => {
    const item = { [id - 1]: nativeEvent.layout };
    this.setState({ source: { ...this.state.source, ...item } });
  };

  scrollView = ({ scrollView }) => this.setState({ scrollView });

  render() {
    return (
      <View style={styles.container}>
        <HomeScreen
          opacity={this.opacity}
          onPress={this.handleSelected}
          onLayout={this.sourceLayout}
          data={data}
          scrollView={this.scrollView}
          translateXY={this.translateXY}
          thumbTitleTranslate={this.thumbTitleTranslate}
          translateMorph={this.translateMorph}
        />
        <Transition
          opacity={this.opacity}
          data={data}
          position={{
            dest: this.state.dest,
            source: this.state.source[this.state.selected]
          }}
          selected={this.state.selected}
          titleTranslate={this.titleTranslate}
          contentTranslate={this.contentTranslate}
          scrollView={this.state.scrollView}
        />
        <DetailsScreen
          onPress={this.handleClose}
          opacity={this.opacity}
          onLayout={this.destLayout}
          selected={data[this.state.selected]}
          titleTranslate={this.titleTranslate}
          contentTranslate={this.contentTranslate}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  safe: {
    flex: 1,
    backgroundColor: "#ddd"
  }
});
