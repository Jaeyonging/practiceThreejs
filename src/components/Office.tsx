import { useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export const FLOOR_HEIGHT = 2.3;
export const NB_FLOORS = 3;

interface OfficeProps {
  // Define your props here
} 

export function Office(props: OfficeProps) {
  const { nodes, materials } = useGLTF("./models/WawaOffice.glb");
  const ref = useRef<THREE.Group>();
  const tl = useRef<gsap.core.Timeline>();
  const libraryRef = useRef<THREE.Group>()
  const atticRef = useRef<THREE.Group>()

  const scroll = useScroll();

  useFrame(() => {
    tl.current.seek(scroll.offset * tl.current.duration());
    //console.log(scroll.offset * tl.current.duration())
  });

  useEffect(() => {
    console.log("UseEffect");
    tl.current = gsap.timeline();

    tl.current.to(
      ref.current?.position,
      {
        duration: 2,
        y: -FLOOR_HEIGHT * (NB_FLOORS - 1),
      },
      0
    );

    //library
    tl.current.from(
      libraryRef.current.position,
      {
        duration : 1.5,
        x: -2, 
      },
      0.5
    )

    tl.current.from(
      libraryRef.current.rotation,
      {
        duration : 1.5,
        y: -Math.PI/2, 
      },
      0
    )


    //attic
    tl.current.from(
      atticRef.current.position,
      {
        duration : 1.5,
        y: 2, 
      },
      0
    )

    tl.current.from(
      atticRef.current.rotation,
      {
        duration : 1.5,
        y: Math.PI/2, 
      },
      1
    )

    tl.current.from(
      atticRef.current.position,
      {
        duration : 1.5,
        z: -2, 
      },
      1.5
    )

  }, []);

  if (!nodes) {
    console.error("Nodes not loaded.");
    return null;
  }
  console.log(nodes)

  return (
    <>
      <group ref={ref} {...props} dispose={null}>
        <mesh
          geometry={(nodes["01_office"] as THREE.Mesh).geometry}
          material={materials["01"]}
        />
        <group position={[0, 2.11, -2.23]}>
          <group ref={libraryRef}>
            <mesh
              geometry={(nodes["02_library"] as THREE.Mesh).geometry}
              material={materials["02"]}
            />
          </group>
        </group>
        <group position={[-1.97, 4.23, -2.2]}>
          <group ref={atticRef}>
            <mesh
              geometry={(nodes["03_attic"] as THREE.Mesh).geometry}
              material={materials["03"]}
            />
          </group>
        </group>
      </group>
    </>
  );
}

useGLTF.preload("./models/WawaOffice.glb");
