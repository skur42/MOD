import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
} from 'react-native';
import { 
  Container, 
  Header, 
  Item, 
  Input, 
  Text, 
  List, 
  ListItem, 
  Body, 
  Content, 
  Thumbnail, 
  Left, 
  Right,
  Picker,
  Form,
  Item as FormItem,
  Card,
  CardItem } from 'native-base';
import Carousel from 'react-native-banner-carousel';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Button, Icon } from 'react-native-elements';
import Modal from 'react-native-modalbox';
import {Constants} from 'expo';

const BannerWidth = Dimensions.get('window').width;

const BannerHeight = 180;

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      selected1: "key0"
    };
  }

  onValueChange(value: string) {
    this.setState({
      selected1: value
    });
  }

  renderPage(image, index) {
    //console.log(image);
        return (
            <View key={index}>
              <Image style={{ width: BannerWidth, height: BannerHeight, resizeMode:'contain' }} source={image} />
            </View>
        );
    }


  render() {
    //console.log(BannerWidth);
    /*var deals= [{"name":"Delhi Pharmacy","offer":"12% off on all items","deliveryTime":"12 mins",thumbnail:"https://cdn.media.yp.ca/6964200/pcc_0_55893900_1417733104_r.jpg"},
                {"name":"Apollo Pharmacy","offer":"10% off on all items","deliveryTime":"14 mins", thumbnail:"https://guardian.ng/wp-content/uploads/2016/09/PHARMACY.jpg"},
                {"name":"Aditya Medical Store","offer":"15% off on all items","deliveryTime":"15 mins", thumbnail:"https://photos.smugmug.com/Streams/My-New-Life/i-fj4zbnN/0/bb3db02e/L/DSC_0918-L.jpg"},
                {"name":"MedPlus Pharmacy","offer":"20% off on all items","deliveryTime":"10 mins",thumbnail:"https://www.jpvisitor.com/images/content/20171017/f6a910e330904287.png"}];*/

    return (
      <Container>  
      	<View style={styles.container}>
          <ScrollView>
             
          </ScrollView>
        </View>
	  </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 24,
    paddingRight: 14,
    paddingTop:10,

  },
  headerViewStyle:{
    flex:1, 
    flexDirection: 'row',
  },
  HeaderShapeView:{
    width: 282,
    height: 47, 
    borderWidth: 0,
    borderColor: '#a8a8a8',
    paddingLeft: 10,
    paddingTop: 2,
    marginLeft: 0,
    marginTop: 0,
    borderRadius: 1
  },
  view: {
    flex:1,
    flexDirection:'row',
    alignItems : 'flex-start' 
	},
  product:{
	
	width: 60, 
	height: 60,
	alignContent : 'space-around'
	},
  pro_name:{
	fontSize :13
	},
  descrip:{
  	flex :1,
	fontSize :11
	},
  quantity:{

	},
});