#version 300 es
precision highp float;
out vec4 o_color;

uniform vec4 uCol;

float hue2rgb(float p, float q, float t) {
    if (t < 0.0) {
        t += 1.0;
    }
    if (t > 1.0) {
        t -= 1.0;
    }
    if (t < 1.0 / 6.0) {
        return p + (q - p) * 6.0 * t;
    }
    if (t < 1.0 / 2.0) {
        return q;
    }
    if (t < 2.0 / 3.0) {
        return p + (q - p) * (2.0 / 3.0 - t) * 6.0;
    }
    return p;
}

// https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
/**
    * Converts an HSL color value to RGB. Conversion formula
    * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
    * Assumes h, s, and l are contained in the set [0, 1] and
    * returns r, g, and b in the set [0, 255].
    *
    * @param   {number}  h       The hue
    * @param   {number}  s       The saturation
    * @param   {number}  l       The lightness
    * @return  {Array}           The RGB representation
    */
vec3 hslToRgb(float h, float s, float l) {
    vec3 rgb = vec3(l, l, l);
    if (s != 0.0) {
        float q = l < 0.5 ? l * (1.0 + s) : l + s - l * s;
        float p = 2.0 * l - q;
        rgb.r = hue2rgb(p, q, h + 1.0 / 3.0);
        rgb.g = hue2rgb(p, q, h);
        rgb.b = hue2rgb(p, q, h - 1.0 / 3.0);
    }

    return rgb;
}

float distSq(vec3 a, vec3 b){
    vec3 c = a - b;
    return dot(c,c);
}

void main(void)
{   
    float hue = gl_FragCoord.x / 360.0;
    float lightness = 1.0 -gl_FragCoord.y / 100.0;
    gl_FragDepth = distSq(uCol.rgb, hslToRgb(hue, 1.0, lightness));
    o_color = vec4(uCol.rgb,1.0);
}