import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    ImageBackground, Animated,Image
} from 'react-native';

let {height, width} = Dimensions.get('window');

export default class ModernNavItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOnTop: true,
            offsetY: new Animated.Value(40),
            fadeIn: new Animated.Value(0)
        };
        openFab = openFab.bind(this);
        closeFab = closeFab.bind(this);
    }

    render() {
        return (
            <View>
                <ScrollView style={{zIndex: 999}} ref={(ref) => this.scrollView = ref}
                            nestedScrollEnabled onMomentumScrollEnd={this.handleScroll}>
                    <View style={{height: 2 * height / 3}}/>
                    <TouchableOpacity
                        key={this.props.item.id}
                        style={{
                            width: width,
                            marginRight: 8,
                            overflow: 'hidden',
                        }}
                        activeOpacity={1}
                    >
                        <View style={{
                            marginLeft: 8, marginRight: 8,
                            backgroundColor: 'white',
                            borderRadius: 8,
                            overflow: 'hidden',
                        }}>
                            {this.props.item.view}
                        </View>
                    </TouchableOpacity>
                </ScrollView>
                {!this.state.isOnTop &&
                <Animated.View
                    style={{
                        opacity: this.state.fadeIn,
                        transform: [{translateY: this.state.offsetY}],
                        position: 'absolute',
                        right: 24,
                        bottom: 24,
                    }}
                >
                    <ImageBackground
                        style={{padding: 8}}
                        source={require('./shadow.png')}
                    >
                        <TouchableOpacity
                            style={{
                                width: 52, height: 52,
                                borderRadius: 26,
                                overflow: 'hidden',
                                backgroundColor: this.props.topButtonColor,
                                justifyContent:'center',
                                alignItems:'center'
                            }}

                            onPress={() => {
                                this.scrollView.scrollTo({x: 0, y: 0, animated: true})
                                closeFab()
                            }
                            }
                        >
                            <Image source={require('./chevron-up.png')}/>
                        </TouchableOpacity>
                    </ImageBackground>
                </Animated.View>
                }
            </View>
        );
    }

    handleScroll = (event: Object) => {
        console.log(event.nativeEvent);
        if (this.state.isOnTop && parseInt(event.nativeEvent.contentOffset.y) > 0) {
            this.setState({isOnTop: false},()=>{
                openFab()
            })
        } else if (!this.state.isOnTop && parseInt(event.nativeEvent.contentOffset.y) <= 200) {
            console.log(event.nativeEvent.contentOffset.y);
            closeFab();
        }
    }
}

export function openFab() {

    this.setState({open: true}, () => {
        Animated.parallel([
            Animated.timing(
                this.state.fadeIn,
                {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                this.state.offsetY,
                {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true
                }
            )
        ]).start();

    });


}

export function closeFab() {
    Animated.parallel([
        Animated.timing(
            this.state.fadeIn,
            {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }
        ),
        Animated.timing(
            this.state.offsetY,
            {
                toValue: 40,
                duration: 300,
                useNativeDriver: true
            }
        )

    ]).start(() => this.setState({isOnTop: true}));

}


