import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { useDispatch } from 'react-redux';
import * as authActions from '../redux/actions/authActions';

import { AddSubjectCard, SubjectCard } from '../components/cards';
import { font, layout } from '../constants';

export default function Dashboard({ ...props }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      dispatch(authActions.getThisUserSaga());
    };

    loadUser();
  }, []);

  const {
    userFullName = 'NULL',
    userUniversity = 'NULL',
    permissionLevel = 'student',
    userEmail = 'NULL',
  } = props;

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
      <Text style={[font.h3]}>My Classrooms</Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          marginTop: layout.spacing.lg,
        }}>
        {subjects.map(subject => (
          <SubjectCard
            style={{ marginBottom: layout.spacing.lg }}
            subjectName={subject.subjectName}
          />
        ))}
        <AddSubjectCard />
      </View>
    </View>
  );
}
