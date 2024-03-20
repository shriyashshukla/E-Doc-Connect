import React from 'react';
import './style.css'
const page = () => {
  return (
    <div>
      <h1>Constact us</h1>
      <address>ShriRamswroop Collage</address><br />
      < div className='map'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3556.481828016361!2d81.0955250760856!3d26.95163697662391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39995ee81add328f%3A0xbe8acc99218572c9!2sShri%20Ramswaroop%20Memorial%20University!5e0!3m2!1sen!2sin!4v1710950388735!5m2!1sen!2sin" width="600" height="450" allowfullscreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  );
}

export default page;
