export default function Lights() {
  return (
    <>
      <ambientLight intensity={2.0} />
      <directionalLight
        intensity={1.3} //
        position={[500, 400, 500]}
        castShadow
      ></directionalLight>
    </>
  );
}
