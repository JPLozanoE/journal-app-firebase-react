import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NotesAppBar } from './NotesAppBar';
import { useForm } from './../../hooks/useForm';
import { activateNote, startDeleting } from './../../actions/notes';

export const NoteScreen = () => {
    const {active:note} = useSelector(state => state.notes);
    const [formValues,handleInputChange,reset]=useForm(note);
    const dispatch = useDispatch();

    const {body,title, id}=formValues;

    const activeId=useRef(note.id);

    const handleDelete = () => {
        dispatch(startDeleting(id));
    }
    

    useEffect(() => {
        if(note.id!==activeId.current){
            reset(note);
            activeId.current=note.id
        }
    }, [note,reset])

    useEffect(() => {
        dispatch(activateNote(formValues.id,{...formValues}));

    }, [dispatch,formValues])

    // console.log(formValues);
    return (
        <div className="notes__main-content">
            <NotesAppBar />
            <div className="notes__content">
                <input
                type="text"
                placeholder="Some awesome title"
                className="notes__title-input"
                autoComplete="off"
                value={title}
                onChange={handleInputChange}
                name="title"
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    value={body}
                    onChange={handleInputChange}
                    name="body"
                >

                </textarea>
                {(note.url)&&
                    <div className="notes__image">
                <img
                    src={note.url}
                    alt="Imagen"
                />

                </div>}
            </div>

            <button 
                onClick={handleDelete}
                className="btn btn-danger">
                Delete
            </button>
        </div>
    )
}
