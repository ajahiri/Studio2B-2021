import React from 'react';
import { Text, View } from 'react-native';

import { connect, useDispatch } from 'react-redux';
import * as authActions from '../redux/actions/authActions';
import * as sessionActions from '../redux/actions/sessionActions';

import { AddSubjectCard, SubjectCard } from '../components/cards';
import { font, layout } from '../constants';

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

  const subjects = [
    { subjectName: 'Software Engineering Studio 2B' },
    { subjectName: 'Fundamentals of C Programming' },
    { subjectName: 'System Security' },
  ];

  const { user, isSessionLoading, sessionHistory } = props;

  console.log('user in dashboard', user);

  const onCreateNewSession = () => {
    props.navigation.navigate("TeacherCreateSession");
  };

  return (
    <View
      style={{
        marginTop: layout.defaultScreenMargins.vertical,
        marginHorizontal: layout.defaultScreenMargins.horizontal,
      }}>
      <Text style={[font.smallBold]}>
        Hello, {user.firstName ?? 'NULL'} ({user.permissionLevel || ''})
      </Text>

      {user.permissionLevel === 'admin' && (
        <>
          <Text style={[font.h3]}>Admin Dashboard</Text>
        </>
      )}

      {user.permissionLevel === 'teacher' && (
        <>
          <Text style={[font.h3]}>My Sessions</Text>
        </>
      )}

      {user.permissionLevel === 'student' && (
        <>
          <Text style={[font.h3]}>My Session History</Text>
        </>
      )}

      {/* List view of sessions */}

      {/* Cards view */}
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          marginTop: layout.spacing.lg,
        }}>
        <AddSubjectCard onPress={onCreateNewSession}/>
        {isSessionLoading ? (
          <Text>Loading sessions...</Text>
        ) : (
          <>
            {sessionHistory.map(session => (
              <SubjectCard
                key={session._id}
                style={{ marginBottom: layout.spacing.lg }}
                subjectName={session.name}
              />
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
