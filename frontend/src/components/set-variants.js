import React, { useState } from "react";
export default function SetVariants(props) {
  const [rows, setRows] = useState([{
      color: '',
      size: '',
      price: ''
  }]);
  const [renderRows,setRenderRows] = useState(getRenderRows());
  function getRenderRows() {
     return rows.map((o, i) =>{
        return (
            <tr key={"item-" + i}> 
                <td>
                <input
                    type="text"
                    name="color"
                    // value={o.color}
                    onChange={event=>handleInputChange(event,i)}
                />
                </td>
                 <td>
                <input
                    type="text"
                    name="size"
                  //  value={o.size}
                    onChange= {event=>handleInputChange(event,i)}
                />
                </td>
                <td>
                <input
                    type="text"
                    name="price"
                   // value={o.price}
                    onChange= {event=>handleInputChange(event,i)}
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
    });
  }

  function handleItemDelete(i) {
    var items = rows;
    items.splice(i, 1);
    setRows(items);
  }

  function handleInputChange(event,i) {
    var items = rows;
    items[i][event.target.name] = event.target.value;
    setRows(items);
    props.totalVariants(rows);
  }
  function handleClick(data) {
    var items = rows;
    items.push(data);
    setRows(items);
  }
  
  function addVariants() {
    var data = {
      color : '',
      size : '',
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
            <th>Color</th>
            <th>Size</th>
            <th>Price</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
            {renderRows}
        </tbody>
      </table>
      <hr/>
      <button type="button" onClick={()=>addVariants()}>
        Add Item
      </button>
    </div>
  );
}