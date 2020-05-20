import React,{ Component} from 'react';
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,TouchableHighlight} from 'react-native';

export default class BestRouteList extends React.Component {
    constructor(props) {
        super(props)
        const params = this.props.route.params;
		this.state = {
            routeData:[],
            jsonData:params.jsonData,
        }
    }
    
    render(){
    //console.log(this.state.jsonData);
        if(this.state.jsonData.length===0){
           return(
               <View>
                   <Text>Not found</Text>
               </View>
           );
        }
        let textEles=this.state.jsonData.map((jsonElement,key)=> {
            return(
                <TouchableHighlight style={styles.touchableStyle} underlayColor='rgb(255,255,255)'
                key={key} 
                onPress={()=>{ 
                    let stopData=jsonElement["stops"];
                    let stopCoordinates = []
                    let stopNames = []
                    for(let i=0;i<stopData.length;i++) {
                        stopCoordinates.push({lat:stopData[i].latitude,long:stopData[i].longitude}) //push latitude ,longitude in pdata which are on (2,3).(5,6)....index
                    } 
            
                    for(let i=0;i<stopData.length;i++) {
                        stopNames.push({stopname:stopData[i].stop}) //push latitude ,longitude in pdata which are on (2,3).(5,6)....index
                    } 
                            
                    this.props.navigation.navigate('RouteMap',{data:{rid:jsonElement["route"],coordinates:stopCoordinates,names:stopNames,sourceArrivalTime:jsonElement["source arrival time"],destinationArrivalTime:jsonElement["destination arrival time"]}})
                    }
                }>
                        
                    <Text style={styles.listText}>{jsonElement["route"]+":"+jsonElement["stops"][0].stop+" To "+jsonElement["stops"][jsonElement["stops"].length-1].stop}</Text>
                </TouchableHighlight>
                        
            )
        }
        );
         
        return(
            <View style={styles.textoutputStyle}>
                <ScrollView >
                    {textEles}
                </ScrollView> 
            </View>
        )
    }
}
const styles = StyleSheet.create({  
	container: {  
   		flex: 1,
		backgroundColor: 'red'
    },
    touchableStyle:{
        justifyContent:"center",
        padding:15,
    },
    textstyle:{
        fontSize:20
    },
      
    outputText: {
        flex:1,
        color:'white',
        backgroundColor: 'white',
    },
    textOutputStyle: { 
        backgroundColor:'red',
        marginHorizontal:100,
        padding: 15,
        position:'absolute',
        flex:1,
    },
    listText:{
        textAlign:"center",
        zIndex:1,
        fontSize:15,
        padding:20,
        color:'white',
        backgroundColor: 'purple',
        margin:1,
    }
});
