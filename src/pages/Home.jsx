import style from "../styles/Home.module.scss";
import { useAxiosGet } from "../hooks/useAxiosGet";

const Home = () => {
  const { data: brandRating } = useAxiosGet("http://localhost:8080/brands/top");

  return (
    <div className={style.container}>
      <div className={style.boards}>
        <div className={style.board}>
          <div className={style.boardTitle}>
            <span>인기 게시판</span>
            <span className={style.more}>더보기</span>
          </div>
        </div>
        <div className={style.board}>
          <div className={style.boardTitle}>
            <span>통합 게시판</span>
            <span className={style.more}>더보기</span>
          </div>
        </div>
        <div className={style.board}>
          <div className={style.boardTitle}>
            <span>채용공고 게시판</span>
            <span className={style.more}>더보기</span>
          </div>
        </div>
        <div className={style.ratingContainer}>
          <span>브랜드 평점 랭킹</span>
          <div className={style.rating}>
            {brandRating &&
              brandRating.map((item, index) => {
                return (
                  <div key={index}>
                    {index + 1}등 {item.name} {item.averageRating}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
