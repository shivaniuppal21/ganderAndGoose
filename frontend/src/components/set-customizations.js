import React, { useState } from "react";

export default function SetCustomizations(props) {
  const [rows, setRows] = useState([{
      letters: '',
      price: ''
  }]);
  const [renderRows,setRenderRows] = useState(getRenderRows());
  function handleInputChange(event,i) {
    var items = rows;
    items[i][event.target.name] = event.target.value;
    setRows(items);
    props.totalCustomizations(rows);
  }
  function getRenderRows () {
    return rows.map((o, i) =>{
      return (
          <tr key={"item-" + i}> 
               <td>
              <input
                  type="text"
                  name="letters"
                  onChange = {event=>handleInputChange(event,i)}
              />
              </td>
              <td>
              <input
                  type="text"
                  name="price"
                  onChange = {event=>handleInputChange(event,i)}
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