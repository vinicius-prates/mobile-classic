import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

import { useEffect, useState } from "react";
import axios from "axios";
const URL = "http://localhost:4000"

export default function App() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [createNoteModal, setCreateNoteModal] = useState(false)


  const fetchNotes = async () => {
    const res = await axios.get(`${URL}/notes`);
    console.log(res.data);
    setNotes(res.data.notes);
  }

  useEffect(() => {
    fetchNotes();
  }, [])

  const deleteNote = async (id) => {
    await axios.delete(`${URL}/delete-note/` + id);
    fetchNotes();
  }

  const addNote = async () => {
    console.log("adding note: ", { title: title, description: description });
    const res = await axios.post(`${URL}/new-note`, { title: title, description: description });
    fetchNotes();
  }

  return (
    <View style={styles.container}>
      <View>
        {/* <TextInput
          label={'Note'}
          placeholder={'Title'}
          style={styles.defaultInput}
          onChangeText={setTitle}
          value={title}
        />
        <TextInput
          label={'Valor'}
          placeholder={'Description'}
          style={styles.defaultInput}
          onChangeText={setDescription}
          value={description} */}
        {/* <TouchableOpacity style={styles.addButton} onPress={async () => {
            await addNote();
            setCreateNoteModal(true);
          }}>
          <Text>New Note</Text>
        </TouchableOpacity> */}
      {/* {notes.map((note) => (
          <View >
            <View style={styles.note}><Text>{note.title} - {note.description}</Text></View>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteNote(prod.produtoId)}>
              <Text>Deletar</Text>
            </TouchableOpacity>
          </View>
        ))} */}
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: "#00FFFF",
    width: "50",
    height: "50",
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  defaultInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  note: {
    color: "black"
  }
});
