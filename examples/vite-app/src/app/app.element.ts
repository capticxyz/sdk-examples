import { Grid } from '@captic/core';
import { Entity, Scene } from 'aframe/src/index';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import './app.element.css';

@customElement('sdk-root')
export class AppElement extends LitElement {
  constructor() {
    super();
  }
  render() {
    console.log('render');
    return html` <cap-world
      .onSceneLoad=${this.onSceneLoad}
      vr-mode-ui='{"enabled": true, "buttonClass": "vrFullscreenIndicator", "buttonTitle": "Enter VR / Fullscreen"}'
      networked-audio
    >
      <template slot="world">
        <cap-cursor></cap-cursor>
        <cap-player></cap-player>
        <cap-player-assets></cap-player-assets>

        <a-entity
          gltf-model-plus="updateMatrix: true; useCache: false; inflate: false; envMap: false; src: assets/rooms/nftshowroom_v0.0.8.glb_high.glb"
          id="showroom"
          position="0 25.00001 -75"
          rotation="0 90 0"
          scale="1 1.5 1"
          shadow="receive:false; cast: false;"
          trimesh-shape="simplifyModifier:true;simplifyModifierReduceFactor:0.1;debug:false;trimSrc: assets/rooms/nftshowroom_v0.0.8_1.glb_trimesh.glb"
        />
        <!-- <a-entity
          gltf-model-plus="updateMatrix: true; useCache: false; inflate: false; envMap: false; src: /assets/rooms/plane_50_50.glb"
          className="navmesh"
          nav-mesh-helper=""
          position="0 11 -75"
          rotation="0 0 0"
          scale="1.5 1 1"
          visible="false"
        /> -->
        <a-entity
          geometry="primitive: sphere; radius: 650;"
          id="sky"
          material="shader: skyGradient; colorTop: #53b9fb; colorBottom: #bfe9f7; side: back"
        ></a-entity>
        <a-plane
          position="0 0 0"
          body="type: static; mass: 0;"
          class="environmentGround"
          color="#000000"
          height="1000"
          material="shader:flat;fog:false;"
          rotation="-90 0 0"
          visible="false"
          width="1000"
        ></a-plane>
        <a-entity
          component-screenshare=""
          position="0 -4 0"
          rotation="0 270 0"
          scale="3 3 3"
          visible="true"
        />
      </template>
    </cap-world>`;
  }

  protected override createRenderRoot(): Element | ShadowRoot {
    return this;
  }
  onSceneLoad = () => {
    const ascene = document.querySelector('a-scene') as Scene;
    const grid = new Grid();
    grid.matrixAutoUpdate = false;
    const entity = document.createElement('a-entity') as Entity;
    entity.setObject3D('Mesh', grid);
    // @ts-expect-error add not defined in types
    ascene.add(entity);

    const sky = document.querySelector('#sky') as Entity;
    if (sky) {
      sky.object3D.renderOrder = 1;
      sky.object3D.matrixAutoUpdate = false;
    }
  };
}
