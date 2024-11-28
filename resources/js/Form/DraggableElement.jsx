// src/components/DraggableElement.jsx
import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

function DraggableElement({ id, label }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });

    const style = {
        transform: CSS.Translate.toString(transform),
        border: isDragging ? '2px dashed #007bff' : '1px solid #ddd',
        backgroundColor: isDragging ? '#f0f8ff' : '#fff',
        padding: '10px',
        marginBottom: '10px',
        cursor: 'grab',
        borderRadius: '5px',
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {label}
        </div>
    );
}

export default DraggableElement;