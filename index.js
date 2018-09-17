import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    ScrollView,
    Animated
} from 'react-native';
import ModernNavItem from './ModernNavItem';

let {height, width} = Dimensions.get('window');

export default class ModernNav extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.customListContainer}>
                    <View style={[{backgroundColor: this.props.backgroundColor},styles.headerContainer]}>
                        {this.props.backgroundView}
                    </View>
                    <ScrollView ref={(ref) => this.scrollView = ref}  onMomentumScrollEnd={this.handleScroll}  nestedScrollEnabled
                                style={{flex: 1, borderRadius: 16, zIndex: 0}} horizontal={true}>
                        <View style={{flex: 1, height: height, flexDirection: 'row'}}>
                            {this.props.data.map((prop, index) => {
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

    handleScroll = (event: Object) => {
        const pageNumber =(Math.round(event.nativeEvent.contentOffset.x / (width + 8)) * (width + 8)) / (width + 8) + 1;
        this.scrollView.scrollTo({
            x: Math.round(event.nativeEvent.contentOffset.x / (width + 8)) * (width + 8),
            y: 0,
            animated: true
        })
        this.props.pageChanged(pageNumber)
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
        width: width,
        height: height
    },
    customListContainer: {
        top: 0,
        left: 0,
        position: 'absolute',
        right: 0,
    },
    headerContainer: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        paddingBottom: '33%'
    }
});

