import { useState, useReducer, useEffect } from "react";
import axios from 'axios';

// favPhotos = array of favourited photos
// addFavourite = function to add photos to favourite array
// removeFavourite = function to remove photos from favourite array

// clickedPhoto = state of a photo having been clicked or null
// openModal = set clickedPhoto to photo
// closeModal = set clickedPhoto to null
// handlePhotoClick = onClick event calls openModal setting clickedPhoto to photo
// handleCloseClick = onClick event calls closeModal setting clickedPhoto to null

// isFav = set photos state as favourited or not
// handleFavClick = onClick event toggles between favourited state or not 


const SET_PHOTO_DATA = 'SET_PHOTO_DATA';
const SET_TOPIC_DATA = 'SET_TOPIC_DATA';

const ADD_FAV_PHOTOS = 'ADD_FAV_PHOTOS';
const REMOVE_FAV_PHOTOS = 'REMOVE_FAV_PHOTOS';
const SET_IS_FAV = 'SET_IS_FAV';

const SET_CLICKED_PHOTO = 'SET_CLICKED_PHOTO';
const SET_CLICKED_PHOTO_INFO = 'SET_CLICKED_PHOTO_INFO';
const SET_SIMILAR_PHOTOS = 'SET_SIMILAR_PHOTOS';



function reducer(state, action) {
  switch (action.type) {

    case SET_PHOTO_DATA:
      return { ...state, photos: action.payload };

    case SET_TOPIC_DATA:
      return { ...state, topics: action.payload };

    case SET_CLICKED_PHOTO:
      return { ...state, clickedPhoto: action.payload };

    case ADD_FAV_PHOTOS: 
      return { ...state, favPhotos: action.payload };

    case REMOVE_FAV_PHOTOS:
      return { ...state, favPhotos: action.payload };
    
    case SET_CLICKED_PHOTO_INFO:
      return { ...state, clickedPhotoInfo: action.payload };

    case SET_SIMILAR_PHOTOS:
      return { ...state, similarPhotos: action.payload };

    case SET_IS_FAV:
      return { ...state, isFav: action.payload };

  
  default:
    throw new Error (
      `Tried to reduce with unsupported action type: ${action.type}`
    );
  }
}

const initialState = {
  photos: [],
  topics: [],
  favPhotos: [],
  clickedPhoto: null,
  clickedPhotoInfo: {},
  similarPhotos: [],
  isFav: false
};

const useApplicationData = () => {

  const [state, dispatch] = useReducer(reducer, initialState);
  

  useEffect(() => {

    const photoPromise = axios.get('/api/photos');
    const topicPromise = axios.get('/api/topics');

    const dataPromises = [photoPromise, topicPromise];

    Promise.all(dataPromises)
      .then((resArray) => {

        const photos = resArray[0].data;
        const topics = resArray[1].data;

        dispatch({ type: 'SET_PHOTO_DATA', payload: photos})
        dispatch({ type: 'SET_TOPIC_DATA', payload: topics })
      })
  }, []);

  // set state of favourite/not favourite photos

  const addFavourite = (photoID) => {
    if (!state.favPhotos.includes(photoID)) {
      dispatch({ type: 'ADD_FAV_PHOTOS', payload: [...state.favPhotos, photoID] });
    }
  };

  const removeFavourite = (photoID) => {
    if (state.favPhotos.includes(photoID)) {
      const filteredState = state.favPhotos.filter((id) => id !== photoID)
      dispatch({ type: 'REMOVE_FAV_PHOTOS', payload: filteredState });
    }
  };


  // set state of clicked photo to open modal/set clicked photo state to null to close modal
  
  const openModal = (photo) => {
    dispatch({ type: 'SET_CLICKED_PHOTO', payload: photo });
  };

  const closeModal = () => {
    dispatch({ type: 'SET_CLICKED_PHOTO', payload: null });
  };

  const handlePhotoClick = (photo) => {
    openModal(photo);

    const photos = state.photos;
    const targetId = photo.target.id;


    // get and set information about clicked photo

    const getPhotoInfo = async (pho, tarid) => {
      let info = {};
      for (const p of pho) {
        if (p.id === tarid) {  
          console.log("p", p)        
          info = {...p};
        }
      }
      return info;
    };

    const setPhotoInfo = async () => {
      const infoOb = await getPhotoInfo(photos, targetId)
      dispatch({ type: 'SET_CLICKED_PHOTO_INFO', payload: infoOb })
    }

    
  


    // set value for similar photos to clicked photo

    const simPhotos = Object.values(state.clickedPhotoInfo.similar_photos)
    dispatch({ type: 'SET_SIMILAR_PHOTOS', payload: simPhotos });
  };

  const handleCloseClick = () => {
    closeModal();
  };

  // set state of a favourite button
 
  const handleFavClick = ()=> { 
    {isFav === true ? 
      dispatch({ type: 'SET_IS_FAV', payload: false }) : 
      dispatch({ type: 'SET_IS_FAV', payload: true })
    }
  };
  
 
  return { 
    state,
    actions: {
      openModal,
      closeModal,
      addFavourite,
      removeFavourite,
      handleFavClick
    },
    handlePhotoClick, 
    handleCloseClick,
    photos: state.photos,
    topics: state.topics,
    favPhotos: state.favPhotos,
    clickedPhoto: state.clickedPhoto, 
    clickedPhotoInfo: state.clickedPhotoInfo,
    similarPhotos: state.similarPhotos,
    ifFav: state.isFav,  
    }

};


export default useApplicationData;