import React from 'react'
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activateNote } from './../../actions/notes';

export const JournalEntry = ({id,date,title,body,url}) => {
    
    const noteDate=moment(date);
    const dispatch = useDispatch();
    const handleClick=()=>{
        dispatch(activateNote(id,{title,body,date,url}));
    }

    return (
        <div className="journal__entry animate__animated animate__slideInLeft animate__faster"
            onClick={handleClick}
        >
            <div style={{display:'flex',}}>
        
            {
                (url)&&            
                <div 
                    className="journal__entry-picture"
                    style={{
                        backgroundSize:'cover',
                        backgroundImage:`url('${url}')`
                    }}
                >

                </div>
            }

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    {title}
                </p>
                <p className="journal__entry-content">
                    {body}
                </p>

            </div>
                
            </div>
            <div className="journal__entry-date-box">
                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('Do')}</h4>
            </div>
        </div>
    )
}
