// src/components/DroppableArea.jsx
import React from 'react';
import { useDroppable } from '@dnd-kit/core';

function DroppableArea({ children }) {
    const { isOver, setNodeRef } = useDroppable({ id: 'form-preview' });

    const style = {
        border: isOver ? '2px dashed #28a745' : '2px dashed #ddd',
        padding: '20px',
        minHeight: '200px',
        backgroundColor: isOver ? '#e6f7e6' : '#f9f9f9',
    };

    return (
        <div ref={setNodeRef} style={style}>
            {children}
        </div>
    );
}

export default DroppableArea;