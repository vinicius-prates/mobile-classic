import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { useEffect, useState } from "react";
import axios from "axios";
import AppHeaderText from "./components/AppHeaderText";
const URL = "http://localhost:4000";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createNoteModal, setCreateNoteModal] = useState(false);

  const fetchNotes = async () => {
    const res = await axios.get(`${URL}/notes`);
    console.log(res.data);
    setNotes(res.data.notes);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const deleteNote = async (id) => {
    await axios.delete(`${URL}/delete-note/` + id);
    fetchNotes();
  };

  const addNote = async () => {
    console.log("adding note: ", { title: title, description: description });
    const res = await axios.post(`${URL}/new-note`, {
      title: title,
      description: description,
    });
    fetchNotes();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.navbar}>
          <AppHeaderText>SagiNote</AppHeaderText>
          <Text style={styles.name}>made by: gustavobaltazar</Text>
        </View>
      </View>
      <View>
        <TextInput
          label={"Note"}
          placeholder={"Title"}
          style={styles.defaultInput}
          onChangeText={setTitle}
          value={title}
        />
        <TextInput
          label={"Valor"}
          placeholder={"Description"}
          style={styles.defaultInput}
          onChangeText={setDescription}
          value={description}
        />
        <TouchableOpacity
          style={styles.newNoteButton}
          onPress={async () => {
            await addNote();
            setCreateNoteModal(true);
          }}
        >
          <Text>+</Text>
        </TouchableOpacity>
        {notes.map((note) => (
          <View>
            <View style={styles.note}>
              <Text>
                {note.title} - {note.description}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteNote(note.noteId)}
            >
              <Text>Deletar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100vw",
    backgroundColor: "#121214",
    alignItems: "center",
  },
  content: {
    width: "40%",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "2rem",
    placeItems: "center",
  },
  deleteButton: {
    backgroundColor: "#00FFFF",
    width: "50",
    height: "50",
  },
  newNoteButton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    width: "100",
    flex: 1,
    padding: 10,
  },
  defaultInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  note: {
    color: "black",
  },
  title: {
    color: "#FFF",
  },
  name: {
    color: "#FFF",
  },
});
