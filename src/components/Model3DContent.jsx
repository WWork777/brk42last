"use client";

import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Line,
  Html,
  useProgress,
  AdaptiveDpr,
  AdaptiveEvents,
  Preload,
} from "@react-three/drei";
import * as THREE from "three";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ fontSize: 14, fontWeight: 600 }}>
        {Math.round(progress)}%
      </div>
    </Html>
  );
}

const ThickAxesHelper = ({ size = 10 }) => (
  <>
    <Line
      points={[
        [-size, 0, 0],
        [size, 0, 0],
      ]}
      color="red"
      lineWidth={2}
    />
    <Line
      points={[
        [0, -size, 0],
        [0, size, 0],
      ]}
      color="green"
      lineWidth={2}
    />
    <Line
      points={[
        [0, 0, -size],
        [0, 0, size],
      ]}
      color="blue"
      lineWidth={2}
    />
  </>
);

const ModelMesh = React.memo(function ModelMesh({ url, onLoad }) {
  const { scene } = useGLTF(url);
  useEffect(() => {
    if (scene) onLoad && onLoad();
  }, [scene, onLoad]);
  return <primitive object={scene} />;
});

function ModelWithAnimations({ url, onLoad }) {
  const { scene, animations } = useGLTF(url);
  const mixer = useRef(null);

  useEffect(() => {
    if (scene) onLoad && onLoad();
  }, [scene, onLoad]);

  useEffect(() => {
    if (!scene || animations.length === 0) return;
    mixer.current = new THREE.AnimationMixer(scene);
    const actions = animations.map((clip) => {
      const a = mixer.current.clipAction(clip);
      a.reset();
      a.setLoop(THREE.LoopRepeat, Infinity);
      a.clampWhenFinished = true;
      a.play();
      return a;
    });
    return () => {
      actions.forEach((a) => a.stop());
      if (mixer.current) {
        mixer.current.stopAllAction();
        mixer.current = null;
      }
    };
  }, [scene, animations]);

  useFrame((_, delta) => {
    if (mixer.current) mixer.current.update(delta);
  });

  return <primitive object={scene} />;
}

function SketchfabEmbed({ src, title }) {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <div className="embed-3d">
      {!loaded && <div className="loader" />}
      <iframe
        title={title || "3D Model"}
        src={src}
        frameBorder="0"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        allowFullScreen
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

function ModelViewerCanvas({ url, animated, onLoaded }) {
  const showHelpers = process.env.NEXT_PUBLIC_SHOW_HELPERS === "1";
  const frameLoop = animated ? "always" : "demand";

  return (
    <Canvas
      frameloop={frameLoop}
      dpr={[1, 1.5]}
      shadows={false}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      camera={{ fov: 45, near: 0.1, far: 100, position: [3.2, 2.5, 3.2] }}
    >
      <ambientLight intensity={1} />
      <hemisphereLight intensity={0.6} />

      <group position={[0, -1.5, 0]}>
        {showHelpers && (
          <>
            <ThickAxesHelper size={10} />
            <gridHelper args={[10, 10]} />
          </>
        )}

        <Suspense fallback={<Loader />}>
          {animated ? (
            <ModelWithAnimations url={url} onLoad={onLoaded} />
          ) : (
            <ModelMesh url={url} onLoad={onLoaded} />
          )}
          <Preload all />
        </Suspense>
      </group>

      <OrbitControls
        makeDefault
        enableDamping
        minDistance={2.5}
        maxDistance={6}
      />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </Canvas>
  );
}

/** Главный экспорт: отрисовать либо Sketchfab, либо локальную модель */
export default function Model3DContent({ model }) {
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setLoading(true);
  }, [model?.url, model?.embed?.src]);

  const isSketchfab =
    model &&
    model.embed &&
    model.embed.provider === "sketchfab" &&
    model.embed.src;

  return (
    <div className="modal-3d__body">
      {!isSketchfab && loading && <div className="loader" />}
      {isSketchfab ? (
        <SketchfabEmbed src={model.embed.src} title={model.title} />
      ) : (
        <ModelViewerCanvas
          url={model.url}
          animated={model.animated}
          onLoaded={() => setLoading(false)}
        />
      )}
    </div>
  );
}
