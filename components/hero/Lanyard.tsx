"use client";

// Scene 3D: ID card yang tergantung di tali lanyard dengan physics (Rapier).
// Tali dirender dengan meshline dan bertekstur teks berulang.

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RapierRigidBody,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import type { CardCanvases } from "./cardTexture";

extend({ MeshLineGeometry, MeshLineMaterial });

// Ukuran kartu dalam satuan scene (rasio 54 x 86)
const CARD_HALF_W = 0.8;
const CARD_HALF_H = 1.275;
const CARD_THICK = 0.03;

export type LanyardTextures = {
  front: THREE.CanvasTexture;
  back: THREE.CanvasTexture;
  rope: THREE.CanvasTexture;
};

function toTexture(canvas: HTMLCanvasElement, repeat = false) {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  if (repeat) tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

type Props = {
  canvases: CardCanvases;
};

export default function Lanyard({ canvases }: Props) {
  // Tekstur three.js dibuat sekali dari canvas 2D
  const textures = useMemo<LanyardTextures>(
    () => ({
      front: toTexture(canvases.front),
      back: toTexture(canvases.back),
      rope: toTexture(canvases.rope, true),
    }),
    [canvases],
  );

  return (
    <Canvas
      className="hero-canvas"
      camera={{ position: [0, 0, 13], fov: 25 }}
      dpr={[1, 1.25]}
      gl={{ alpha: true, antialias: true }}
      aria-label="ID card 3D Reyhan Bagus.P yang bisa ditarik"
      role="img"
    >
      <ambientLight intensity={Math.PI} />
      <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
        <Band textures={textures} />
      </Physics>
      <Environment resolution={256}>
        <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
      </Environment>
    </Canvas>
  );
}

function Band({ textures, maxSpeed = 50, minSpeed = 10 }: { textures: LanyardTextures; maxSpeed?: number; minSpeed?: number }) {
  const band = useRef<THREE.Mesh<MeshLineGeometry, MeshLineMaterial>>(null);
  const fixed = useRef<RapierRigidBody>(null!);
  const j1 = useRef<RapierRigidBody>(null!);
  const j2 = useRef<RapierRigidBody>(null!);
  const j3 = useRef<RapierRigidBody>(null!);
  const card = useRef<RapierRigidBody>(null!);
  const flip = useRef<THREE.Group>(null);
  const flipTarget = useRef(0);
  const pointerDown = useRef<{ x: number; y: number } | null>(null);

  const vec = useRef(new THREE.Vector3()).current;
  const ang = useRef(new THREE.Vector3()).current;
  const rot = useRef(new THREE.Vector3()).current;
  const dir = useRef(new THREE.Vector3()).current;
  const curve = useRef(
    new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]),
  ).current;

  const segmentProps = { type: "dynamic" as const, canSleep: true, colliders: false as const, angularDamping: 4, linearDamping: 4 };
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);
  const { width, height } = useThree((state) => state.size);

  // Geometry dibuat sekali, bukan di setiap render
  const bodyGeo = useMemo(() => new RoundedBoxGeometry(CARD_HALF_W * 2, CARD_HALF_H * 2, CARD_THICK, 4, 0.05), []);
  const clipGeo = useMemo(() => new RoundedBoxGeometry(0.42, 0.22, 0.05, 3, 0.04), []);
  const clampGeo = useMemo(() => new RoundedBoxGeometry(0.52, 0.08, 0.06, 3, 0.03), []);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  // Kursor grab / grabbing saat kartu disorot
  useEffect(() => {
    if (!hovered) {
      document.body.style.cursor = "auto";
      return;
    }
    document.body.style.cursor = dragged ? "grabbing" : "grab";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    // Kartu mengikuti pointer saat ditarik
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    // Tali mengikuti sambungan dengan kecepatan adaptif
    if (fixed.current && card.current) {
      [j1, j2].forEach((ref) => {
        const body = ref.current;
        if (!body) return;
        const anyBody = body as RapierRigidBody & { lerped?: THREE.Vector3 };
        if (!anyBody.lerped) anyBody.lerped = new THREE.Vector3().copy(body.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, anyBody.lerped.distanceTo(body.translation())));
        anyBody.lerped.lerp(body.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
      });

      const l1 = (j1.current as RapierRigidBody & { lerped?: THREE.Vector3 }).lerped!;
      const l2 = (j2.current as RapierRigidBody & { lerped?: THREE.Vector3 }).lerped!;
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(l2);
      curve.points[2].copy(l1);
      curve.points[3].copy(fixed.current.translation());
      band.current?.geometry.setPoints(curve.getPoints(32));

      // Kartu kembali menghadap depan (mengurangi putaran berlebih)
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true);
    }

    // Animasi balik kartu (klik tanpa geser)
    if (flip.current) {
      flip.current.rotation.y = THREE.MathUtils.lerp(flip.current.rotation.y, flipTarget.current, 1 - Math.exp(-delta * 8));
    }
  });

  curve.curveType = "chordal";

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? "kinematicPosition" : "dynamic"}>
          <CuboidCollider args={[CARD_HALF_W, CARD_HALF_H, 0.02]} />
          <group
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerDown={(e) => {
              e.stopPropagation();
              (e.target as Element).setPointerCapture?.(e.pointerId);
              pointerDown.current = { x: e.clientX, y: e.clientY };
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
            onPointerUp={(e) => {
              (e.target as Element).releasePointerCapture?.(e.pointerId);
              drag(false);
              // Klik singkat (tanpa geser) = balik kartu
              const start = pointerDown.current;
              if (start && Math.hypot(e.clientX - start.x, e.clientY - start.y) < 6) {
                flipTarget.current = flipTarget.current === 0 ? Math.PI : 0;
              }
              pointerDown.current = null;
            }}
          >
            <group ref={flip}>
              {/* Badan kartu tipis dengan sudut membulat (rasio 54 x 86) */}
              <mesh geometry={bodyGeo}>
                <meshStandardMaterial color="#0B2A6F" roughness={0.4} metalness={0.2} />
              </mesh>

              {/* Sisi depan dan belakang */}
              <mesh position={[0, 0, CARD_THICK / 2 + 0.001]}>
                <planeGeometry args={[CARD_HALF_W * 2, CARD_HALF_H * 2]} />
                <meshPhysicalMaterial map={textures.front} map-anisotropy={8} clearcoat={1} clearcoatRoughness={0.15} roughness={0.3} metalness={0.5} />
              </mesh>
              <mesh position={[0, 0, -(CARD_THICK / 2 + 0.001)]} rotation={[0, Math.PI, 0]}>
                <planeGeometry args={[CARD_HALF_W * 2, CARD_HALF_H * 2]} />
                <meshPhysicalMaterial map={textures.back} map-anisotropy={8} clearcoat={1} clearcoatRoughness={0.15} roughness={0.3} metalness={0.5} />
              </mesh>

              {/* Klip dan penjepit logam di atas kartu */}
              <mesh position={[0, CARD_HALF_H + 0.12, 0]} geometry={clipGeo}>
                <meshStandardMaterial color="#C9CED6" metalness={1} roughness={0.25} />
              </mesh>
              <mesh position={[0, CARD_HALF_H - 0.02, 0.03]} geometry={clampGeo}>
                <meshStandardMaterial color="#AEB5C1" metalness={1} roughness={0.3} />
              </mesh>
            </group>
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[width, height]}
          useMap
          map={textures.rope}
          repeat={[-3, 1]}
          lineWidth={0.14}
        />
      </mesh>
    </>
  );
}
