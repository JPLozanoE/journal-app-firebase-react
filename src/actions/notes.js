import { db } from "../firebase/firebase-config";
import { types } from './../types/types';
import { loadNotes } from './../helpers/loadNotes';
import Swal from 'sweetalert2'
import { fileUpload } from './../helpers/fileUpload';


export const startNewNote=()=>{
    return async(dispatch, getState)=>{

        const {auth:{uid}}=getState();
        console.log(uid);

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const doc=await db.collection(`${uid}/journal/notes`).add(newNote);
        console.log(doc);

        dispatch(activateNote(doc.id,newNote));
        dispatch(addNewNote(doc.id,newNote))

    }
}

export const addNewNote=(id,note)=>({
    type:types.notesAddNew,
    payload:{
        id,
        ...note
    }
})

export const startSaveNote=(note)=>{
    return async (dispatch,getState)=>{
        try{
            const {auth:{uid}}=getState();
            if(!note.url){
                delete note.url
            }
            const noteToFirestore={...note};
            delete noteToFirestore.id;
            await db.doc(`${uid}/journal/notes/${note.id}/`).update(noteToFirestore);
            console.log(noteToFirestore);
            dispatch(refreshNote(note.id,noteToFirestore));
            Swal.fire('Saved',note.title,'success')
        }
        catch(e){
            console.error(e.message);
            Swal.fire('Error',e.message,'error')
        }
    }
}

export const refreshNote=(id,note)=>({
    type:types.notesUpdated,
    payload:{
        id,
        note:{
            id,
            ...note
        }
    }
})

export const startLoadingNotes=(uid)=>{
    return async (dispatch)=>{
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));

    }
}

export const activateNote = (id,note)=>({
    type:types.notesActive,
    payload:{
        id,
        ...note
    }
})

export const setNotes = (notes)=>({
    type:types.notesLoad,
    payload:notes
});

export const startImageUpload=(file)=>{
    return async (dispatch,getState)=>{
        const {active:activeNote}=getState().notes;

        Swal.fire({
            title:'Uploading',
            text:'Please wait...',
            allowOutsideClick:false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
            showCancelButton: false,
            showConfirmButton: false
        })

        const fileUrl = await fileUpload(file);
        activeNote.url=fileUrl;
        console.log(fileUrl);
        dispatch(startSaveNote(activeNote));
        Swal.close();
    }   
}

export const startDeleting=(id)=>{
    return async (dispatch,getState)=>{
        
        const {uid}=getState().auth;
        await db.doc(`${uid}/journal/notes/${id}/`).delete();
        dispatch(deleteNote(id));
        console.log(uid);
        
    }
}

export const deleteNote=(id)=>
({
    type:types.notesDelete,
    payload:id
})

export const noteLogout=()=>({
    type:types.notesLogoutCleaning
})