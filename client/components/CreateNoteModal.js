import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import axios from "axios";
import { useState } from "react";

export default function CreateNoteModal({ isActive, setIsActive, setNotes }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const URL = "http://localhost:4000";
  console.log(isActive);

  const fetchNotes = async () => {
    const res = await axios.get(`${URL}/notes`);
    console.log(res.data);
    setNotes(res.data.notes);
  };
  const addNote = async () => {
    console.log("adding note: ", { title: title, description: description });
    const res = await axios
      .post(`${URL}/new-note`, {
        title: title,
        description: description,
      })
      .then(() => {
        fetchNotes();
      });
  };
  return (
    <View>
      {isActive ? (
        <View style={styles.createNoteModal}>
          <View style={styles.bomba}>
            <Text style={styles.text}>Title</Text>
          </View>
          <TextInput
            label={"Note"}
            style={styles.defaultInput}
            onChangeText={setTitle}
            value={title}
          />
          <View style={styles.bomba}>
            <Text style={styles.text}>Description</Text>
          </View>
          <TextInput
            label={"Valor"}
            style={styles.defaultInput}
            onChangeText={setDescription}
            value={description}
          />
          {title && description != "" && (
            <TouchableOpacity
              style={styles.addNoteButton}
              onPress={async () => {
                await addNote();
                setIsActive(!isActive);
                setDescription("");
                setTitle("");
                fetchNotes();
                console.log(isActive);
              }}
            >
              <Text>add note</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#FFF",
    fontFamily: "Roboto,sans-serif",
    fontSize: "56px",
    fontWeight: " 600",
    lineHeight: "60px",
  },
  createNoteModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#151518",
  },
  defaultInput: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 10,
    color: "#000",
    backgroundColor: "#FFF",
    width: "80%",
  },
  addNoteButton: {
    margin: 10,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#FFF",
    width: "100px",
    height: "50px",
    color: "#000",
    justifyContent: "center",
    borderRadius: "10%",
  },
  text: {
    padding: 10,
    fontSize: "1rem",
    color: "#fff",
  },
  bomba: {
    flex: 1,
    width: "100%",
  },
});
