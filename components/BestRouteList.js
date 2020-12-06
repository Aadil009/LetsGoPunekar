import React,{ Component} from 'react';
import { StyleSheet, Text, View,ScrollView, TouchableHighlight} from 'react-native';

export default class BestRouteList extends React.Component {
    constructor() {
		super()
		this.state = {
            routeData:[]
        }
    }
    
    render(){
       const params = this.props.route.params;
       this.state.routeData = params.routeData;
       this.state.jsondata = params.jsondata;
       this.state.stopsData = params.stopsData;
       let routesArray=[]
       let sourceArrivalTime=[]
       let destinationArrivalTime=[]
       
        for(var i=0;i<3;++i){
            routesArray[i]=this.state.jsondata[i]["route"]
            sourceArrivalTime[i]=this.state.jsondata[i]["source arrival time"]
            destinationArrivalTime[i]=this.state.jsondata[i]["destination arrival time"]
            

        }
        //console.log(sourceArrivalTime);
        //correct till this point
    
        let textEles=this.state.routeData.map((r,key)=> {
        
        return(
            
        <TouchableHighlight style={styles.touchableView} underlayColor='rgb(255,255,255)'
         key={key} 
            onPress={()=>{ 
			   let stopd = this.state.stopsData[this.state.routeData.indexOf(r)]
	
	
				let pdata = []
                let sdata = []
                
				let sadata=this.state.jsondata[this.state.routeData.indexOf(r)]
				for(var i=0;i<stopd.length;i++) {
					pdata.push({lat:stopd[i].latitude,long:stopd[i].longitude}) //push latitude ,longitude in pdata which are on (2,3).(5,6)....index
				} 
				for(var i=0;i<stopd.length;i++) {
					sdata.push({stopname:stopd[i].stop}) //push latitude ,longitude in pdata which are on (2,3).(5,6)....index
				} 
				this.props.navigation.navigate('RouteMap',{pdata:{pdata:pdata,sdata:sdata,satime:sourceArrivalTime[key],datime:destinationArrivalTime[key],sourceArrivalTime:sourceArrivalTime,destinationArrivalTime:destinationArrivalTime,routesArray:routesArray}})		
			}}>
				  <View elevation={5} style={styles.touchableStyle}>
                    
                    <Text style={styles.listText}>{r}</Text>
                    <View style={{flex:2,flexDirection:'row', justifyContent:'space-between',top:25}} >
                    <View>
                    <Text style={{fontSize:20, fontWeight:'bold', color:'white'}} >Arrival Time</Text><Text style={{fontSize:16, fontWeight:'900',color:'white'}}  > {sourceArrivalTime[key]} </Text>
                    </View>
                    <View>
                    <Text style={{fontSize:20, fontWeight:'bold',color:'white'}}>Destination Time </Text><Text style={{fontSize:16, fontWeight:'900',color:'white'}}  > {destinationArrivalTime[key]} </Text>
                    </View>
                    </View>
                  </View>
				  </TouchableHighlight>
                  
        )
        }
        );
        
   

        return(

            <View elevation={5} style={styles.textoutputStyle}>
            <ScrollView >
                <Text style={{color:'white'}}>{this.state.AnswerText}</Text>
                {textEles}
            </ScrollView> 
        </View>
        )
    }
}
const styles = StyleSheet.create({  
	container: {  
    		flex: 1,
			//backgroundColor: 'red'
    },
    touchableStyle:{
        justifyContent:"center",
        padding:15,
        height:180,
        backgroundColor:'#2C3335',
        
        borderRadius:10,

        
    },
    touchableView:{
         justifyContent:"center",
         margin:10,
         height:180,
  //backgroundColor:'white',
         borderRadius:10,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 3, width: 3 }, // IOS
        shadowOpacity: 10, // IOS
        shadowRadius: 10, //IOS
        backgroundColor: '#fff',
        elevation: 5, // Android
        
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
        marginHorizontal:100,
        padding: 15,
        margin:15,
        position:'absolute',
        flex:1,
    },
    listText:{
        textAlign:"center",
        zIndex:1,
        fontSize:24,
        fontWeight:'bold',
        padding:15,
        color:'white',
        backgroundColor: '#FF362E',
        margin:1,
        
    }
});
