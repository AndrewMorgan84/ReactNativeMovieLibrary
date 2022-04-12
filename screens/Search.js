/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Text,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {searchMovieTv} from '../services/services';
import Card from '../components/Card';
import Error from '../components/Error';
import {color} from 'react-native-reanimated';

const Search = ({navigation}) => {
  const [text, onChangeText] = useState();
  const [searchResults, setSearchResults] = useState();
  const [error, setError] = useState(false);

  const onSubmit = query => {
    Promise.all([searchMovieTv(query, 'movie'), searchMovieTv(query, 'tv')])
      .then(([movies, tv]) => {
        const data = [...movies, ...tv];
        setSearchResults(data);
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder={'Search Movie'}
              placeholderTextColor={'white'}
              onChangeText={onChangeText}
              value={text}
            />
            <TouchableOpacity
              onPress={() => {
                onSubmit(text);
              }}>
              <Icon name={'search-outline'} size={30} color={'#fff'} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.searchItems}>
          {/* Searched items results */}
          {searchResults && searchResults.length > 0 && (
            <FlatList
              numColumns={3}
              data={searchResults}
              renderItem={({item}) => (
                <Card navigation={navigation} item={item} />
              )}
              keyExtractor={item => item.id}
            />
          )}

          {/* When searched but no results */}
          {searchResults && searchResults.length == 0 && (
            <View style={styles.noResults}>
              <Text style={{color: '#fff'}}>
                No results matching your criteria.
              </Text>
              <Text>Try different keywords.</Text>
            </View>
          )}

          {/* When nothing is searched */}
          {!searchResults && (
            <View style={styles.empty}>
              <Text style={{color: '#fff'}}>
                Type something to start searching
              </Text>
            </View>
          )}

          {/* Error */}
          {error && <Error />}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'black',
    color: '#fff',
  },
  input: {
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#E50914',
    height: 50,
    padding: 8,
    width: 325,
    color: '#fff',
  },
  container: {
    padding: 10,
    paddingTop: 60,
    color: '#fff',
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexBasis: 'auto',
    flexGrow: 1,
    paddingRight: 8,
    color: '#fff',
  },
  searchItems: {
    padding: 5,
    color: '#fff',
  },

  noResults: {
    paddingTop: 20,
    color: '#fff',
  },
  empty: {
    color: '#fff',
  },
});

export default Search;
