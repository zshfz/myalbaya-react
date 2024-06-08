import style from "../styles/Single.module.scss";

const Single = () => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.left}>
          <span className={style.title}>제목</span>
          <span>글쓴이</span>
          <span>날짜</span>
          <span>수정</span>
          <span>삭제</span>
        </div>
        <div className={style.right}>
          <span>좋아요: 0</span>
          <span>조회수: 0</span>
        </div>
      </div>
      <div className={style.body}>내용</div>
      <div className={style.commentContainer}></div>
    </div>
  );
};

export default Single;
