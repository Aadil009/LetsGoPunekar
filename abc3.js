const express=require('express');
var bodyParser = require('body-parser');
const app=express();
const {Pool,Client}=require('pg');

const pool=new Pool({
	user:'postgres',
	host:'localhost',
	database:'pmpmldb',
	password:'8551',
	port:5432
});

var rid_stops=[];
var counter=0;
const stop_query="select stop_name,stop_seq,latitude,longitude from stops,routes where stops.key in(select stop_id from routes where route_id=$1 and stop_seq>=$2 and stop_seq<=$3)and stops.key=routes.stop_id and routes.stop_seq>=$2 and routes.stop_seq<=$3 and routes.route_id=$1 order by stop_seq;"

const query="SELECT a1.route_id,a1.trip_id,a1.stop_id,a1.stop_seq as sourceseq,a1.arrivaltime as sourcetime,a2.stop_id,a2.stop_seq as destseq,a2.arrivaltime as desttime from arrivaltime a1 join arrivaltime a2 on a1.trip_id=a2.trip_id WHERE a1.trip_id in (SELECT DISTINCT arrivaltime.trip_id from arrivaltime where route_id in( select r1.route_id from routes r1, routes r2 where r1.route_id=r2.route_id and r1.route_id in(select route_id from routes where r2.stop_id in(select key from stops where stop_name=$1)) and r1.stop_id in(select key from stops where stop_name=$2) and r1.stop_seq > r2.stop_seq))and a2.trip_id in(SELECT DISTINCT arrivaltime.trip_id from arrivaltime where route_id in( select r1.route_id from routes r1, routes r2 where r1.route_id=r2.route_id and r1.route_id in(select route_id from routes where r2.stop_id in(select key from stops where stop_name=$1)) and r1.stop_id in(select key from stops where stop_name=$2) and r1.stop_seq > r2.stop_seq))and a1.stop_id in(select key from stops where stop_name=$1)and a2.stop_id in(select key from stops where stop_name=$2)and a1.arrivaltime > (select current_time) order by a1.arrivaltime limit 3";

app.get('/routes',(req,response)=>{
	rid_stops=[];
	counter=0;
	console.log(req.query.src+" "+req.query.dest);
	let source=req.query.src;
	let destination=req.query.dest;
	pool.query(query,[source,destination],function(err,res){
		if(err){
			return console.log('error in connection');
		}
		for(i=0;i<res.rows.length;++i){
			let rid=res.rows[i].route_id;
			let srctime=res.rows[i].sourcetime;
			let desttime=res.rows[i].desttime;
			pool.query(stop_query,[rid,res.rows[i].sourceseq,res.rows[i].destseq],function findStops(error,result){
				var stops=[];
				for(j=0;j<result.rows.length;++j){
					stops.push({'stop':result.rows[j].stop_name,'latitude':result.rows[j].latitude,'longitude':result.rows[j].longitude});
				}
				rid_stops.push({'route':rid,'stops':stops,'source arrival time':srctime,'destination arrival time':desttime});
				if(counter==(res.rows.length)-1){
					response.send(rid_stops);
					console.log(rid_stops);	
				}
			
				counter++;
			});
		}
	});
});
app.listen(5000,()=>console.log('listening on port 5000'));




// const express=require('express');
// var bodyParser = require('body-parser');
// const app=express();
// const {Pool,Client}=require('pg');

// const pool=new Pool({
// 	user:'postgres',
// 	host:'localhost',
// 	database:'pmpmldb',
// 	password:'8551',
// 	port:5432
// });

// var rid_stops=[];
// var counter=0;
// // const stop_query="select stop_name,stop_seq from stops,routes where stops.key in(select stop_id from routes where route_id=$1 and stop_seq>=$2 and stop_seq<=$3)and stops.key=routes.stop_id and routes.stop_seq>=$2 and routes.stop_seq<=$3 and routes.route_id=$1 order by stop_seq;"
// const stop_query="select stop_name,stop_seq,latitude,longitude from stops,routes where stops.key in(select stop_id from routes where route_id=$1 and stop_seq>=$2 and stop_seq<=$3)and stops.key=routes.stop_id and routes.stop_seq>=$2 and routes.stop_seq<=$3 and routes.route_id=$1 order by stop_seq;"
// const query="SELECT a1.route_id,a1.trip_id,a1.stop_id,a1.stop_seq as sourceseq,a1.arrivaltime as sourcetime,a2.stop_id,a2.stop_seq as destseq,a2.arrivaltime as desttime from arrivaltime a1 join arrivaltime a2 on a1.trip_id=a2.trip_id WHERE a1.trip_id in (SELECT DISTINCT arrivaltime.trip_id from arrivaltime where route_id in( select r1.route_id from routes r1, routes r2 where r1.route_id=r2.route_id and r1.route_id in(select route_id from routes where r2.stop_id in(select key from stops where stop_name=$1)) and r1.stop_id in(select key from stops where stop_name=$2) and r1.stop_seq > r2.stop_seq))and a2.trip_id in(SELECT DISTINCT arrivaltime.trip_id from arrivaltime where route_id in( select r1.route_id from routes r1, routes r2 where r1.route_id=r2.route_id and r1.route_id in(select route_id from routes where r2.stop_id in(select key from stops where stop_name=$1)) and r1.stop_id in(select key from stops where stop_name=$2) and r1.stop_seq > r2.stop_seq))and a1.stop_id in(select key from stops where stop_name=$1)and a2.stop_id in(select key from stops where stop_name=$2)and a1.arrivaltime > (select current_time) order by a1.arrivaltime limit 3";

// app.get('/routes',(req,response)=>{
// 	rid_stops=[];
// 	counter=0;
// 	console.log(req.query.src+" "+req.query.dest);
// 	let source=req.query.src;
// 	let destination=req.query.dest;
// 	pool.query(query,[source,destination],function(err,res,next){
// 		if(err){
// 			return console.log('error in connection');
// 			next(err);
// 		}
// 		for(i=0;i<res.rows.length;++i){
// 			let rid=res.rows[i].route_id;
// 			pool.query(stop_query,[rid,res.rows[i].r2stop,res.rows[i].r1stop],function findStops(error,result){
// 				var stops=[];
// 				var latitude=[];
// 				var longitude=[];
// 				for(j=0;j<result.rows.length;++j){
// 					stops.push(result.rows[j].stop_name);
// 					stops.push(result.rows[j].latitude);
// 					stops.push(result.rows[j].longitude);
// 					// console.log(result.rows[j].stop_name);
// 				}
// 				rid_stops.push({'route':rid,'stops':stops,'latitude':latitude,'longitude':longitude});
// 				if(counter==(res.rows.length)-1){
// 					response.send(rid_stops);
// 					 console.log(rid_stops);	
// 					//console.log(rid_stops)
// 				}
			
// 				counter++;
// 			});
// 		}
// 	})
// });
// app.listen(5000,()=>console.log('listening on port 5000'));










// // import React, { Component } from "react";  
// // //import {TouchableHighlight,TouchableWithoutFeedback, StyleSheet, View, TextInput, Text, Alert ,Button, ScrollView} from "react-native";  
// // import { StyleSheet,Text, View } from 'react-native';
// // import {MapView, Permissions} from 'react-native-maps';

// // export default class App extends React.Component {

// //   constructor(props){
// //     super(props);

// //     this.state = {
// //        region: null,
// //     }
// //     this._getLocationAsync();
// //   }

// //   _getLocationAsync = async () => {
// //     let { status } = await Permissions.askAsync(Permission.LOCATION);
// //     if(status !== 'granted')
// //     console.log('Permission needed please');

// //     let Location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true});
// //     let region = {
// //       latitude: location.coords.latitude,
// //       longitude: location.coords.longitude,
// //       latitudeDelta: 0.045,
// //       longitudeDelta: 0.045
// //     }

// //     this.setState({region: region})
// //   }
// //   render() {
// //     return (
// //       <View style={styles.container}>
// //         <Text>Homescreen</Text>
// //         <MapView
        
// //         initialRegion={this.state.region}
// //         showsUserLocation={true}
// //         showCompass={true}
// //         rotateEnanbled={true}
// //         style={{flex:1}}
// //         />



// //       </View>
      
// //     );
// //   }
// // }
// // const styles =StyleSheet.create({
// //   container: {
// //     flex:1,
// //     backgroundColor: '#fff',
// //   },
// // });