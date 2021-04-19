import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

export default function ImageUpload() {

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    // request camera permission
    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);

      // check permission
      if (hasPermission === null) {
        return <View />;
      }
      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      }
      return (
        <View>
            <View style={styles.imageContainer}>
            <Camera style={styles.camera} type={type}>
                <View style={styles.flipButtonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                    setType(
                        type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                    }}>
                    <Text style={styles.text}> Flip </Text>
                </TouchableOpacity>
                </View>
            </Camera>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.photoButton}>
                <Text style={styles.buttonTextPhoto}>TAKE PHOTO</Text>
                </TouchableOpacity>
            </View>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    camera: {
      flex: 1,
    },
    flipButtonContainer: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      margin: 20,
    },
    button: {
      flex: 0.1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 18,
      color: 'white',
    },
    photoButton: {
        height: 52,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
      },
    buttonContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 60,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
      },
      buttonTextPhoto: {
        color: 'black',
        fontWeight: 'bold',
      },
      imageContainer: {
        paddingTop: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      },
  });