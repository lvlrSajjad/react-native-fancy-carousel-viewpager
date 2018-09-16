
# react-native-rounded-navigation-drawer [![npm version](https://img.shields.io/npm/v/react-native-fancy-carousel-viewpager.svg)](https://www.npmjs.com/package/react-native-fancy-carousel-viewpager)
<img src="https://raw.githubusercontent.com/lvlrSajjad/react-native-fancy-carousel-viewpager/master/img.gif">

## Getting started

`$ npm install react-native-fancy-carousel-viewpager --save`

## Usage
```javascript
import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';
import ModernNav from 'react-native-fancy-carousel-viewpager'; // <-------------------- import library here
import BrickList from 'react-native-masonry-brick-list';
import App21 from './App21';
import MyHeader from './MyHeader';

let {height, width} = Dimensions.get('window');

type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber:1,
            listData:[
                {id: '1', title: "Red", color: "#f44336", span: 1},
                {id: '2', title: "Pink", color: "#E91E63", span: 2},
                {id: '3', title: "Purple", color: "#9C27B0", span: 3},
                {id: '4', title: "Deep Purple", color: "#673AB7", span: 1},
                {id: '5', title: "Indigo", color: "#3F51B5", span: 1},
                {id: '6', title: "Blue", color: "#2196F3", span: 1},
                {id: '7', title: "Light Blue", color: "#03A9F4", span: 3},
                {id: '8', title: "Cyan", color: "#00BCD4", span: 2},
                {id: '9', title: "Teal", color: "#009688", span: 1},
                {id: '10', title: "Green", color: "#4CAF50", span: 1},
                {id: '11', title: "Light Green", color: "#8BC34A", span: 2},
                {id: '12', title: "Lime", color: "#CDDC39", span: 3},
                {id: '13', title: "Yellow", color: "#FFEB3B", span: 2},
                {id: '14', title: "Amber", color: "#FFC107", span: 1},
                {id: '15', title: "Orange", color: "#FF5722", span: 3},
            ],
        }
    }

    render() {
        // an array of  view (any your pages components
        // if your page just have a listview you can just put it in view i have scrollview inside)
        const data = [
            {view: <BrickList
                    data={this.state.listData}
                    renderItem={(prop) => this.renderView(prop)}
                    columns={3}
                />},
            {view: <View style={{height:height-20}}>
                    <Text style={styles.welcome}>Welcome to React Native!</Text>
                    <Text style={styles.instructions}>To get started, edit App.js</Text>
                </View>},
            {view: <App21 style={{height:height-20,width:width}}/>},
        ];

        return (

            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.navButton}>
                    <Image style={{alignSelf: 'center', width: 32, height: 32}} source={require('./menu_white.png')}/>
                </TouchableOpacity>

                {/*
                header can be a component showing when nothing scrolled at first
                data array page components
                pageChanged is event when you change a page
                */}
                <ModernNav
                    header={<MyHeader pageNumber={this.state.pageNumber}/>}
                    data={data}
                    pageChanged={(pageNumber)=>{this.setState({pageNumber})}}
                    topButtonColor={'#2196F3'}
                />

            </View>
        );
    }

    renderView = (prop) => {
        return (
            <View key={prop.id} style={{
                margin: 8,
                borderRadius: 2,
                backgroundColor: prop.color,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text style={{color: 'white'}}>{prop.title}</Text>
            </View>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEEEEE',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    navButton:{
        width: 60,
        height: 46,
        position: 'absolute',
        top: 16,
        left: 0,
        backgroundColor: "#03A9F4",
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        zIndex:999,
        alignItems:'center',
        justifyContent:'center'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    instructions2: {
        textAlign: 'center',
        color: 'white',
        marginBottom: 5,
    },
});

```
