export default function StepHead({ num, title, desc }) {
  return (
    <div className="stage-head">
      <div className="stage-step">
        <span className="num">{num}</span>
        <span>Etapa {num} de 4</span>
      </div>
      <div className="stage-titles">
        <h1>{title}</h1>
        {desc && <div className="desc">{desc}</div>}
      </div>
    </div>
  );
}
