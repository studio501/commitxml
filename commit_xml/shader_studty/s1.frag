#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

float circleshape(vec2 pos,float radius){
    return step(radius,length(pos - vec2(0.5)));
}

void main(){
    vec2 position = gl_FragCoord.xy / u_resolution;

    vec3 color = vec3(0.8314, 0.7765, 0.8588);
    float circle = circleshape(position,0.3);
    color = vec3(circle);
    gl_FragColor = vec4(color, 1.0);
}
