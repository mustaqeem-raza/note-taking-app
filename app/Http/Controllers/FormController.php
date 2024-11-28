<?php

namespace App\Http\Controllers;

use App\Models\FormElement;
use App\Models\UserFormData;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class FormController extends Controller
{
    /**
     * Get all form elements ordered by position.
     */
    public function getFormElements()
    {
        return response()->json(FormElement::orderBy('position')->get());
    }

    /**
     * Save a new form element.
     */
    public function saveFormElement(Request $request)
    {
        // Define valid types for form elements.
        $validTypes = ['text', 'textarea', 'select'];

        // Validate incoming request
        $validated = $request->validate([
            'type' => ['required', 'string', Rule::in($validTypes)],
            'position' => 'nullable|integer',
        ]);

        // Create a new form element and save it.
        $formElement = FormElement::create([
            'type' => $validated['type'],
            'position' => $validated['position'] ?? 0, // Default position
        ]);

        // Return the saved form element as JSON response
        return response()->json($formElement, 201);
    }

    /**
     * Update the positions of form elements.
     */
    public function updateElementPositions(Request $request)
    {
        // Validate incoming data
        $validated = $request->validate([
            'positions' => 'required|array',
            'positions.*.id' => 'required|exists:form_elements,id',
            'positions.*.position' => 'required|integer',
        ]);

        // Use a transaction for batch updates (optional, depending on your needs)
        FormElement::whereIn('id', collect($validated['positions'])->pluck('id'))->get()->each(function ($element) use ($validated) {
            $position = collect($validated['positions'])->firstWhere('id', $element->id)['position'];
            $element->update(['position' => $position]);
        });

        return response()->json(['status' => 'Positions updated']);
    }

    /**
     * Save the value for a specific form element.
     */
    public function saveElementValue(Request $request)
    {
        // Validate the incoming data
        $validated = $request->validate([
            'form_element_id' => 'required|exists:form_elements,id',
            'value' => 'required|string',
        ]);

        // Update the form element's value
        $formElement = FormElement::find($validated['form_element_id']);

        if ($formElement) {
            $formElement->update(['value' => $validated['value']]);
            return response()->json(['message' => 'User input saved successfully'], 200);
        }

        return response()->json(['message' => 'Form element not found'], 404);
    }

    /**
     * Remove a form element.
     */
    public function removeFormElement($id)
    {
        $element = FormElement::find($id);

        if ($element) {
            $element->delete();
            return response()->json(['message' => 'Element removed successfully'], 200);
        }

        return response()->json(['message' => 'Element not found'], 404);
    }
}
