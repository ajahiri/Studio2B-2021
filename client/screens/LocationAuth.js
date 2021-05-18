import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

import { Banner, Button } from '../components';
import { color, font, layout } from '../constants';

const LocationAuth = (props) => {
  const { user, isTeacher } = props;

  const [statusText, setStatusText] = useState('Getting your location..');
  const [errorMsg, setErrorMsg] = useState('');
  const [allowNext, setAllowNext] = useState(false);

  const [region, setRegion] = useState({
    latitude: -33.9657,
    longitude: 151.1338,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const getLocation = async () => {
    try {
      console.log('Trying to get curr location');
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setAllowNext(false);
        setErrorMsg('Permission to access location was denied');
        setStatusText('');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        ...region,
        latitude: location?.coords?.latitude || region.latitude,
        longitude: location?.coords?.longitude || region.longitude,
      });
      setStatusText('');
      setAllowNext(true);
    } catch (error) {
      setErrorMsg('Location provider is unavailable, please retry');
      setStatusText('');
      setAllowNext(false);
      console.log('Error getting location:', error);
    }
  };

  useEffect(() => {
    (async () => {
      await getLocation();
    })();
  }, []);

  const onSubmission = () => {
    props.onLocationAuthSubmit({
      latitude: region.latitude,
      longitude: region.longitude,
    });
  };

  let topMargin = layout.spacing.sm;
  if (!isTeacher) topMargin = layout.spacing.huge;

  return (
    <SafeAreaView>
      <View style={[styles.container, { marginTop: topMargin }]}>
        <Text style={styles.title}>Location Authentication</Text>
        <Text style={styles.bodyText}>
          Your current location will be used for location authentication. You
          cannot proceed without a valid current location.{' '}
          {props.isTeacher
            ? 'Students in the depicted vicinity will be successfully authenticated, this is a 500m radius.'
            : ''}
        </Text>
        <MapView style={styles.map} region={region}>
          <MapView.Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title="Your Location"
            description="This is your current location, will be used for location authentication."
          />
          <MapView.Circle
            center={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            radius={500}
            strokeWidth={3}
            fillColor="rgba(200, 100, 200, 0.3)"
          />
        </MapView>
        {errorMsg !== '' && (
          <Banner style={styles.errorMsg} type="error" message={errorMsg} />
        )}
        {statusText !== '' && (
          <Banner
            style={styles.statusMsg}
            type="generic"
            message={statusText}
          />
        )}
        <Button
          style={styles.button}
          type="secondary"
          size="small"
          title="Get Current Location"
          onPress={() => getLocation()}
        />
        <Button
          style={styles.button}
          type="primary"
          size="small"
          title="Next"
          disabled={!allowNext}
          onPress={() => onSubmission()}
        />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  const { user } = state.auth;
  return {
    user,
  };
};

export default connect(mapStateToProps)(LocationAuth);

const styles = StyleSheet.create({
  container: {
    marginLeft: layout.spacing.xl,
    marginRight: layout.spacing.xl,
  },
  map: {
    width: Dimensions.get('window').width - layout.spacing.xl * 2,
    height: Dimensions.get('window').height / 3,
    marginVertical: layout.spacing.xl,
  },
  title: {
    ...font.h2,
    marginTop: layout.spacing.md,
    marginBottom: layout.spacing.sm,
  },
  bodyText: {
    ...font.medium,
  },
  errorMsg: {
    marginBottom: layout.spacing.md,
  },
  statusMsg: {
    marginBottom: layout.spacing.md,
  },
  button: {
    marginBottom: layout.spacing.md,
  },
});
