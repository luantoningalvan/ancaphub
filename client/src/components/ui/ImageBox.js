import React, { useState } from "react";
import Dialog from "./Dialog";
import IconButton from "./IconButton";
import CloseIcon from "react-ionicons/lib/IosClose";

export default ({ src }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        marginTop: 16,
        cursor: "pointer",
        width: "100%",
        maxHeight: 350,
        overflow: "hidden",
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
      }}
    >
      <img
        style={{ width: "100%" }}
        src={src}
        alt=""
        onClick={() => setOpen(true)}
      />

      <Dialog show={open}>
        <IconButton
          color="primary"
          style={{
            position: "absolute",
            left: 16,
            top: 16,
            height: 40,
            width: 40
          }}
          onClick={() => setOpen(false)}
        >
          <CloseIcon />
        </IconButton>
        <img src={src} alt="" />
      </Dialog>
    </div>
  );
};
