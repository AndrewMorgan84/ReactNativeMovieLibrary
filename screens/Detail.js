import React, {useState, useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
  View,
  Modal,
  Pressable,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import Error from '../components/Error';
import PlayButton from '../components/PlayButton';
import {getMovie} from '../services/services';
import dateFormat from 'dateformat';

const placeholderImage = require('../assets/images/placeholder.png');
const height = Dimensions.get('screen').height;

const Detail = ({route, navigation}) => {
  const [movieDetail, setMovieDetail] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState();

  const movieId = route.params.movieId;

  useEffect(() => {
    getMovie(movieId)
      .then(movieData => {
        setMovieDetail(movieData);
        setIsloading(false);
      })
      .catch(err => {
        setError(err);
      });
  }, [movieId]);

  const videoShown = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <React.Fragment>
      {!isLoading && !error && (
        <View>
          <ScrollView style={{backgroundColor: 'black'}}>
            <Image
              style={styles.image}
              resizeMode="stretch"
              source={
                movieDetail.poster_path
                  ? {
                      uri:
                        'https://image.tmdb.org/t/p/w500' +
                        movieDetail.poster_path,
                    }
                  : placeholderImage
              }
            />
            <View style={styles.container}>
              <View style={styles.playButton}>
                <PlayButton handlePress={videoShown} />
              </View>
              <Text style={styles.movieTitle}>{movieDetail.title}</Text>
              {movieDetail.genres && (
                <View style={styles.genresContainer}>
                  {movieDetail.genres.map(genre => {
                    return (
                      <Text style={styles.genre} key={genre.id}>
                        {genre.name}
                      </Text>
                    );
                  })}
                </View>
              )}
              <StarRating
                disabled={true}
                maxStars={5}
                starSize={20}
                rating={movieDetail.vote_average / 2}
                fullStarColor={'gold'}
              />
              <Text style={styles.overview}>{movieDetail.overview}</Text>
              <Text style={styles.releaseDate}>{`Release Date: ${dateFormat(
                movieDetail.release_date,
                'mmmm dS, yyyy',
              )}`}</Text>
            </View>
          </ScrollView>
          <Modal animationType="slide" visible={modalVisible}>
            <View style={styles.videoModal}>
              <Pressable onPress={() => videoShown()}>
                <Text>{'Close'}</Text>
              </Pressable>
            </View>
          </Modal>
        </View>
      )}
      {isLoading && <ActivityIndicator size="large" color="#E50914" />}
      {error && <Error />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  overview: {
    padding: 10,
    color: '#fff',
    textAlign: 'justify',
  },
  releaseDate: {
    padding: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  genre: {
    color: '#fff',
    marginRight: 10,
    fontWeight: 'bold',
  },
  genresContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 8,
  },
  image: {
    height: height / 1.5,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
    marginBottom: 5,
  },
  playButton: {
    position: 'absolute',
    top: -25,
    right: 20,
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Detail;
