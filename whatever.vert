#ifdef GL_ES
precision mediump float;
#endif

attribute vec3 aPosition;

// Always include this to get the position of the pixel and map the shader correctly onto the shape

void main() {

  // Copy the position data into a vec4, adding 1.0 as the w parameter
  vec4 positionVec4 = vec4(aPosition, 1.0);

  // Scale to make the output fit the canvas
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0; 

  // Send the vertex information on to the fragment shader
  gl_Position = positionVec4;
}
// attribute vec3 aPosition;
// //coordinate used in the fragment shader if we want to draw a texture on the face of the geometry where rendering
// attribute vec2 aTexCoord;

// // uniform mat4 uModelViewMatrix;
// // uniform mat4 uProjectionMatrix;
// //will be passed into the fragment shader
// varying vec2 pos;

// uniform float millis;

// void main(){
  
//   //set the pos to the texture pixel position
//   pos = aTexCoord;
//   vec4 position = vec4(aPosition, 1.0);
//   //remapping 0 ~ 1 to be -1 ~ 1
//   position.xy = position.xy *2. - 1.;
//   // postition.y += position.x/2;
  
//   position.x += sin(millis / 100. + position.x * 100.)/30.;
//   position.y += sin(millis / 100. + position.y * 100.)/80.;
//   gl_Position = position;
// }