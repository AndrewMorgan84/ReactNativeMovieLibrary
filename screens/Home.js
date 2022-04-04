import React from 'react';
import {Text, View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {useEffect, useState} from 'react/cjs/react.development';
import List from '../components/List';
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
      <ScrollView>
        <View style={styles.sliderContainer}>
          <SliderBox
            images={moviesImages}
            dotStyle={styles.sliderStyle}
            autoplay={true}
            circleLoop={true}
            sliderBoxHeight={dimensions.height / 1.75}
            resizeMode={'stretch'}
          />
          {error && <Text>Error loading data from server</Text>}
        </View>
        <View style={styles.carousel}>
          <List title={'Popular Movies'} content={popularMovies} />
        </View>
      </ScrollView>
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
