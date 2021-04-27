import {
    CAMERA_INSTANCE,
    IMAGE_CAPTURED,
    IMG_URI,
    CAMERA_READY,
    TAKE_PHOTO_CLICKED,
} from '../types';

const initialState = {
    cameraInstance: {},
    imageCaptured: false,
    img_uri: '',
    cameraReady: false,
    errors: '',
  };

export default function (state = initialState, action) {
    switch(action.type) {
        case CAMERA_INSTANCE:
            return{
                ...state,
                cameraInstance: action.payload
            };
        case IMAGE_CAPTURED:
            return{
                ...state,
                imageCaptured: action.payload
            };
        case IMG_URI:
            return{
                ...state,
                img_uri: action.payload
            }
        case CAMERA_READY:
            return{
                ...state,
                cameraReady: action.payload
            };
        case TAKE_PHOTO_CLICKED:
            return{
                ...state,
                takePhotoClicked: action.payload
            };
        default:
            return state;
    }
}