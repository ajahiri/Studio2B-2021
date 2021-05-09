import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';

import { Container, Header, Content, Input, Item, Text } from 'native-base';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { connect } from 'react-redux';
import * as SecureStore from 'expo-secure-store';

import axios from 'axios';
import { resolveBaseURL } from '../globals/globals';

import { Button } from '../components';

const BASE_API_URL = resolveBaseURL();

const StudentJoinSession = props => {
  const { name, description, maxStudents, shortID, createdAt } =
    props.currentJoinedSession || {};

  const [joinCode, setJoinCode] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [useScanner, setuseScanner] = useState(false);

  const toggleQRScanner = () => {
    setuseScanner(!useScanner);
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    console.log(
      `Bar code with type ${type} and data ${data} has been scanned!`,
    );
    setScanned(true);
    setJoinCode(data);
  };

  const getSession = async () => {
    try {
      const authToken = await SecureStore.getItemAsync('userToken');
      const response = await axios.request({
        method: 'post',
        url: `/api/sessions/getSession`,
        baseURL: BASE_API_URL,
        data: { sessionCode: joinCode },
        headers: {
          'auth-token': authToken,
        },
      });
      Alert.alert('response.message', JSON.stringify(response.data.data), [
        { text: 'OK' },
      ]);
      console.log(response.data);
    } catch (error) {
      Alert.alert('Error Getting Session', JSON.stringify(error.message), [
        { text: 'OK' },
      ]);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <ScrollView>
          {props.isLoading ? (
            <Container>
              <Content>
                <Spinner color="blue" />
              </Content>
            </Container>
          ) : (
            <>
              <View /* Title */ style={styles.container}>
                <Text style={styles.title}>{name}</Text>
                <Text>Join by code:{description}</Text>
                <Item regular>
                  <Input
                    onChangeText={value => {
                      console.log(joinCode);
                      setJoinCode(value);
                    }}
                    value={joinCode}
                    placeholder="Regular Textbox"
                  />
                </Item>
                <Text>OR:</Text>
                <TouchableOpacity
                  onPress={toggleQRScanner}
                  style={styles.startsessioncontainer}>
                  <Text style={styles.startsession}>USE SCAN QR CODE</Text>
                </TouchableOpacity>
                {useScanner && (
                  <View>
                    <BarCodeScanner
                      onBarCodeScanned={
                        scanned ? undefined : handleBarCodeScanned
                      }
                      style={{ width: 300, height: 300 }}
                      barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                    />
                    {scanned && (
                      <Button
                        title="Tap to Scan Again"
                        onPress={() => setScanned(false)}
                      />
                    )}
                  </View>
                )}
              </View>

              <TouchableOpacity
                onPress={getSession}
                style={styles.startsessioncontainer}>
                <Text style={styles.startsession}>GET SESSION</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity style={styles.startsessioncontainer}>
                <Text style={styles.startsession}>JOIN SESSION</Text>
              </TouchableOpacity> */}
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { currentJoinedSession, isLoading } = state.session;
  return {
    currentJoinedSession,
    isLoading,
  };
};

export default connect(mapStateToProps)(StudentJoinSession);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  title: {
    fontSize: 30,
    marginTop: 25,
    fontWeight: 'bold',
  },

  students: {
    marginTop: 10,
    marginLeft: 40,
    fontSize: 16,
  },

  pageBackButton: {
    position: 'absolute',
    marginTop: 40,
    marginLeft: 70,
  },

  startsession: {
    fontWeight: 'bold',
    fontSize: 18,
    borderWidth: 1,
    color: '#FFFFFF',
    backgroundColor: '#1E4AE7',
    margin: 45,
    height: 40,
    textAlign: 'center',
    paddingVertical: 7,
    marginTop: 0,
  },
});
