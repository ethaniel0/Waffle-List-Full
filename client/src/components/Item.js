import { useState } from "react";

const Item = ({ details, clicked, ind, select, onDelete, editable, edit, editItem }) => {
    const splitNotes = details.notes.split('\n')[0];
    const [title, editTitle] = useState(details.title);
    const [notes, editNotes] = useState(details.notes);
    const [date, editDate] = useState(details.date);

    // saves an item after being edited
    const save = () => {
        editItem(ind, {
            title,
            notes,
            date,
            completed: details.completed
        });
        edit(-1);
    }

    // checks or unchecks an item
    const complete = (checked) => {
        editItem(ind, {
            title: details.title,
            notes: details.notes,
            date: details.date,
            completed: checked
        });
        edit(-1);
    }

    return (
        
        <div className='item' onClick={!editable ? () => select(clicked ? -1 : ind) : () => {}}>
            {
                !editable ?
                //  item when being viewed
                <>
                    <div className='item-top'>
                        <span className='item-title'> {details.title}</span>
                        <input onChange={(e) => complete(e.currentTarget.checked)} onClick={e => e.stopPropagation()} checked={details.completed} type="checkbox" />
                    </div>
                    <div className='item-body'>

                        {/* if in detailed view, show all parts, otherwise condensed notes */}
                        {
                            !clicked ? <span className='item-notes'>{splitNotes.substring(0, 50) + (splitNotes.length > 50 ? "..." : "")}</span>
                                    : (
                                        <>
                                            <span className='item-notes-full'>{details.notes}</span>
                                            {details.date && <span className='item-notes-full'>Due {details.date}</span>}
                                            <div style={{marginTop: '0.5rem'}}>
                                                <button className='delete-btn' onClick={() => onDelete(ind)}>Delete Item</button>
                                                <button className='edit-btn' onClick={(e) => {e.stopPropagation(); edit(ind)}}>Edit Item</button>
                                            </div>
                                        </>
                                    )
                        }
                    </div>
                    </>
            : 
            // item when being edited (very similar to the form)
            <>   
                <div className='item-body'>
                    <input type='text' className='item-title item-input' value={title} placeholder="Task Name" onChange={(e) => editTitle(e.target.value)} />
                    <input type='text' className='item-notes-full item-input' value={notes} placeholder="Description" onChange={(e) => editNotes(e.target.value)} />
                    <div><span style={{marginRight: '0.5rem', fontSize: '1.4rem'}}>Due Date</span> <input className="item-input" type="date" value={date} onChange={(e) => editDate(e.target.value)} /></div>
                    <div style={{marginTop: '0.5rem'}}>
                        <button className='discard-btn' onClick={() => edit(-1)}>Discard</button>
                        <button className='save-btn' onClick={save}>Save</button>
                    </div>
                                
 
                </div>
            </>


        }
            
        </div>
    )
}

export default Item
