import { FaCalendarAlt, FaEdit } from "react-icons/fa";
import S from "./task.module.css";

export default function Task({ text, date, type }) {
  return (
    <div className={S.task}>
      {type == "view" ? (
        <>
          <div className={S.row01}>
            <span>{text}</span>
            <div className={S.checkboxWrapper46}>
              <input type="checkbox" id="cbx46" className={S.inpCbx} />
              <label for="cbx46" className={S.cbx}>
                <span>
                  <svg viewBox="0 0 12 10" height="10px" width="12px">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                  </svg>
                </span>
              </label>
            </div>
          </div>
          <div className={S.row02}>
            <FaCalendarAlt className={S.iconCalendar} />
            <span>{date}</span>
            <button className={S.buttonEdit}>
              <FaEdit className={S.iconEdit} />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={S.row01}>
            <input
              type="text"
              defaultValue={text}
              className={S.inputText}
              placeholder="Digite a tarefa"
            />
          </div>
          <div className={S.row02}>
            <input type="date" defaultValue={date} className={S.inputDate} />
          </div>
        </>
      )}
    </div>
  );
}
