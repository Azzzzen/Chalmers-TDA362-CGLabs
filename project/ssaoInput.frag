#version 420


in vec3 viewSpaceNormal;

layout(location = 0) out vec4 fragmentColor;

void main() {
	vec3 n = normalize(viewSpaceNormal)*0.5 + 0.5;
	fragmentColor = vec4(n, 1.0); 
	return;
}