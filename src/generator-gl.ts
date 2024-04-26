import { RGB, parsePalette } from "./colour-utils";
import { createPlaneMesh, draw2dmesh } from "./mesh";
import { Shader, createShader } from "./shader";

// This relies on the fragment shader writing depth, thanks to https://github.com/aadebdeb/Sample_WebGL2_FragDepth

export class GeneratorGl {
    private gl: WebGL2RenderingContext;
    private plane: WebGLBuffer;
    private shader:Shader | undefined;
    private initialised = false;

    private init() {
        const canvas = document.querySelector("canvas") as HTMLCanvasElement;
        this.gl = canvas.getContext("webgl2") as WebGL2RenderingContext;
        this.shader = createShader(this.gl,`#version 300 es

        in vec3 aPos;

        void main(void)
        {
            gl_Position = vec4(aPos, 1.0);
        }
        `,`#version 300 es
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
            vec3 aa = uCol.rgb;
            float hue  = gl_FragCoord.x / 360.0;
            float lightness  = gl_FragCoord.y / 100.0;
            aa = hslToRgb(hue, 1.0, lightness);
            gl_FragDepth = distSq(uCol.rgb,aa);
            o_color = vec4(uCol.rgb,1.0);
        }
        `)
        this.plane = createPlaneMesh(this.gl);
    }
    public render(colours:RGB[]) {
        if (!this.initialised) {
            this.initialised = true;
            this.init();
        }

        const {gl, shader,plane} = this;

        gl.clearColor(colours[0][0],colours[0][1],colours[0][2],1);
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

        gl.disable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);

        if(shader){
            shader.useProgram();

            colours.forEach(col=>{
                // todo set colour
                shader.setColour([...col,1])
                draw2dmesh(gl,plane,6,shader);
                console.log("M")
            })
        }
    }

    public reset(colours:string[]){
        const rgb = colours.map(parsePalette).map(([r,g,b])=>[r/255,g/255,b/255] as RGB);
        this.render(rgb);
    }
}

export const GL_GENERATOR = new GeneratorGl();