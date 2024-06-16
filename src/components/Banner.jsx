// import React from "react";
// import { Carousel, Container } from "react-bootstrap";
// import "../style/Banner.css";
// import { Link } from "react-router-dom";

// const Banner = () => {
//   return (
//     <div className="banner_section layout_padding">
//       <Container>
//         <Carousel id="my_slider" controls={true} indicators={false}>
//           <Carousel.Item>
//             <div className="row">
//               <div className="col-sm-12">
//                 <h1 className="banner_taital text-white">
//                   Discover Premium <br />
//                   Cosmetics & Beauty
//                 </h1>
              
//                 <div className="buynow_bt p-2">
//                   <Link to="#" className="bg-white text-black">Shop Now</Link>
//                 </div>
//               </div>
//             </div>
//           </Carousel.Item>
//           <Carousel.Item>
//             <div className="row">
//               <div className="col-sm-12">
//                 <h1 className="banner_taital text-white">
//                   Enhance Your <br />
//                   Cleaning Routine
//                 </h1>
                
//                 <div className="buynow_bt p-2">
//                   <Link to="#" className="bg-white text-black">Shop Now</Link>
//                 </div>
//               </div>
//             </div>
//           </Carousel.Item>
//           <Carousel.Item>
//             <div className="row">
//               <div className="col-sm-12">
//                 <h1 className="banner_taital text-white">
//                   Your Trusted <br />
//                   Beauty Source
//                 </h1>
                
//                 <div className="buynow_bt p-2">
//                   <Link to="#" className="bg-white text-black">Shop Now</Link>
//                 </div>
//               </div>
//             </div>
//           </Carousel.Item>
//         </Carousel>
//       </Container>
//     </div>
//   );
// };

// export default Banner;

import React from "react";
import { Carousel, Container } from "react-bootstrap";
import "../style/Banner.css";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="banner_section layout_padding">
      <Container fluid>
        <Carousel id="my_slider" controls={true} indicators={false}>
          <Carousel.Item>
            <img
              src="/images/Banner.jpg"
              className="d-block w-100 banner_image"
              alt="First slide"
            />
            {/* <div className="carousel-caption">
              <h1 className="banner_taital text-white">
                Discover Premium <br />
                Cosmetics & Beauty
              </h1>
              <div className="buynow_bt p-2">
                <Link to="#" className="bg-white text-black">Shop Now</Link>
              </div>
            </div> */}
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="/images/Banner-LAUNDRY.jpg"
              className="d-block w-100 banner_image"
              alt="Second slide"
            />
            {/* <div className="carousel-caption">
              <h1 className="banner_taital text-white">
                Enhance Your <br />
                Cleaning Routine
              </h1>
              <div className="buynow_bt p-2">
                <Link to="#" className="bg-white text-black">Shop Now</Link>
              </div>
            </div> */}
          </Carousel.Item>
          {/* <Carousel.Item>
            <img
              src="path/to/your/image3.jpg"
              className="d-block w-100 banner_image"
              alt="Third slide"
            />
            <div className="carousel-caption">
              <h1 className="banner_taital text-white">
                Your Trusted <br />
                Beauty Source
              </h1>
              <div className="buynow_bt p-2">
                <Link to="#" className="bg-white text-black">Shop Now</Link>
              </div>
            </div>
          </Carousel.Item> */}
        </Carousel>
      </Container>
    </div>
  );
};

export default Banner;


