import './App.css';
import Item from './components/Item';
import NewForm from './components/NewForm';
import { useState, useEffect } from 'react';

function App() {
  const [add, showAdd] = useState(false);
  const [selectItem, setSelectItem] = useState(-1);
  const [editItem, setEditItem] = useState(-1);
  const [items, editItems] = useState([]);

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

  useEffect(() => {
      fetch('/', {
        method: 'POST'
      })
      .then(resp => resp.json())
      .then(json => {
        // console.log(json);
        editItems(json.items);
      
    })
  }, [])


  return (
    <div className="App">
      <span className='title'>Todo</span>
      <div className='content'>
        <div className='content-top'>
          <div style={{textAlign: 'right'}}><button onClick={() => showAdd(!add)} className='new-btn'>New Item</button></div>
          {add && <NewForm addItem={addItem} close={() => showAdd(false)} /> }
        </div>
        {items.map((item, ind) => (
            !item.completed && <Item key={ind} details={item} ind={ind} select={setSelectItem} edit={setEditItem} clicked={ind === selectItem} editable={ind === editItem} onDelete={deleteItem} editItem={changeItem}  />
          )
        )}

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
