import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote } from '../../actions/notes';
import { startImageUpload } from './../../actions/notes';

export const NotesAppBar = () => {
    const dispatch = useDispatch();
    const {active} = useSelector(state => state.notes)

    const handleSave=()=>{
        console.log(active);
        dispatch(startSaveNote(active));
    }

    const handlePictureUpload=()=>{
        console.log('click')
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange=(e)=>{
        const file = e.target.files[0];
        if(file){
            dispatch(startImageUpload(file))
        }
    }

    return (
        <div className="notes__appbar">
            <span>17 de Agosto 2021</span>
            <input
                id="fileSelector" 
                type="file"
                onChange={handleFileChange}
                style={{display:'none'}}
            />

            <div>
                <button onClick={handlePictureUpload} className="btn">
                    Picture
                </button>

                <button onClick={handleSave} className="btn">
                    Save
                </button>
            </div>
        </div>
    )
}
