import { useState } from "react";

const NewForm = ({ addItem, close }) => {
    const [title, editTitle] = useState('');
    const [notes, editNotes] = useState('');
    const [date, editDate] = useState('');

    // puts the title, notes, and date into a complete todo item, then resets the form
    const getItem = () => {
        close();
        let t = title;
        let n = notes;
        let d = date;
        editTitle('');
        editNotes('');
        editDate('');
        return {
            title: t, 
            notes: n, 
            date: d,
            completed: false
        }
    }

    return (
        <div className="new-form">
            <input type="text" value={title} onChange={(e) => editTitle(e.target.value)} placeholder='What do you need to do?' />
            <input type="text" value={notes} onChange={(e) => editNotes(e.target.value)} placeholder='Description' />
            <div><span style={{marginRight: '0.5rem'}}>Due Date</span> <input type="date" value={date} onChange={(e) => editDate(e.target.value)} /></div>
            <div><button className='add-btn' onClick={() => addItem(getItem())}>Add</button></div>
        </div>
    )
}

export default NewForm
