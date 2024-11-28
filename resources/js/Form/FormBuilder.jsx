import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import DraggableElement from './DraggableElement';
import DroppableArea from './DroppableArea';
import FormElement from './FormElement';
import axios from 'axios';

const initialElements = [
    { id: 'short-text', label: 'Short Text', type: 'text', placeholder: 'Type your short text here...' },
    { id: 'long-text', label: 'Long Text', type: 'textarea', placeholder: 'Type your long text here...' },
    { id: 'select-box', label: 'Select Box', type: 'select', options: [{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }, { value: '3', label: 'Option 3' }] },
];

export default function FormBuilder() {
    const [formElements, setFormElements] = useState([]);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetchFormElements = async () => {
            try {
                const response = await axios.get('/api/get-form-element');
                const elements = response.data.map((el) => ({
                    ...el,
                    options: el.options || [], // Default empty options array
                }));
                setFormElements(elements.sort((a, b) => a.position - b.position));
            } catch (error) {
                console.error('Error fetching form elements:', error);
            }
        };

        fetchFormElements();
    }, []);

    const handleDragEnd = async ({ active, over }) => {
        if (!over) return;

        if (over.id === 'form-preview') {
            const element = initialElements.find((item) => item.id === active.id);
            if (element) {
                const newElement = {
                    type: element.type,
                    label: element.label,
                    placeholder: element.placeholder,
                    options: element.options || [],
                    position: formElements.length,
                };
                await saveElementToDb(newElement);
            }
        } else {
            const oldIndex = formElements.findIndex((item) => item.id === active.id);
            const newIndex = formElements.findIndex((item) => item.id === over.id);

            const updatedElements = [...formElements];
            const [movedElement] = updatedElements.splice(oldIndex, 1);
            updatedElements.splice(newIndex, 0, movedElement);

            const elementsWithNewPosition = updatedElements.map((element, index) => ({
                ...element,
                position: index,
            }));

            setFormElements(elementsWithNewPosition);
            await updatePositionsInDb(elementsWithNewPosition);
        }
    };

    const saveElementToDb = async (element) => {
        try {
            const response = await axios.post('/api/save-form-element', element);
            setFormElements((prev) => [...prev, { ...element, id: response.data.id }]);
        } catch (error) {
            console.error('Error saving form element:', error);
        }
    };

    const updatePositionsInDb = async (elements) => {
        try {
            const positions = elements.map((element, index) => ({
                id: element.id,
                position: index + 1,
            }));

            await axios.post('/api/update-element-positions', { positions });
        } catch (error) {
            console.error('Error updating positions:', error);
        }
    };

    const handleRemove = async (id) => {
        console.log('handleRemove', id);

        try {
            await removeElementFromDb(id);
            setFormElements((prev) => prev.filter((element) => element.id !== id));
        } catch (error) {
            console.error('Error removing form element:', error);
        }
    };

    const removeElementFromDb = async (id) => {
        try {
            await axios.delete(`/api/remove-form-element/${id}`);
        } catch (error) {
            console.error('Error removing form element from database:', error);
        }
    };

    const handleInputChange = async (id, newValue) => {
        setUserData((prev) => ({ ...prev, [id]: newValue }));
        await saveElementValue(id, newValue);
    };

    const saveElementValue = async (formElementId, value) => {
        try {
            await axios.post('/api/save-element-value', { form_element_id: formElementId, value });
        } catch (error) {
            console.error('Error saving user input:', error);
        }
    };

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ width: '70%' }}>
                    <h4>Form Preview</h4>
                    <SortableContext items={formElements.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                        <DroppableArea>
                            {formElements.map((element) => (
                                <FormElement
                                    key={element.id}
                                    id={element.id}
                                    type={element.type}
                                    value={element.value}
                                    onRemove={() => handleRemove(element.id)}
                                    onChange={handleInputChange}
                                />
                            ))}
                        </DroppableArea>
                    </SortableContext>
                </div>
                <div style={{ width: '30%' }}>
                    <h4>Form Elements</h4>
                    {initialElements.map((element) => (
                        <DraggableElement key={element.id} id={element.id} label={element.label} />
                    ))}
                </div>
            </div>
        </DndContext>
    );
}
