/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
//var Sample=require("./src/index.js");
const { Surface } = require("gl-react-native");
const GL = require("gl-react");

var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text, 
  TextInput,
  View,
  TouchableHighlight
} = React;

var frag=`precision highp float;
varying vec2 uv; 
void main () { 
  gl_FragColor = vec4(uv.x, uv.y, 0.5, 1.0); 
}
    `

var forthhaiku = React.createClass({
  getInitialState:function(){
    return {frag:frag}
  }
  ,onChangeText:function(text){
    this.setState({frag:text});
  }
  ,updatefrag:function(){
    this.shader=GL.Shaders.create({helloGL:{frag:this.state.frag}});
    this.forceUpdate();
  }
  ,shader:GL.Shaders.create({helloGL:{frag:frag}})
  ,render: function() {
    return <View style={{flex:1}}>
    <View style={{height:20}}/>
    <TouchableHighlight onPress={this.updatefrag}><Text style={{height:40}}>Run</Text></TouchableHighlight>
    <View style={{paddingLeft:55}}>
     <Surface width={256} height={256} ref="helloGL">
    
          <GL.Node shader={this.shader.helloGL} />
      </Surface>
    </View>
    <TextInput ref="frag" multiline={true} style={{fontSize:16,height:250,borderColor:'gray',borderWidth:1}}
    onChangeText={this.onChangeText}
    value={this.state.frag}/>
    </View>
  }
});

var styles = StyleSheet.create({
 
});

AppRegistry.registerComponent('forthhaiku', () => forthhaiku);
