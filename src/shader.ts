export type Shader = {
    useProgram: () => void,
    setColour: (col: [number, number, number, number]) => void,
    aPos: number
}


export function createShader(gl: WebGL2RenderingContext, vert: string, frag: string): Shader | undefined {
    var v = compileShader(gl, vert, gl.VERTEX_SHADER);
    var f = compileShader(gl, frag, gl.FRAGMENT_SHADER);
    const program = gl.createProgram();
    if (program) {
        gl.attachShader(program, v);
        gl.attachShader(program, f);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.log("Shader linking failed", gl.getProgramInfoLog(program));
        }

        // attribs
        gl.useProgram(program);
        const aPos = gl.getAttribLocation(program, "aPos");
        gl.enableVertexAttribArray(aPos);

        // uniforms
        const uCol = gl.getUniformLocation(program, "uCol");

        return {
            useProgram: () => gl.useProgram(program),
            setColour: (col) => gl.uniform4fv(uCol, col),
            aPos
        }
    }
}

function compileShader(gl: WebGL2RenderingContext, txt: string, type: number): WebGLShader {
    var sh = gl.createShader(type) as WebGLShader;
    gl.shaderSource(sh, txt);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.log("Shader compilation failed. Type: " + type, gl.getShaderInfoLog(sh));
    }
    return sh;
}