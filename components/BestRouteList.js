import React,{ Component} from 'react';
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,TouchableHighlight} from 'react-native';

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
        
        let textEles=this.state.routeData.map((r)=> {   
        return(<TouchableHighlight style={styles.touchableStyle} underlayColor='' key={r} 
            onPress={()=>{ 
				
				 let stopd = this.state.stopsData[this.state.routeData.indexOf(r)]
	
				console.log("data about stopd :"+stopd)
				let pdata = []
                let sdata = []
                
				let sadata=this.state.jsondata[this.state.routeData.indexOf(r)]
				for(var i=0;i<stopd.length;i++) {
					pdata.push({lat:stopd[i].latitude,long:stopd[i].longitude}) //push latitude ,longitude in pdata which are on (2,3).(5,6)....index
				} 
				for(var i=0;i<stopd.length;i++) {
					sdata.push({stopname:stopd[i].stop}) //push latitude ,longitude in pdata which are on (2,3).(5,6)....index
				} 
				this.props.navigation.navigate('RouteMap',{pdata:{pdata:pdata,sdata:sdata,satime:sadata["source arrival time"],datime:sadata["destination arrival time"],sourceArrivalTime:sourceArrivalTime,destinationArrivalTime:destinationArrivalTime,routesArray:routesArray}})		
			}}>
				  
				  <Text style={{textAlign:"center",zIndex:1,fontSize:15,padding:20,color:'white',backgroundColor: 'purple',margin:1}}>{r+":"}</Text>
				  </TouchableHighlight>
                  
        )
        }
        );

        this.state.routeData.map((r)=> {   
            return(<View style={styles.touchableStyle} underlayColor='' key={r} 
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
                    this.props.navigation.navigate('RouteMap',{pdata:{pdata:pdata,sdata:sdata,satime:sadata["source arrival time"],datime:sadata["destination arrival time"]}})		
                }}>
                      
                      <Text style={{textAlign:"center",zIndex:1,fontSize:15,padding:20,color:'white',backgroundColor: 'purple',margin:1}}>{r+":"}</Text>
                      </View>
                      
            )
            }
            );

        return(

            <View style={styles.textoutputStyle}>
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
});
