import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Line } from "@react-three/drei";
import React, { useEffect, useState, useRef } from "react";
import * as THREE from "three";

const ThickAxesHelper = ({ size = 10 }) => {
  return (
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
};

const GLBModelCanvas = ({ modelUrl, onLoad }) => {
  return (
    <Canvas>
      <group position={[0, -1.5, 0]}>
        <ThickAxesHelper size={10} />
        <gridHelper args={[10, 10]} />
      </group>

      <ambientLight intensity={1} />
      <directionalLight position={[5, 10, 5]} intensity={2} castShadow={true} />
      <ModelWithAutoRestart modelUrl={modelUrl} onLoad={onLoad} />
      <OrbitControls enableZoom={true} minDistance={3} maxDistance={4} />
    </Canvas>
  );
};

const ModelWithAutoRestart = ({ modelUrl, onLoad }) => {
  const { scene, animations } = useGLTF(modelUrl, true);
  const mixer = useRef(null);

  const [loading, setLoading] = useState(true); // Добавляем состояние для загрузки

  useEffect(() => {
    if (onLoad && !loading) {
      onLoad(); // Уведомляем о завершении загрузки
    }
  }, [loading, onLoad]);

  useEffect(() => {
    if (animations.length > 0) {
      // Инициализация AnimationMixer
      mixer.current = new THREE.AnimationMixer(scene);

      const playAllAnimations = () => {
        animations.forEach((clip) => {
          const action = mixer.current.clipAction(clip);
          action.reset().play();
          action.loop = THREE.LoopOnce;
          action.clampWhenFinished = true;
        });
      };

      // Запуск анимаций при первой загрузке
      playAllAnimations();

      // Устанавливаем интервал для перезапуска
      const interval = setInterval(() => {
        playAllAnimations();
      }, 15000); // Интервал перезапуска (в миллисекундах)

      return () => {
        clearInterval(interval); // Очищаем интервал при размонтировании
        mixer.current?.stopAllAction(); // Останавливаем анимации
      };
    }
  }, [animations, scene]);

  // Устанавливаем состояние загрузки в false, когда сцена загружена
  useEffect(() => {
    if (scene) {
      setLoading(false);
    }
  }, [scene]);

  useFrame((_, delta) => {
    mixer.current?.update(delta); // Обновляем AnimationMixer на каждом кадре
  });

  return <primitive object={scene} position={[0, -1.5, 0.4]} />;
};

export default GLBModelCanvas;
