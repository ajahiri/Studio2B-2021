import React from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  useSafeAreaInsets,
  withSafeAreaInsets,
} from 'react-native-safe-area-context';

import { connect, useDispatch } from 'react-redux';
import * as authActions from '../redux/actions/authActions';
import * as sessionActions from '../redux/actions/sessionActions';

import { DottedCard, SessionCard } from '../components/cards';
import { color, font, layout } from '../constants';
import { wait } from '../globals/globals';
import { Banner } from '../components';

function Header({ user, ...props }) {
  const fullName = `${user.firstName ?? '???'} ${user.lastName ?? '???'}`;
  const { top: topInset } = useSafeAreaInsets();

  return (
    <View
      style={[
        headerStyles.container,
        { paddingTop: topInset + layout.spacing.xxl },
        props.style,
      ]}>
      <View style={headerStyles.content}>
        <View style={headerStyles.textContainer}>
          <Text style={[font.medium, { flexGrow: 1 }]}>Welcome</Text>
          <Text numberOfLines={1} style={[font.largeBold, { flexGrow: 1 }]}>
            {fullName} ({user.permissionLevel ?? 'NONE'})
          </Text>
        </View>
        <Ionicons
          name="menu"
          size={32}
          color={color.black}
          onPress={() => {}}
        />
      </View>
      <View style={headerStyles.divider} />
    </View>
  );
}

const headerStyles = StyleSheet.create({
  container: {
    backgroundColor: color.accent,
    alignContent: 'flex-end',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: layout.defaultScreenMargins.horizontal,
    marginBottom: layout.spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  divider: {
    marginHorizontal: layout.defaultScreenMargins.horizontal,
    borderColor: color.gray500,
    borderRadius: 1,
    borderTopWidth: layout.border.thick,
  },
});

function SessionList(props) {
  const { user, isSessionLoading, sessionHistory } = props;

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isTeacherOrAdmin =
    user.permissionLevel === 'teacher' || user.permissionLevel === 'admin';

  const [isRefreshing, setIsRefreshing] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        dispatch(authActions.getThisUserSaga());
        dispatch(sessionActions.setSessionLoading(true));
        dispatch(sessionActions.getUserSessionsSaga());
      } catch (error) {
        setError(error);
        console.error(`Failed to load user: ${error.message ?? error}`);
      }

      wait(2000).then(() => setIsRefreshing(false));
    };

    if (isRefreshing) loadUser();
  }, [isRefreshing]);

  const onRefresh = () => setIsRefreshing(true);

  const renderSessionCardItem = ({ item, index }) => {
    console.log({ item });

    const handleSessionCardItemPress = () => {
      console.warn('Unimplemented!');
    };

    return (
      <SessionCard
        key={`session-card-${index}`}
        name={item.name}
        description={item.description}
        maxStudents={item.maxStudents}
        createdAt={new Date(item.createdAt)}
        style={{ marginBottom: layout.spacing.lg }}
        onPress={handleSessionCardItemPress}
      />
    );
  };

  const renderHeaderComponent = () => {
    return (
      <View>
        <Text style={[font.h3, { marginBottom: layout.spacing.lg }]}>
          My Sessions
        </Text>
        <DottedCard
          message={`${isTeacherOrAdmin ? 'Create' : 'Join'} New Session`}
          style={{ marginBottom: layout.spacing.lg }}
          onPress={() => {
            if (isTeacherOrAdmin) {
              navigation.navigate('TeacherCreateSession');
            } else {
              navigation.navigate('StudentJoinSession');
            }
          }}
        />
      </View>
    );
  };

  const renderEmptySessionHistory = () => {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={[sessionListStyles.text]}>
          You don't have any previous sessions.
        </Text>
      </View>
    );
  };

  const renderSessionList = () => {
    if (isSessionLoading || error) {
      return (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }>
          {renderHeaderComponent()}
          {isSessionLoading ? (
            <Text style={sessionListStyles.text}>Loading sessions...</Text>
          ) : (
            <Text style={[sessionListStyles.text, { color: color.red500 }]}>
              An unexpected error occurred.{'\n'}Please try again later
            </Text>
          )}
        </ScrollView>
      );
    } else {
      return (
        <FlatList
          data={sessionHistory}
          renderItem={renderSessionCardItem}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          ListHeaderComponent={renderHeaderComponent}
          ListEmptyComponent={renderEmptySessionHistory}
        />
      );
    }
  };

  return (
    <View
      style={{
        flexGrow: 1,
        paddingHorizontal: layout.defaultScreenMargins.horizontal,
        paddingTop: layout.spacing.xxl,
      }}>
      {renderSessionList()}
    </View>
  );
}

const sessionListStyles = StyleSheet.create({
  text: {
    ...font.large,
    textAlign: 'center',
    color: color.gray500,
  },
});

function Dashboard(props) {
  const { user, isSessionLoading, sessionHistory } = props;

  return (
    <View style={{ flex: 1 }}>
      <Header user={user} />
      <SessionList
        user={user}
        isSessionLoading={isSessionLoading}
        sessionHistory={sessionHistory}
      />
    </View>
  );
}

const mapStateToProps = (state) => {
  const { user } = state.auth;
  const { sessionHistory, isLoading: isSessionLoading } = state.session;
  return { user, sessionHistory, isSessionLoading };
};

export default connect(mapStateToProps)(withSafeAreaInsets(Dashboard));
