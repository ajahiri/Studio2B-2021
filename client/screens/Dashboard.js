import React from 'react';
import { Text, View } from 'react-native';

import { connect, useDispatch } from 'react-redux';
import * as authActions from '../redux/actions/authActions';
import * as sessionActions from '../redux/actions/sessionActions';

import { AddSubjectCard, SubjectCard } from '../components/cards';
import { font, layout } from '../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Dashboard(props) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const loadUser = async () => {
      dispatch(authActions.getThisUserSaga());
      dispatch(sessionActions.setSessionLoading(true));
      dispatch(sessionActions.getUserSessionsSaga());
    };

    loadUser();
  }, []);

  const { user, isSessionLoading, sessionHistory, navigation } = props;

  console.log('user in dashboard', user);

  const handleCardPress = session => {
    console.log('pressed session', session);
    navigation.navigate('TeacherViewSession', { session });
  };

  return (
    <View
      style={{
        marginTop: layout.defaultScreenMargins.vertical,
        marginHorizontal: layout.defaultScreenMargins.horizontal,
      }}>
      <Text style={[font.smallBold]}>
        Hello, {user.firstName ?? 'NULL'} ({user.permissionLevel ?? 'NONE'})
      </Text>

      {(() => {
        switch (user.permissionLevel) {
          case 'admin':
            return (
              <>
                <Text style={[font.h3]}>Admin Dashboard</Text>
              </>
            );
          case 'teacher':
            return (
              <>
                <Text style={[font.h3]}>Teacher Dashboard</Text>
              </>
            );
          case 'student':
          default:
            return (
              <>
                <Text style={[font.h3]}>Student Dashboard</Text>
              </>
            );
        }
      })()}

      {/* List view of sessions */}

      {/* Cards view */}
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          marginTop: layout.spacing.lg,
        }}>
        <AddSubjectCard
          onPress={() => {
            if (user.permissionLevel === 'student') {
              navigation.navigate('StudentJoinSession');
            } else {
              navigation.navigate('TeacherCreateSession');
            }
          }}
          isTeacher={user.permissionLevel === 'teacher'}
        />
        {isSessionLoading ? (
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
        )}
      </View>
    </View>
  );
}

const mapStateToProps = state => {
  const { user } = state.auth;
  const { sessionHistory, isLoading: isSessionLoading } = state.session;
  return { user, sessionHistory, isSessionLoading };
};

export default connect(mapStateToProps)(Dashboard);
