//typings for @deck.gl/mesh-layers v8.0.12
declare module '@deck.gl/mesh-layers/utils/matrix' {
	export const MATRIX_ATTRIBUTES: {
	    size: number;
	    accessor: string[];
	    shaderAttributes: {
	        instanceModelMatrix__LOCATION_0: {
	            size: number;
	            elementOffset: number;
	        };
	        instanceModelMatrix__LOCATION_1: {
	            size: number;
	            elementOffset: number;
	        };
	        instanceModelMatrix__LOCATION_2: {
	            size: number;
	            elementOffset: number;
	        };
	        instanceTranslation: {
	            size: number;
	            elementOffset: number;
	        };
	    };
	    update(attribute: any, { startRow, endRow }: {
	        startRow: any;
	        endRow: any;
	    }): void;
	};
	export function shouldComposeModelMatrix(viewport: any, coordinateSystem: any): boolean;

}
declare module '@deck.gl/mesh-layers/simple-mesh-layer/simple-mesh-layer-vertex.glsl1' {
	 const _default: "\n#define SHADER_NAME simple-mesh-layer-vs\n\n// Scale the model\nuniform float sizeScale;\nuniform bool composeModelMatrix;\n\n// Primitive attributes\nattribute vec3 positions;\nattribute vec3 normals;\nattribute vec2 texCoords;\n\n// Instance attributes\nattribute vec3 instancePositions;\nattribute vec3 instancePositions64Low;\nattribute vec4 instanceColors;\nattribute vec3 instancePickingColors;\nattribute mat3 instanceModelMatrix;\nattribute vec3 instanceTranslation;\n\n// Outputs to fragment shader\nvarying vec2 vTexCoord;\nvarying vec3 cameraPosition;\nvarying vec3 normals_commonspace;\nvarying vec4 position_commonspace;\nvarying vec4 vColor;\n\nvoid main(void) {\n  geometry.worldPosition = instancePositions;\n  geometry.uv = texCoords;\n  geometry.pickingColor = instancePickingColors;\n\n  vTexCoord = texCoords;\n  cameraPosition = project_uCameraPosition;\n  normals_commonspace = project_normal(instanceModelMatrix * normals);\n  vColor = instanceColors;\n  geometry.normal = normals_commonspace;\n\n  vec3 pos = (instanceModelMatrix * positions) * sizeScale + instanceTranslation;\n  \n  if (composeModelMatrix) {\n    DECKGL_FILTER_SIZE(pos, geometry);\n    gl_Position = project_position_to_clipspace(pos + instancePositions, instancePositions64Low, vec3(0.0), position_commonspace);\n  }\n  else {\n    pos = project_size(pos);\n    DECKGL_FILTER_SIZE(pos, geometry);\n    gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, pos, position_commonspace);\n  }\n\n  geometry.position = position_commonspace;\n  DECKGL_FILTER_GL_POSITION(gl_Position, geometry);\n\n  DECKGL_FILTER_COLOR(vColor, geometry);\n}\n";
	export default _default;

}
declare module '@deck.gl/mesh-layers/simple-mesh-layer/simple-mesh-layer-fragment.glsl1' {
	 const _default: "\n#define SHADER_NAME simple-mesh-layer-fs\n\n// Note(Tarek): headless-gl supports derivatives, but doesn't report it via getExtension. Awesome!\n#ifdef DERIVATIVES\n#define FLAT_SHADE_NORMAL normalize(cross(dFdx(position_commonspace.xyz), dFdy(position_commonspace.xyz)))\n#else\n#define FLAT_SHADE_NORMAL vec3(0.0, 0.0, 1.0)\n#endif\n\nprecision highp float;\n\nuniform bool hasTexture;\nuniform sampler2D sampler;\nuniform bool flatShading;\nuniform float opacity;\n\nvarying vec2 vTexCoord;\nvarying vec3 cameraPosition;\nvarying vec3 normals_commonspace;\nvarying vec4 position_commonspace;\nvarying vec4 vColor;\n\nvoid main(void) {\n  geometry.uv = vTexCoord;\n\n  vec3 normal;\n  if (flatShading) {\n    normal = FLAT_SHADE_NORMAL;\n  } else {\n    normal = normals_commonspace;\n  }\n\n  vec4 color = hasTexture ? texture2D(sampler, vTexCoord) : vColor;\n  vec3 lightColor = lighting_getLightColor(color.rgb, cameraPosition, position_commonspace.xyz, normal);\n  gl_FragColor = vec4(lightColor, color.a * opacity);\n\n  DECKGL_FILTER_COLOR(gl_FragColor, geometry);\n}\n";
	export default _default;

}
declare module '@deck.gl/mesh-layers/simple-mesh-layer/simple-mesh-layer-vertex.glsl' {
	 const _default: "#version 300 es\n#define SHADER_NAME simple-mesh-layer-vs\n\n// Scale the model\nuniform float sizeScale;\nuniform bool composeModelMatrix;\n\n// Primitive attributes\nin vec3 positions;\nin vec3 normals;\nin vec2 texCoords;\n\n// Instance attributes\nin vec3 instancePositions;\nin vec3 instancePositions64Low;\nin vec4 instanceColors;\nin vec3 instancePickingColors;\nin mat3 instanceModelMatrix;\nin vec3 instanceTranslation;\n\n// Outputs to fragment shader\nout vec2 vTexCoord;\nout vec3 cameraPosition;\nout vec3 normals_commonspace;\nout vec4 position_commonspace;\nout vec4 vColor;\n\nvoid main(void) {\n  geometry.worldPosition = instancePositions;\n  geometry.uv = texCoords;\n  geometry.pickingColor = instancePickingColors;\n\n  vTexCoord = texCoords;\n  cameraPosition = project_uCameraPosition;\n  normals_commonspace = project_normal(instanceModelMatrix * normals);\n  vColor = instanceColors;\n  geometry.normal = normals_commonspace;\n\n  vec3 pos = (instanceModelMatrix * positions) * sizeScale + instanceTranslation;\n\n  if (composeModelMatrix) {\n    DECKGL_FILTER_SIZE(pos, geometry);\n    gl_Position = project_position_to_clipspace(pos + instancePositions, instancePositions64Low, vec3(0.0), position_commonspace);\n  }\n  else {\n    pos = project_size(pos);\n    DECKGL_FILTER_SIZE(pos, geometry);\n    gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, pos, position_commonspace);\n  }\n\n  geometry.position = position_commonspace;\n  DECKGL_FILTER_GL_POSITION(gl_Position, geometry);\n\n  DECKGL_FILTER_COLOR(vColor, geometry);\n}\n";
	export default _default;

}
declare module '@deck.gl/mesh-layers/simple-mesh-layer/simple-mesh-layer-fragment.glsl' {
	 const _default: "#version 300 es\n#define SHADER_NAME simple-mesh-layer-fs\n\nprecision highp float;\n\nuniform bool hasTexture;\nuniform sampler2D sampler;\nuniform bool flatShading;\nuniform float opacity;\n\nin vec2 vTexCoord;\nin vec3 cameraPosition;\nin vec3 normals_commonspace;\nin vec4 position_commonspace;\nin vec4 vColor;\n\nout vec4 fragColor;\n\nvoid main(void) {\n  geometry.uv = vTexCoord;\n\n  vec3 normal;\n  if (flatShading) {\n    normal = normalize(cross(dFdx(position_commonspace.xyz), dFdy(position_commonspace.xyz)));\n  } else {\n    normal = normals_commonspace;\n  }\n\n  vec4 color = hasTexture ? texture(sampler, vTexCoord) : vColor;\n  vec3 lightColor = lighting_getLightColor(color.rgb, cameraPosition, position_commonspace.xyz, normal);\n  fragColor = vec4(lightColor, color.a * opacity);\n\n  DECKGL_FILTER_COLOR(fragColor, geometry);\n}\n";
	export default _default;

}
declare module '@deck.gl/mesh-layers/simple-mesh-layer/simple-mesh-layer' {
	import { Layer } from '@deck.gl/mesh-layers/@deck.gl/core';
	export default class SimpleMeshLayer extends Layer {
	    getShaders(): any;
	    initializeState(): void;
	    updateState({ props, oldProps, changeFlags }: {
	        props: any;
	        oldProps: any;
	        changeFlags: any;
	    }): void;
	    finalizeState(): void;
	    draw({ uniforms }: {
	        uniforms: any;
	    }): void;
	    getModel(mesh: any): any;
	    setTexture(image: any): void;
	}

}
declare module '@deck.gl/mesh-layers/scenegraph-layer/gltf-utils' {
	export function waitForGLTFAssets(gltfObjects: any): Promise<void>;

}
declare module '@deck.gl/mesh-layers/scenegraph-layer/scenegraph-layer-vertex.glsl' {
	 const _default: "#if (__VERSION__ < 300)\n  #define _attribute attribute\n  #define _varying varying\n#else\n  #define _attribute in\n#define _varying out\n#endif\n\n// Instance attributes\n_attribute vec3 instancePositions;\n_attribute vec3 instancePositions64Low;\n_attribute vec4 instanceColors;\n_attribute vec3 instancePickingColors;\n_attribute mat3 instanceModelMatrix;\n_attribute vec3 instanceTranslation;\n\n// Uniforms\nuniform float sizeScale;\nuniform float sizeMinPixels;\nuniform float sizeMaxPixels;\nuniform mat4 sceneModelMatrix;\nuniform bool composeModelMatrix;\n\n// Attributes\n_attribute vec4 POSITION;\n\n#ifdef HAS_UV\n  _attribute vec2 TEXCOORD_0;\n#endif\n\n#ifdef MODULE_PBR\n  #ifdef HAS_NORMALS\n    _attribute vec4 NORMAL;\n  #endif\n#endif\n\n// Varying\n_varying vec4 vColor;\n\n// MODULE_PBR contains all the varying definitions needed\n#ifndef MODULE_PBR\n  #ifdef HAS_UV\n    _varying vec2 vTEXCOORD_0;\n  #endif\n#endif\n\n// Main\nvoid main(void) {\n  #if defined(HAS_UV) && !defined(MODULE_PBR)\n    vTEXCOORD_0 = TEXCOORD_0;\n    geometry.uv = vTEXCOORD_0;\n  #endif\n\n  geometry.worldPosition = instancePositions;\n  geometry.pickingColor = instancePickingColors;\n\n  #ifdef MODULE_PBR\n    // set PBR data\n    #ifdef HAS_NORMALS\n      pbr_vNormal = project_normal(instanceModelMatrix * (sceneModelMatrix * vec4(NORMAL.xyz, 0.0)).xyz);\n      geometry.normal = pbr_vNormal;\n    #endif\n\n    #ifdef HAS_UV\n      pbr_vUV = TEXCOORD_0;\n    #else\n      pbr_vUV = vec2(0., 0.);\n    #endif    \n    geometry.uv = pbr_vUV;\n  #endif\n\n  float originalSize = project_size_to_pixel(sizeScale);\n  float clampedSize = clamp(originalSize, sizeMinPixels, sizeMaxPixels);\n\n  vec3 pos = (instanceModelMatrix * (sceneModelMatrix * POSITION).xyz) * sizeScale * (clampedSize / originalSize) + instanceTranslation;\n  if(composeModelMatrix) {\n    DECKGL_FILTER_SIZE(pos, geometry);\n    gl_Position = project_position_to_clipspace(pos + instancePositions, instancePositions64Low, vec3(0.0), geometry.position);\n  }\n  else {\n    pos = project_size(pos);\n    DECKGL_FILTER_SIZE(pos, geometry);\n    gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, pos, geometry.position);\n  }\n  DECKGL_FILTER_GL_POSITION(gl_Position, geometry);\n\n  #ifdef MODULE_PBR\n    // set PBR data\n    pbr_vPosition = geometry.position.xyz;\n  #endif\n\n  vColor = instanceColors;\n  DECKGL_FILTER_COLOR(vColor, geometry);\n}\n";
	export default _default;

}
declare module '@deck.gl/mesh-layers/scenegraph-layer/scenegraph-layer-fragment.glsl' {
	 const _default: "#if (__VERSION__ < 300)\n  #define _varying varying\n  #define _texture2D texture2D\n  #define fragmentColor gl_FragColor\n#else\n  #define _varying in\n  #define _texture2D texture\n  out vec4 fragmentColor;\n#endif\n\n// Uniforms\nuniform float opacity;\n\n// Varying\n_varying vec4 vColor;\n\n// MODULE_PBR contains all the varying definitions needed\n#ifndef MODULE_PBR\n  #if defined(HAS_UV) && defined(HAS_BASECOLORMAP)\n    _varying vec2 vTEXCOORD_0;\n    uniform sampler2D u_BaseColorSampler;\n  #endif\n#endif\n\nvoid main(void) {\n  #ifdef MODULE_PBR\n    fragmentColor = vColor * pbr_filterColor(vec4(0));\n    geometry.uv = pbr_vUV;\n  #else\n    #if defined(HAS_UV) && defined(HAS_BASECOLORMAP)\n      fragmentColor = vColor * _texture2D(u_BaseColorSampler, vTEXCOORD_0);\n      geometry.uv = vTEXCOORD_0;\n    #else\n      fragmentColor = vColor;\n    #endif\n  #endif\n\n  fragmentColor.a *= opacity;\n  DECKGL_FILTER_COLOR(fragmentColor, geometry);\n}\n";
	export default _default;

}
declare module '@deck.gl/mesh-layers/scenegraph-layer/scenegraph-layer' {
	import { Layer } from '@deck.gl/mesh-layers/@deck.gl/core';
	export default class ScenegraphLayer extends Layer {
	    initializeState(): void;
	    updateState(params: any): void;
	    finalizeState(): void;
	    _updateScenegraph(props: any): void;
	    _applyAllAttributes(scenegraph: any): void;
	    _applyAnimationsProp(scenegraph: any, animator: any, animationsProp: any): void;
	    _deleteScenegraph(): void;
	    addVersionToShader(source: any): any;
	    getLoadOptions(): {
	        gl: any;
	        waitForFullLoad: boolean;
	        imageBasedLightingEnvironment: any;
	        modelOptions: {
	            vs: any;
	            fs: any;
	            modules: any[];
	            isInstanced: boolean;
	        };
	        useTangents: boolean;
	    };
	    updateAttributes(changedAttributes: any): void;
	    draw({ moduleParameters, parameters, context }: {
	        moduleParameters?: any;
	        parameters?: {};
	        context: any;
	    }): void;
	}

}
declare module '@deck.gl/mesh-layers' {
	export { default as SimpleMeshLayer } from '@deck.gl/mesh-layers/simple-mesh-layer/simple-mesh-layer';
	export { default as ScenegraphLayer } from '@deck.gl/mesh-layers/scenegraph-layer/scenegraph-layer';

}
