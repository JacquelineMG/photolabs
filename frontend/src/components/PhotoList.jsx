import React from "react";

import "../styles/PhotoList.scss";
import PhotoListItem from "./PhotoListItem";


const PhotoList = (props) => {

  const { photos, favPhotosArray, addFavourite, removeFavourite, favPhotosExist, openModal, handlePhotoClick } = props;

  return (
    <ul className="photo-list">
      {photos.map((e) => {
        return (

          <PhotoListItem
            key={e.id}
            photoID={e.id}
            imageSource={e.urls.regular}
            imageSourceFull={e.urls.full}
            profile={e.user.profile}
            name={e.user.name}
            userName={e.user.username}
            city={e.location.city}
            country={e.location.country}
            imagesStyle={"photo-list__image"}
            photoListStyle={"photo-list__item"}
            favPhotosArray={favPhotosArray}
            isAFavPhoto={favPhotosArray.includes(e.id)}
            favPhotosExist={favPhotosExist}
            addFavourite={addFavourite}
            removeFavourite={removeFavourite}
            openModal={openModal}
            handlePhotoClick={handlePhotoClick}
          />
          
        );
      })}
    </ul>
  );
};


export default PhotoList;
