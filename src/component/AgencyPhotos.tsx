import Slider from "react-slick";
import { Box, Container, Typography, useTheme } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { styled } from "@mui/material/styles";

interface AgencyPhotosImg {
    id: string;
    imgUrl: string;
}

function AgencyPhotos({ agencyPhotos }: { agencyPhotos: AgencyPhotosImg[] }) {
    const theme = useTheme();

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 5000,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: theme.breakpoints.values.xl,
                settings: {
                    slidesToShow: 5,
                },
            },
            {
                breakpoint: theme.breakpoints.values.lg,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: theme.breakpoints.values.md,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: theme.breakpoints.values.sm,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const SlideImage = styled("img")(({ theme }) => ({
        width: "90%",
        height: "200px",
        objectFit: "cover",
        padding: theme.spacing(1),
        filter: "grayscale(30%)",
        opacity: 0.8,
        transition: "all 0.3s ease",
        margin: "0 auto",
        "&:hover": {
            filter: "grayscale(0%)",
            opacity: 1,
            transform: "scale(1.05)",
        },
        [theme.breakpoints.down("md")]: {
            height: "100px",
        },
    }));

    return (
        <Box
            py={6}
            sx={{
                backgroundColor: theme.palette.background.paper,
                overflow: "hidden",
            }}
        >
            <Typography variant="h3" textAlign="center" mb={4}>
                Our Clients
            </Typography>

            <Container maxWidth="xl">
                <Slider {...settings}>
                    {agencyPhotos.map((photo) => (
                        <Box key={photo.id}>
                            <SlideImage src={photo.imgUrl} alt={"our clients"} />
                        </Box>
                    ))}
                    {agencyPhotos.length < 12 &&
                        agencyPhotos.map((photo) => (
                            <Box key={`duplicate-${photo.id}`}>
                                <SlideImage src={photo.imgUrl} alt={"our clients"} />
                            </Box>
                        ))}
                </Slider>
            </Container>
        </Box>
    );
}

export default AgencyPhotos;




