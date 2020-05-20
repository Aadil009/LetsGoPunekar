import React,{ Component} from 'react';
import { StyleSheet, Text, View, Animated, Button, TouchableOpacity,ScrollView, Dimensions} from 'react-native';
import MapView from 'react-native-maps';

let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height


export default class RouteMap extends React.Component {
   
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
    super();
    this.state = {
      data:[{long:73.6,lat:18.5}],
      animation: new Animated.Value(0),
    };
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
  let stopCoordinates = params.data.coordinates;
  let stopNames= params.data.names;
    
   
  let source= [params.data.sourceArrivalTime,params.data.destinationArrivalTime];
  let inputMarkers = [{longitude:0, latitude:0}]
  let mapMarkers = [{longitude:0, latitude:0}]

  let mapStopName= []
  let allStops= []

  for(let i=0;i<stopCoordinates.length;i++) {
    inputMarkers[i] = {
      longitude: Number(stopCoordinates[i].long),
      latitude: Number(stopCoordinates[i].lat)
    };
    allStops[i]=stopNames[i].stopname;
  }

      

  mapMarkers[0]=inputMarkers[0];
  mapMarkers[1]=inputMarkers[inputMarkers.length-1]
  mapStopName[0]=stopNames[0].stopname
  mapStopName[1]=stopNames[stopNames.length-1].stopname
      
  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={{
        latitude:Number(stopCoordinates[0].lat),
        longitude:Number(stopCoordinates[0].long),
        latitudeDelta: 0.09,
        longitudeDelta: 0.09,
      }}
        
      showsUserLocation={false}>
        
      <MapView.Marker 
        coordinate={mapMarkers[0]}
        pinColor='purple'
        title={String(mapStopName[0])}
        description={'Time:'+this.toTwelveHours(String(source[0]))}
      />
      <MapView.Marker 
        coordinate={mapMarkers[1]}
        title={String(mapStopName[1])}
        description={'Time:'+this.toTwelveHours(String(source[1]))}
        pinColor= 'purple'
      />
        
      <MapView.Polyline
        coordinates={inputMarkers}
        strokeWidth={4}
        strokeColor="rgba(0,0,255,0.5)"
      />

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
                  <Text style={styles.descriptionTextStyle}>Source: {mapStopName[0]}-{this.toTwelveHours(String(source[0]))}</Text>
                  <Text style={styles.descriptionTextStyle}>Destination: {mapStopName[1]}-{this.toTwelveHours(String(source[1]))}</Text>
                  {
                    allStops.map((Stops, key) => (
                      <View key={key} style={styles.Stops}>
                        <Text style={styles.text}>{key+1}. {Stops}</Text>
                        <View style={styles.separator} />
                      </View>
                      )
                    )
                  }
                </ScrollView>


              </Animated.View>
          </View>
        </Animated.View>
      </View>
    </View>

   )
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
