import axios from 'axios';
import React, { useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { BASE_URL } from '../../config';
import { AuthContext } from '../context/AuthContext';

const CreatePostScreen = (props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { userToken } = useContext(AuthContext);
  const CreatePost = () => {
   

    const body={
        "title":title,
        "content":content
    }

    const apiAuth ={
        headers:{
            Authorization: `Bearer ${userToken}`
        }
    }

   axios.post(`${BASE_URL}/post`,body , apiAuth)
   .then(res=>console.log(res))
   .catch(err=>console.log('create post error',err))

  };


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={[styles.input, styles.contentInput]}
        placeholder="Enter content"
        multiline
        value={content}
        onChangeText={(text) => setContent(text)}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.createButton]} onPress={CreatePost}>
          <Text style={styles.buttonText}>Create Post</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => props.navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  contentInput: {
    height: 150,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  createButton: {
    backgroundColor: '#007bff',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreatePostScreen;