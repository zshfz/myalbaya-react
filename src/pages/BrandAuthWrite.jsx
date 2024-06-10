import style from "../styles/BrandAuthWrite.module.scss";
import "react-quill/dist/quill.snow.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import { useAxiosPost } from "../hooks/useAxiosPost";
import { Context } from "../context/Context";

const BrandAuthWrite = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [brandName, setBrandName] = useState("");
  const [images, setImages] = useState([]);

  const { brandArray } = useContext(Context);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const { error: postError, handleSubmit: handlePostSubmit } = useAxiosPost(
    "http://localhost:8080/allow/new",
    "",
    "브랜드 인증 게시글이 등록되었습니다.",
    () => navigate("/"),
    true,
    "",
    true,
    ""
  );

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("brandName", brandName);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    handlePostSubmit(e, formData);
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
      <select
        value={brandName}
        onChange={(e) => {
          setBrandName(e.target.value);
        }}
      >
        <option>브랜드 선택</option>
        {brandArray.map((item1) =>
          item1.brand.map((item2, index) => (
            <option key={index}>{item2}</option>
          ))
        )}
      </select>
      <div className={style.reactQuillContainer}>
        <ReactQuill
          value={content}
          className={style.reactQuill}
          onChange={setContent}
        />
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
        {postError && <p className={style.errorMessage}>{postError}</p>}
      </div>
    </div>
  );
};

export default BrandAuthWrite;
