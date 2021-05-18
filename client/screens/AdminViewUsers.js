import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Tab } from 'native-base';

const AdminViewUsers = props => {
    const tableHead = ['ID', 'Name', 'Status'];

    const Users = [
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
        Users.map(user => {
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
                <Rows data={renderRow()} />

                {/* {
                    Users.map((user, rowIndex) => { // This will render a row for each data element.
                        const rowData = renderRow(user);
                        return (
                            <TableWrapper key={rowIndex} style={styles.row}>
                                {
                                    rowData.map((userData, cellIndex) => (
                                        <Cell key={cellIndex} data={cellIndex === 3 ? 'btn' : userData} textStyle={styles.text} />
                                    ))
                                }
                            </TableWrapper>
                        );
                    })
                } */}
            </Table>
        </View>
    );
}

export default AdminViewUsers;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
    row: { height: 40, flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
});