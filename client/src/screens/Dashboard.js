import React from 'react';
import { Text, View } from 'react-native';

import { connect, useDispatch } from 'react-redux';
import * as authActions from '../redux/actions/authActions';

import { AddSubjectCard, SubjectCard } from '../components/cards';
import { font, layout } from '../constants';

function Dashboard({ user }) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const loadUser = async () => {
      dispatch(authActions.getThisUserSaga());
    };

    loadUser();
  }, []);

  const subjects = [
    { subjectName: 'Software Engineering Studio 2B' },
    { subjectName: 'Fundamentals of C Programming' },
    { subjectName: 'System Security' },
  ];

  return (
    <View
      style={{
        marginTop: layout.defaultScreenMargins.vertical,
        marginHorizontal: layout.defaultScreenMargins.horizontal,
      }}>
      <Text style={[font.smallBold]}>Hello, {user.firstName ?? 'NULL'}</Text>
      <Text style={[font.h3]}>My Classrooms</Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          marginTop: layout.spacing.lg,
        }}>
        {subjects.map((subject, idx) => (
          <SubjectCard
            key={`SubjectCard-${idx}`}
            style={{ marginBottom: layout.spacing.lg }}
            subjectName={subject.subjectName}
          />
        ))}
        <AddSubjectCard />
      </View>
    </View>
  );
}

const mapStateToProps = state => {
  const { user } = state.auth;
  return { user };
};

export default connect(mapStateToProps)(Dashboard);
