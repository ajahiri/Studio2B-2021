import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  useSafeAreaInsets,
  withSafeAreaInsets,
} from 'react-native-safe-area-context';

import { connect, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import * as authActions from '../redux/actions/authActions';
import * as sessionActions from '../redux/actions/sessionActions';

import { DottedCard, SessionCard } from '../components/cards';
import { color, font, layout } from '../constants';

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
          <Text style={[font.medium]}>Welcome</Text>
          <Text style={[font.largeBold]}>
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
    /* empty */
  },
  divider: {
    marginHorizontal: layout.defaultScreenMargins.horizontal,
    borderColor: color.gray500,
    borderRadius: 1,
    borderTopWidth: layout.border.thick,
  },
});

function SessionList({ user, isSessionLoading, sessionHistory }) {
  console.log({ sessionHistory });
  const navigation = useNavigation();

  const isTeacher = user.permissionLevel === 'teacher';

  const renderSessionItem = ({ item }) => {
    return (
      <SessionCard
        subjectName={item.name}
        style={{ marginBottom: layout.spacing.lg }}
      />
    );
  };

  return (
    <View
      style={{
        flexGrow: 1,
        paddingHorizontal: layout.defaultScreenMargins.horizontal,
        paddingTop: layout.spacing.xxl,
      }}>
      <Text style={[font.h3, { marginBottom: layout.spacing.lg }]}>
        My Sessions
      </Text>
      <DottedCard
        message={`${isTeacher ? 'Create' : 'Join'} New Session`}
        onPress={() => {
          if (isTeacher) {
            navigation.navigate('TeacherCreateSession');
          } else {
            navigation.navigate('StudentJoinSession');
          }
        }}
      />
      <FlatList
        data={sessionHistory}
        renderItem={renderSessionItem}
        keyExtractor={item => `${item.id}`}
        style={{ marginTop: layout.spacing.lg }}
      />
      {/* {isSessionLoading ? (
        <Text>Loading sessions...</Text>
      ) : (
        <>
          {sessionHistory.map(session => (
            <TouchableOpacity
              key={session._id}
              onPress={() => handleCardPress(session)}>
              <SubjectCard
                style={{ marginBottom: layout.spacing.lg }}
                name={session.name}
              />
            </TouchableOpacity>
          ))}
        </>
      )} */}
    </View>
  );
}

function Dashboard({ user, isSessionLoading, sessionHistory }) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const loadUser = async () => {
      dispatch(authActions.getThisUserSaga());
      dispatch(sessionActions.setSessionLoading(true));
      dispatch(sessionActions.getUserSessionsSaga());
    };

    loadUser();
  }, []);

  console.log('user in dashboard', user);

  return (
    <View style={{ flex: 1 }}>
      <Header user={user} />
      <SessionList
        user={user}
        isSessionLoading={isSessionLoading}
        sessionHistory={[
          { id: 0, name: 'Software Engineering Studio 2B' },
          { id: 1, name: 'Fundamentals of C Programming' },
          { id: 2, name: 'System Security' },
        ]}
      />
    </View>
  );
}

const mapStateToProps = state => {
  const { user } = state.auth;
  const { sessionHistory, isLoading: isSessionLoading } = state.session;
  return { user, sessionHistory, isSessionLoading };
};

export default connect(mapStateToProps)(withSafeAreaInsets(Dashboard));
