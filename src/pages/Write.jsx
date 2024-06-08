import style from "../styles/Write.module.scss";
import "react-quill/dist/quill.snow.css";
import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../context/Context";
import ReactQuill from "react-quill";
import { useAxiosPost } from "../hooks/useAxiosPost";

const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);

  const { isToggled } = useContext(Context);

  const navigate = useNavigate();

  const { id } = useParams();

  const { error, handleSubmit } = useAxiosPost(
    `http://localhost:8080/brands/${id.slice(2)}/posts/${
      isToggled ? "boss" : "employee"
    }/new`,
    "",
    "게시글이 등록되었습니다",
    () => navigate(`/gallery/${id}`),
    true,
    "",
    true
  );

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const onSubmit = (e) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    handleSubmit(e, formData);
  };

  return (
    <div className={style.container}>
      <input
        className={style.title}
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <div className={style.reactQuillContainer}>
        <ReactQuill className={style.reactQuill} onChange={setContent} />
      </div>
      <input
        className={style.file}
        type="file"
        multiple
        onChange={handleImageChange}
      />
      <div className={style.buttonContainer}>
        <button onClick={onSubmit}>등록</button>
        <button>취소</button>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Write;
