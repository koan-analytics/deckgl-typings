//typings for deck.gl v8.0.12
declare module 'deck.gl' {
	export { COORDINATE_SYSTEM, Deck, Layer, CompositeLayer, View, MapView, FirstPersonView, OrbitView, OrthographicView, Viewport, WebMercatorViewport, Controller, MapController, OrbitController, FirstPersonController, OrthographicController, AttributeManager, picking, project, project32, gouraudLighting, phongLighting, shadow, LayerManager, DeckRenderer, log, TRANSITION_EVENTS, LinearInterpolator, FlyToInterpolator, Effect, LightingEffect, PostProcessEffect, AmbientLight, PointLight, DirectionalLight, LayerExtension, Tesselator, fp64LowPart, createIterable } from '@deck.gl/core';
	export { ArcLayer, BitmapLayer, IconLayer, LineLayer, PointCloudLayer, ScatterplotLayer, GridCellLayer, ColumnLayer, PathLayer, PolygonLayer, SolidPolygonLayer, GeoJsonLayer, TextLayer } from '@deck.gl/layers';
	export { ScreenGridLayer, CPUGridLayer, HexagonLayer, ContourLayer, GridLayer, GPUGridLayer, AGGREGATION_OPERATION, HeatmapLayer } from '@deck.gl/aggregation-layers';
	export { GreatCircleLayer, S2Layer, H3ClusterLayer, H3HexagonLayer, TileLayer, TripsLayer, Tile3DLayer } from '@deck.gl/geo-layers';
	export { SimpleMeshLayer, ScenegraphLayer } from '@deck.gl/mesh-layers';
	export { default, DeckGL } from '@deck.gl/react';

}
