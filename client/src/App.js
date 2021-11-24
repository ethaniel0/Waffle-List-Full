import './App.css';
import Item from './components/Item';
import NewForm from './components/NewForm';
import Header from './components/Header'
import { useState, useEffect } from 'react';

function App() {
  const [add, showAdd] = useState(false); // show the form to add a new item
  const [selectItem, setSelectItem] = useState(-1); // determines which item is shown in detail view
  const [editItem, setEditItem] = useState(-1); // determines which item is currently being edited
  // [{ name, notes, date, completed }, ...]
  const [items, editItems] = useState([]); // contains all items

  const addItem = (item) => {
    editItems([...items, item]);
    fetch('/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({item})
    })
  }

  const changeItem = (index, item) => {
    editItems(items.map((i, ind) => ind === index ? item : i));
    fetch('/edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({item, index})
    })
  }

  const deleteItem = (index) => {
    editItems(items.filter((i, ind) => ind !== index));
    fetch('/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({index})
    })
  }

  // fetches all of the tasks from the database and stores them in items
  useEffect(() => {
      fetch('/', {
        method: 'POST'
      })
      .then(resp => resp.json())
      .then(json => {
        editItems(json.items);
      
    })
  }, [])


  return (
    <div className="App">
      <Header />
      <span className='title'>Todo</span>
      {/* contains all content after the header */}
      <div className='content'>

        {/* new item button and form */}
        <div className='content-top'>
          <div style={{textAlign: 'right'}}><button onClick={() => showAdd(!add)} className='new-btn'>New Item</button></div>
          {add && <NewForm addItem={addItem} close={() => showAdd(false)} /> }
        </div>

        {/* display all the uncompleted items */}
        {items.map((item, ind) => (
            !item.completed && <Item key={ind} details={item} ind={ind} select={setSelectItem} edit={setEditItem} clicked={ind === selectItem} editable={ind === editItem} onDelete={deleteItem} editItem={changeItem}  />
          )
        )}

        {/* display all the completed items */}
        {
          items.filter(item => item.completed).length > 0 && 
            <div style={{marginTop: '3rem'}}>
              <span className='title'>Completed</span>
              {
                items.map((item, ind) => (
                    item.completed && <Item key={ind} details={item} ind={ind} select={setSelectItem} edit={setEditItem} clicked={ind === selectItem} editable={ind === editItem} onDelete={deleteItem} editItem={changeItem}  />
                  ) 
                )
              }             
            </div>
        }

      </div>
    </div>
  );
}

export default App;
