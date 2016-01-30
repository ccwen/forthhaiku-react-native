const haiku=require("./haiku")
var transpile=function(forthcode){
  var js=haiku.compile(forthcode);
  console.log(js)
  var code=haiku.make_fragment_shader(js);
  code=code.replace(/tpos/g,'uv');
 
  code=code.replace("for (int i = 0; i < 16; ++i) { memory[i] = memory_val[i]; }","")
  //code=code.replace(/time_val/g,'time');
  return code;
}
function GetTime() {
  var dt = new Date();
  var tm = dt.getHours();
  tm = tm * 60 + dt.getMinutes();
  tm = tm * 60 + dt.getSeconds();
  tm = tm + dt.getMilliseconds() / 1000.0;
  return tm;
}
var last_time,time_val=GetTime();
var getUniforms=function(){
	last_time=time_val;
	time_val=GetTime();
    return {time_val:time_val, time_delta_val:time_val-last_time};
}
module.exports={transpile:transpile,getUniforms:getUniforms};