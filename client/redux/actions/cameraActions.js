import {
    CAMERA_INSTANCE,
    CAPTURED_IMAGE,
    CAMERA_READY,
    TAKE_PHOTO_CLICKED,
    IMG_URI,
} from '../types';

export const cameraInstance = cameraInstance => ({
    type: CAMERA_INSTANCE,
    payload: cameraInstance
});

export const capturedImage = result => ({
    type: CAPTURED_IMAGE,
    payload: result //bool
});

export const imgURI = img_uri => ({
    type: IMG_URI,
    payload: img_uri
});
export const cameraReady = ready => ({
    type: CAMERA_READY,
    payload: ready
});

export const takePhotoClicked = clicked => ({
    type: TAKE_PHOTO_CLICKED,
    payload: clicked
});