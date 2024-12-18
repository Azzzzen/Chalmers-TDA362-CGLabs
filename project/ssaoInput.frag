#version 420

in vec3 vsNormal;

layout(location = 0) out vec4 fragColor;

void main(){
	fragColor = vec4(normalize(vsNormal*0.5+0.5), 1.0);
}