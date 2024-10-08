

import React, { Component } from "react";  
import MapView from 'react-native-maps'
import {Dimensions, ActivityIndicator} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from './Loader'

import {TouchableOpacity,TouchableHighlight,TouchableWithoutFeedback, StyleSheet, View, TextInput, Text, Alert ,Button, ScrollView} from "react-native";  
import * as Font from 'expo-font';

const stopNames = require("../stopname.json");
let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

const initialRegion = {
  latitude: -37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

export default class Home extends Component { 
	map = null;
	
	setRegion(region) {
		this.setState({ region });
	}

	  
	async componentDidMount() {
		this.getCurrentPosition();
		this.setState({ fontLoaded: true });
	}

	getCurrentPosition() {
		try {
		  navigator.geolocation.getCurrentPosition(
			(position) => {
			  const region = {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
				latitudeDelta: LATITUDE_DELTA,
				longitudeDelta: LONGITUDE_DELTA,
			  };
			  this.setRegion(region);
			},
		  );
		} catch(error) {
		  alert(error.message || "");
		}
	  }
	
	navigation = 0;
	constructor() {
		super()
		this.state = {
			source:'',
			destination:'',
			stopNames:stopNames.name,
			AnswerText:'',
			routeData:[],
			stopsData:[],
			jsondata:0,
			loading: false,
			data:[{long:73.6,lat:18.5}],
			ready: true,
			fontLoaded: false,
			open: true,
			open1:true	
		}
	}

	findLoc = (inputStopName) => {
		if(inputStopName==='' ) return [];
		const regex = new RegExp(`${inputStopName.trim()}`, 'i');
		const stopNames = this.state.stopNames;
		return stopNames.filter(stopname => stopname.search(regex) >= 0);
	}

	findRoute= async () =>{
		
		await this.GetValueFunction(),
		this.props.navigation.navigate('Best Routes',{routeData:this.state.routeData,stopsData:this.state.stopsData,jsondata:this.state.jsondata})

	}

	GetValueFunction = async () =>{
		this.setState({
			loading: true
		  });
	  
		  
		let routes=[];
		let stops=[];
		let stoplat=[];
		let stoplong=[];
		this.setState({AnswerText:null});
		const source = this.state.source;
		const destination = this.state.destination;
		await fetch('http://192.168.1.41:5000/routes?src='+source+'&dest='+destination)
		
		.then((response) => response.json())
    			.then((responseJson) => {
      				responseJson.map((element)=>routes.push(element.route));
					responseJson.map((element)=>stops.push(element.stops));
					responseJson.map((element)=>stoplat.push(element.latitude));
					responseJson.map((element)=>stoplong.push(element.longitude));
					this.setState({jsondata:responseJson})
      				this.setState({routeData:routes});
					this.setState({stopsData:stops});
					setTimeout(() => {
						this.setState({
						  loading: false,
						  
						});
					  });
	
    			})
    		.catch((error) => {
      			console.error(error);
			});
			
		 }
		 
		
	render() {  
		let cnt=0;
		let deviceWidth = Dimensions.get('window').width
		
		const { region } = this.state;
		const { children, renderMarker, markers } = this.props;
		let textEle1=this.state.stopsData;
		
		const source = this.state.source;
		const destination = this.state.destination;
		const stopName1 = this.findLoc(source);
		const stopName2 = this.findLoc(destination);
		
		const compareStrings = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
		let keyCount=0;
		return (
			<View style={StyleSheet.absoluteFillObject}>
				<Loader	loading={this.state.loading} />
				<MapView style={StyleSheet.absoluteFillObject} 
					showsUserLocation
					ref={ map => { this.map = map }}
					data={markers}
					initialRegion={region}
					renderMarker={renderMarker}
					onMapReady={this.onMapReady}
					showsMyLocationButton={true}
					textStyle={{ color: '#bc8b00' }}
					containerStyle={{backgroundColor: 'white', borderColor: '#BC8B00'}}>
				</MapView>

				<View style={{alignItems:'center' ,margin:10,}}>  
				<Icon style={styles.icon} name="home" size={20} color="white"/>
				<Autocomplete
					style={styles.autocompleteRadius}
					containerStyle={styles.autocompleteContainer}
					
					data={ stopName1.length == 1 && compareStrings(source, stopName1[0])?[]:stopName1}
					defaultValue={source}
					hideResults={!this.state.open}
					onChangeText={text => {this.setState({ source: text,open: true });}}
					placeholder="From"
					renderItem={( {item, i} ) =>{ 
						
						return(
							<TouchableOpacity key={i} onPress={() => this.setState({ source: item,open: false })}>
								<Text style={styles.itemText}>
									{item} 
								</Text>
							</TouchableOpacity>
						)
					}}
				/>
				
				<Icon style={styles.icon} name="bus" size={17} color="white"/>
				<Autocomplete
					style={styles.autocompleteRadius}
					containerStyle={styles.autocompleteContainer2}
					data={ (stopName2.length == 1 && compareStrings(destination, stopName2[0]))?[]:stopName2}
					defaultValue={destination}
					hideResults={!this.state.open1}
					onChangeText={text => {this.setState({ destination: text,open1: true  }); }}
					placeholder="To"

					renderItem={( {item, i} ) =>{ 
						
						return(
						<TouchableOpacity key={i} onPress={() => this.setState({ destination: item ,open1: false })}>
   
							<Text style={styles.itemText}>
								{item} 
							</Text>
						</TouchableOpacity>
					)}
					}
				/>

				

				
					{/* <View style={styles.findRoute}>
					<Button 
						title="Find Routes" onPress={this.findRoute} color="red"
					/>
					</View> */}
					<TouchableOpacity onPress={this.findRoute} style={{marginTop:20, width:'40%'}} >
						<View style={styles.button} >
							<Text style={styles.buttonText} >
							Find Routes
							</Text>
						</View>
					</TouchableOpacity>
			</View>
		</View>
		);
		
  	}  
}

const styles = StyleSheet.create({  
	container: {  
    		flex: 1,
	  },
	  itemText: {
		fontSize: 15,
		paddingTop: 5,
		paddingBottom: 5,
		margin: 2,
	  },
	  autocompleteContainer: {
		flex: 1,
		margin:'1%',
		left: 0,
		position: 'absolute',
		right: 0,
		top: -5,
		zIndex: 6
	  },
	  autocompleteContainer2: {
		flex: 1,
		margin:'1%',
		 left: 0,
		 position: 'absolute',
		 right: 0,
		top: 40,
		borderRadius:10,
		 zIndex: 5
	  },
	  autocompleteRadius:{
		borderRadius:0,
		backgroundColor:'#2C3335',//background color for search bars
		height:40,color:'white',
	  },
	  mainStyle:{
		  alignItems:'center',
	  },
	  findRoute: {
		flex: 1,
		 left: 0,
		color:'red',
	   position: 'absolute',
		 right: 0,
	   top: deviceHeight/7,
	   
	  },
	  contentContainer: {
		  
	  },
	  map: {
		backgroundColor:'#fff',
		position: 'absolute',
		height:'4000%',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: -1,
		flex:1,
		},
  
	  outputStyle:{
		  bottom:'-30%',
	  },
	  outputText: {
		  backgroundColor: 'red',
	  },
  	textInputStyle: {  
		  backgroundColor:'white',
		  	borderRadius:10,
    		borderColor: '#2C3335',  
    		borderWidth: 1,  
    		height: 40,  
    		margin: 10,  
			padding: 10,
			flexDirection:'row',
			top:-5,
			justifyContent:'center',
			alignItems:'center',  
	  },  
	  textInputStyle2: {  
		backgroundColor:'white',
			borderRadius:10,
		  borderColor: '#2C3335',  
		  borderWidth: 1,  
		  height: 40,  
		  margin: 10,  
		  padding: 10,
		  flexDirection:'row',
		  top:'-20%',
		  justifyContent:'center',
		  alignItems:'center',  
	},
  	textOutputStyle: { 
		backgroundColor:'red',
		marginHorizontal:100,
		position:'absolute',
		top: '50%',
		flex:1,
 
	  },
	  outputStyle: { 
		backgroundColor:'red',
		marginHorizontal:20, 
 
	  },
	  loading:{
		  position: 'absolute',
		  left: 0,
		  right: 0,
		  bottom: 0,
		  top: 0,
		  opacity: 0.5,
		  backgroundColor: 'black',
		  justifyContent: 'center',
		  alignItems:'center'

		
	  },
	containerView: {
		flex:1,
		
	},
	icon:{
		padding:10,
		zIndex:7,
		left:150,
	},
	button:{
		backgroundColor:'#FF362E',
		paddingVertical:5,
		paddingHorizontal:5,
		borderRadius:20,
		alignItems:'center'
	},
	buttonText:{
		color:'white',
		fontSize:18,
		
	}
})  

