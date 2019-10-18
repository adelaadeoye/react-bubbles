import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};
const token = localStorage.getItem(token);
let id;
const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [addColor, setAddColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };
  useEffect(() => {
    if (colorToEdit.id != null) id = colorToEdit.id;
  }, [editing]);
  const saveEdit = e => {
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/api/colors/${id}`, colorToEdit)
      .then(res => {
        console.log(res.data);
        updateColors([...res.data])
      })
      .catch(err => console.log(err.response));
      
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`,token)
      .then(res => {
        console.log('cololll',res);
        // updateColors([...colors])
        window.location.reload();

      })
      .catch(err => console.log(err.response));
  };

  const addNewColor=e=>{
    axiosWithAuth()
    .post("/api/colors", addColor)
    .then(res => {
      console.log(res)
      updateColors([...res.data])

    }).catch(err => console.log(err.response));
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color) }>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={addNewColor}>
          <legend>Add Color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setAddColor({ ...addColor, color: e.target.value })
              }
              value={addColor.color}
              placeholder="black"
              required
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setAddColor({
                  ...addColor,
                  code: { hex: e.target.value }
                })
              }
              value={addColor.code.hex}
              placeholder='#000'
              required
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
          </div>
        </form>
    </div>
  );
};

export default ColorList;
