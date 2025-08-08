import S from "./Particles.module.css";

// Ao usar, lembrar de que o pai deve ter position: relative;
export function Particles() {
  return (
    <div className={S.particlesContainer}>
      {Array.from({ length: 100 }).map((_, i) => (
        <div
          key={i}
          className={S.particle}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            "--tx": `${(Math.random() - 0.5) * 200}px`,
            "--ty": `${(Math.random() - 0.5) * 200}px`,
            animationDuration: `${Math.random() * 10 + 10}s`,
          }}
        ></div>
      ))}
    </div>
  );
}
