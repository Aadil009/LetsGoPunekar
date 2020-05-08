

import React, { Component } from "react";  
import MapView from 'react-native-maps'
import {Dimensions, ActivityIndicator} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from './Loader'

import {TouchableOpacity,TouchableHighlight,TouchableWithoutFeedback, StyleSheet, View, TextInput, Text, Alert ,Button, ScrollView} from "react-native";  
import * as Font from 'expo-font';

const stopnames = require("../stopname.json");
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
	
	state = {
		data:[{long:73.6,lat:18.5}],
		ready: true,
		fontLoaded: false,
		stopnames:[],
		open: true,
		open1:true
	  };

	  setRegion(region) {
		this.setState({ region });
	  }

	  
	  async componentDidMount() {
		this.getCurrentPosition();
		// await Font.loadAsync({
		// 	'Farsan-Regular': require('./assets/fonts/Farsan-Regular.ttf'),
		// 	'City Lights': require('./assets/fonts/City Lights.ttf'),
		//   });
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
		} catch(e) {
		  alert(e.message || "");
		}
	  }
	
	navigation = 0;
	constructor() {
		super()
		this.state = {
			query:'',
			query2:'',
		//	selected: '',
			stopnames:stopnames.name,
			AnswerText:'',
			routeData:[],
			stopsData:[],
			jsondata:0,
			TextInputValueSource: '',
			TextInputValueDestination: '',
			loading: false,
			
		}
	}

	findLoc = (query) => {
		if(query==='' ) return [];
		const regex = new RegExp(`${query.trim()}`, 'i');
		//onsole.log("..",stopnames.name);
		const {stopnames} = this.state;
		//return the filtered film array according the query from the input
		return stopnames.filter(stopname => stopname.search(regex) >= 0);
	}

	findRoute= async () =>{
		
		await this.GetValueFunction(),
		this.props.navigation.navigate('HelloWorld',{routeData:this.state.routeData,stopsData:this.state.stopsData,jsondata:this.state.jsondata})

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
		const {query, query2} = this.state;
		await fetch('http://192.168.43.81:5000/routes?src='+query+'&dest='+query2)
		
		.then((response) => response.json())
    			.then((responseJson) => {
      				responseJson.map((ele)=>routes.push(ele.route));
					responseJson.map((ele)=>stops.push(ele.stops));
					responseJson.map((ele)=>stoplat.push(ele.latitude));
					responseJson.map((ele)=>stoplong.push(ele.longitude));
					//   console.log("Length of array is:"+routes.length);
					//   console.log("stops data"+stops)
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
    		});console.log(query)
		 }
		 
		
	render() {  
		let cnt=0;
		let deviceWidth = Dimensions.get('window').width
		
		const { region } = this.state;
		const { children, renderMarker, markers } = this.props;
		let textEle1=this.state.stopsData.map((s)=>{
		}
		);
		// console.log('Hello'+this.state.stopsDataata)

		// let textEles=this.state.routeData.map((r)=> {   
		// 	return(<TouchableHighlight key={r} onPress={()=>{
		// 		stopd = this.state.stopsData[this.state.routeData.indexOf(r)]
		// 		pdata = []
		// 		sdata = []
		// 		// rdata= this.state.jsondata[this.state.routeData.indexOf(r)]["source arrival time"]
		// 		// drdata= this.state.jsondata[this.state.routeData.indexOf(r)]["destination arrival time"]
		// 		sadata=this.state.jsondata[this.state.routeData.indexOf(r)]
				
		// 		for(var i=0;i<stopd.length;i++) {
		// 			pdata.push({lat:stopd[i].latitude,long:stopd[i].longitude}) //push latitude ,longitude in pdata which are on (2,3).(5,6)....index
		// 		} 
		// 		for(var i=0;i<stopd.length;i++) {
		// 			sdata.push({stopname:stopd[i].stop}) //push latitude ,longitude in pdata which are on (2,3).(5,6)....index
		// 		} 
				
				
		// 		this.props.navigation.navigate('RouteMap',{pdata:{pdata:pdata,sdata:sdata,satime:sadata["source arrival time"],datime:sadata["destination arrival time"]}})		
		// 	}}>
				

      	// 		{/* <Text style={{textAlign:"center",fontSize:20,padding:20,color:'rgb(0,0,255)',backgroundColor: 'rgb(50,150,120)',margin:5}}>{r+":"+ ++cnt}</Text> */}
				  
		// 		  <Text style={{textAlign:"center",zIndex:1,top:200,fontSize:15,padding:20,color:'black',backgroundColor: 'white',margin:1}}>{r+":"+ ++cnt}</Text>
		// 		  </TouchableHighlight>
		// 		  )});


		const {query} = this.state;
		const {query2} = this.state;
		const stopnames = this.findLoc(query);
		stopnames2 = this.findLoc(query2);
		const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
		return (
			<View style={StyleSheet.absoluteFillObject}>
				<Loader
          loading={this.state.loading} />
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
				<Icon style={{padding:10,zIndex:7,left:150}} name="home" size={20} color="white"/>
					<Autocomplete
				// 	containerStyle={{borderColor:'red',backgroundColor:'purple', position:'absolute',height:50, borderWidth:2,zIndex:1,borderRadius:5,width:deviceWidth-20
				// }}
				style={{borderRadius:10,backgroundColor:'#BB2CD9',height:40,color:'white'}}
					containerStyle={styles.autocompleteContainer}
					data={ stopnames.length == 1 && comp(query, stopnames[0])?[]:stopnames}
					defaultValue={query}
					hideResults={!this.state.open}
					onChangeText={text => {this.setState({ query: text,open: true });}}
					placeholder="From"
					renderItem={( {item, i} ) => (
					<TouchableOpacity onPress={() => this.setState({ query: item,open: false })}>
					<Text style={styles.itemText}>
						{item} 
					</Text>
					</TouchableOpacity>
					)}
					/>
				
				<Icon style={{padding:10,zIndex:7,left:150}} name="bus" size={17} color="white"/>
					<Autocomplete
				// 	containerStyle={{borderColor:'red', backgroundColor:'purple',position:'absolute', height:50, margin:100, borderWidth:2,borderRadius:5,width:deviceWidth-20
				// }}
						style={{borderRadius:10,backgroundColor:'#BB2CD9',height:40,color:'white'}}
					containerStyle={styles.autocompleteContainer2}
					data={ (stopnames2.length == 1 && comp(query2, stopnames2[0]))?[]:stopnames2}
					defaultValue={query2}
					hideResults={!this.state.open1}
					onChangeText={text => {this.setState({ query2: text,open1: true  }); }}
					placeholder="To"

					renderItem={( {item, i} ) => (

						<TouchableOpacity onPress={() => this.setState({ query2: item ,open1: false })}>
							    
						<Text style={styles.itemText}>
								
							{item} 
						</Text>
						</TouchableOpacity>
					)}
					/>

				

				
<View style={styles.findRoute}>
	
					<Button 
						title="Find Routes" onPress={this.findRoute} color="red"/>
						</View>
						{/* {this.state.loading && <View style={styles.loading}>
							<ActivityIndicator/></View>} */}
					
				
				{/* <View style={styles.textoutputStyle}>
					<ScrollView >
						<Text style={styles.outputText}>{this.state.AnswerText}</Text>
						{textEles}
					</ScrollView> 
				</View> */}
</View>
			</View>
		);
		
  	}  
}

const styles = StyleSheet.create({  
	container: {  
    		flex: 1,
			// alignItems: 'center',
			// justifyContent: 'center',
			//width:'100%',
			//height:'10%',
	  },
	  itemText: {
		fontSize: 15,
		paddingTop: 5,
		paddingBottom: 5,
		margin: 2,
		
		//fontFamily:'Farsan-Regular'
	  },
	  autocompleteContainer: {
		flex: 1,
		// borderRadius:10,
		// borderWidth: 1,
		margin:'1%',
		left: 0,
		// borderColor: '#9a73ef',
		 position: 'absolute',
		right: 0,
		top: -5,
		zIndex: 6
	  },
	  autocompleteContainer2: {
		flex: 1,
		// borderColor: '#9a73ef',  
		// borderWidth: 1, 
		margin:'1%',
		// borderRadius:10,
		 left: 0,
		 position: 'absolute',
		 right: 0,
		top: 40,
		borderRadius:10,
		 zIndex: 5
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
		  //flex:1,
	  },
	  outputText: {
		  backgroundColor: 'red',
	  },
  	textInputStyle: {  
		  backgroundColor:'white',
		  	borderRadius:10,
    		borderColor: '#9a73ef',  
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
		  borderColor: '#9a73ef',  
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
		//bottom:'-50%',
		position:'absolute',
		top: '50%',
		//zIndex:1,

		//top:'-50%', 
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
		
	}
})  

