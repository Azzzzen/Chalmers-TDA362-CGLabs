#version 420

// required by GLSL spec Sect 4.5.3 (though nvidia does not, amd does)
precision highp float;

#define MAX_SSAO 300
#define PI 3.1415926538

///////////////////////////////////////////////////////////////////////////////
// Textures
///////////////////////////////////////////////////////////////////////////////
// Don't use unit 0, used by shading.frag (colorMap)
layout(binding = 3) uniform sampler2D normalTex;
layout(binding = 4) uniform sampler2D depthTex;

uniform mat4 projectionMatrix;

layout(location = 0) out vec4 fragColor;

uniform vec3 samples[64];
uniform sampler2D noiseTexture;

int kernelSize = 64;
float radius = 0.1;
float bias = 0.025;

vec3 samplePos; float rangeCheck;

vec3 homogenize(vec4 v) { return vec3((1.0 / v.w) * v); }


// Computes one vector in the plane perpendicular to v
vec3 perpendicular(vec3 v)
{
	vec3 av = abs(v); 
	if (av.x < av.y)
		if (av.x < av.z) return vec3(0.0f, -v.z, v.y);
		else return vec3(-v.y, v.x, 0.0f);
	else
		if (av.y < av.z) return vec3(-v.z, 0.0f, v.x);
		else return vec3(-v.y, v.x, 0.0f);
}


void main() {
    vec2 texCoord = gl_FragCoord.xy/textureSize(depthTex, 0);
    float fragmentDepth = texture(depthTex, texCoord).r;

	// Normalized Device Coordinates (clip space)
	vec4 ndc = vec4(texCoord.x * 2.0 - 1.0, texCoord.y * 2.0 - 1.0, 
					fragmentDepth * 2.0 - 1.0, 1.0);

	// Transform to view space
	vec3 vs_pos = homogenize(inverse(projectionMatrix) * ndc);
	vec3 vs_normal = texture(normalTex, texCoord).xyz*0.5 + 0.5;

	vec3 vs_tangent = perpendicular(vs_normal);
	vec3 vs_bitangent = cross(vs_normal, vs_tangent);
	mat3 tbn = mat3(vs_tangent, vs_bitangent, vs_normal); // local base

	vec2 noiseCoord = gl_FragCoord.xy / vec2(textureSize(noiseTexture, 0)); // 计算噪声坐标
    vec3 noiseValue = texture(noiseTexture, noiseCoord).xyz; // 从噪声纹理中采样

	int num_visible_samples = 0; 
	int num_valid_samples = 0; 
	for (int i = 0; i < kernelSize; i++) {
		// Project hemishere sample onto the local base
		 vec3 s = tbn * (samples[i] + noiseValue * 0.1);

		// compute view-space position of sample
		vec3 vs_sample_position = vs_pos + s * radius ;

		// compute the ndc-coords of the sample
		vec3 sample_coords_ndc = homogenize(projectionMatrix * vec4(vs_sample_position, 1.0));

		// Sample the depth-buffer at a texture coord based on the ndc-coord of the sample
		vec2 sample_texCoord = (sample_coords_ndc.xy + 1.0)/2.0;
		float blocker_depth = texture(depthTex, sample_texCoord).x;

		// Find the view-space coord of the blocker
		// NB: diff results if reuse vs_sample_position.xy, since diff depth is used to homogenize
		vec3 vs_blocker_pos = homogenize(inverse(projectionMatrix) * 
			 vec4(sample_coords_ndc.xy, blocker_depth * 2.0 - 1.0, 1.0));	

		// Check that the blocker is closer than hemisphere_radius to vs_pos
		// (otherwise skip this sample)
		if (distance(vs_blocker_pos, vs_pos) > radius) continue;

		// Check if the blocker pos is closer to the camera than our
		// fragment, otherwise, increase num_visible_samples
		if (length(vs_blocker_pos) + 1e-3 > length(vs_pos)) num_visible_samples += 1;

		num_valid_samples += 1;
	}

	float hemisphericalVisibility = float(num_visible_samples) / float(num_valid_samples);

	if (num_valid_samples == 0)
		hemisphericalVisibility = 1.0;

	fragColor = vec4(vec3(hemisphericalVisibility), 1.0);
	//fragColor = vec4(fragmentDepth); // debug depth
	//fragColor = vec4(vs_normal, 1.0); // debug normals

	// fragColor = vec4(vec3(float(num_valid_samples) / float(kernelSize)), 1.0); // 检查有效样本比例
	// fragColor = vec4(vec3(float(num_visible_samples) / float(kernelSize)), 1.0); // 检查可见样本比例


	return;
}