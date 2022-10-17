import React, {useEffect, useState,useRef} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Platform
} from 'react-native';

// import Sound Component
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Sound from 'react-native-sound';
import audioList from '../utils/data';

const Dashboard = () => {
  var sound: any;
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();

  useEffect(() => {
    Sound.setCategory('Playback', false); // true = mixWithOthers
  }, []);

  const playSound = (item: any, index: number) => {
    if (item.isRequire) {
      sound = new Sound(item.url, (error, _sound) => {
        if (error) {
          alert('error' + error.message);
          return;
        }
        
        sound.play(() => {
          sound.release();
        });
      
      });
    } else {
      sound = new Sound(item.url, '', (error, _sound) => {
        if (error) {
          alert('error' + error.message);
          return;
        }
       
        sound.play(() => {
          sound.release();
        });
       
      });
    }
  };

  const stopSound = (item: any, index: any) => {
    setIsPlaying(false);
    setSelectedIndex(index);
    if (sound) {
      sound.stop(() => {
        console.log('Stop');
      });
    }
  };

  const handleVolume = (value: any) => {
    if (sound) {
      sound.setVolume(value[0]);
    }
  };

  const ItemView = (item: any, index: number) => {
    return (
      <View style={{padding: 5, margin: 7}}>
        <View style={styles.feature} key={index}>
          <Text style={styles.textStyle}>{item.title}</Text>
          <TouchableOpacity onPress={() => playSound(item, index)}>
            <Text style={styles.buttonPlay}>
              {isPlaying && selectedIndex == index ? 'Playing' : 'Play'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => stopSound(item, index)}>
            <Text style={styles.buttonStop}>Stop</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Music Player</Text>
        <ScrollView style={{flex: 1}}>{audioList.map(ItemView)}</ScrollView>
      </View>
     
      <View style={{alignSelf: 'center'}}>
        <Text>Volume</Text>
        <MultiSlider
          customMarker={() => {
            return (
              <View
                style={{
                  height: 30,
                  width: 30,
                  backgroundColor: 'orange',
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>{}</Text>
              </View>
            );
          }}
          markerStyle={{
            ...Platform.select({
              ios: {
                height: 24,
                width: 24,
                marginTop: 10,
                borderRadius: 50,
                backgroundColor: '#000',
              },
              android: {
                height: 30,
                width: 30,
                marginTop: 10,
                borderRadius: 50,
                backgroundColor: 'black',
              },
            }),
          }}
          selectedStyle={{
            backgroundColor: 'orange',
          }}
          unselectedStyle={{
            backgroundColor: '#8A8A99',
          }}
          containerStyle={{
            height: 40,
          }}
          trackStyle={{
            height: 8,
            borderRadius: 10,
            backgroundColor: 'red',
          }}
          sliderLength={200}
          onValuesChange={value => {
            handleVolume(value);
          }}
          min={0}
          max={10}
        />
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    flex: 1,
    padding: 5,
  },
  buttonPlay: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'rgba(00,80,00,1)',
    borderWidth: 1,
    borderColor: 'rgba(80,80,80,0.5)',
    overflow: 'hidden',
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  buttonStop: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'rgba(80,00,00,1)',
    borderWidth: 1,
    borderColor: 'rgba(80,80,80,0.5)',
    overflow: 'hidden',
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  feature: {
    flexDirection: 'row',
    margin: 7,
    padding: 5,
    alignSelf: 'stretch',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgb(180,180,180)',
  },
});