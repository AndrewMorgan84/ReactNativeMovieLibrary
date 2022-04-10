import React, {useState} from 'react';
import {SafeAreaView, View, TextInput, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const Search = ({navigation}) => {
  const [text, onChangeText] = useState();

  const onSubmit = query => {
    console.log(query);
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder={'Search Movie or TV Show'}
              placeholderTextColor={'#fff'}
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
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  input: {
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#E50914',
    height: 50,
    padding: 8,
    width: 325,
  },
  container: {
    padding: 10,
    paddingTop: 60,
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexBasis: 'auto',
    flexGrow: 1,
    paddingRight: 8,
  },
});

export default Search;
