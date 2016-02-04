import GL from "gl-react";
import React from "react";
const {PropTypes} = React;
var frag=`precision highp float;
varying vec2 uv; 
uniform vec3 color;
void main (void) { 

  gl_FragColor =  vec4(uv.x,uv.y, 0.5, 1.0);
}
    `

const shaders = GL.Shaders.create({
  Heart: { // inspired from http://glslsandbox.com/e#29521.0
    frag:frag
  }
});

module.exports = GL.createComponent(
  ({ color }) => <GL.Node shader={shaders.Heart} uniforms={{ color }} />,
  {
    displayName: "Heart",
    propTypes: {
      color: PropTypes.array.isRequired
    }
  });
