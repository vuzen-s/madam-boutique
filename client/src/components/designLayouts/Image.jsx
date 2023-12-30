import React from "react";

const Image = ({ imgSrc, className, width, height }) => {
  return <img className={className} src={imgSrc} alt={imgSrc} width={width} height={height}/>;
};

export default Image;
