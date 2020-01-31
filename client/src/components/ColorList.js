import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useForm } from "react-hook-form";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const onSubmit = data => {
    console.log(data);
    const changedata = { ...data, code: { hex: data.code } };
    console.log(changedata);
    axiosWithAuth()
      .post("/api/colors", changedata)
      .then(res => {
        console.log(res);
        updateColors(res.data);
      })
      .catch(err => console.log(err));
  };

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    console.log(colorToEdit);
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(res);
        setEditing(false);
      })
      .catch(err => console.log(err));
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    console.log(color);
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
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
      <h2>Add a new Color:</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ margin: "10px 0 20px" }}>
        <input
          name="color"
          placeholder="color name"
          ref={register}
          style={{
            marginRight: "30px",
            borderRadius: "5px",
            border: ".5px solid rgba(0, 0, 0, 0.2)",
            paddingLeft: "5px"
          }}
        />
        <input
          name="code"
          placeholder="hex code"
          ref={register}
          style={{
            marginRight: "30px",
            borderRadius: "5px",
            border: ".5px solid rgba(0, 0, 0, 0.20)",
            paddingLeft: "5px"
          }}
        />
        <input
          type="submit"
          style={{
            borderRadius: "5px",
            border: ".5px solid rgba(0, 0, 0, 0.2)"
          }}
        />
      </form>
    </div>
  );
};

export default ColorList;
