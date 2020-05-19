import React from 'react';
import {View , Text , Button , ScrollView} from 'react-native';

class Info extends React.Component{

    constructor(){
        super();
        this.state={
            screen:0,
            firstButtonColor:'blue',
            secondButtonColor:'blue'
        }
    }

    switchScreen(x){
        if(x==1){
            return(
                <ScrollView style={{margin:10,borderWidth:1,borderColor:'black'}}>
                    <Text style={{fontSize:25}}>
                        Sample text 
                        Hello we are students from SPPU
                        we have made this application to show
                        timetable of buses
                        React Native lets you create truly native apps
                        and doesn't compromise on your users' experience.
                        It provides a core set of platform agnostic native
                        components like View, Text, and Image 
                        that map directly to the platform’s native 
                        UI building blocks.
                    </Text>
                </ScrollView>
            );
        }
        else if(x==2){
            return(
                <ScrollView style={{margin:10,borderWidth:1,borderColor:'black'}}>
                    <Text style={{fontSize:25}}>
                        Select source stop name and destination stop name
                        press find routes Button then this app will show you
                        the best 3 according to time
                    </Text>
                </ScrollView>
            );
        }
        else{
            return(
                <View style={{alignContent:"center",alignItems:"center"}}>
                    <Text style={{fontSize:25}}>
                        Hey,There....
                    </Text>
                </View>
            );
        }
    }

    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flex:1,paddingTop:10}}>
                    <Button title="About us" color={this.state.firstButtonColor} onPress={()=>{
                        this.setState({screen:1,firstButtonColor:'orange',secondButtonColor:'blue'});
                    }}/>
                </View>
                <View style={{flex:1,paddingTop:10}}>
                    <Button title="About this app" color={this.state.secondButtonColor} onPress={()=>{
                        this.setState({screen:2,firstButtonColor:'blue',secondButtonColor:'orange'});
                    }}/>
                </View>
                <View style={{flex:8}}>
                    {this.switchScreen(this.state.screen)}
                    
                </View>
                

            </View>
        );
    }
}

export default Info;