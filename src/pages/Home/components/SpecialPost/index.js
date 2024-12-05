import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./SpecialPost.module.scss";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import Card from "~/components/Card";
import { Link } from "react-router-dom";

function SpecialPost() {

    const url = "http://localhost:8084";


    const cx = classNames.bind(styles);


    let sliderRef = useRef();
    const next = () => {
        sliderRef.current.slickNext();
    };

    const previous = () => {
        sliderRef.current.slickPrev();
    };

    var setting = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        swipe: true,
        arrows: false,
    }

    const [arr, setArr] = useState([]);

    useEffect(() => {
        // Thay đường dẫn này bằng API thực của bạn
        fetch(url + "/api/posts/latest", {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                // Tạo URL từ Blob
                setArr(data);
            })
            .catch(err => console.error('Error fetching:', err));
    }, []);

    return (
        <div className={cx('post-special')}>
            <h1 className={cx('title')}>Bài viết mới nhất</h1>
            <div className={cx('posts-item')}>
                <i className={cx("fa-solid fa-angle-left")} onClick={previous}></i>
                <Slider ref={sliderRef} className={cx('slider')} {...setting}>
                    {arr.map((post, index) => {
                        return (<Card key={index} post={post}></Card>)
                    })}
                    <Link className={cx("more-posts")} to={"/posts"}>
                        <div className={cx('content-more')}>
                            <h2> + Xem thêm</h2>

                        </div>
                    </Link>

                </Slider>
                <i className={cx("fa-solid fa-angle-right")} onClick={next}></i>
            </div>
        </div>);
}

export default SpecialPost;