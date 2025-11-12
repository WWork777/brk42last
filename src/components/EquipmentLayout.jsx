"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
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

// Стили (оставьте, если используете их)
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/EquipmentModels.scss";

// Данные моделей
import models from "@/constants/models";

/* -------------------------------------------------------------------------- */
/*                                ВСПОМОГАТЕЛЬНОЕ                             */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                                 GLB МОДЕЛИ                                 */
/* -------------------------------------------------------------------------- */

// Статичная модель (без анимации)
const ModelMesh = React.memo(function ModelMesh({ url, onLoad }) {
  const { scene } = useGLTF(url);
  useEffect(() => {
    if (scene) onLoad && onLoad();
  }, [scene, onLoad]);
  return <primitive object={scene} />;
});

// Анимированная модель
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

/* -------------------------------------------------------------------------- */
/*                               EMBED (SKETCHFAB)                             */
/* -------------------------------------------------------------------------- */

function SketchfabEmbed({ src, title }) {
  const [loaded, setLoaded] = useState(false);
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

/* -------------------------------------------------------------------------- */
/*                                 CANVAS VIEWER                               */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                           UI: ГЛАВНАЯ КАРТОЧКА                              */
/* -------------------------------------------------------------------------- */

function HeroModel({ model }) {
  const [loading, setLoading] = useState(true);

  // Показываем спиннер при каждой смене URL модели
  useEffect(() => {
    setLoading(true);
  }, [model?.url]);

  // Проверяем, является ли URL изображением (по расширению)
  const isImage =
    model?.url &&
    (model.url.endsWith(".gif") ||
      model.url.endsWith(".jpg") ||
      model.url.endsWith(".png") ||
      model.url.endsWith(".jpeg") ||
      model.url.endsWith(".webp"));

  const isSketchfab = !!(
    model &&
    model.embed &&
    model.embed.provider === "sketchfab" &&
    model.embed.src
  );

  return (
    <div className="col-md-8">
      <div className="canvas-wrapper" style={{ position: "relative" }}>
        {loading && !isSketchfab && !isImage && <div className="loader" />}
        {isImage ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={model.url}
              alt={model.title}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
              onLoad={() => setLoading(false)}
              onError={() => setLoading(false)}
            />
          </div>
        ) : isSketchfab ? (
          <SketchfabEmbed src={model.embed.src} title={model.title} />
        ) : (
          <ModelViewerCanvas
            url={model.url}
            animated={model.animated}
            onLoaded={() => setLoading(false)}
          />
        )}
      </div>
      <h2 className="mt-4">{model.title}</h2>
      {model.description && <p>{model.description}</p>}
    </div>
  );
}

function ModelSidebar({ modelsMap, selectedKey, onSelect }) {
  const items = useMemo(() => Object.keys(modelsMap), [modelsMap]);
  return (
    <div className="col-md-4" style={{ marginBottom: "1rem" }}>
      <ul className="list-group shadow-sm">
        {items.map((key) => (
          <li
            key={key}
            className={`list-group-item ${selectedKey === key ? "active" : ""}`}
            onClick={() => onSelect(key)}
            style={{ cursor: "pointer" }}
          >
            {modelsMap[key].title}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               ГЛАВНЫЙ КОМПОНЕНТ                             */
/* -------------------------------------------------------------------------- */

export default function EquipmentLayout() {
  const params = useParams();
  const router = useRouter();

  // Нормализуем id из маршрута (на случай catch-all)
  const rawId = params?.id;
  const routeId = Array.isArray(rawId) ? rawId[0] : rawId;

  const [selectedKey, setSelectedKey] = useState(null);
  const pathname = usePathname();
  // Выставляем выбранную модель только при изменении routeId
  useEffect(() => {
    const keys = Object.keys(models);
    if (!keys.length) return;

    if (typeof routeId === "string" && models[routeId]) {
      setSelectedKey(routeId);
    } else {
      setSelectedKey((prev) => prev ?? keys[0]);
    }
  }, [routeId]);

  // Хэндлер выбора из сайдбара
  const handleSelect = (key) => {
    setSelectedKey(key);
    router.replace(`${pathname}#${key}`);
  };

  if (!selectedKey) return <div>Загрузка…</div>;

  const current = models[selectedKey];

  return (
    <div className="container models-container">
      <div className="row">
        {/* Не используем key={selectedKey}, чтобы не размонтировать Canvas */}
        <HeroModel model={current} />
        <ModelSidebar
          modelsMap={models}
          selectedKey={selectedKey}
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
}
