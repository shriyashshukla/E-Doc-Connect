'use client'
import React from 'react'
import { useState, useEffect, useRef } from 'react';
import "./style.css"


const page = () => {
  const [doctorData, setdoctorData] = useState(null);




  const avatarUrl = useRef("https:localhost5000/uploads" );
  const [modalOpen, setModalOpen] = useState(false);

  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
  };

  const doctorJSON = sessionStorage.doctor ? JSON.parse(sessionStorage.doctor) : null;
  const doctor = doctorJSON !== null ? doctorJSON : null;



  const id = JSON.parse(sessionStorage.doctor)._id;
  const fetchdoctorData = async () => {
    const response = await fetch(`http://localhost:5000/doctor/getbyid/${doctor._id}`);
    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      return setdoctorData(data);
    };
  }
  useEffect(() => {
    fetchdoctorData();
  }, []);

  return (
    <div>
      <div className="card procontainer ">
        <div className="card__img">
          <svg width="100%" xmlns="http://www.w3.org/2000/svg">
            <rect height={450} width={540} fill="#ffffff" />
            <defs>
              <linearGradient
                gradientTransform="rotate(222,648,379)"
                y2="100%"
                y1={0}
                x2={0}
                x1={0}
                gradientUnits="userSpaceOnUse"
                id="a"
              >
                <stop stopColor="#ffffff" offset={0} />
                <stop stopColor="#FC726E" offset={1} />
              </linearGradient>
              <pattern
                viewBox="0 0 1080 900"
                y={0}
                x={0}
                height={250}
                width={300}
                id="b"
                patternUnits="userSpaceOnUse"
              >
                <g fillOpacity="0.5">
                  <polygon points="90 150 0 300 180 300" fill="#444" />
                  <polygon points="90 150 180 0 0 0" />
                  <polygon points="270 150 360 0 180 0" fill="#AAA" />
                  <polygon points="450 150 360 300 540 300" fill="#DDD" />
                  <polygon points="450 150 540 0 360 0" fill="#999" />
                  <polygon points="630 150 540 300 720 300" />
                  <polygon points="630 150 720 0 540 0" fill="#DDD" />
                  <polygon points="810 150 720 300 900 300" fill="#444" />
                  <polygon points="810 150 900 0 720 0" fill="#FFF" />
                  <polygon points="990 150 900 300 1080 300" fill="#DDD" />
                  <polygon points="990 150 1080 0 900 0" fill="#444" />
                  <polygon points="90 450 0 600 180 600" fill="#DDD" />
                  <polygon points="90 450 180 300 0 300" />
                  <polygon points="270 450 180 600 360 600" fill="#666" />
                  <polygon points="270 450 360 300 180 300" fill="#AAA" />
                  <polygon points="450 450 360 600 540 600" fill="#DDD" />
                  <polygon points="450 450 540 300 360 300" fill="#999" />
                  <polygon points="630 450 540 600 720 600" fill="#999" />
                  <polygon points="630 450 720 300 540 300" fill="#FFF" />
                  <polygon points="810 450 720 600 900 600" />
                  <polygon points="810 450 900 300 720 300" fill="#DDD" />
                  <polygon points="990 450 900 600 1080 600" fill="#AAA" />
                  <polygon points="990 450 1080 300 900 300" fill="#444" />
                  <polygon points="90 750 0 900 180 900" fill="#222" />
                  <polygon points="270 750 180 900 360 900" />
                  <polygon points="270 750 360 600 180 600" fill="#DDD" />
                  <polygon points="450 750 540 600 360 600" />
                  <polygon points="630 750 540 900 720 900" />
                  <polygon points="630 750 720 600 540 600" fill="#444" />
                  <polygon points="810 750 720 900 900 900" fill="#AAA" />
                  <polygon points="810 750 900 600 720 600" fill="#666" />
                  <polygon points="990 750 900 900 1080 900" fill="#999" />
                  <polygon points="180 0 90 150 270 150" fill="#999" />
                  <polygon points="360 0 270 150 450 150" fill="#444" />
                  <polygon points="540 0 450 150 630 150" fill="#FFF" />
                  <polygon points="900 0 810 150 990 150" />
                  <polygon points="0 300 -90 450 90 450" fill="#222" />
                  <polygon points="0 300 90 150 -90 150" fill="#FFF" />
                  <polygon points="180 300 90 450 270 450" fill="#FFF" />
                  <polygon points="180 300 270 150 90 150" fill="#666" />
                  <polygon points="360 300 270 450 450 450" fill="#222" />
                  <polygon points="360 300 450 150 270 150" fill="#FFF" />
                  <polygon points="540 300 450 450 630 450" fill="#444" />
                  <polygon points="540 300 630 150 450 150" fill="#222" />
                  <polygon points="720 300 630 450 810 450" fill="#AAA" />
                  <polygon points="720 300 810 150 630 150" fill="#666" />
                  <polygon points="900 300 810 450 990 450" fill="#FFF" />
                  <polygon points="900 300 990 150 810 150" fill="#999" />
                  <polygon points="0 600 -90 750 90 750" />
                  <polygon points="0 600 90 450 -90 450" fill="#666" />
                  <polygon points="180 600 90 750 270 750" fill="#AAA" />
                  <polygon points="180 600 270 450 90 450" fill="#444" />
                  <polygon points="360 600 270 750 450 750" fill="#444" />
                  <polygon points="360 600 450 450 270 450" fill="#999" />
                  <polygon points="540 600 630 450 450 450" fill="#666" />
                  <polygon points="720 600 630 750 810 750" fill="#222" />
                  <polygon points="900 600 810 750 990 750" fill="#FFF" />
                  <polygon points="900 600 990 450 810 450" fill="#222" />
                  <polygon points="0 900 90 750 -90 750" fill="#DDD" />
                  <polygon points="180 900 270 750 90 750" fill="#444" />
                  <polygon points="360 900 450 750 270 750" fill="#FFF" />
                  <polygon points="540 900 630 750 450 750" fill="#AAA" />
                  <polygon points="720 900 810 750 630 750" fill="#FFF" />
                  <polygon points="900 900 990 750 810 750" fill="#222" />
                  <polygon points="1080 300 990 450 1170 450" fill="#222" />
                  <polygon points="1080 300 1170 150 990 150" fill="#FFF" />
                  <polygon points="1080 600 990 750 1170 750" />
                  <polygon points="1080 600 1170 450 990 450" fill="#666" />
                  <polygon points="1080 900 1170 750 990 750" fill="#DDD" />
                </g>
              </pattern>
            </defs>
            <rect height="100%" width="100%" fill="url(#a)" y={0} x={0} />
            <rect height="100%" width="100%" fill="url(#b)" y={0} x={0} />
          </svg>
        </div>

        <div className="flex">
          <div className="profile">
             <img
              src={"http://localhost:5000/" + doctor.avatar}
              alt="Avatar"
              className="w-[150px] h-[150px] rounded-full border-2 border-gray-400"
            /> 
          </div>
        </div>


        <div className="card__title">{doctor.name}</div>
        <div className="card__subtitle">{doctor.email}</div>
        <div className="card__subtitle">{doctor.specialty}</div>






      </div>
      <div>

        <a href="/Editprofile" className='nounderline'>
          <button className='btn'>
            Edit profile
          </button>
        </a>
        <a href="/appiontment" className='nounderline'>
          <button className='btn'>
            View appiontment
          </button>
        </a>
      </div>
    </div>
  )
}

export default page


// import React from 'react';
// import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';


// export default function ECommerce() {
//   return (
//     <div className="vh-100" style={{ backgroundColor: '#eee' }}>
//       <MDBContainer>
//         <MDBRow className="justify-content-center">
//           <MDBCol md="9" lg="7" xl="5" className="mt-5">
//             <MDBCard style={{ borderRadius: '15px', backgroundColor: '#93e2bb' }}>
//               <MDBCardBody className="p-4 text-black">
//                 <div>
//                   <MDBTypography tag='h6'>Exquisite hand henna tattoo</MDBTypography>
//                   <div className="d-flex align-items-center justify-content-between mb-3">
//                     <p className="small mb-0"><MDBIcon far icon="clock me-2" />3 hrs</p>
//                     <p className="fw-bold mb-0">$90</p>
//                   </div>
//                 </div>
//                 <div className="d-flex align-items-center mb-4">
//                   <div className="flex-shrink-0">
//                     <MDBCardImage
//                       style={{ width: '70px' }}
//                       className="img-fluid rounded-circle border border-dark border-3"
//                       src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-2.webp'
//                       alt='Generic placeholder image'
//                       fluid />
//                   </div>
//                   <div className="flex-grow-1 ms-3">
//                     <div className="d-flex flex-row align-items-center mb-2">
//                       <p className="mb-0 me-2">@sheisme</p>
//                       <ul className="mb-0 list-unstyled d-flex flex-row" style={{ color: '#1B7B2C' }}>
//                         <li>
//                           <MDBIcon fas icon="star fa-xs" />
//                         </li>
//                         <li>
//                           <MDBIcon fas icon="star fa-xs" />
//                         </li>
//                         <li>
//                           <MDBIcon fas icon="star fa-xs" />
//                         </li>
//                         <li>
//                           <MDBIcon fas icon="star fa-xs" />
//                         </li>
//                         <li>
//                           <MDBIcon fas icon="star fa-xs" />
//                         </li>
//                       </ul>

//                     </div>
//                     <div>
//                       <MDBBtn outline color="dark" rounded size="sm">+ Follow</MDBBtn>
//                       <MDBBtn outline color="dark" rounded size="sm" className="mx-1">See profile</MDBBtn>
//                       <MDBBtn outline color="dark" floating size="sm"><MDBIcon fas icon="comment" /></MDBBtn>
//                     </div>
//                   </div>
//                 </div>
//                 <hr />
//                 <MDBCardText>52 comments</MDBCardText>
//                 <MDBBtn color="success" rounded block size="lg">
//                   <MDBIcon far icon="clock me-2" /> Book now
//                 </MDBBtn>
//               </MDBCardBody>
//             </MDBCard>
//           </MDBCol>
//         </MDBRow>
//       </MDBContainer>
//     </div>
//   );
// }

