import React, { useState } from "react";

export default function SetCustomizations() {
  const [rows, setRows] = useState([{
      letters: '',
      price: ''
  }]);
  const [renderRows,setRenderRows] = useState(getRenderRows());
  function getRenderRows () {
    return rows.map((o, i) =>{
      return (
          <tr key={"item-" + i}> 
               <td>
              <input
                  type="text"
                  value={o.letters}
                  onChange = {event=>console.log(event)}
              />
              </td>
              <td>
              <input
                  type="text"
                  value={o.price}
                  onChange = {event=>console.log(event)}
              />
              </td>
              <td>
              <input
                  type="button"
                  className="btn btn-primary"
                  value="Delete"
              />
              </td>
          </tr>
      );
  })};

  function handleItemDelete(i) {
    var items = rows;
    items.splice(i, 1);
    setRows(items);
  }

  function handleClick(data) {
    var items = rows;
    items.push(data);
    setRows(items);
  }
  
  function addCustomizations() {
    console.log('I m clicked');
    var data = {
      letters : '',
      price : ''
    }
    var items = rows;
    items.push(data);
    setRows(items);
    setRenderRows(getRenderRows());
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Letters</th>
            <th>Price</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
           {renderRows}
        </tbody>
      </table>
      <hr/>
      <button type="button" onClick={()=>addCustomizations()}>
        Add Item
      </button>
    </div>
  );
}