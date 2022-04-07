import React from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {useEffect, useState} from 'react/cjs/react.development';
import List from '../components/List';
import Error from '../components/Error';
import {
  getPopularMovies,
  getUpcomingMovies,
  getPopularTvShows,
  getFamilyMovies,
  getDocumentaryMovies,
} from '../services/services';

const dimensions = Dimensions.get('screen');

const Home = ({navigation}) => {
  const [moviesImages, setMoviesImages] = useState();
  const [popularMovies, setPopularMovies] = useState();
  const [popularTvShows, setPopularTvShows] = useState();
  const [familyMovies, setFamilyMovies] = useState();
  const [docuMovies, setDocuMovies] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getPopularTvShows(),
      getFamilyMovies(),
      getDocumentaryMovies(),
    ]);
  };

  useEffect(() => {
    getData()
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          popularTvShowsData,
          familyMoviesData,
          docuMoviesData,
        ]) => {
          const moviesImagesArray = [];
          upcomingMoviesData.forEach(movie => {
            moviesImagesArray.push(
              'https://image.tmdb.org/t/p/w500' + movie.poster_path,
            );
          });
          setMoviesImages(moviesImagesArray);
          setPopularMovies(popularMoviesData);
          setPopularTvShows(popularTvShowsData);
          setFamilyMovies(familyMoviesData);
          setDocuMovies(docuMoviesData);
        },
      )
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <React.Fragment>
      {!isLoading && !error && (
        <ScrollView>
          {/* upcoming movie images */}
          {moviesImages && (
            <View style={styles.sliderContainer}>
              <SliderBox
                images={moviesImages}
                dotStyle={styles.sliderStyle}
                autoplay={true}
                circleLoop={true}
                sliderBoxHeight={dimensions.height / 1.5}
                resizeMode={'stretch'}
              />
              {error && <Text>Error loading data from server</Text>}
            </View>
          )}

          {/* popular movies */}
          {popularMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title={'Popular Movies'}
                content={popularMovies}
              />
            </View>
          )}

          {/* popular tv shows */}
          {popularTvShows && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title={'Popular TV Shows'}
                content={popularTvShows}
              />
            </View>
          )}

          {/* family movies */}
          {familyMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title={'Family Movies'}
                content={familyMovies}
              />
            </View>
          )}

          {/* documentary movies */}
          {docuMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title={'Documentary Movies'}
                content={docuMovies}
              />
            </View>
          )}
        </ScrollView>
      )}
      {isLoading && <ActivityIndicator size="large" color="#E50914" />}
      {error && <Error />}
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
    backgroundColor: 'black',
  },
});

export default Home;
