import React,{ Component} from 'react';
import { StyleSheet, Text, View, Animated, Button, TouchableOpacity,ScrollView, Dimensions} from 'react-native';
import MapView from 'react-native-maps';

let deviceWidth = Dimensions.get('window').width
    let deviceHeight = Dimensions.get('window').height


export default class RouteMap extends React.Component {
   state = {
   data:[{long:73.6,lat:18.5}],
   animation: new Animated.Value(0),
   };

   handleOpen = () => {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };


  handleClose = () => {
    Animated.timing(this.state.animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };


   posdata=0;
   componentDidMount() {
   }

   constructor() {
   super()
   }
 


 toTwelveHours(str){
	let tokens=str.split(":");
	let hrs=parseInt(tokens[0]);
	if(hrs>12){
		hrs=hrs%12;
	}
	tokens[0]=hrs;
	let inTwelveHrs=tokens.join(":");
	return inTwelveHrs;
  }

   render() {
    
    const screenHeight = Dimensions.get("window").height;
    const backdrop = {
      transform: [
        {
          translateY: this.state.animation.interpolate({
            inputRange: [0, 0.01],
            outputRange: [screenHeight, 0],
            extrapolate: "clamp",
          }),
        },
      ],
      opacity: this.state.animation.interpolate({
        inputRange: [0.01, 0.5],
        outputRange: [0, 1],
        extrapolate: "clamp",
      }),
    };


    const slideUp = {
      transform: [
        {
          translateY: this.state.animation.interpolate({
            inputRange: [0.01, 1],
            outputRange: [0, -1 * screenHeight],
            extrapolate: "clamp",
          }),
        },
      ],
    };




   const params = this.props.route.params;
    pdata = params.pdata.pdata;
    sdata= params.pdata.sdata;
    
    var routesArray=[]
    var sourceArrivalTime=[]
    var destinationArrivalTime=[]
    routesArray =params.pdata.routesArray
    sourceArrivalTime=params.pdata.sourceArrivalTime.map(
      (time)=>{
      if(time.length!=2)
        return this.toTwelveHours(time);
        //else
        //	return [this.toTweleveHours(time[0]),this.toTweleveHours(time[1])];
      }
    );
    //console.log(sourceArrivalTime);
    destinationArrivalTime=params.pdata.destinationArrivalTime
    var source= [params.pdata.satime,params.pdata.datime];
     //console.log(source)
   var markers = [{longitude:0, latitude:0}]
   var markerss = [{longitude:0, latitude:0}]

   var stopname= []
   var allStops= []
   var allStops1=[]

   
   if(pdata.length==2)
   {
   	for(var i=0;i<pdata[0].length;i++){
     markers[i] = {longitude: Number(pdata[0][i].long),
           latitude: Number(pdata[0][i].lat)
          };
          allStops[i]=sdata[0][i].stopname;
         }
        for(var i=0;i<pdata[1].length;i++)
        	allStops1[i]=sdata[1][i].stopname;	
   }
   else{
   	for(var i=0;i<pdata.length;i++){
     markers[i] = {longitude: Number(pdata[i].long),
           latitude: Number(pdata[i].lat)
          };
          allStops[i]=sdata[i].stopname;
         }}
      

      

                markerss[0]=markers[0];
     markerss[1]=markers[markers.length-1]
     if(sdata.length==2)
     {
     	stopname[0]=sdata[0][0].stopname
     	stopname[1]=sdata[0][sdata[0].length-1].stopname
     	stopname[2]=sdata[1][0].stopname
     stopname[3]=sdata[1][sdata[1].length-1].stopname
     }
     else{
     stopname[0]=sdata[0].stopname
     stopname[1]=sdata[sdata.length-1].stopname
     }
     
    


     
   
     
     
     if(pdata.length==2){
     return (
     <View style={styles.container}>
        <MapView style={styles.map} initialRegion={{
       	latitude:Number(pdata[0][0].lat),
          longitude:Number(pdata[0][0].long),
          latitudeDelta: 0.09,
          longitudeDelta: 0.09,
          }	
        }
        showsUserLocation={false}>
        <MapView.Marker 
        coordinate={markerss[0]}
        pinColor='purple'
        title={String(stopname[0])}
        description={'Time:'+this.toTwelveHours(String(source[0]))}
        />
        <MapView.Marker 
        coordinate={markerss[1]}
        title={String(stopname[1])}
        description={'Time:'+this.toTwelveHours(String(source[1]))}
        pinColor= 'purple'
        />
        
        
        <MapView.Polyline
          coordinates={markers}
          strokeWidth={4}
          strokeColor="rgba(0,0,255,0.5)"/>
	</MapView>
	
	<View style={styles.container}>
        <TouchableOpacity style={styles.touchableStyle} onPress={this.handleOpen}>
          <Button title='Route Description' onPress={this.handleOpen} />
        </TouchableOpacity>

        <Animated.View style={[StyleSheet.absoluteFill, styles.cover, backdrop]}>
          <View style={[styles.sheet]}>
            <Animated.View style={[styles.popup, slideUp]}>
              <TouchableOpacity onPress={this.handleClose}>
                <Text>Close</Text>
              </TouchableOpacity>
          <ScrollView style={styles.scroll}>
          	<Text style={styles.descriptionTextStyle}>Source: {stopname[0]}-{this.toTwelveHours(String(source[0][0]))}</Text>
          <Text style={styles.descriptionTextStyle}>Destination: {stopname[1]}-{this.toTwelveHours(String(source[1][0]))}</Text>
          {allStops.map((Stops, key) => (
            <View key={key} style={styles.Stops}>
              <Text style={styles.text}>{key+1}. {Stops}</Text>
              <View style={styles.separator} />
            </View>
          ))}
          
          <Text style={styles.descriptionTextStyle}>Source: {stopname[2]}-{this.toTwelveHours(String(source[0][1]))}</Text>
          <Text style={styles.descriptionTextStyle}>Destination: {stopname[3]}-{this.toTwelveHours(String(source[1][1]))}</Text>
          {allStops1.map((Stops, key) => (
            <View key={key} style={styles.Stops}>
              <Text style={styles.text}>{key+1}. {Stops}</Text>
              <View style={styles.separator} />
            </View>
          ))}
          </ScrollView>
          </Animated.View>
          </View>
        </Animated.View>
      </View>
      </View>
      )
        }
        
        
        
        
        
        else{
        return(
        <View style={styles.container}>
        <MapView style={styles.map} initialRegion={{	
          latitude:Number(pdata[0].lat),
          longitude:Number(pdata[0].long),
          latitudeDelta: 0.09,
          longitudeDelta: 0.09,
          }}
          showsUserLocation={false}>
          
          <MapView.Marker 
        coordinate={markerss[0]}
        pinColor='purple'
        title={String(stopname[0])}
        description={'Time:'+this.toTwelveHours(String(source[0]))}
        />
        <MapView.Marker 
        coordinate={markerss[1]}
        title={String(stopname[1])}
        description={'Time:'+this.toTwelveHours(String(source[1]))}
        pinColor= 'purple'
        />
        
        
        <MapView.Polyline
          coordinates={markers}
          strokeWidth={4}
          strokeColor="rgba(0,0,255,0.5)"/>
          
	</MapView>
	
	<View style={styles.container}>
        <TouchableOpacity style={styles.touchableStyle} onPress={this.handleOpen}>
          <Button title='Route Description' onPress={this.handleOpen} />
        </TouchableOpacity>

        <Animated.View style={[StyleSheet.absoluteFill, styles.cover, backdrop]}>
          <View style={[styles.sheet]}>
            <Animated.View style={[styles.popup, slideUp]}>
              <TouchableOpacity onPress={this.handleClose}>
                <Text>Close</Text>
              </TouchableOpacity>
          <ScrollView style={styles.scroll}>
                  <Text style={styles.descriptionTextStyle}>Source: {stopname[0]}-{this.toTwelveHours(String(source[0]))}</Text>
          <Text style={styles.descriptionTextStyle}>Destination: {stopname[1]}-{this.toTwelveHours(String(source[1]))}</Text>
          {allStops.map((Stops, key) => (
            <View key={key} style={styles.Stops}>
              <Text style={styles.text}>{key+1}. {Stops}</Text>
              <View style={styles.separator} />
            </View>
          ))}
          </ScrollView>
          </Animated.View>
          </View>
        </Animated.View>
      </View>
      </View>
      )
        }
            
    

 };
 
 }


 const styles = StyleSheet.create({
  map: {
    flex:1,
    backgroundColor:'#fff',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  
  },
  textview:{
    flex:1,
    top:100,
    alignItems:'center',
    justifyContent:'center',
  
  },
  container: {
    flex: 1,
  
    justifyContent: "center",
  },
  touchableStyle:{
    top:deviceHeight/3,
  },
  cover: {
    backgroundColor: "rgba(0,0,0,.5)",
  },
  sheet: {
    position: "absolute",
    top: Dimensions.get("window").height,
    left: 0,
    right: 0,
    height: "100%",
    justifyContent: "flex-end",
  },
  popup: {
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 80,
  },
  scroll: {
    height: 300,
  },
  descriptionTextStyle:{
    fontSize:15,
    fontWeight:'bold',
  
    padding: 10
  },

  separator: {
    height: 1,
    backgroundColor: '#707080',
    width: '100%',
  },
  text: {
    fontSize: 15,
    color: '#606070',
    padding: 10,
  },
});
