/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import { Button, FlatListComponent, Text, View } from 'react-native';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';

type PixelProps = PropsWithChildren<{
    boardWidth: number;
    boardHeigth: number;
    rows: number;
    cols: number;
    myX: number;
    myY: number;
    bar1IdX: number;
    bar1IdY: number;
    bar2IdX: number;
    bar2IdY: number;
    ballX: number;
    ballY: number;
}> ;

function MacroPixel(props: PixelProps) : React.JSX.Element {

    var width = props.boardWidth / props.rows
    var heigth = props.boardHeigth / props.cols

    var ratio = props.rows / 50

    var color : string = "white"

    if (props.myX >= props.ballX * ratio && props.myX <= props.ballX*ratio + ratio-1) {
        if (props.myY >= props.ballY * ratio && props.myY <= props.ballY*ratio + ratio-1) {
            color = "black"
        }
    }
    else if (props.myX >= props.bar1IdX*ratio && props.myX <= props.bar1IdX*ratio + ratio-1) {
        if (props.myY >= props.bar1IdY * ratio && props.myY <= props.bar1IdY*ratio + 10*ratio + ratio-1) {
            color = "black"
        }
    }
    else if (props.myX >= props.bar2IdX*ratio && props.myX <= props.bar2IdX*ratio + ratio-1) {
        if (props.myY >= props.bar2IdY * ratio && props.myY <= props.bar2IdY*ratio + 10*ratio + ratio-1) {
            color = "black"
        }
    }
    else {
        color = "white"
    }

    return (
        <View style={{
            backgroundColor: color,
            width: width,
            height: heigth
        }}>

        </View>
    )
}

export default function PongTable() : React.JSX.Element {
    var [ballX, setBallX] = useState(10)
    var [ballY, setBallY] = useState(10)

    var [bar1X, setBar1X] = useState(0)
    var [bar1Y, setBar1Y] = useState(20)

    var [bar2X, setBar2X] = useState(49)
    var [bar2Y, setBar2Y] = useState(10)

    var rows = Array.from(Array(50).keys()).map((_, rowIdx) => {
        return (
            <View key={rowIdx} style={{flexDirection:'row'}}>
                {Array.from(Array(50).keys()).map((_, colIdx)=> {
                    return (
                        <MacroPixel key={colIdx} boardWidth={400} boardHeigth={400} rows={50} cols={50}
                            myX={colIdx} myY={rowIdx} bar1IdX={bar1X} bar1IdY={bar1Y} ballX={ballX} ballY={ballY}
                            bar2IdX={bar2X} bar2IdY={bar2Y}>

                        </MacroPixel>
                    )
                })}
            </View>
        )
    })

    return (
        <View style={{alignItems: 'center', alignSelf:'stretch'}}>
            {rows}
            <Button title={"Ball Right"} onPress={()=>{setBallX(ballX == 49 ? 49 : ballX+1)}}/>
            <Button title={"Bar One Up"} onPress={()=>{setBar1Y(bar1Y == 0 ? 0 : bar1Y-1)}}/>
            <Button title={"Bar One Down"} onPress={()=>{setBar1Y(bar1Y == 49 ? 49 : bar1Y+1)}}/>
            <Button title={"Bar Two Up"} onPress={()=>{setBar2Y(bar2Y == 0 ? 0 : bar2Y-1)}}/>
            <Button title={"Bar Two Down"} onPress={()=>{setBar2Y(bar2Y == 49 ? 49 : bar2Y+1)}}/>
        </View>
    )
}