import Register from './Register';
import ImageAuthRegistration from './ImageAuthRegistration';
import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import * as cameraActions from '../../redux/actions/cameraActions';
import * as authActions from '../../redux/actions/authActions';


const reg_index = props => {
    const dispatch = useDispatch();
    const { img_uri, capturedImage } = props;


    const REG_DETAILS_PAGE = 'REG_DETAILS_PAGE';
    const REG_PHOTO_PAGE = 'REG_PHOTO_PAGE';
    const PREVIEW = 'PREVIEW';

    const [regData, setRegData] = useState({});
    //const [regPhotoURI, setRegPhotoURI] = useState('');
    const [regPage, setRegPage] = useState(REG_DETAILS_PAGE);

    const updateRegData = (inputData) => {
        setRegData(inputData);
        setRegPage(REG_PHOTO_PAGE);
    }

    const submitAll = () => {

        let user = {
            firstName: regData.firstName,
            lastName: regData.lastName,
            university: regData.university,
            email: regData.email,
            password: regData.password,
            img_uri: img_uri,
        }

        // submit user data to backend
        dispatch(authActions.registerUser(user)); 
    }

    return (
        regPage === REG_DETAILS_PAGE ?
            <Register updateData={updateRegData} />
            :
            <ImageAuthRegistration submitAll={submitAll} />
    );
}

const mapStateToProps = state => {
    return {
        img_uri: state.camera.img_uri,
        capturedImage: state.camera.capturedImage,
    }; 
}

export default connect(mapStateToProps)(reg_index);

const styles = StyleSheet.create({
    buttonContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 30,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    nextButton: {
        height: 52,
        backgroundColor: '#3D3ABF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        marginTop: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        margin: 'auto',
        fontWeight: 'bold',
    },
})