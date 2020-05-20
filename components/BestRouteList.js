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
<<<<<<< HEAD
       const params = this.props.route.params;
       this.state.routeData = params.routeData;
       this.state.jsondata = params.jsondata;
       this.state.stopsData = params.stopsData;
       console.log(this.state.jsondata);
       //remove this comment and above console.log line
       let routesArray=[]
       let sourceArrivalTime=[]
       let destinationArrivalTime=[]
       
        for(var i=0;i<3;++i){
            routesArray[i]=this.state.jsondata[i]["route"]
            sourceArrivalTime[i]=this.state.jsondata[i]["source arrival time"]
            destinationArrivalTime[i]=this.state.jsondata[i]["destination arrival time"]
            

        }
        
    
        let textEles=this.state.routeData.map((r,key)=> {
        
        return(<TouchableHighlight style={styles.touchableStyle} underlayColor='rgb(255,255,255)'
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
				  
				  <Text style={styles.listText}>{r}</Text>
				  </TouchableHighlight>
                  
        )
=======
    //console.log(this.state.jsonData);
        if(this.state.jsonData.length===0){
           return(
               <View>
                   <Text>Not found</Text>
               </View>
           );
>>>>>>> 19ce29015886ec6d22e209d69b395062efd1a4b9
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
