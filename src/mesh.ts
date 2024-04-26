import { Shader } from "./shader";

export function createPlaneMesh(gl: WebGLRenderingContext): WebGLBuffer {
    return create2dmesh(gl, [
        -1, -1, 0, 0,
        -1, +1, 0, 0,
        +1, +1, 0, 0,
        +1, +1, 0, 0,
        -1, -1, 0, 0,
        +1, -1, 0, 0
    ]);
}

export function create2dmesh(gl: WebGLRenderingContext, data: number[]): WebGLBuffer {
    const floats = new Float32Array(data);
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, floats, WebGLRenderingContext.STATIC_DRAW);
    return vbo as WebGLBuffer;
}


export function draw2dmesh(gl: WebGLRenderingContext, vbo: WebGLBuffer, length: number, shader: Shader, mode: number = gl.TRIANGLES) {
    const bytesPerElem = Float32Array.BYTES_PER_ELEMENT;
    const stride = bytesPerElem * 4;

    gl.enableVertexAttribArray(0);
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.vertexAttribPointer(shader.aPos, 3, gl.FLOAT, false, stride, 0); // still not 2d

    gl.drawArrays(mode, 0, length);
}