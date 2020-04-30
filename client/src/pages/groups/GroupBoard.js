import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { FormattedMessage } from 'react-intl';
import SearchIcon from 'react-ionicons/lib/IosSearch';
import styled from 'styled-components';
import { uniqueId } from 'lodash';
import Button from '../../components/ui/Button';
import Dropdown from '../../components/ui/Dropdown';
import Paper from '../../components/ui/Paper';
import Card from '../../components/ui/Card';
import CardHeader from '../../components/ui/CardHeader';
import CardBody from '../../components/ui/CardBody';
import MiniLibraryCard from '../../components/library/MiniLibraryCard';
import MiniUserCard from '../../components/users/MiniUserCard';

const Toolbar = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 16px;
`;

const Fodase = styled(Paper)`
  width: 100%;
  padding: 16px;
  height: calc(100vh - 160px);

  > .search {
    width: 100%;
    height: 48px;
    border-radius: 4px;
    border: 1px solid ${(props) => props.theme.palette.border};
    display: flex;
    padding: 16px;
    justify-content: space-between;
    margin-bottom: 16px;

    input {
      border: none;
      background: transparent;
      height: 100%;
      color: ${(props) => props.theme.palette.text.primary};
    }

    svg {
      width: 20px;
      height: 100%;
      fill: ${(props) => props.theme.palette.text.primary};
    }
  }
`;

const columnsFromBackend = {
  [uniqueId()]: {
    name: 'A serem discutidos',
    items: [],
  },
  [uniqueId()]: {
    name: 'Discutindo',
    items: [],
  },
  [uniqueId()]: {
    name: 'Discutidos',
    items: [],
  },
};

const masterItems = [
  {
    id: uniqueId(),
    content: (
      <MiniLibraryCard
        item={{ title: 'Teste', author: 'Tofas', cover: null }}
      />
    ),
  },
  {
    id: uniqueId(),
    content: (
      <MiniUserCard user={{ name: 'Luan', username: 'luan', avatar: '' }} />
    ),
  },
];

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId && destination.droppableId !== 'master') {
    if (source.droppableId == 'master') {
      const sourceColumn = masterItems;
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...masterItems];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems.map((item) => ({ ...item, id: uniqueId() })),
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems.map((item) => ({ ...item, id: uniqueId() })),
        },
      });
    } else {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    }
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

export default () => {
  const [columns, setColumns] = useState(columnsFromBackend);

  return (
    <div style={{ marginTop: 16 }}>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        <div
          spacing={2}
          style={{
            marginTop: 8,
            display: 'grid',
            gap: '16px',
            gridTemplateColumns: '3fr 10fr',
          }}
        >
          <div xs={4}>
            <Fodase>
              <div className="search">
                <FormattedMessage id="groups.board.searchComponent">
                  {(msg) => (
                    <input type="text" placeholder={msg} />
                  )}
                </FormattedMessage>
                <SearchIcon />
              </div>

              <div>
                <Droppable droppableId="master">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        padding: 4,
                        width: 250,

                      }}
                    >
                      {masterItems.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                userSelect: 'none',
                                padding: 8,
                                margin: '0 0 8px 0',
                                minHeight: '50px',
                                borderRadius: 4,
                                backgroundColor: snapshot.isDragging
                                  ? 'rgba(0,0,0,0.6)'
                                  : 'rgba(0,0,0,0.2)',
                                color: 'white',
                                ...provided.draggableProps.style,
                              }}
                            >
                              {item.content}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </Fodase>
          </div>
          <div style={{ width: 726 }}>
            <Toolbar>
              <Dropdown
                toggle={<Button color="primary">Leituras</Button>}
              />
            </Toolbar>

            <div
              style={{
                display: 'flex',
                width: '100%',
                height: 'calc(100% - 50px)',
                paddingBottom: 16,
                overflowX: 'scroll',
              }}
            >
              {Object.entries(columns).map(([columnId, column], index) => (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginRight: 16,
                  }}
                  key={columnId}
                >
                  <Card>
                    <CardHeader>
                      <h3>{column.name}</h3>
                    </CardHeader>
                    <CardBody>
                      <Droppable droppableId={columnId} key={columnId}>
                        {(provided, snapshot) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              padding: 4,
                              width: 250,
                            }}
                          >
                            {column.items.map((item, index) => (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: 'none',
                                      padding: 8,
                                      margin: '0 0 8px 0',
                                      minHeight: '50px',
                                      borderRadius: 4,
                                      backgroundColor: snapshot.isDragging
                                        ? 'rgba(0,0,0,0.6)'
                                        : 'rgba(0,0,0,0.2)',
                                      color: 'white',
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {item.content}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </CardBody>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};
