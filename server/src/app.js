import express from 'express'
import cors from 'cors'
import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('db.sqlite')
const app = express()
app.use(cors())
app.use(express.json())
const PORT = 4000

app.disable('etag');

const createNoteTable = async () => {
    db.serialize(() => {
        db.exec(
            "DROP TABLE IF EXISTS Note; CREATE TABLE IF NOT EXISTS Note (noteId INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT);"
        )
    })
}

createNoteTable()

app.get('/notes', async (req, res) => {
    let sql = "SELECT * FROM Note;"

    db.serialize(() => {
        db.all(sql, function (err, rows) {
            if (err) return res.status(500).json({ err, msg: err.message })
            res.json({ notes: rows })
        })
    })
    return;
})

app.post('/new-note', async (req, res) => {
    console.log('body =>', req.body);
    db.serialize(() => {
        db.run(
            "INSERT INTO Note (title, description) VALUES (?,?);",
            [
                req.body.title,
                req.body.description
            ],
            function (err) {
                if (err) {
                    return res.status(500).json({ err })
                }
                res.json({ msg: 'ok' });
            }
        )
    })
    return;
})

app.delete('/delete-note/:id', async (req, res) => {
    let sql = 'DELETE FROM Note WHERE noteId = ?;'
    console.log('about to exec', sql);
    db.serialize(() => {
        db.run(
            sql,
            [
                req.params.id
            ],
            function (err) {
                console.log('ran query with err', err);
                if (err) return res.status(500).json({ err });
                res.json({ deleted: 'ok' });
            })
    });
    return;
})

app.listen(PORT, () =>
    console.log(`\x1b[32m[START]\x1b[0m Server is running on \x1b[35mhttp://localhost:${PORT}\x1b[0m`))