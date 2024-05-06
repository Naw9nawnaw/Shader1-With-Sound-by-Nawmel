#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}

//rotate fixed formula
mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

float box(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size,
                        _size+vec2(0.001),
                        _st);
    uv *= smoothstep(_size,
                    _size+vec2(0.001),
                    vec2(1.0)-_st);
    return uv.x*uv.y;
}

float cross(in vec2 _st, float _size){
    return  box(_st, vec2(_size,_size/9.)) +
            box(_st, vec2(_size/9.,_size));
}

vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

vec2 tile(vec2 _st, float _zoom){
    _st *= _zoom;
    return fract(_st); //Important
}

float box(vec2 _st, vec2 _size, float _smoothEdges){
    _size = vec2(0.5)-_size*0.5;//size from center
    vec2 aa = vec2(_smoothEdges*6.0); //Smooth again
    vec2 uv = smoothstep(_size,_size+aa,_st);
    uv *= smoothstep(_size,_size+aa,vec2(1.0)-_st);
    return uv.x*uv.y;
}

vec3 colorA = vec3(0.149,0.141,0.912);
vec3 colorB = vec3(1.000,0.833,0.224);

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}

// float circle(in vec2 _st, in float _radius){
//     vec2 l = _st-vec2(0.5);
//     return 1.-smoothstep(_radius-(_radius*0.01),
//                          _radius+(_radius*0.01),
//                          dot(l,l)*4.0);
// }


void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 sd = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.6);
    
     //Patterns
    // sd.x *= 12.0*abs(fract(-tan(u_time/12.0)*cos(u_time/3.0)));      // Scale up the space by 3
    // sd.y *= 6.0*abs(fract(tan(u_time/3.0)*-sin(u_time/12.0)));
    // sd.x = fract(st.x); // Wrap around 1.0
    // sd.y = fract(sd.y);
    
      // Divide the space in 6
    sd = tile(sd,6.);

    // Use a matrix to rotate the space 45 degrees
    sd = rotate2D(fract(sd),PI*1.75*abs(fract(-sin(u_time*0.01)-cos(u_time*0.06)))); //0.25 equals 0.75 here

  
    // color = color + vec3(tile(sd.xy,0.06));
    
     // move space from the center to the vec2(0.0)
    st -= vec2(0.5);
    // st -= vec2(0.5+3.0*abs(tan(u_time*tan(st))));
    // st -= vec2(0.1+abs(tan(u_time)));
    // rotate the spacee and multiply the scale
    st = rotate2d( abs(fract(u_time/1.2))*tan(u_time/6.0)*PI ) * st * scale( vec2(sin(u_time/1.5)+1.0) );
    // move it back to the original place
    st += vec2(0.5);
   // st += vec2(0.1+abs(1.0-tan(u_time/3.0)));
    // st *= vec2(0.5);
    
    // Show the coordinates of the space on the background
    // color = vec3(st.x*u_time,st.y*u_time,0.0);

 
    // Add the shape on the foreground
    colorB += vec3(cross(st,0.1));
  
    colorA = vec3(box(sd,vec2(0.7),0.01));
       
    /////////////
    
   vec3 pct = vec3(abs(tan(u_time*sd.x)),abs(cos(u_time*sd.x)),abs(sin(u_time*sd.x)));
    
    color = mix(colorA*0.6, colorB*0.6, pct*(floor(st.y)+ceil(st.x)));
//     vec3 pct = vec3(sd.x);
    
    // color = mix(colorA, colorB, pct);

//     // Plot transition lines for each channel
//     color = mix(color,vec3(1.0,0.0,0.0),plot(sd,pct.r));
//     color = mix(color,vec3(0.0,1.0,0.0),plot(sd,pct.g));
//     color = mix(color,vec3(0.0,0.0,1.0),plot(sd,pct.b));

    gl_FragColor = vec4(color,0.81);
}