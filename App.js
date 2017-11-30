/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity,
    AlertIOS
} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

let shareData = require('./shareData.json');

let widthDimensions = require('Dimensions').get('window').width;

let cols = 3;// 列数
let cellW = 100;// 每一个条目宽度
let vMargin = (widthDimensions - cellW * cols) / (cols + 1);//每个条目的左右间隔
let hMargin = 25;// 上下间距

export default class App extends Component<{}> {

    constructor() {
        super();
        // 数据源
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // 数据
        this.state = {
            dateSource: ds.cloneWithRows(shareData.data)
        }
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dateSource}
                renderRow={this.renderRow}
                // 设置listview内容整体样式
                contentContainerStyle={styles.listviewStyle}
            />
        );
    }

    // 条目
    renderRow(rowData) {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => App.itemClick(rowData)}>
                <View style={styles.viewStyle}>
                    <Image source={{uri: rowData.icon}} style={styles.imageStyle}/>
                    <Text>{rowData.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    static itemClick(rowData) {
        AlertIOS.alert(rowData.title)
    }
}


const styles = StyleSheet.create({
    imageStyle: {
        width: 80,
        height: 80
    },
    listviewStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    viewStyle: {
        width: cellW,
        height: cellW,
        marginLeft: vMargin,
        marginTop: hMargin,
        alignItems: 'center'
    },
});
