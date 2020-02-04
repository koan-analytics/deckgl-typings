//typings for @deck.gl/geo-layers v8.0.12
declare module '@deck.gl/geo-layers/great-circle-layer/great-circle-vertex.glsl' {
	 const _default: "#define SHADER_NAME great-circle-layer-vertex-shader\n\nattribute vec3 positions;\nattribute vec4 instanceSourceColors;\nattribute vec4 instanceTargetColors;\nattribute vec3 instanceSourcePositions;\nattribute vec3 instanceSourcePositions64Low;\nattribute vec3 instanceTargetPositions;\nattribute vec3 instanceTargetPositions64Low;\nattribute vec3 instancePickingColors;\nattribute float instanceWidths;\n\nuniform float numSegments;\nuniform float opacity;\nuniform float widthScale;\nuniform float widthMinPixels;\nuniform float widthMaxPixels;\n\nvarying vec4 vColor;\nvarying vec2 uv;\n\n// offset vector by strokeWidth pixels\n// offset_direction is -1 (left) or 1 (right)\nvec2 getExtrusionOffset(vec2 line_clipspace, float offset_direction, float width) {\n  // normalized direction of the line\n  vec2 dir_screenspace = normalize(line_clipspace * project_uViewportSize);\n  // rotate by 90 degrees\n  dir_screenspace = vec2(-dir_screenspace.y, dir_screenspace.x);\n\n  return dir_screenspace * offset_direction * width / 2.0;\n}\n\nfloat getSegmentRatio(float index) {\n  return smoothstep(0.0, 1.0, index / (numSegments - 1.0));\n}\n\n// get angular distance in radian\nfloat getAngularDist (vec2 source, vec2 target) {\n  vec2 delta = source - target;\n  vec2 sin_half_delta = sin(delta / 2.0);\n  float a =\n    sin_half_delta.y * sin_half_delta.y +\n    cos(source.y) * cos(target.y) *\n    sin_half_delta.x * sin_half_delta.x;\n  return 2.0 * atan(sqrt(a), sqrt(1.0 - a));\n}\n\nvec2 interpolate (vec2 source, vec2 target, float angularDist, float t) {\n  // if the angularDist is PI, linear interpolation is applied. otherwise, use spherical interpolation\n  if(abs(angularDist - PI) < 0.001) {\n    return (1.0 - t) * source + t * target;\n  }\n\n  float a = sin((1.0 - t) * angularDist) / sin(angularDist);\n  float b = sin(t * angularDist) / sin(angularDist);\n  vec2 sin_source = sin(source);\n  vec2 cos_source = cos(source);\n  vec2 sin_target = sin(target);\n  vec2 cos_target = cos(target);\n\n  float x = a * cos_source.y * cos_source.x + b * cos_target.y * cos_target.x;\n  float y = a * cos_source.y * sin_source.x + b * cos_target.y * sin_target.x;\n  float z = a * sin_source.y + b * sin_target.y;\n  return vec2(atan(y, x), atan(z, sqrt(x * x + y * y)));\n}\n\nvoid main(void) {\n  geometry.worldPosition = instanceSourcePositions;\n  geometry.worldPositionAlt = instanceTargetPositions;\n\n  float segmentIndex = positions.x;\n  float segmentRatio = getSegmentRatio(segmentIndex);\n  uv = vec2(segmentRatio, positions.y);\n  geometry.uv = uv;\n  geometry.pickingColor = instancePickingColors;\n  \n  // if it's the first point, use next - current as direction\n  // otherwise use current - prev\n  float indexDir = mix(-1.0, 1.0, step(segmentIndex, 0.0));\n  float nextSegmentRatio = getSegmentRatio(segmentIndex + indexDir);\n  \n  vec2 source = radians(instanceSourcePositions.xy);\n  vec2 target = radians(instanceTargetPositions.xy);\n  \n  float angularDist = getAngularDist(source, target);\n\n  vec3 currPos = vec3(degrees(interpolate(source, target, angularDist, segmentRatio)), 0.0);\n  vec3 nextPos = vec3(degrees(interpolate(source, target, angularDist, nextSegmentRatio)), 0.0);\n\n  vec3 currPos64Low = mix(instanceSourcePositions64Low, instanceTargetPositions64Low, segmentRatio);\n  vec3 nextPos64Low = mix(instanceSourcePositions64Low, instanceTargetPositions64Low, nextSegmentRatio);\n\n  vec4 curr = project_position_to_clipspace(currPos, currPos64Low, vec3(0.0), geometry.position);\n  vec4 next = project_position_to_clipspace(nextPos, nextPos64Low, vec3(0.0));\n\n  // Multiply out width and clamp to limits\n  // mercator pixels are interpreted as screen pixels\n  float widthPixels = clamp(\n    project_size_to_pixel(instanceWidths * widthScale),\n    widthMinPixels, widthMaxPixels\n  );\n\n  // extrude\n  vec3 offset = vec3(\n    getExtrusionOffset((next.xy - curr.xy) * indexDir, positions.y, widthPixels),\n    0.0);\n  DECKGL_FILTER_SIZE(offset, geometry);\n  gl_Position = curr + vec4(project_pixel_size_to_clipspace(offset.xy), 0.0, 0.0);\n  DECKGL_FILTER_GL_POSITION(gl_Position, geometry);\n\n  vec4 color = mix(instanceSourceColors, instanceTargetColors, segmentRatio);\n  vColor = vec4(color.rgb, color.a * opacity);\n  DECKGL_FILTER_COLOR(vColor, geometry);\n}\n";
	export default _default;

}
declare module '@deck.gl/geo-layers/great-circle-layer/great-circle-layer' {
	import { ArcLayer } from '@deck.gl/geo-layers/@deck.gl/layers';
	export default class GreatCircleLayer extends ArcLayer {
	    getShaders(): any;
	}

}
declare module '@deck.gl/geo-layers/s2-layer/s2-utils' {
	export function getS2QuadKey(token: any): any;
	/**
	 * Get a polygon with corner coordinates for an s2 cell
	 * @param {*} cell - This can be an S2 key or token
	 * @return {Array} - a simple polygon in array format: [[lng, lat], ...]
	 *   - each coordinate is an array [lng, lat]
	 *   - the polygon is closed, i.e. last coordinate is a copy of the first coordinate
	 */
	export function getS2Polygon(token: any): Float64Array;

}
declare module '@deck.gl/geo-layers/s2-layer/s2-layer' {
	import { CompositeLayer } from '@deck.gl/geo-layers/@deck.gl/core';
	export default class S2Layer extends CompositeLayer {
	    renderLayers(): any;
	}

}
declare module '@deck.gl/geo-layers/tile-layer/utils/tile' {
	export function tile2latLng(x: any, y: any, z: any): number[];
	export function tile2boundingBox(x: any, y: any, z: any): {
	    west: number;
	    north: number;
	    east: number;
	    south: number;
	};
	export default class Tile {
	    constructor({ getTileData, x, y, z, onTileLoad, onTileError }: {
	        getTileData: any;
	        x: any;
	        y: any;
	        z: any;
	        onTileLoad: any;
	        onTileError: any;
	    });
	    get data(): any;
	    get isLoaded(): any;
	    _loadData(): Promise<any>;
	    isOverlapped(tile: any): boolean;
	}

}
declare module '@deck.gl/geo-layers/tile-layer/utils/viewport-util' {
	/**
	 * Returns all tile indices in the current viewport. If the current zoom level is smaller
	 * than minZoom, return an empty array. If the current zoom level is greater than maxZoom,
	 * return tiles that are on maxZoom.
	 */
	export function getTileIndices(viewport: any, maxZoom: any, minZoom: any): any[];

}
declare module '@deck.gl/geo-layers/tile-layer/utils/tile-cache' {
	/**
	 * Manages loading and purging of tiles data. This class caches recently visited tiles
	 * and only create new tiles if they are present.
	 */
	export default class TileCache {
	    /**
	     * Takes in a function that returns tile data, a cache size, and a max and a min zoom level.
	     * Cache size defaults to 5 * number of tiles in the current viewport
	     */
	    constructor({ getTileData, maxSize, maxZoom, minZoom, onTileLoad, onTileError }: {
	        getTileData: any;
	        maxSize: any;
	        maxZoom: any;
	        minZoom: any;
	        onTileLoad: any;
	        onTileError: any;
	    });
	    get tiles(): any;
	    /**
	     * Clear the current cache
	     */
	    finalize(): void;
	    /**
	     * Update the cache with the given viewport and triggers callback onUpdate.
	     * @param {*} viewport
	     * @param {*} onUpdate
	     */
	    update(viewport: any): void;
	    /**
	     * Clear tiles that are not visible when the cache is full
	     */
	    _resizeCache(maxSize: any): void;
	    _markOldTiles(): void;
	    _getTile(x: any, y: any, z: any): any;
	    _getTileId(x: any, y: any, z: any): string;
	}

}
declare module '@deck.gl/geo-layers/tile-layer/tile-layer' {
	import { CompositeLayer } from '@deck.gl/geo-layers/@deck.gl/core';
	export default class TileLayer extends CompositeLayer {
	    initializeState(): void;
	    shouldUpdateState({ changeFlags }: {
	        changeFlags: any;
	    }): any;
	    updateState({ props, oldProps, context, changeFlags }: {
	        props: any;
	        oldProps: any;
	        context: any;
	        changeFlags: any;
	    }): void;
	    _onTileLoad(): void;
	    _onTileError(error: any): void;
	    getPickingInfo({ info, sourceLayer }: {
	        info: any;
	        sourceLayer: any;
	    }): any;
	    getLayerZoomLevel(): number;
	    renderLayers(): any;
	}

}
declare module '@deck.gl/geo-layers/trips-layer/trips-layer' {
	import { PathLayer } from '@deck.gl/geo-layers/@deck.gl/layers';
	export default class TripsLayer extends PathLayer {
	    getShaders(): any;
	    initializeState(params: any): void;
	    draw(params: any): void;
	}

}
declare module '@deck.gl/geo-layers/h3-layers/h3-cluster-layer' {
	import { CompositeLayer } from '@deck.gl/geo-layers/@deck.gl/core';
	export default class H3ClusterLayer extends CompositeLayer {
	    updateState({ props, oldProps, changeFlags }: {
	        props: any;
	        oldProps: any;
	        changeFlags: any;
	    }): void;
	    renderLayers(): any;
	}

}
declare module '@deck.gl/geo-layers/h3-layers/h3-hexagon-layer' {
	import { CompositeLayer } from '@deck.gl/geo-layers/@deck.gl/core';
	export function normalizeLongitudes(vertices: any, refLng: any): void;
	export function scalePolygon(hexId: any, vertices: any, factor: any): void;
	/**
	 * A subclass of HexagonLayer that uses H3 hexagonIds in data objects
	 * rather than centroid lat/longs. The shape of each hexagon is determined
	 * based on a single "center" hexagon, which can be selected by passing in
	 * a center lat/lon pair. If not provided, the map center will be used.
	 *
	 * Also sets the `hexagonId` field in the onHover/onClick callback's info
	 * objects. Since this is calculated using math, hexagonId will be present
	 * even when no corresponding hexagon is in the data set. You can check
	 * index !== -1 to see if picking matches an actual object.
	 */
	export default class H3HexagonLayer extends CompositeLayer {
	    shouldUpdateState({ changeFlags }: {
	        changeFlags: any;
	    }): any;
	    updateState({ props, oldProps, changeFlags }: {
	        props: any;
	        oldProps: any;
	        changeFlags: any;
	    }): void;
	    _shouldUseHighPrecision(): any;
	    _updateVertices(viewport: any): void;
	    renderLayers(): any;
	    _getForwardProps(): {
	        elevationScale: any;
	        extruded: any;
	        coverage: any;
	        wireframe: any;
	        stroked: any;
	        filled: any;
	        lineWidthUnits: any;
	        lineWidthScale: any;
	        lineWidthMinPixels: any;
	        lineWidthMaxPixels: any;
	        material: any;
	        getElevation: any;
	        getFillColor: any;
	        getLineColor: any;
	        getLineWidth: any;
	        updateTriggers: {
	            getFillColor: any;
	            getElevation: any;
	            getLineColor: any;
	            getLineWidth: any;
	        };
	    };
	    _renderPolygonLayer(): any;
	    _renderColumnLayer(): any;
	}

}
declare module '@deck.gl/geo-layers/tile-3d-layer/tile-3d-layer' {
	import { CompositeLayer } from '@deck.gl/geo-layers/@deck.gl/core';
	export default class Tile3DLayer extends CompositeLayer {
	    initializeState(): void;
	    shouldUpdateState({ changeFlags }: {
	        changeFlags: any;
	    }): any;
	    updateState({ props, oldProps, changeFlags }: {
	        props: any;
	        oldProps: any;
	        changeFlags: any;
	    }): void;
	    _loadTileset(tilesetUrl: any, fetchOptions: any, ionMetadata: any): Promise<void>;
	    _loadTilesetFromIon(ionAccessToken: any, ionAssetId: any): Promise<void>;
	    _updateTileset(tileset3d: any): void;
	    _updateLayerMap(frameNumber: any): void;
	    _selectLayers(frameNumber: any): void;
	    _create3DTileLayer(tileHeader: any): any;
	    _create3DModelTileLayer(tileHeader: any): any;
	    _createPointCloudTileLayer(tileHeader: any): any;
	    renderLayers(): any;
	}

}
declare module '@deck.gl/geo-layers' {
	export { default as GreatCircleLayer } from '@deck.gl/geo-layers/great-circle-layer/great-circle-layer';
	export { default as S2Layer } from '@deck.gl/geo-layers/s2-layer/s2-layer';
	export { default as TileLayer } from '@deck.gl/geo-layers/tile-layer/tile-layer';
	export { default as TripsLayer } from '@deck.gl/geo-layers/trips-layer/trips-layer';
	export { default as H3ClusterLayer } from '@deck.gl/geo-layers/h3-layers/h3-cluster-layer';
	export { default as H3HexagonLayer } from '@deck.gl/geo-layers/h3-layers/h3-hexagon-layer';
	export { default as Tile3DLayer } from '@deck.gl/geo-layers/tile-3d-layer/tile-3d-layer';

}
