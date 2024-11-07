<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function index() {
        return inertia('Notes/Index', [
            'notes' => Note::all()
        ]);
    }
    
    public function store(Request $request) {
        $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
        ]);
        Note::create($request->only('title', 'content'));
    
        return redirect()->back()->with('success', 'Note created successfully!');
    }
    
    public function update(Request $request, $id) {
        $note = Note::findOrFail($id);
        $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
        ]);
        $note->update($request->only('title', 'content'));
    
        return redirect()->back()->with('success', 'Note updated successfully!');
    }
    
    public function destroy($id) {
        $note = Note::findOrFail($id);
        $note->delete();
    
        return redirect()->back()->with('success', 'Note deleted successfully!');
    }
    
}
