import { RGB, parsePalette } from "./colour-utils";
import { createPlaneMesh, draw2dmesh } from "./mesh";
import { Shader, createShader } from "./shader";
//@ts-ignore
import  vert from './shaders/vert.glsl';
//@ts-ignore
import fragHsl from './shaders/frag.hsl.glsl';

// This relies on the fragment shader writing depth, thanks to https://github.com/aadebdeb/Sample_WebGL2_FragDepth

export class GeneratorGl {
    private gl: WebGL2RenderingContext;
    private plane: WebGLBuffer;
    private shader: Shader | undefined;
    private initialised = false;
    private colours:RGB[] = [[0,0,0]];

    private init() {
        const canvas = document.querySelector("canvas") as HTMLCanvasElement;
        this.gl = canvas.getContext("webgl2") as WebGL2RenderingContext;
        this.shader = createShader(this.gl, vert, fragHsl);
        this.plane = createPlaneMesh(this.gl);
    }
    public render() {
        if (!this.initialised) {
            this.initialised = true;
            this.init();
        }

        const { gl, shader, plane, colours } = this;

        gl.clearColor(colours[0][0], colours[0][1], colours[0][2], 1);
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

        gl.disable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);

        if (shader) {
            shader.useProgram();

            colours.forEach(col => {
                // todo set colour
                shader.setColour([...col, 1])
                draw2dmesh(gl, plane, 6, shader);
                console.log("M")
            })
        }
    }

    public reset(colours: string[]) {
        this.colours = colours.map(parsePalette).map(([r, g, b]) => [r / 255, g / 255, b / 255] as RGB);
        this.render();
    }
}

export const GL_GENERATOR = new GeneratorGl();