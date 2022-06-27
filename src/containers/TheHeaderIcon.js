import React from 'react';
import "../css/headerIcon.css";
import {Image} from 'react-bootstrap';

const TheHeaderIcon = () => {
  return (
    <>
      <Image
        className="icon-header"
        alt={"Quiz"}
        src={"logo/quizLogoWithoutBackground.png"}
      />
    </>
  );
}

export default TheHeaderIcon