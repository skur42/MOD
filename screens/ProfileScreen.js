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
  AsyncStorage,
  Animated, 
  Keyboard, 
  KeyboardAvoidingView
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
  Form,
  Item as FormItem,
  Card,
  CardItem,
  Label } from 'native-base';
import { Button, Icon,  } from 'react-native-elements';
import Modal from "react-native-modal";
import { ProgressDialog } from 'react-native-simple-dialogs';
import Display from 'react-native-display';
//import Toast from 'react-native-smart-toast';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }
  constructor(props) {
    super(props);
    this.state = {
      visibleModal: null,
      isEnabled: false,
      number:'',
      email:'',
      name:'',
      password:'',
      passLength:'',
      textLength:'',
      otpLength:'',
      otpCode:'',
      auth:{},
      message:'',
      loginResponse:'',
      isExists:false,
    };
  }

  verifyToken(){
    fetch(`http://192.168.42.85:8082/stores/users/${this.state.auth.user._id}/verify`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code:this.state.otpcode,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
        /*this.setState({
          message: responseJson
        }, function() {
          console.log(this.state.auth);
        //AsyncStorage.setItem("token",this.state.auth.token);
      });*/
      console.log(responseJson);
      if(responseJson.success === true){
        alert("You are signed up! :)");
        this.setState({
          visibleModal:null
        });
      }
      else{
        alert(responseJson.message);
      }
    });
  }

  signUp(){
    //this.openProgress();
    this.setState({ showProgress: true });
    fetch('http://192.168.42.85:8082/stores/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: this.state.name,
        email: this.state.email,
        phone: this.state.number,
        password: this.state.password,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({
          auth: responseJson
         }, function() {
          this.setState({ showProgress: false })
          console.log(this.state.auth);
          if(this.state.auth.success === true){
            //{this.sendVerificationToken()}
            this.setState({ 
              visibleModal: 3, 
              //email:'', 
              //name:'', 
              //password:'', 
              //number:'',
            });
          }
          else{
            /*{this._showBottomToast}*/
            console.log(this.state.auth.error);
          }
        //AsyncStorage.setItem("token",this.state.auth.token);
      });
    });
  }

  login(){
    //console.log(this.state.isExists);
    if(!this.state.isExists) {
      fetch(`http://192.168.42.85:8082/stores/users/${this.state.number}/userExists`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          loginResponse: responseJson
         }, function() {
          if(this.state.loginResponse.success === true){
            console.log("user exists");
            this.setState({
              isExists:true
            });
          }
          else {
            console.log('user doesnt exists');
            this.setState({
              visibleModal: 4,
              textLength:0,
            });
          }
        });
      }); 
    }
    else{
      fetch(`http://192.168.42.85:8082/stores/users/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: this.state.number,
          password: this.state.password,
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          loginResponse: responseJson
         }, function() {
          if(this.state.loginResponse.success === true){
            alert("You are logged in");
            console.log("password verified");
            this.setState({
              visibleModal:null
            });
          }
          else {
            alert("Sorry! Wrong password");
            console.log('wrong password');
            /*this.setState({
              visibleModal: 4,
              textLength:0,
            });*/
          }
        });
      }); 
    }
  }

  _renderOTPModalContent = () => (
    <View style={ styles.modalContentSignUp }>
      <View style={{ paddingTop:40, paddingLeft:15, paddingRight:15, paddingBottom:20, backgroundColor:'#e5f6fd' }}>
        <Text style={ styles.account }>VERIFY DETAILS</Text>
        <Text note>OTP sent to {this.state.number}</Text>
      </View>
      <View style={{ paddingTop:20, paddingLeft:15, paddingRight:15, paddingBottom:40 }}>
        <Text note style={{ paddingBottom: 20 }}>Enter OTP</Text>
        <Item style={{ borderColor: 'transparent', paddingBottom:60 }}>
          <Input 
            placeholder={'_ _ _ _ _ _'}
            keyboardType = {Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
            underlineColorAndroid={'transparent'}
            autoCapitalize={'none'}
            style={ styles.textInput }
            returnKeyType="go"
            fontWeight={`bold`}
            maxLength = {6}
            autoFocus= {true}
            onChangeText={(otp) => this.setState({ otpLength:otp.length, otpCode:otp })}
          />
        </Item>
        <Button
          raised
          disabled={ this.state.otpLength===6 ? (false):(true) }
          containerViewStyle={{ marginTop:20, marginLeft:0, marginRight:0 }}
          buttonStyle={{ backgroundColor: '#03a9f4'}}
          textStyle={{textAlign: 'center'}}
          fontWeight={'bold'}
          title={ this.state.otpLength===6 ? (`VERIFY AND PROCEED`):(`ENTER OTP`) }
          onPress={() => {this.verifyToken()}}
        />
      </View>
    </View>
  )

  _renderLoginModalContent = () => (
    <View style={ styles.modalContentLogin }>
      <View style={{ paddingTop:10, paddingLeft:15, paddingRight:15, paddingBottom:10, backgroundColor:'#e5f6fd' }}>
        <Text style={ styles.account }>LOGIN</Text>
        <Text note>Enter your phone number to proceed</Text>
      </View>
      <ScrollView style={{flex:1, flexDirection:'column', paddingTop:0, paddingLeft:0, paddingRight:0, paddingBottom:0 }}>
        <View style={{ flex:1, flexDirection:'column', paddingTop:10, paddingLeft:0, paddingRight:0, paddingBottom:0 }}>
          <KeyboardAvoidingView
            style={ styles.modalContentLogin }
            behavior="padding">
            <Form>
              <Item stackedLabel>
                <Label style={{ fontWeight:'bold', fontSize:13, color:'#555555' }}>PHONE NUMBER</Label>
                <Input 
                  keyboardType = 'numeric' 
                  returnKeyType="next"
                  autoFocus={true} 
                  fontWeight={`bold`}
                  maxLength = {10}
                  editable = {!this.state.isExists}
                  onChangeText={(number) => this.setState({ number: number, textLength: number.length })}
                />
              </Item>
              <Display enable={this.state.isExists}>
                <Item stackedLabel style={{ paddingTop:10 }} >
                  <Label style={{ fontWeight:'bold', fontSize:12 }}>PASSWORD</Label>
                  <Input 
                    returnKeyType="next"
                    secureTextEntry
                    fontWeight={`bold`}
                    autoFocus={this.state.isExists}
                    onChangeText={(password) => this.setState({ password:password, passLength: password.length })}
                  />
                </Item>
              </Display>
            </Form>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
      <Button
        raised
        large
        disabled={ this.state.isExists===false ? (this.state.textLength===10 ? (false):(true)):(this.state.passLength>0 ? (false):(true)) }
        containerViewStyle={{ marginTop:20, marginLeft:0, marginRight:0 }}
        buttonStyle={{ backgroundColor: '#03a9f4'}}
        textStyle={{textAlign: 'center'}}
        fontWeight={'bold'}
        title={ this.state.isExists===false ? (this.state.textLength===10 ? (`CONTINUE`):(`ENTER PHONE NUMBER`)):(this.state.passLength>0 ? (`LOGIN`):(`ENTER PASSWORD`)) }
        onPress={() => this.login() }
      />
    </View>
  )

  _renderSignUpModalContent = () => (
    <View style={ styles.modalContentSignUp }>
      <View style={{ paddingTop:40, paddingLeft:15, paddingRight:15, paddingBottom:20, backgroundColor:'#e5f6fd' }}>
        <Text style={ styles.account }>SIGN UP</Text>
        <Text note>Create an account with the new phone number</Text>
      </View>
      <ScrollView style={{flex:1, flexDirection:'column', paddingTop:0, paddingLeft:0, paddingRight:0, paddingBottom:40 }}>
        <View style={{ flex:1, flexDirection:'column', paddingTop:20, paddingLeft:15, paddingRight:15, paddingBottom:40 }}>
          <KeyboardAvoidingView
            style={ styles.modalContentSignUp }
            behavior="padding">
            <Form>
              <Item stackedLabel>
                <Label style={{ fontWeight:'bold', fontSize:13, color:'#555555' }}>PHONE NUMBER</Label>
                <Input 
                  keyboardType = 'numeric'
                  maxLength = {10}
                  returnKeyType="next"
                  value={this.state.number}
                  fontWeight={`bold`}
                  onChangeText={(number) => this.setState({number})}
                  editable={false}
                />
              </Item>
              <Item stackedLabel style={{ paddingTop:20 }}>
                <Label style={{ fontWeight:'bold', fontSize:12 }}>EMAIL ADDRESS</Label>
                <Input 
                  returnKeyType="next"
                  fontWeight={`bold`}
                  onChangeText={(email) => this.setState({email})}
                />
              </Item>
              <Item stackedLabel style={{ paddingTop:20 }}>
                <Label style={{ fontWeight:'bold', fontSize:12 }}>NAME</Label>
                <Input 
                  returnKeyType="next"
                  fontWeight={`bold`}
                  onChangeText={(name) => this.setState({name})}
                />
              </Item>
              <Item stackedLabel style={{ paddingTop:20 }}>
                <Label style={{ fontWeight:'bold', fontSize:12 }}>PASSWORD</Label>
                <Input 
                  returnKeyType="next"
                  secureTextEntry
                  fontWeight={`bold`}
                  onChangeText={(password) => this.setState({password})}
                />
              </Item>
            </Form>
            <Text note style={{ paddingTop: 20 ,fontSize:12 }}>By creating an account, I accept the Terms and Conditions</Text>
          </KeyboardAvoidingView>
        </View>
        <ProgressDialog
          visible={this.state.showProgress}
          message="Loading..."
          activityIndicatorSize="large"
          activityIndicatorColor="#03a9f4"
        />
      </ScrollView>
      <Button
        raised
        large
        //disabled={ (this.state.email!='' && this.state.name!='' && this.state.password.length>=6) ? (false):(true) }
        containerViewStyle={{ marginTop:20, marginLeft:0, marginRight:0 }}
        buttonStyle={{ backgroundColor: '#03a9f4'}}
        textStyle={{textAlign: 'center'}}
        fontWeight={'bold'}
        title={`SIGN UP`}
        onPress={() => {this.signUp()} }
      />
    </View>   
  )

  /*_renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  )*/

  /*_showBottomToast = () => {
    this._toast.show({
      position: Toast.constants.gravity.bottom,
      children: this.state.auth.error,
    });
  };*/

  render() {
    return (
      <Container style={ styles.container1 } > 
        <View style={ styles.coverImageContainer }>
          <Image resizeMode='contain' source={require('../assets/images/preview.png')} style={ styles.cover } />
        </View>
        <View style={{ flex: 1, backgroundColor: '#fff', marginLeft: 15, marginRight: 15, marginTop:20 }}>
          <View style={{ flex: 1, flexDirection:'column' }}>
            <Text style={ styles.account }>ACCOUNT</Text>
            <Text note>Login/Create account quickly to manage orders</Text>
            <Button
              raised
              containerViewStyle={{ marginTop:20, marginLeft:0, marginRight:0 }}
              buttonStyle={{ backgroundColor: '#03a9f4'}}
              textStyle={{textAlign: 'center'}}
              fontWeight={'bold'}
              title={`LOGIN`}
              onPress={() => this.setState({ visibleModal: 5 })}
            />
            <List style={{ marginTop: 20 }}>
              <ListItem style={styles.option}>
                <View>
                  <Text style={styles.op_name}>Offers</Text>
                </View>
                  <Icon
                    name='local-offer'
                    type='MaterialIcons'
                    color='#666666'
                    size={28}
                    />
              </ListItem>
              <ListItem style={styles.option}>
                <View>
                  <Text style={styles.op_name}>Send Feedback</Text>
                </View>
                  <Icon
                    name='email'
                    type='MaterialIcons'
                    color='#666666'
                    size={28}
                    />
              </ListItem>
            </List>
          </View>
        </View>

        <Modal 
          isVisible={ this.state.visibleModal === 5 } 
          style={ styles.bottomModalLogin } 
          backdropOpacity={0.5} 
          onBackButtonPress={() => this.setState({ visibleModal: null, textLength:'', isExists: false, passLength:'' })}
          onBackdropPress={() => this.setState({ visibleModal: null, textLength:'', isExists: false, passLength:'' })}
          animationOut={ 'slideOutRight' }
          >
          {this._renderLoginModalContent()}
        </Modal>

        <Modal 
          isVisible={this.state.visibleModal === 4} 
          style={ styles.bottomModalSignUp } 
          backdropOpacity={0} 
          onBackButtonPress={() => this.setState({ visibleModal: null, email:'', name:'', password:'', number:'' })}
          onBackdropPress={() => this.setState({ visibleModal: null, email:'', name:'', password:'', number:'' })}
          animationOut={ 'slideOutRight' }
          >
          {this._renderSignUpModalContent()}
        </Modal>

        <Modal 
          isVisible={this.state.visibleModal === 3} 
          style={ styles.bottomModalSignUp } 
          backdropOpacity={0} 
          onBackButtonPress={() => this.setState({ visibleModal: null })}
          onBackdropPress={() => this.setState({ visibleModal: null })}
          animationOut={ 'slideOutRight' }
          >
          {this._renderOTPModalContent()}
        </Modal>
        
        {/*<View style={styles.container2}>
          <ScrollView>
             <View style={styles.view}>
              <View>
                <Text style={styles.name}>Ankur Singh</Text>
                <Text note style={{fontSize :15}}>View and edit profile</Text>
              </View>
             </View>
            <List style={{paddingTop :20}}>
              <ListItem style={styles.option}>
                <View>
                  <Text style={styles.op_name}>My Prescriptions</Text>
                </View>
                  <Icon
                    name='view-list'
                    type='MaterialIcons'
                    color='#666666'
                    size={26}
                    />
               </ListItem>
               <ListItem style={styles.option}>
                <View>
                  <Text style={styles.op_name}>My Addresses</Text>
                </View>
                  <Icon
                    name='location-on'
                    type='MaterialIcons'
                    color='#666666'
                    size={26}
                    />
               </ListItem>
               <ListItem style={styles.option}>
                <View>
                  <Text style={styles.op_name}>Notifications</Text>
                </View>
                  <Icon
                    name='notifications'
                    type='MaterialIcons'
                    color='#666666'
                    size={26}
                    />
               </ListItem>
               <ListItem style={styles.option}>
                <View>
                  <Text style={styles.op_name}>Offers</Text>
                </View>
                  <Icon
                    name='local-offer'
                    type='MaterialIcons'
                    color='#666666'
                    size={26}
                    />
               </ListItem>
               <ListItem style={styles.option}>
                <View>
                  <Text style={styles.op_name}>Give us feedback</Text>
                </View>
                  <Icon
                    name='feedback'
                    type='MaterialIcons'
                    color='#666666'
                    size={26}
                    />
               </ListItem>
               <ListItem style={styles.option}>
                <View>
                  <Text style={styles.op_name}>Logout</Text>
                </View>
                  <Icon
                    name='power-settings-new'
                    type='MaterialIcons'
                    color='#666666'
                    size={26}
                    />
               </ListItem>
             </List>
          </ScrollView>
        </View>*/}
	  </Container>
    );
  }
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container2: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop:10,
  },
  cover:{ 
    flex:1,  
    width:null, 
    height:null 
  },
  coverImageContainer:{
    flex: 1, 
    flexDirection:'column', 
    alignItems: 'stretch'
  },
  account:{
    color:'#555555',
    fontSize :20,
    fontWeight : 'bold'
  },
  view: {
    paddingLeft:20,
    paddingRight:20,
    flex:1,
    paddingTop:45,
    flexDirection:'row',
    alignItems : 'center',
    justifyContent : 'space-between'
	},
  name:{
    color:'#555555',
    fontSize :26,
    fontWeight : 'bold'
  },
  option:{
    flexDirection:'row',
    alignItems : 'center',
    justifyContent : 'space-between'
  },
  op_name:{
    fontSize:17,
    color:'#666666',
  },
  bottomModalLogin: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  bottomModalSignUp: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContentLogin: {
    flex: 0.8,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContentSignUp: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  textInput: {
    padding: 0,
    margin: 0,
    flex: 1,
    height: 42,
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
  },
});