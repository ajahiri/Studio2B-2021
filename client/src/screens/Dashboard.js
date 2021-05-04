import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useDispatch } from "react-redux";
import * as authActions from "../redux/actions/authActions";

import StudentDashboard from "./dashboards/StudentDashboard";
import TeacherDashboard from "./dashboards/TeacherDashboard";
import { layout } from "../constants";

const Tabs = createBottomTabNavigator();

export default function Dashboard({ navigation: _, ...props }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      dispatch(authActions.getThisUserSaga());
    };

    loadUser();
  }, []);

  const handleLogout = () => {
    dispatch(authActions.logoutUserSaga());
  };

  const {
    userFullName = "NULL",
    userUniversity = "NULL",
    permissionLevel = "student",
    userEmail = "NULL",
  } = props;

  return (
    <SafeAreaView
      style={{
        marginTop: layout.defaultScreenMargins.vertical,
        marginHorizontal: layout.defaultScreenMargins.horizontal,
      }}
    >
      {(() => {
        switch (permissionLevel) {
          case "teacher":
            return <TeacherDashboard />;
          case "student": // fallthrough
          default:
            return <StudentDashboard />;
        }
      })()}
    </SafeAreaView>
  );
}
