import React, { Component } from "react";

import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform
} from "react-native";

//--------------------------------------------------------------Grocery List Items -----------------------------
const words = [
  { name: "Milk", id: 1 },
  { name: "Curd", id: 2 },
  { name: "Potato", id: 3 },
  { name: "Bread", id: 4 },
  { name: "Flour", id: 5 },
  { name: "Butter", id: 6 },
  { name: "Onion", id: 7 },
  { name: "Tomato", id: 8 },
  { name: "Basmati Rice", id: 9 },
  { name: "Baking Powder", id: 10 }
  
];

const len = words.length;
const value = words[Math.floor(Math.random() * len)].name;

export default class MyApp extends Component {
  constructor() {
    super();

    this.state = {
      ViewArray: [],
      tempArray: [],
      search: "",
      Disable_Button: false
    };

    this.name = value;
  }

  Add_New_View_Function = () => {
    const value = words[Math.floor(Math.random() * len)].name; // Generating random grocery Item every time Add_New_View_Function is called.
    this.name = value;
    let New_Added_View_Value = { name: this.name };

    this.setState({
      Disable_Button: true,
      ViewArray: [...this.state.ViewArray, New_Added_View_Value],
      tempArray: [...this.state.ViewArray, New_Added_View_Value]
    });
    this.setState({ Disable_Button: false });
  };


  //-------------------------------------------------Function for searching grocery ites when the button is pressed------------------------------------

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      if (this.state.search.length > 0) {
        this.setState({
          ViewArray: this.state.ViewArray.filter((item) => {
            const LoweredCase = item.name.toLowerCase();
            return LoweredCase.includes(this.state.search.toLowerCase());
          })
        });
      } else {
        this.setState({
          ViewArray: [...this.state.tempArray]
        });
      }
    }
  }
    //---------------------------------------------------------Render ()----------------------------------------------------------------

  render() {
    let Render__View = this.state.ViewArray.map((item, key) => {
      return (
        <View key={key} style={styles._View_Style}>
          <Text style={styles.View_Inside_Text}>{item.name} </Text>
        </View>
      );
    });

    return (
      <View style={styles.MainContainer}>
        <TextInput
          onChangeText={(text) => {
            this.setState({ search: text });
          }}
          style={styles.textInputStyle}
        />

        <ScrollView style={styles.maincontent}>
          <View style={{ flex: 1, padding: 2 }}>{Render__View}</View>
        </ScrollView>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.TouchableOpacityStyle}
          disabled={this.state.Disable_Button}
          onPress={this.Add_New_View_Function}
        >
          <Image
            source={{
              uri:
                "https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png"
            }}
            style={styles.FloatingButtonStyle}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

//----------------------------------------------------------Styling -----------------------------------------
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingTop: Platform.OS == "ios" ? 20 : 0
  },

  _View_Style: {
    height: 60,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderRadius:30,
    borderColor:'#000',
    borderWidth:1
  },
  maincontent: {
    marginTop: 40
  },
  textInputStyle: {
    marginTop: 55,
    marginLeft: 30,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "#000",
    background: "#fff",
    width: 280
  },

  View_Inside_Text: {
    color: "#000",
    fontSize: 24,
  },

  TouchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    top: 55
  },

  FloatingButtonStyle: {
    resizeMode: "contain",
    width: 50,
    height: 50
  }
});
