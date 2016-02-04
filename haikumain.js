/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
//var Sample=require("./src/index.js");
const { Surface } = require("gl-react-native");
const GL = require("gl-react");
const forth2gl=require("./forth2gl");
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text, 
  TextInput,
  View,
  ScrollView,
  PixelRatio,
  TouchableHighlight
} = React;
var shader;
var frag=`precision highp float;
varying vec2 uv; 
uniform float time;
uniform float time_delta_val;
void main () { 
  gl_FragColor = vec4(uv.x, uv.y, 0.5, 1.0); 
}
    `
    //uniform float time_val;
var Shader=GL.createComponent(({time})=>{
   return <GL.Node shader={shader.Haiku} uniforms={{time}} />
});


var forthhaiku = React.createClass({
  getInitialState:function(){
    return {frag:frag,forthcode:'x \ t sin .5 * .5 +'}
  }
  ,onChangeForth:function(forthcode) {
    
    this.setState({forthcode:forthcode})
  }
  ,onChangeFrag:function(text){
    this.setState({frag:text});
  }
  ,updatefrag:function(){
    //var frag=forth2gl.transpile(this.state.forthcode);
    //shader=GL.Shaders.create({Haiku:{frag:frag}});
    //this.forceUpdate();
  }
  ,componentWillMount:function(){
    console.log(frag)
    shader=GL.Shaders.create({Haiku:{frag:frag}})
  }
  ,render: function() {
    return <View style={{flex:1}}>
    <View style={{height:20}}/>
    <View style={{paddingLeft:55}}>
     <Surface width={256} height={256} ref="helloGL">
         <Shader time={0}/>
      </Surface>
    </View>
    <View style={{flexDirection:'row'}}>
    <TouchableHighlight underlayColor='white' activeOpacity={0.5} style={styles.runhighlight} onPress={this.updatefrag}>
    <Text style={styles.runbutton}>Run</Text></TouchableHighlight>
    <Text>Name:</Text>
    <TextInput ref="name" style={{width:160,height:25,borderColor:'black',
    borderWidth:(1/PixelRatio.get())}}/>
    </View>
    <ScrollView styles={{flex:1}}>
    <TextInput ref="forthcode" multiline={true} 
    style={{fontSize:16,height:240,borderColor:'gray',borderWidth:(1/PixelRatio.get())}}
    onChangeText={this.onChangeForth}
    value={this.state.forthcode}/>

    <TextInput ref="frag" multiline={true} style={{fontSize:16,height:120,borderColor:'gray',borderWidth:1}}
    onChangeText={this.onChangeFrag}
    value={this.state.frag}/>    
    </ScrollView>
    </View>
  }
});

var styles = StyleSheet.create({
  runhighlight:{shadowRadius:5},
 runbutton:{textAlign:'center',textShadowRadius:10,
 textShadowColor:'black',borderWidth:1,height:25,borderRadius:5,width:150}
});

AppRegistry.registerComponent('forthhaiku', () => forthhaiku);
