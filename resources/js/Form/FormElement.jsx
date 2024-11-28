import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { FaTrash, FaGripLines } from 'react-icons/fa';
import { CSS } from '@dnd-kit/utilities';

function FormElement({ id, type, label, placeholder, options, value, onRemove, onChange }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const handleChange = (e) => {
        const newValue = e.target.value;
        onChange(id, newValue);
    };

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        position: 'relative',
        border: '1px solid #ddd',
        borderRadius: '5px',
        marginBottom: '20px',
        backgroundColor: '#fff',
    };

    const inputStyle = {
        width: '100%',
        padding: '8px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {/* Header: Drag and Delete Icons */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px',
                    width: '100%',
                    backgroundColor: '#f4f4f4',
                    borderTopLeftRadius: '5px',
                    borderTopRightRadius: '5px',
                }}
            >
                {/* Drag Handle Icon */}
                <div
                    {...listeners}
                    {...attributes}
                    style={{
                        cursor: 'move',
                        fontSize: '18px',
                        color: '#888',
                    }}
                    title="Drag to reorder"
                >
                    <FaGripLines />
                </div>

                {/* Delete Icon */}
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent event bubbling
                        onRemove(id);
                    }}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'red',
                        fontSize: '18px',
                        cursor: 'pointer',
                    }}
                    title="Delete element"
                >
                    <FaTrash />
                </button>
            </div>

            {/* Card Body: Form Content */}
            <div style={{ padding: '20px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                        {label}
                    </label>

                    {type === 'text' && (
                        <div>
                            <label>Short Text:</label>
                            <input
                                placeholder={placeholder || 'Enter short text here'}
                                value={value}
                                onChange={handleChange}
                                style={inputStyle}
                            />
                        </div>
                    )}

                    {type === 'textarea' && (
                        <div>
                            <label>Long Text:</label>
                            <textarea
                                placeholder={placeholder || 'Enter long text here'}
                                value={value}
                                onChange={handleChange}
                                rows="4"
                                style={inputStyle}
                            />
                        </div>
                    )}

                    {type === 'select' && (
                        <div>
                            <label>Select an option:</label>
                            <select
                                value={value}
                                onChange={handleChange}
                                style={inputStyle}
                            >
                                <option value="">Select an option</option>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                                <option value="3">Option 3</option>
                                <option value="4">Option 4</option>
                            </select>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FormElement;
