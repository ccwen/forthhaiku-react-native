'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  PixelRatio,
  TouchableHighlight,
} = React;

var codes=[
["xy","x y"],
["xx","x x"],
["sin","x y t sin 2 / 0.5 +"],
["prog1","y y y"]

]

var StockCodeButtons=React.createClass({
	setCode:function(idx){
		this.props.setCode(codes[idx][1]);
		console.log(codes[idx][1]);
	}
	,renderButton:function(item,idx){
		return <TouchableHighlight key={idx} underlayColor='white' activeOpacity={0.5}
		 onPress={this.setCode.bind(this,idx)}>
    		<Text style={styles.runbutton}>{"code "+item[0]+  "  "}</Text>
    		</TouchableHighlight> 
	}
	,render:function(){
		return <View style={{flexDirection:'row'}}>{codes.map(this.renderButton)}</View>
	}
});

var styles = StyleSheet.create({
  runhighlight:{shadowRadius:5},
 runbutton:{textAlign:'center',textShadowRadius:10,fontSize:12,height:25}
});

module.exports=StockCodeButtons;