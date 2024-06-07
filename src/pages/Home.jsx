import style from "../styles/Home.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { useContext } from "react";
import Slider from "react-slick";
import { Context } from "../context/Context";
import { useAxiosGet } from "../hooks/useAxiosGet";

const Home = () => {
  const { brandArray } = useContext(Context);

  const { data: brandRating } = useAxiosGet("http://localhost:8080/brands/top");

  const settings = {
    arrow: true,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "20px",
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

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
      <div className={style.carousel}>
        <Slider {...settings}>
          {brandArray.map((item1) =>
            item1.brandImage.map((item2, index) => (
              <div className={style.imageContainer}>
                <img key={index} src={item2} alt="" />
              </div>
            ))
          )}
        </Slider>
      </div>
    </div>
  );
};

const NextArrow = styled.div`
  z-index: 1;
  background-color: transparent;
  cursor: pointer;
  &:before {
    color: black;
  }
`;

const PrevArrow = styled.div`
  z-index: 1;
  background-color: transparent;
  cursor: pointer;
  &:before {
    color: black;
  }
`;

export default Home;
