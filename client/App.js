import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { useEffect, useState } from "react";
import axios from "axios";
import AppHeaderText from "./components/AppHeaderText";
import CreateNoteModal from "./components/CreateNoteModal";
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

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.navbar}>
          <AppHeaderText>Prt-Notes</AppHeaderText>
          <Text style={styles.authorName}>made by: vinicius-prates</Text>
        </View>
      </View>
      <View style={styles.areaNote}>
        <TouchableOpacity
          style={styles.newNoteButton}
          onPress={() => {
            setCreateNoteModal(true);
          }}
        >
          <Text style={styles.buttonText}>New Note</Text>
        </TouchableOpacity>
        <CreateNoteModal
          setIsActive={setCreateNoteModal}
          isActive={createNoteModal}
          setNotes={setNotes}
        />
        {notes.map((note) => (
          <View key={note.noteId} style={styles.note}>
            <View>
              <Text style={styles.noteTitle}>{note.title}</Text>
              <Text style={styles.noteDescription}>{note.description}</Text>
            </View>
            <View style={styles.locationDeleteButton}>
              <Text
                style={styles.deleteButton}
                onPress={() => deleteNote(note.noteId)}
              >
                Delete
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100vw",
    backgroundColor: "#323437",
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
    alignItems: "right",
    maxWidth: "40px",
    fontSize: "0.9rem",
    color: "#FFF",
  },
  areaNote: {
    width: "40%",
  },
  newNoteButton: {
    marginTop: "20px",
    marginBottom: "20px",
    backgroundColor: "#e2b714",
    alignItems: "left",
    width: "100%",
    padding: "10px",
    borderRadius: "3px",
  },
  defaultInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "#FFF",
  },
  noteTitle: {
    color: "#e2b714",
    fontSize: "2rem",
    lineHeight: "2rem",
    fontWeight: "700",
  },
  noteDescription: {
    color: "white",
    fontSize: "1.5rem",
    fontWeight: "600",
  },
  note: {
    flex: 1,
    marginTop: 24,
    flexDirection: "column",
    gap: 4,
    backgroundColor: "#17161b",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    color: "#FFF",
  },
  buttonText: {
    color: "#fff",
  },
  authorName: {
    fontSize: "1.5rem",
    lineHeight: "2rem",
    color: "#e2b714",
  },
  locationDeleteButton: {
    alignItems: "flex-end",
  },
});
