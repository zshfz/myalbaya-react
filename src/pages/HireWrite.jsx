import style from "../styles/HireWrite.module.scss";
import { useInput } from "../hooks/useInput";

const HireWrite = () => {
  const [title, handleTitleChange] = useInput("");
  const [salary, handleSalaryChange] = useInput("");
  const [content, handleContentChange] = useInput("");

  return (
    <div className={style.container}>
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={handleTitleChange}
      />
      <input
        type="number"
        placeholder="급여"
        value={salary}
        onChange={handleSalaryChange}
      />
      <textarea
        placeholder="내용"
        value={content}
        onChange={handleContentChange}
      />
      <button>등록</button>
      <button>취소</button>
    </div>
  );
};

export default HireWrite;
