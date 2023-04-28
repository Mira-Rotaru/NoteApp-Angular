import { Injectable } from '@angular/core';
import { Note } from './note';
import { Firestore, doc, collection, addDoc, collectionData, deleteDoc, updateDoc} from '@angular/fire/firestore'
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private fs: Firestore) { }
    //add new note
    addNotes(note: Note){
      note.id = doc(collection(this.fs, 'id')).id;
      return addDoc(collection(this.fs, 'Notes'), note);
    }

    //get all notes
    getNotes(): Observable<Note[]>{
      let notesRef = collection(this.fs, 'Notes');
      return collectionData(notesRef, {idField: 'id'}) as Observable<Note[]>;
    }

    //delete a note
    deleteNote(note: Note){
      let docRef = doc(this.fs, `Notes/${note.id}`);
    return deleteDoc(docRef);
    }

    //edit a note
    updateNote(note: Note, notes: any){
      let docRef = doc(this.fs, `Notes/${note.id}`);
      return updateDoc(docRef, notes);
    }
 
}

