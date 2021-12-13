import React, { useEffect, useState } from "react";
import "./Loadingpop.css";

const Popuploading = () => {

    return (
      <div className = 'overlayoloading'>
        <div className='popupboxloading'>
          <div>กำลังโหลด โปรดรอสักครู่</div>
        </div>
      </div>
    );
  };



export default Popuploading