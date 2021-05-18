import axios from 'axios';
import { resolveBaseURL } from '../globals/globals';
const BASE_API_URL = resolveBaseURL();

import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import * as authActions from '../redux/actions/authActions';

function AdminViewUsers(props) {
    const { searchedUsers } = props;
    const dispatch = useDispatch();

    const tableHead = ['ID', 'Name', 'Status'];

    function runTest() {
        const result = axios.request({
            method: 'get',
            url: `api/users/userSearch`,
            baseURL: BASE_API_URL,
            data: ' ',
        });
        console.log(result);
    }
    
    useEffect(() => {
        // console.log('searching...');
        // dispatch(authActions.searchUsersSaga(''));  //returns all users
        // console.log(searchedUsers.length);
        // console.log('SEARCH COMPLETE!!!!!');
    }, []);

    const Users = [ //dummy data (delete)
        {
            _id: '1',
            name: 'Billy',
            status: 'student'
        },
        {
            _id: '2',
            name: 'Mrs Sarah',
            status: 'teacher'
        }
    ];

    const renderRow = () => {
        arr = [];
        searchedUsers.map(user => {
            arr.push([user._id, user.name, btnStatusToggle(user)]);
        });
        return arr;
    }

    const btnStatusToggle = (user) => (
        <TouchableOpacity onPress={() => _alertIndex(user.name)}>
            <View style={styles.btn}>
                <Text style={styles.btnText}>{user.status}</Text>
            </View>
        </TouchableOpacity>
    );

    const _alertIndex = name => {
        Alert.alert(`This is user's name is ${name}`);
    }

    return (
        <View style={styles.container}>
            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                <Row data={tableHead} style={styles.head} textStyle={styles.text} />
                <Rows data={renderRow(' ')} />
            </Table>
            <TouchableOpacity onPress={runTest()}><Text>TEST</Text></TouchableOpacity>
        </View>
    );
}

const mapStateToProps = state => {
    const { searchedUsers } = state.auth;
    return {
        searchedUsers,
    };
};

export default connect(mapStateToProps)(AdminViewUsers);

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
    row: { height: 40, flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
});