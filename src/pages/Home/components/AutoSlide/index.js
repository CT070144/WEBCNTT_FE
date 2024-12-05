import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classNames from "classnames/bind";
import styles from './AutoSlide.module.scss';

function AutoSlide() {

    const arrImg = [
        "https://actvn.edu.vn/News/GetImage/28237",
        "https://xdcs.cdnchinhphu.vn/446259493575335936/2023/5/5/kvmm-1683264076555851918668.jpg",
        "https://tuyensinh.actvn.edu.vn/wp-content/uploads/2024/03/bia-ts.jpg"
    ];

    const cx = classNames.bind(styles);

    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        arrows: false
    };

    return (
        <div className={cx('container')}>
            <Slider className={cx('slides')} {...settings}>
                {arrImg.map((item, key) => {
                    return (
                        <div key={key} className={cx('poster')}>
                            <img src={item} alt=""></img>
                        </div>
                    )
                })}
            </Slider>
        </div>);
}

export default AutoSlide;