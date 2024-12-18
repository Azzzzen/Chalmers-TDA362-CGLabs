#version 420

layout(location = 0) in vec3 position;
layout(location = 1) in vec3 normal;

uniform mat4 modelViewProjectionMatrix;
uniform mat4 normalMatrix;

out vec3 vsNormal;

void main()
{
	gl_Position = modelViewProjectionMatrix * vec4(position, 1.0);
	vsNormal = (normalMatrix * vec4(normal, 0.0)).xyz;
}