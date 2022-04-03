/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, View, StyleSheet, Dimensions, FlatList} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {useEffect, useState} from 'react/cjs/react.development';
import {getPopularMovies, getUpcomingMovies} from '../services/services';

const dimensions = Dimensions.get('screen');

const Home = () => {
  const [moviesImages, setMoviesImages] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getPopularMovies()
      .then(movies => {
        setPopularMovies(movies);
      })
      .catch(err => {
        setError(err);
      });

    getUpcomingMovies()
      .then(upcomingMovies => {
        const moviesImagesArray = [];
        upcomingMovies.forEach(movie => {
          moviesImagesArray.push(
            'https://image.tmdb.org/t/p/w500' + movie.poster_path,
          );
        });
        setMoviesImages(moviesImagesArray);
      })
      .catch(err => {
        setError(err);
      });
  }, []);
  return (
    <React.Fragment>
      <View style={styles.sliderContainer}>
        <SliderBox
          images={moviesImages}
          dotStyle={styles.sliderStyle}
          autoplay={true}
          circleLoop={true}
          sliderBoxHeight={dimensions.height / 1.5}
        />
        {error && <Text>Error loading data from server</Text>}
      </View>
      <View style={styles.carousel}>
        <FlatList
          data={popularMovies}
          horizontal={true}
          renderItem={({item}) => <Text>{item.title}</Text>}
        />
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderStyle: {
    height: 0,
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
