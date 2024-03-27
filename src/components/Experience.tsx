import { OrbitControls, ScrollControls } from "@react-three/drei"
import { Office } from "./Office"

export const Experience = () =>{
    return (
        <>
        <mesh>
            <ambientLight intensity={1}/>
            <OrbitControls enableZoom = {false}/>
            <ScrollControls pages = {3} damping = {0.25}>
            <Office></Office>
            </ScrollControls>
        </mesh>
        </>
    )
}