#version 300 es

in vec3 aPos;

void main(void)
{
    gl_Position = vec4(aPos, 1.0);
}