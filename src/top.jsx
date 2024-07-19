import React from "react";
import myImage from './assets/pngwing.com.png'
function head(){
    return (
        <>
         
        <h1 className='base'><img src={myImage} alt="Factory" style={{ width: '60px', height: 'auto' }} /> Factory Data Base</h1>
        <marquee> <h3>####     Jagdish U Aradhya 67 #### Mohammad Kaif 94 #### Mahesh R 85 #### Harshith Alfred 193 </h3> </marquee>
        </>
    
    )
};
export default head;