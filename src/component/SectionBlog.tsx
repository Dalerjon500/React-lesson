
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FaAngleLeft, FaAngleRight,  } from "react-icons/fa6";
import { Blog } from '../page/home/Home';


interface Props {
    blog: Blog[];
}

function SectionBlog({ blog }: Props) {
    return (
        <section className="blog-section py-5 bg-light" id="blog">
            <div className="container">
                <div className="section-header text-center mb-5">
                    <h2 className="display-5 fw-bold text-primary mb-3">Our Blog</h2>
                    <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
                        Creative & Professional Insights From Our Team
                    </p>
                </div>

                <Swiper
                    modules={[Pagination, Navigation, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                        576: {
                            slidesPerView: 2,
                        },
                        992: {
                            slidesPerView: 3,
                        },
                    }}
                    pagination={{
                        clickable: true,
                        el: '.blog-pagination',
                        bulletClass: 'blog-bullet',
                        bulletActiveClass: 'blog-bullet-active',
                    }}
                    navigation={{
                        nextEl: '.blog-next',
                        prevEl: '.blog-prev',
                    }}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    className="pb-5"
                >
                    {blog.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="blog-card card border-0 shadow-sm h-100 overflow-hidden">
                                <div className="blog-card__image overflow-hidden" style={{ height: '220px' }}>
                                    <img
                                        src={item.imgUrl}
                                        alt={item.title}
                                        className="img-fluid w-100 h-100 object-cover transition-scale"
                                    />
                                </div>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="badge bg-primary bg-opacity-10 text-primary small">
                      {item.date || 'May 15, 2023'}
                    </span>
                                        <span className="text-muted small">
                      <i className="bi bi-person-fill me-1"></i>
                                            {item.author || 'Author'}
                    </span>
                                    </div>
                                    <h5 className="card-title mb-3">{item.title}</h5>
                                    <p className="card-text text-muted">
                                        {item.excerpt || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="d-flex justify-content-center align-items-center mt-4">
                    <button className="blog-prev btn btn-outline-primary rounded-circle me-3">
                        <FaAngleLeft/>
                    </button>
                    <div className="blog-pagination d-flex justify-content-center"></div>
                    <button className="blog-next btn btn-outline-primary rounded-circle ms-3">
                        <FaAngleRight/>
                    </button>
                </div>
            </div>
        </section>
    );
}

export default SectionBlog;
