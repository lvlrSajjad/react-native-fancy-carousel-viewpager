import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    ScrollView,
    Animated,
    TouchableOpacity,
    FlatList,
    Text,
    ImageBackground
} from 'react-native';
import ModernNavItem from './ModernNavItem';

let {height, width} = Dimensions.get('window');
let lastPageNumber = 1;
export default class ModernNav extends Component {

    constructor(props) {
        super(props);
        openNav = openNav.bind(this);
        closeNav = closeNav.bind(this);
        this.state = {
            showNavigation: false,
            fadeIn: new Animated.Value(0),
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.customListContainer}>
                    <View style={[{backgroundColor: this.props.backgroundColor}, styles.headerContainer]}>
                        {this.props.backgroundView}
                    </View>
                    <ScrollView ref={(ref) => this.scrollView = ref} onMomentumScrollEnd={this.handleScroll}
                                nestedScrollEnabled
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
                    {this.state.showNavigation && this.props.useInnerNavigationDrawer &&
                    <Animated.View style={{
                        opacity: this.state.fadeIn,
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                        backgroundColor: '#000000ee'
                    }}>
                        {this.props.showImageOnNavigation &&
                        <Animated.Image
                            style={{
                                opacity: this.state.fadeIn,
                                width: 84,
                                height: 84,
                                borderRadius: 42,
                                marginTop: 100,
                                alignSelf: 'center'
                            }}
                            source={{uri: this.props.navigationImageUri}}
                        />
                        }
                        <FlatList
                            style={{flex: 1, marginTop: 70, marginBottom: 50,}}
                            data={this.props.navigationData}
                            extraData={this.props.navigationData}
                            keyExtractor={(item, index) => item.id}
                            renderItem={this._renderItem}
                        />

                    </Animated.View>
                    }
                    {this.props.useInnerNavigationButton &&
                    <ImageBackground style={{position: 'absolute',
                        top: 32,
                        left: 0,paddingRight:4,paddingBottom:4,paddingTop:4}} source={require('./btn-shadow.png')}>
                    <TouchableOpacity
                        style={[{backgroundColor: this.props.menuButtonColor}, styles.navButton]}
                        onPress={() => {
                            this.state.showNavigation ? closeNav() : openNav()
                        }}
                    >
                        {this.props.menuButtonIcon}

                    </TouchableOpacity>
                    </ImageBackground>
                    }
                </View>
            </View>

        );
    }

    _renderItem = ({item}) => (
        <TouchableOpacity onPress={() => this.props.onNavigationItemPress(item)}>
            <Animated.View style={{opacity: this.state.fadeIn}}>
                <Text style={{color: '#FFFFFF', height: 58, width: width, textAlign: 'center', fontSize: 24}}>
                    {item.title}
                </Text>
            </Animated.View>
        </TouchableOpacity>
    );
    handleScroll = (event: Object) => {
        const pageNumber = (Math.round(event.nativeEvent.contentOffset.x / (width + 8)) * (width + 8)) / (width + 8) + 1;

        this.scrollView.scrollTo({
            x: Math.round(event.nativeEvent.contentOffset.x / (width + 8)) * (width + 8),
            y: 0,
            animated: true
        })
        if (pageNumber !== lastPageNumber) {
            lastPageNumber = pageNumber;
            this.props.pageChanged(pageNumber)
        }
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
    },
    navButton: {
        width: 60,
        height: 46,

        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export function openNav() {

    this.setState({showNavigation: true}, () => {
        Animated.parallel([
            Animated.timing(
                this.state.fadeIn,
                {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                }
            )
        ]).start();

    });


}

export function closeNav() {
    Animated.parallel([
        Animated.timing(
            this.state.fadeIn,
            {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }
        )

    ]).start(() => this.setState({showNavigation: false}));

}
