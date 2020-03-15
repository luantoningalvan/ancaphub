import React from "react";
import {
  KeyBindingUtil
} from "draft-js";


export const linkStrategy = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === "LINK"
      );
    },
    callback
  );
};


export const Link = (props) => {
  const { contentState, entityKey } = props;
  const { url } = contentState.getEntity(entityKey).getData();
  return (
    <a
      className="link"
      rel="noopener noreferrer"
      target="_blank"
      aria-label={url}
      href={url}
    >{props.children}</a>
  );
};

const addLinkPlugin = {
  keyBindingFn(event, { getEditorState }) {
    const editorState = getEditorState();
    const selection = editorState.getSelection();
    if (selection.isCollapsed()) {
      return;
    }
    if (KeyBindingUtil.hasCommandModifier(event) && event.keyCode === 75) {
      return "add-link"
    }
  },


  decorators: [{
    strategy: linkStrategy,
    component: Link,
  }],
};


export default addLinkPlugin;