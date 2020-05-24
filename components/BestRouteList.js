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
       //console.log(this.state.jsondata);
       //remove this comment and above console.log line
       if(this.state.jsondata.length==0){
           return(
               <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
                   <Text>No routes available at this moment...</Text>
               </View>
           );
       }
       
       let routesArray=[]
       let sourceArrivalTime=[]
       let destinationArrivalTime=[]
       
       
       
        for(var i=0;i<this.state.jsondata.length;++i){
        if(this.state.jsondata[i].length==2){
            routesArray[i]=[this.state.jsondata[i][0]["route"],this.state.jsondata[i][1]["route"]]
            sourceArrivalTime[i]=[this.state.jsondata[i][0]["source_arrival_time"],this.state.jsondata[i][1]["source_arrival_time"]]
            destinationArrivalTime[i]=[this.state.jsondata[i][0]["destination_arrival_time"],this.state.jsondata[i][1]["destination_arrival_time"]]
            }
        else{
            routesArray[i]=this.state.jsondata[i]["route"]
            sourceArrivalTime[i]=this.state.jsondata[i]["source_arrival_time"]
            destinationArrivalTime[i]=this.state.jsondata[i]["destination_arrival_time"]
            }

        }
        //console.log(sourceArrivalTime);
        //correct till this point
    
        let textEles=this.state.routeData.map((r,key)=> {
        
        return(<TouchableHighlight style={styles.touchableStyle} underlayColor='rgb(255,255,255)'
         key={key} 
            onPress={()=>{ 
				//console.log(key);
			   let stopd = this.state.stopsData[this.state.routeData.indexOf(r)]
			   //console.log('stopd=',stopd);
			   //console.log(typeof stopd[0]);
			   //console.log(stopd.length);
	
	
				let pdata = []
                let sdata = []
                let sdata1=[]
                let sdata2=[]
                let pdata1=[]
                let pdata2=[]
                
				let sadata=this.state.jsondata[this.state.routeData.indexOf(r)]
				
				if(stopd.length==2)
				{
					for(var i=0;i<stopd[0].length;i++)
						pdata1.push({lat:stopd[0][i].latitude,long:stopd[0][i].longitude})
					for(var i=0;i<stopd[1].length;i++)
						pdata2.push({lat:stopd[1][i].latitude,long:stopd[1][i].longitude})
					pdata.push(pdata1,pdata2)
				}
				else{ 
				for(var i=0;i<stopd.length;i++) 
					pdata.push({lat:stopd[i].latitude,long:stopd[i].longitude})
					} 
				
				
				if(stopd.length==2)
				{
					for(var i=0;i<stopd[0].length;i++)
						sdata1.push({stopname:stopd[0][i].stop})
					for(var i=0;i<stopd[1].length;i++)
						sdata2.push({stopname:stopd[1][i].stop})
					sdata.push(sdata1,sdata2)
				}
				else{ 
				for(var i=0;i<stopd.length;i++) 
					sdata.push({stopname:stopd[i].stop})
					} 
			//push latitude ,longitude in pdata which are on (2,3).(5,6)....index
				
				if(sourceArrivalTime[key].length==2)
				 this.props.navigation.navigate('RouteMap',{pdata:{pdata:pdata,sdata:sdata,satime:[sourceArrivalTime[key][0],sourceArrivalTime[key][1]],datime:[destinationArrivalTime[key][0],destinationArrivalTime[key][1]],sourceArrivalTime:sourceArrivalTime,destinationArrivalTime:destinationArrivalTime,routesArray:routesArray}})		
				else
				this.props.navigation.navigate('RouteMap',{pdata:{pdata:pdata,sdata:sdata,satime:sourceArrivalTime[key],datime:destinationArrivalTime[key],sourceArrivalTime:sourceArrivalTime,destinationArrivalTime:destinationArrivalTime,routesArray:routesArray}})		
			}}>
				  
				  <Text style={styles.listText}>{r}</Text>
				  </TouchableHighlight>
                  
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
