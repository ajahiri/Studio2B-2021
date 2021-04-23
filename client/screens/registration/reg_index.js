import Register from './Register';
import ImageAuthRegistration from './ImageAuthRegistration';
import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';


export default function reg_index() {

    const REG_DETAILS_PAGE = 'REG_DETAILS_PAGE';
    const REG_PHOTO_PAGE = 'REG_PHOTO_PAGE';

    const [regData, setRegData] = useState({});
    const [regPhotoURI, setRegPhotoURI] = useState('');
    const [regPage, setRegPage] = useState(REG_DETAILS_PAGE);

    const updateRegData = async (inputData) => {
        try {
            await setRegData(inputData);
            await setRegPage(REG_PHOTO_PAGE);
            console.log(inputData);
        }
        catch{ err => console.log(err) }
    }

    const submitAll = async (imgURI) => {
        try {
            await setRegPhotoURI(imgURI);
            console.log(imgURI);
            //submit regData and regPhotoURI to backend
        }
        catch { err => console.log(err) }
    }

    // First render Register form, then render ImageAuthRegister when Next btn is clicked.
    return (
        regPage === REG_DETAILS_PAGE ?
            <Register updateData={updateRegData} />
            :
            <ImageAuthRegistration submitAll={submitAll} />
    );
}

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