//typings for @deck.gl/extensions v8.0.12
declare module '@deck.gl/extensions/brushing/shader-module' {
	 const _default: {
	    name: string;
	    dependencies: any[];
	    vs: string;
	    fs: string;
	    inject: {
	        'vs:DECKGL_FILTER_GL_POSITION': string;
	        'fs:DECKGL_FILTER_COLOR': string;
	    };
	    getUniforms: (opts: any) => {
	        brushing_enabled?: undefined;
	        brushing_radius?: undefined;
	        brushing_target?: undefined;
	        brushing_mousePos?: undefined;
	    } | {
	        brushing_enabled: boolean;
	        brushing_radius: any;
	        brushing_target: any;
	        brushing_mousePos: any;
	    };
	};
	export default _default;

}
declare module '@deck.gl/extensions/brushing/brushing' {
	import { LayerExtension } from '@deck.gl/core';
	export default class BrushingExtension extends LayerExtension {
	    getShaders(extension: any): {
	        modules: {
	            name: string;
	            dependencies: any[];
	            vs: string;
	            fs: string;
	            inject: {
	                'vs:DECKGL_FILTER_GL_POSITION': string;
	                'fs:DECKGL_FILTER_COLOR': string;
	            };
	            getUniforms: (opts: any) => {
	                brushing_enabled?: undefined;
	                brushing_radius?: undefined;
	                brushing_target?: undefined;
	                brushing_mousePos?: undefined;
	            } | {
	                brushing_enabled: boolean;
	                brushing_radius: any;
	                brushing_target: any;
	                brushing_mousePos: any;
	            };
	        }[];
	    };
	    initializeState(context: any, extension: any): void;
	    finalizeState(extension: any): void;
	    useConstantTargetPositions(attribute: any): void;
	}

}
declare module '@deck.gl/extensions/data-filter/shader-module' {
	 const _default: {
	    name: string;
	    vs: string;
	    fs: string;
	    inject: {
	        'vs:#main-start': string;
	        'vs:DECKGL_FILTER_SIZE': string;
	        'fs:DECKGL_FILTER_COLOR': string;
	    };
	    getUniforms: (opts: any) => {};
	};
	export default _default;

}
declare module '@deck.gl/extensions/data-filter/data-filter' {
	import { LayerExtension } from '@deck.gl/core';
	export default class DataFilterExtension extends LayerExtension {
	    constructor({ filterSize }?: {
	        filterSize?: number;
	    });
	    getShaders(extension: any): {
	        modules: {
	            name: string;
	            vs: string;
	            fs: string;
	            inject: {
	                'vs:#main-start': string;
	                'vs:DECKGL_FILTER_SIZE': string;
	                'fs:DECKGL_FILTER_COLOR': string;
	            };
	            getUniforms: (opts: any) => {};
	        }[];
	        defines: {
	            DATAFILTER_TYPE: any;
	        };
	    };
	    initializeState(context: any, extension: any): void;
	}

}
declare module '@deck.gl/extensions/fp64/project64.glsl' {
	 const _default: "\nconst vec2 WORLD_SCALE_FP64 = vec2(81.4873275756836, 0.0000032873668232014097);\n\nuniform vec2 project_uViewProjectionMatrixFP64[16];\n\n// longitude: lnglat_fp64.xy; latitude: lnglat_fp64.zw\nvoid mercatorProject_fp64(vec4 lnglat_fp64, out vec2 out_val[2]) {\n\n#if defined(NVIDIA_FP64_WORKAROUND)\n  out_val[0] = sum_fp64(radians_fp64(lnglat_fp64.xy), PI_FP64 * ONE);\n#else\n  out_val[0] = sum_fp64(radians_fp64(lnglat_fp64.xy), PI_FP64);\n#endif\n  out_val[1] = sum_fp64(PI_FP64,\n    log_fp64(tan_fp64(sum_fp64(PI_4_FP64, radians_fp64(lnglat_fp64.zw) / 2.0))));\n  return;\n}\n\nvoid project_position_fp64(vec4 position_fp64, out vec2 out_val[2]) {\n  vec2 pos_fp64[2];\n  mercatorProject_fp64(position_fp64, pos_fp64);\n  out_val[0] = mul_fp64(pos_fp64[0], WORLD_SCALE_FP64);\n  out_val[1] = mul_fp64(pos_fp64[1], WORLD_SCALE_FP64);\n\n  return;\n}\n\nvoid project_position_fp64(vec2 position, vec2 position64xyLow, out vec2 out_val[2]) {\n  vec4 position64xy = vec4(\n    position.x, position64xyLow.x,\n    position.y, position64xyLow.y);\n\n  project_position_fp64(position64xy, out_val);\n}\n\nvec4 project_common_position_to_clipspace_fp64(vec2 vertex_pos_modelspace[4]) {\n  vec2 vertex_pos_clipspace[4];\n  mat4_vec4_mul_fp64(project_uViewProjectionMatrixFP64, vertex_pos_modelspace,\n    vertex_pos_clipspace);\n  return vec4(\n    vertex_pos_clipspace[0].x,\n    vertex_pos_clipspace[1].x,\n    vertex_pos_clipspace[2].x,\n    vertex_pos_clipspace[3].x\n    );\n}\n\nvec4 project_position_to_clipspace(\n  vec3 position, vec3 position64xyLow, vec3 offset, out vec4 commonPosition\n) {\n  // This is the local offset to the instance position\n  vec2 offset64[4];\n  vec4_fp64(vec4(offset, 0.0), offset64);\n\n  float z = project_size(position.z);\n\n  // Apply web mercator projection (depends on coordinate system imn use)\n  vec2 projectedPosition64xy[2];\n  project_position_fp64(position.xy, position64xyLow.xy, projectedPosition64xy);\n\n  vec2 commonPosition64[4];\n  commonPosition64[0] = sum_fp64(offset64[0], projectedPosition64xy[0]);\n  commonPosition64[1] = sum_fp64(offset64[1], projectedPosition64xy[1]);\n  commonPosition64[2] = sum_fp64(offset64[2], vec2(z, 0.0));\n  commonPosition64[3] = vec2(1.0, 0.0);\n\n  commonPosition = vec4(projectedPosition64xy[0].x, projectedPosition64xy[1].x, z, 1.0);\n\n  return project_common_position_to_clipspace_fp64(commonPosition64);\n}\n\nvec4 project_position_to_clipspace(\n  vec3 position, vec3 position64xyLow, vec3 offset\n) {\n  vec4 commonPosition;\n  return project_position_to_clipspace(\n    position, position64xyLow, offset, commonPosition\n  );\n}\n";
	export default _default;

}
declare module '@deck.gl/extensions/fp64/project64' {
	 const _default: {
	    name: string;
	    dependencies: any[];
	    vs: string;
	    getUniforms: typeof getUniforms;
	};
	export default _default; function getUniforms(opts?: {}): any;

}
declare module '@deck.gl/extensions/fp64/fp64' {
	import { LayerExtension } from '@deck.gl/core';
	export default class Fp64Extension extends LayerExtension {
	    getShaders(opts: any): {
	        modules: {
	            name: string;
	            dependencies: any[];
	            vs: string;
	            getUniforms: (opts?: {}) => any;
	        }[];
	    };
	}

}
declare module '@deck.gl/extensions/path-style/shaders.glsl' {
	export const dashShaders: {
	    inject: {
	        'vs:#decl': string;
	        'vs:#main-end': string;
	        'fs:#decl': string;
	        'fs:#main-start': string;
	    };
	};

}
declare module '@deck.gl/extensions/path-style/path-style' {
	import { LayerExtension } from '@deck.gl/core';
	export default class PathStyleExtension extends LayerExtension {
	    constructor({ dash }?: {
	        dash?: boolean;
	    });
	    isEnabled(layer: any): any;
	    getShaders(extension: any): {};
	    initializeState(context: any, extension: any): void;
	    updateState(params: any, extension: any): void;
	}

}
declare module '@deck.gl/extensions' {
	export { default as BrushingExtension } from '@deck.gl/extensions/brushing/brushing';
	export { default as DataFilterExtension } from '@deck.gl/extensions/data-filter/data-filter';
	export { default as Fp64Extension } from '@deck.gl/extensions/fp64/fp64';
	export { default as PathStyleExtension } from '@deck.gl/extensions/path-style/path-style';
	export { default as project64 } from '@deck.gl/extensions/fp64/project64';

}
