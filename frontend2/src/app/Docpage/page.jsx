
import React from 'react';
import './style.css';
import SocialCard from './SocialCard';
import userDatas from './userDatas';

const App = () => {
  return (
    <>
      <div class="search">
        <input placeholder="Search..." type="text" />
        <button type="submit" name="go">Go</button>
      </div>


      <div>
        <SocialCard userData={userDatas.userData1} />
        <SocialCard userData={userDatas.userData2} />
        <SocialCard userData={userDatas.userData3} />
        <SocialCard userData={userDatas.userData4} />
        <SocialCard userData={userDatas.userData5} />
        <SocialCard userData={userDatas.userData6} />
        <SocialCard userData={userDatas.userData7} />


      </div>

    </>);
};

export default App;
