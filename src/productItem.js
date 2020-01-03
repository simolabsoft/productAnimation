import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  TouchableOpacity,
  Image
} from "react-native";
import Constants from "expo-constants";
import { AntDesign } from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");

export default class ProductItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const opacityStyle = this.props.opacityAnimation;

    const rotationStyle = {
      transform: [
        {
          rotate: this.props.rotationAnimation
        }
      ]
    };
    const textAnimation = {
      transform: [
        {
          translateX: this.props.textTranslate
        }
      ]
    };

    return (
      <View
        style={{
          flex: 1,

          width: width,
          height: height,

          alignItems: "center",
          position: "relative"
        }}
      >
        <Animated.View style={[styles.topContainer, textAnimation]}>
          <Text style={{ color: "white", fontSize: 20, marginBottom: 5 }}>
            {this.props.company}
          </Text>
          <Text style={{ color: "white", fontSize: 20, marginBottom: 5 }}>
            {this.props.title}
          </Text>
          <Text style={{ color: "white", fontSize: 30 }}>
            {this.props.price}
            <Text style={{ color: "white", fontSize: 10 }}> Dh</Text>
          </Text>
        </Animated.View>
        <Image
          source={this.props.backgImage}
          resizeMode={"cover"}
          style={[styles.backgImage, { tintColor: "white" }]}
        ></Image>
        <Animated.Image
          source={this.props.itemImage}
          resizeMode={"cover"}
          style={[styles.itemImage, rotationStyle, { opacity: opacityStyle }]}
        ></Animated.Image>

        <Animated.Text
          style={[
            {
              color: "white",
              textAlign: "center",
              marginHorizontal: 5,
              fontSize: 14
            },
            textAnimation
          ]}
        >
          {this.props.description}
        </Animated.Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    alignItems: "center"
  },
  itemImage: {
    width: 200,
    height: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
    position: "absolute",
    top: height / 2 - 150
  },
  topContainer: {
    marginTop: Constants.statusBarHeight + 20,
    justifyContent: "center",
    alignItems: "center"
  },
  backgImage: {
    width: 300,
    height: 300,
    opacity: 0.4
  }
});
