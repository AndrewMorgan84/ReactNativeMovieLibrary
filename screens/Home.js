import React from 'react';
import {Text, View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {useEffect, useState} from 'react/cjs/react.development';
import List from '../components/List';
import {
  getPopularMovies,
  getUpcomingMovies,
  getPopularTvShows,
  getFamilyMovies,
} from '../services/services';

const dimensions = Dimensions.get('screen');

const Home = () => {
  const [moviesImages, setMoviesImages] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularTvShows, setPopularTvShows] = useState([]);
  const [familyMovies, setFamilyMovies] = useState([]);
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
      .then(movies => {
        const moviesImagesArray = [];
        movies.forEach(movie => {
          moviesImagesArray.push(
            'https://image.tmdb.org/t/p/w500' + movie.poster_path,
          );
        });
        setMoviesImages(moviesImagesArray);
        setUpcomingMovies(movies);
      })
      .catch(err => {
        setError(err);
      });

    getPopularTvShows()
      .then(shows => {
        setPopularTvShows(shows);
      })
      .catch(err => {
        setError(err);
      });

    getFamilyMovies()
      .then(movies => {
        setFamilyMovies(movies);
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
        <View style={styles.carousel}>
          <List title={'Upcoming Movies'} content={upcomingMovies} />
        </View>
        <View style={styles.carousel}>
          <List title={'Popular TV Shows'} content={popularTvShows} />
        </View>
        <View style={styles.carousel}>
          <List title={'Family Movies'} content={familyMovies} />
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
