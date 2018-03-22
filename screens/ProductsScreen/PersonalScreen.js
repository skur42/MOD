import React from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  View } from 'react-native'
import {
  Container,
  Text,
  Card } from 'native-base'
import { Icon } from 'react-native-elements'

const image = require('../../assets/images/banners/personal.png')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 10
  },
  banner: {
    height: 110,
    backgroundColor: '#fff',
    justifyContent: 'flex-start'
  },
  banner_image: {
    height: 112,
    alignSelf: 'center',
    position: 'absolute',
    justifyContent: 'center'
  },
  options: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: 285,
    height: 45,
    marginTop: 10
  }
})

export default class OrdersScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props)
  }

  onValueChange(value: string) {
    this.setState({
      selected1: value
    })
  }


  render() {
    return (
      <Container >
        <View>
          <View style={styles.banner}>
            <Image resizeMode='contain' style={styles.banner_image} source={image}/>
            <Icon
              iconStyle={{ marginLeft: 20, paddingTop: 11, alignSelf: 'flex-start' }}
              size={25}
              name='arrow-back'
              type='materialicons'
              color='#ffffff'
            />
          </View>
        </View>
        <View style={styles.container}>
          <ScrollView style={styles.container}
            contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
            <Text style={{ paddingLeft: 4, paddingTop: 3, fontSize: 17, color: '#555555', fontWeight: 'bold' }}>Personal Care Products</Text>
            <View style={{ alignItems: 'center', paddingTop: 8, justifyContent: 'flex-start', marginBottom: 18 }}>
              <Card style={styles.options}>
                <Text style={{ paddingLeft: 15, fontSize: 16, color: '#555555' }}>Elderly Care</Text>
                <View style={{ paddingRight: 13 }}>
                  <Icon
                    size={26}
                    name='wheelchair'
                    type='font-awesome'
                    color='#ff5722'
                  />
                </View>
              </Card>
              <Card style={styles.options}>
                <Text style={{ paddingLeft: 15, fontSize: 16, color: '#555555' }}>Hair Care</Text>
                <View style={{ paddingRight: 19 }}>
                  <Icon
                    size={26}
                    name='torso-female'
                    type='foundation'
                    color='#5d4037'
                  />
                </View>
              </Card>
              <Card style={styles.options}>
                <Text style={{ paddingLeft: 15, fontSize: 16, color: '#555555' }}>Skin Care</Text>
                <View style={{ paddingRight: 15 }}>
                  <Icon
                    size={26}
                    name='feather'
                    type='entypo'
                    color='#d2b179'
                  />
                </View>
              </Card>
              <Card style={styles.options}>
                <Text style={{ paddingLeft: 15, fontSize: 16, color: '#555555' }}>Body Care</Text>
                <View style={{ paddingRight: 15 }}>
                  <Icon
                    size={26}
                    name='shield'
                    type='entypo'
                    color='#03a9f4'
                  />
                </View>
              </Card>
              <Card style={styles.options}>
                <Text style={{ paddingLeft: 15, fontSize: 16, color: '#555555' }}>Oral Care</Text>
                <View style={{ paddingRight: 15 }}>
                  <Icon
                    size={24}
                    name='emoji-happy'
                    type='entypo'
                    color='#f78da7'
                  />
                </View>
              </Card>
              <Card style={styles.options}>
                <Text style={{ paddingLeft: 15, fontSize: 16, color: '#555555' }}>Facial Care</Text>
                <View style={{ paddingRight: 15 }}>
                  <Icon
                    size={26}
                    name='tag-faces'
                    type='material'
                    color='#d2ae79'
                  />
                </View>
              </Card>
              <Card style={styles.options}>
                <Text style={{ paddingLeft: 15, fontSize: 16, color: '#555555' }}>Lip Care</Text>
                <View style={{ paddingRight: 15 }}>
                  <Icon
                    size={26}
                    name='duck'
                    type='material-community'
                    color='#eb144c'
                  />
                </View>
              </Card>
              <Card style={styles.options}>
                <Text style={{ paddingLeft: 15, fontSize: 16, color: '#555555' }}>Eye and Ear Care</Text>
                <View style={{ paddingRight: 15 }}>
                  <Icon
                    size={26}
                    name='eye'
                    type='material-community'
                    color='#555555'
                  />
                </View>
              </Card>
            </View>
          </ScrollView>
        </View>
      </Container>
    )
  }
}
