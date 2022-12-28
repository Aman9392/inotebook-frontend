import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
   const notesInitial = [
      {
         "_id": "63aaac7a6af82979b2c1ff6e",
         "user": "63a292fe317b91169a124fae",
         "title": "Rajpur",
         "description": "indore indore",
         "tag": "Maths",
         "date": "2022-12-27T08:27:38.197Z",
         "__v": 0
      },
      {
         "_id": "63aaac806af82979b2c1ff70",
         "user": "63a292fe317b91169a124fae",
         "title": "khargone",
         "description": "indore indore",
         "tag": "Maths",
         "date": "2022-12-27T08:27:44.691Z",
         "__v": 0
      },
      {
         "_id": "63aaac7a6af82979b2c1ff6e",
         "user": "63a292fe317b91169a124fae",
         "title": "Rajpur",
         "description": "indore indore",
         "tag": "Maths",
         "date": "2022-12-27T08:27:38.197Z",
         "__v": 0
      },
      {
         "_id": "63aaac806af82979b2c1ff70",
         "user": "63a292fe317b91169a124fae",
         "title": "khargone",
         "description": "indore indore",
         "tag": "Maths",
         "date": "2022-12-27T08:27:44.691Z",
         "__v": 0
      },
      {
         "_id": "63aaac7a6af82979b2c1ff6e",
         "user": "63a292fe317b91169a124fae",
         "title": "Rajpur",
         "description": "indore indore",
         "tag": "Maths",
         "date": "2022-12-27T08:27:38.197Z",
         "__v": 0
      },
      {
         "_id": "63aaac806af82979b2c1ff70",
         "user": "63a292fe317b91169a124fae",
         "title": "khargone",
         "description": "indore indore",
         "tag": "Maths",
         "date": "2022-12-27T08:27:44.691Z",
         "__v": 0
      },
      {
         "_id": "63aaac7a6af82979b2c1ff6e",
         "user": "63a292fe317b91169a124fae",
         "title": "Rajpur",
         "description": "indore indore",
         "tag": "Maths",
         "date": "2022-12-27T08:27:38.197Z",
         "__v": 0
      },
      {
         "_id": "63aaac806af82979b2c1ff70",
         "user": "63a292fe317b91169a124fae",
         "title": "khargone",
         "description": "indore indore",
         "tag": "Maths",
         "date": "2022-12-27T08:27:44.691Z",
         "__v": 0
      }
   ]
   const [notes, setNotes] = useState(notesInitial)
   return (
      <NoteContext.Provider value={{ notes, setNotes }}>
         {props.children}
      </NoteContext.Provider>
   )
}

export default NoteState;