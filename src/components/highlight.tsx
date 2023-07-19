import Slider from "react-slick";
import {Img} from "react-image";

const Highlight = () => {

    const imgSrc = [
        "https://images.tokopedia.net/img/cache/1208/NsjrJu/2023/7/13/53cd2ed5-ef1d-4b37-9e8c-b63076852f3b.jpg.webp?ect=4g",
        "https://images.tokopedia.net/img/cache/1208/NsjrJu/2023/7/14/8d2a14c8-7faf-442e-bf24-7656feee13d9.jpg.webp?ect=4g",
        "https://images.tokopedia.net/img/cache/1208/NsjrJu/2023/7/14/bf99fa9c-ab31-4fed-9acc-65f43b258c54.jpg.webp?ect=4g"
    ]

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        
    };

    return (
        <>
            <section className="w-full ">
                <main className="px-4  ">
                    <Slider {...settings}>
                        {imgSrc.map((url, index) => (
                            <div key={index} className="w-full ">
                                <Img src={url} className="rounded-xl" />
                            </div>
                        ))}
                    </Slider>
                </main>
            </section>
        </>
    );
};

export default Highlight;