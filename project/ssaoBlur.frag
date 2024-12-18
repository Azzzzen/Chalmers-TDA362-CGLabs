#version 420

uniform sampler2D ssaoTexture;
uniform vec2 texelSize;

out vec4 fragColor;


void main() {
    vec2 uv = gl_FragCoord.xy * texelSize;

    float blurSize = 1.0; 
    vec3 result = vec3(0.0);
    float total = 0.0;

    for (int x = -1; x <= 1; x++) {
        for (int y = -1; y <= 1; y++) {
            vec2 offset = vec2(x, y) * blurSize * texelSize;
            result += texture(ssaoTexture, uv + offset).rgb;
            total += 1.0;
        }
    }

    fragColor = vec4(result / total, 1.0);
    }