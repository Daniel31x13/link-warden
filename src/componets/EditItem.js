import { useState } from "react";
import deleteEntity from "../modules/deleteEntity";
import "../styles/AddItem.css";
import TagSelection from "./TagSelection";
import editItem from "../modules/send";
import CollectionSelection from "./CollectionSelection";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/themes/theme-blue.css";

const EditItem = ({
  tags,
  collections,
  item,
  onExit,
  SetLoader,
  reFetch,
  lightMode,
}) => {
  const [name, setName] = useState(item.name),
    [tag, setTag] = useState(item.tag),
    [collection, setCollection] = useState(item.collection);

  function EditItem() {
    SetLoader(true);
    editItem(
      name,
      item.link,
      tag,
      collection,
      reFetch,
      onExit,
      SetLoader,
      "PUT",
      item._id,
      item.title,
      item.date
    );
  }

  function deleteItem() {
    SetLoader(true);
    deleteEntity(item._id, reFetch, onExit, SetLoader);
  }

  function SetName(e) {
    setName(e.target.value);
  }

  function SetTags(value) {
    setTag(value.map((e) => e.value.toLowerCase()));
  }

  function SetCollection(value) {
    setCollection(value.value);
  }

  function abort(e) {
    if (e.target.className === "add-overlay") {
      onExit();
    }
  }

  const url = new URL(item.link);

  return (
    <>
      <div className="add-overlay" onClick={abort}></div>
      <div className="send-box">
        <div className="box">
          <div className="title-delete-group">
            <h2 className="edit-title">Edit Link</h2>
            <AwesomeButton
              className="delete"
              size="icon"
              action={deleteItem}
              style={{ marginLeft: "10px" }}
            >
              &#xf2ed;
            </AwesomeButton>
          </div>
          <div className="AddItem-content">
            <h3>
              Link:{" "}
              <a
                className="link"
                target="_blank"
                rel="noreferrer"
                href={item.link}
              >
                {url.hostname}
              </a>
            </h3>
            <h3 className="title">
              <b>{item.title}</b>
            </h3>

            <h3>
              Name: <span className="optional">(Optional)</span>
            </h3>
            <input
              onChange={SetName}
              className="text-field AddItem-input"
              type="search"
              value={name}
              placeholder={"e.g. Example Tutorial"}
            />
            <h3>
              Tags: <span className="optional">(Optional)</span>
            </h3>
            <TagSelection
              setTags={SetTags}
              tags={tags}
              tag={tag}
              lightMode={lightMode}
            />
            <h3>
              Collection: <span className="optional">(Optional)</span>
            </h3>
            <CollectionSelection
              setCollection={SetCollection}
              collections={collections}
              collection={collection}
              lightMode={lightMode}
            />
            <AwesomeButton
              size="medium"
              action={EditItem}
              style={{
                marginTop: "20px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Update &#xf303;
            </AwesomeButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditItem;
