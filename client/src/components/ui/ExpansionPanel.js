import React, { useState } from 'react';
import ExpandIcon from 'react-ionicons/lib/IosArrowDown';
import Card from './Card';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import Collapse from './Collapse';

export default ({ title, children, ...rest }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <Card bordered {...rest}>
      <CardHeader onClick={handleOpen} style={{ cursor: 'pointer', padding: 16 }}>
        <h3>{title}</h3>
        <ExpandIcon />
      </CardHeader>
      <Collapse expanded={open}>
        <CardBody>
          {children}
        </CardBody>
      </Collapse>
    </Card>
  );
};
