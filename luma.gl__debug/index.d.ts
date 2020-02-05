//typings for @luma.gl/debug v8.0.3
declare module '@luma.gl/debug/glsl-to-js-compiler/normalize-uniforms' {
	/**
	 * Given a list of uniform definitions, return source code for normalization
	 */
	export function getUniformNormalizer(uniforms: any): string;

}
declare module '@luma.gl/debug/glsl-to-js-compiler/compile-shader' {
	export function compileShaderModule(moduleName: any, source: any): any;
	export function compileVertexShader(shaderName: any, source: any): any;
	export function compileFragmentShader(shaderName: any, source: any): any;

}
declare module '@luma.gl/debug/glsl-to-js-compiler/draw-model' {
	export const COLOR_MODE: {
	    NONE: number;
	    DEPTH: number;
	    FRAGMENT: number;
	}; const _default: ({ model, draw, colorMode }: {
	    model: any;
	    draw: any;
	    colorMode?: number;
	}) => void;
	export default _default;

}
declare module '@luma.gl/debug/glsl-to-js-compiler/debug-context' {
	export default class DebugContext {
	    constructor(sourceCanvas: any);
	    clear(opts?: {}): void;
	    drawModel(model: any, opts: any): void;
	    _draw({ drawMode, indices, positions, colors }: {
	        drawMode: any;
	        indices: any;
	        positions: any;
	        colors: any;
	    }): void;
	    _createCanvas(container: any): HTMLCanvasElement;
	    _clipspaceToScreen(position: any): number[];
	    _rgbaToColor(color: any): any;
	    _drawPoint(i: any): void;
	    _drawLine(i0: any, i1: any): void;
	    _drawTriangle(i0: any, i1: any, i2: any): void;
	}

}
declare module '@luma.gl/debug/webgl-api-tracing/webgl-debug-context' {
	export function makeDebugContext(gl: any, { debug, throwOnError, break: breakpoints }?: {
	    debug?: boolean;
	    throwOnError?: boolean;
	    break?: boolean;
	}): any;

}
declare module '@luma.gl/debug' {
	export { COLOR_MODE } from '@luma.gl/debug/glsl-to-js-compiler/draw-model';
	export { default as _DebugContext } from '@luma.gl/debug/glsl-to-js-compiler/debug-context';
	export { compileShaderModule, compileVertexShader, compileFragmentShader } from '@luma.gl/debug/glsl-to-js-compiler/compile-shader';
	export { makeDebugContext } from '@luma.gl/debug/webgl-api-tracing/webgl-debug-context';

}
