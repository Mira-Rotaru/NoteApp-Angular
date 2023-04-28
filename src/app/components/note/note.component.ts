import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { Note } from 'src/app/note';
import { NoteService } from 'src/app/note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit{
    noteForm!: FormGroup;
    editForm!: FormGroup;
    public noteDetails: any;
    notes: any = [];
    noteObj: Note = {
      id: '',
      title: '',
      description: ''
    }

    constructor(private note: NoteService, private formBuilder: FormBuilder) {
      this.noteForm = this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required]
      })
      this.editForm = this.formBuilder.group({
        edited_title: ['', Validators.required],
        edited_description: ['', Validators.required]
      })
    }
    ngOnInit(): void{
      this.getAllNotes();
    }

    addNote(){
      const { value } = this.noteForm;
      console.log(value);

      (this.noteObj.id = ''),
      (this.noteObj.title = value.title),
      (this.noteObj.description = value.description);

      this.note.addNotes(this.noteObj).then((note) => {
        if(note){
          alert('Note added successfully!')
          this.noteForm.reset();
        }
      })
    }

    getAllNotes(){
      this.note.getNotes().subscribe((res: Note[]) => {
        console.log(res);
        this.notes = res;

      })
    }

    deleteNote(note: Note){
      let decision = confirm('Are you sure you want to delete this note?');

      if (decision === true){
        this.note.deleteNote(note);
      }
    }
      
    getNoteDetails(note: Note){
      this.noteDetails = note;
      console.log(this.noteDetails);
    }

    updateNote(note: Note){
      const { value } = this.editForm;

    this.noteObj.id = note.id;
    this.noteObj.title = value.edited_title;
    this.noteObj.description = value.edited_description;

    this.note.updateNote(note, this.noteObj).then(() => {
      alert('Note Updated Successfully');
    });
    this.editForm.reset();
    }

}
