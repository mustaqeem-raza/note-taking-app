import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Notes(props) {
    // State to store notes
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState({ title: '', content: '' }); // For creating a new note
    const [editNote, setEditNote] = useState(null); // For editing a note

    // Fetch notes when the component mounts
    useEffect(() => {
        axios.get('/api/notes')
            .then((response) => {
                setNotes(response.data); // Set the notes data from the response
            })
            .catch((error) => {
                console.error('Error fetching notes:', error);
            });
    }, []);

    // Handle creating a new note
    const handleCreateNote = () => {
        axios.post('/api/notes', newNote)
            .then((response) => {
                setNotes([response.data, ...notes]); // Add the new note to the state
                setNewNote({ title: '', content: '' }); // Clear the form fields
            })
            .catch((error) => {
                console.error('Error creating note:', error);
            });
    };

    // Handle editing a note
    const handleEditNote = () => {
        if (editNote) {
            axios.put(`/api/notes/${editNote.id}`, editNote)
                .then((response) => {
                    const updatedNotes = notes.map((note) =>
                        note.id === response.data.id ? response.data : note
                    );
                    setNotes(updatedNotes); // Update the notes state with the updated note
                    setEditNote(null); // Clear the edit state
                })
                .catch((error) => {
                    console.error('Error editing note:', error);
                });
        }
    };

    // Handle deleting a note
    const handleDeleteNote = (id) => {
        axios.delete(`/api/notes/${id}`)
            .then(() => {
                setNotes(notes.filter((note) => note.id !== id)); // Remove the deleted note from the state
            })
            .catch((error) => {
                console.error('Error deleting note:', error);
            });
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Notes</h2>}
        >
            <Head title="Notes" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="font-semibold text-lg mb-4">Create a New Note</h3>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    className="border p-2 mb-2 w-full"
                                    placeholder="Title"
                                    value={newNote.title}
                                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                                />
                                <textarea
                                    className="border p-2 mb-2 w-full"
                                    placeholder="Content"
                                    value={newNote.content}
                                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                                />
                                <button
                                    onClick={handleCreateNote}
                                    className="bg-blue-500 text-white p-2 rounded"
                                >
                                    Create Note
                                </button>
                            </div>

                            <h3 className="font-semibold text-lg mb-4">Your Notes</h3>
                            <ul>
                                {notes.length > 0 ? (
                                    notes.map((note) => (
                                        <li key={note.id} className="border-b py-4">
                                            <h4 className="font-medium text-xl">{note.title}</h4>
                                            <p>{note.content}</p>
                                            <button
                                                onClick={() => handleDeleteNote(note.id)}
                                                className="text-red-500"
                                            >
                                                Delete
                                            </button>
                                            <button
                                                onClick={() => setEditNote(note)}
                                                className="ml-4 text-blue-500"
                                            >
                                                Edit
                                            </button>
                                        </li>
                                    ))
                                ) : (
                                    <li>No notes available.</li>
                                )}
                            </ul>

                            {/* Edit Note Modal */}
                            {editNote && (
                                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
                                    <div className="bg-white p-6 rounded shadow-lg w-1/3">
                                        <h3>Edit Note</h3>
                                        <input
                                            type="text"
                                            className="border p-2 mb-2 w-full"
                                            value={editNote.title}
                                            onChange={(e) => setEditNote({ ...editNote, title: e.target.value })}
                                        />
                                        <textarea
                                            className="border p-2 mb-2 w-full"
                                            value={editNote.content}
                                            onChange={(e) => setEditNote({ ...editNote, content: e.target.value })}
                                        />
                                        <button
                                            onClick={handleEditNote}
                                            className="bg-blue-500 text-white p-2 rounded"
                                        >
                                            Update Note
                                        </button>
                                        <button
                                            onClick={() => setEditNote(null)}
                                            className="ml-4 bg-gray-500 text-white p-2 rounded"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
