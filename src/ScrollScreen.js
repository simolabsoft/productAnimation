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
import ProductItem from "./productItem";
const screensInfo = [
  {
    company: "Rolex",
    title: "Luxury Watch S2020",
    price: "15000",
    itemImage: require("./../assets/watch.png"),
    backgImage: require("./../assets/apple.png"),
    description:
      "Aliquip ut consectetur ea amet minim veniam nulla id sunt. Enim magna sint proident deserunt dolore consectetur adipisicing ipsum laborum elit. Ex aliqua deserunt minim nostrud labore nisi ex ea proident consequat. Sint et ea occaecat duis occaecat sunt excepteur reprehenderit cupidatat eu minim aliqua esse. Pariatur tempor enim mollit quis deserunt incididunt eiusmod esse esse tempor Lorem dolor. Ipsum qui reprehenderit do sint ex occaecat non dolore commodo. Eu incididunt adipisicing proident dolor eu quis quis deserunt cillum velit ullamco consectetur."
  },
  {
    company: "Nike",
    title: "New Sport XS",
    price: "1000",
    itemImage: require("./../assets/sport.png"),
    backgImage: require("./../assets/nike.png"),
    description:
      "Quis ex labore veniam officia eu nostrud nisi aute magna consectetur deserunt minim. Cillum ex fugiat voluptate officia Lorem ad proident minim proident. Consequat id sunt exercitation officia culpa cillum aute ipsum deserunt anim in. Minim nostrud mollit exercitation officia laboris duis nisi sit nostrud irure. Pariatur tempor consectetur culpa magna amet irure anim et non cillum Lorem irure pariatur Lorem. Ipsum in eiusmod cupidatat occaecat labore reprehenderit mollit do ut ad proident culpa adipisicing. Eiusmod commodo qui cillum sunt tempor sit sit tempor est dolor."
  },
  {
    company: "Apple",
    title: "Iphone X11 2020",
    price: "12000",
    itemImage: require("./../assets/iphonepng.png"),
    backgImage: require("./../assets/apple.png"),
    description:
      "Ipsum non elit sit aute tempor fugiat aute et commodo reprehenderit adipisicing. Quis pariatur adipisicing qui laboris ad. Cupidatat esse esse deserunt laborum fugiat. Aute duis commodo id laborum veniam nostrud dolore adipisicing deserunt consequat do dolore ea commodo."
  }
];

export default class ScrollScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animationScroll: new Animated.Value(0)
    };
  }
  getInterPolateOpacity = (animationScroll, i) => {
    const inputRange = [
      (i - 1) * width + width * 0.1,
      i * width,
      (i + 1) * width - width * 0.1
    ];
    const outputRange = [0, 1, 0];
    return animationScroll.interpolate({
      inputRange,
      outputRange,
      extrapolate: "clamp"
    });
  };
  getInterPolateRotaion = (animationScroll, i) => {
    const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
    const outputRange = ["0deg", "720deg", "0deg"];
    return animationScroll.interpolate({
      inputRange,
      outputRange,
      extrapolate: "clamp"
    });
  };
  getInterPolateTextTranslate = (animationScroll, i) => {
    const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
    const outputRange = [width, 0, -width];
    return animationScroll.interpolate({
      inputRange,
      outputRange,
      extrapolate: "clamp"
    });
  };
  render() {
    // const sunRotationAnimation = this.state.animationScroll.interpolate({
    //   inputRange: [0, 3 * width],
    //   outputRange: ["0deg", "30deg"]
    // });
    const backgroundAnimation = this.state.animationScroll.interpolate({
      inputRange: [0, width, 2 * width],
      outputRange: ["#71B280", "#AA076B", "#753a88"]
    });
    const backgroundStyle = {
      backgroundColor: backgroundAnimation
    };
    // const sunRotationStyle = {
    //   transform: [
    //     {
    //       rotate: sunRotationAnimation
    //     }
    //   ]
    // };
    return (
      <Animated.View style={[styles.container, backgroundStyle]}>
        <TouchableOpacity
          style={{
            position: "absolute",
            top: Constants.statusBarHeight + 10,
            left: 10
          }}
        >
          <AntDesign name="back" size={30} color="white"></AntDesign>
        </TouchableOpacity>
        <View style={styles.fixedButton}>
          <TouchableOpacity style={styles.loveButton}>
            <AntDesign name="heart" size={30} color="white"></AntDesign>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareBtn}>
            <Text style={{ color: "white", fontSize: 16 }}>
              Add to favorites
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEventThrottle={16}
          horizontal
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: this.state.animationScroll
                }
              }
            }
          ])}
        >
          {screensInfo.map((item, index) => {
            return (
              <ProductItem
                itemImage={item.itemImage}
                title={item.title}
                price={item.price}
                company={item.company}
                backgImage={item.backgImage}
                description={item.description}
                opacityAnimation={this.getInterPolateOpacity(
                  this.state.animationScroll,
                  index
                )}
                rotationAnimation={this.getInterPolateRotaion(
                  this.state.animationScroll,
                  index
                )}
                textTranslate={this.getInterPolateTextTranslate(
                  this.state.animationScroll,
                  index
                )}
              ></ProductItem>
            );
          })}
        </ScrollView>
        {/* <View style={styles.dotContainer}>
          {screensInfo.map((item, index) => {
            return (
              <Animated.View
                style={[
                  styles.dot,
                  {
                    backgroundColor: this.getInterPolate(
                      this.state.animationScroll,
                      index,
                      screensInfo.length
                    )
                  }
                ]}
                key={index}
              ></Animated.View>
            );
          })}
        </View> */}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center"
  },

  // added
  fixedButton: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: width * 0.8,
    top: height * 0.6
  },
  loveButton: {
    backgroundColor: "#86C34A",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24
  },
  shareBtn: {
    backgroundColor: "#605EFB",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 15,
    marginLeft: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6
  }
});
