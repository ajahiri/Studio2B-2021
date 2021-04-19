import Register from './Register';
import ImageAuthRegistration from './ImageAuthRegistration';
import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
  } from 'react-native';


export default function reg_index() {

    const REG_DETAILS_PAGE = 'REG_DETAILS_PAGE';
    const REG_PHOTO_PAGE = 'REG_PHOTO_PAGE';    

    const [regData, setRegData] = useState({});
    // set up page state
    const [regPage, setRegPage] = useState(REG_DETAILS_PAGE);

    const updateRegData = async (inputData) => {
        await setRegData(inputData);
        await setRegPage(REG_PHOTO_PAGE);
        console.log(regData);
    }
    
    // First render Register form, then render ImageAuthRegister when Next btn is clicked.
    return(
        regPage === REG_DETAILS_PAGE ? 
        <View>
            <Register updateData={updateRegData}/>
        </View>
        :
        <View>
            <ImageAuthRegistration/>
            <View style={styles.buttonContainer}>
                {/* <TouchableOpacity style={styles.photoButton}>
                    <Text style={styles.buttonTextPhoto}>TAKE PHOTO</Text>
                </TouchableOpacity> */}
                <TouchableOpacity 
                style={styles.nextButton}
                onPress={console.log(regData)}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
      </View>
    );

    // On click btnNext () => {regPage = 2; Hide btnNext;}
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