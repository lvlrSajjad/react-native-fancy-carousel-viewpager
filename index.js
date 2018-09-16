import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    ScrollView
} from 'react-native';
import ModernNavItem from './ModernNavItem';
let {height,width} = Dimensions.get('window');

export default class ModernNav extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (

            <View style={styles.container}>
                    {this.props.header}


                <View style={styles.customListContainer}>
                    <ScrollView ref={(ref)=>this.scrollView=ref} onScrollEndDrag={this.handleScroll} style={{flex:1,borderRadius:16,zIndex:0}} horizontal={true}>
                        <View style={{flex:1,height:height, flexDirection: 'row'}}>
                            {this.props.data.map((prop,index) => {
                                return <ModernNavItem
                                    key={index}
                                    item={prop}
                                    initialHeight={this.props.initialheight}
                                    topButtonColor={this.props.topButtonColor}
                                />
                            })}
                        </View>
                    </ScrollView>
                </View>
            </View>

        );
    }
    handleScroll=(event: Object)=>{
        this.scrollView.scrollTo({x: Math.round(event.nativeEvent.contentOffset.x/(width+8))*(width+8), y: 0, animated: true})
        this.props.pageChanged((Math.round(event.nativeEvent.contentOffset.x/(width+8))*(width+8))/(width+8)+1)
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: width,
        height: height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        width:width,
        height:height
    },
    customListContainer: {
        top:0,
        left:0,
        position: 'absolute',
        right:0,
    },
});

