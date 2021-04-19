import Register from './Register';
import ImageAuthRegistration from './ImageAuthRegistration';
import React, { useState } from 'react';

export default function reg_index() {

    const [regData, setRegData] = useState({});

    const updateRegData = async (inputData) => {
        await setRegData(inputData);
        console.log(regData)
    }
    
    // set up page state
    const [regPage, setRegPage] = useState(1);
    
    // First render Register form, then render ImageAuthRegister when Next btn is clicked.
    return(
        regPage === 1 ? 
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
                <TouchableOpacity style={styles.nextButton}>
                    <Text style={styles.buttonText}>NEXT</Text>
                </TouchableOpacity>
            </View>
      </View>
    );

    // On click btnNext () => {regPage = 2; Hide btnNext;}
}