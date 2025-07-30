import S from "./ErrorMessage.module.css";

export function ErrorMessage({ condition, message }) {
  if (!condition) return null;

  return (
    <div className={S.messageContainer}>
      <p className={S.messageError}>{message}</p>
    </div>
  );
}
