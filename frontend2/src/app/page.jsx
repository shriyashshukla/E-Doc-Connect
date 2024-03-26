
import About from './about/page';
import Doctors from './Doctors/page';
import TestimonialsPage from './Testimonials/page';
import Contact from './Contact/page';
import Counter from './Components/counter/Counter';
import Gallery from './Gallery/page';
import Features from './Features/page';
import './page.module.css';
import Footer from './footer/page';
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";




const Page = () => {
  return (
    <>
    <div className='Main-img mb-[100px]'>
    <header>
    <h1>Header Content Goes Here</h1>
    
  </header>
      <div className="img-container relative ">
        <img src="hero-bg.jpg" alt="" className='' />
        <div className="text absolute top-1/2 left-0 transform -translate-y-1/2 text-center text-blue-400 z-10">
          <h1 className="text-6xl font-bold">Welcome to our MedAssure</h1>
          <p className="text-black text-2xl">Care for U!</p>
          <div>
            <a href="Option">
              <button className="nav-button">Quick Start</button>
            </a>
          </div>
        </div>
      </div>
      <About />
      <Counter/>
      <Features/>
      <Doctors/>
     <Gallery/> 
      <TestimonialsPage/>
      <Contact/> 
      <Footer/>
    </div>
  </>
  );
}

export default Page;
