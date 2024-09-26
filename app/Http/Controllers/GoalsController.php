<?php

namespace App\Http\Controllers;

use App\Models\Goal;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GoalsController extends Controller
{
    public function create()
    {
        return Inertia::render('Goals/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'current_status' => 'required|string',
            'description' => 'nullable|string',
            'period_start' => 'required|date',
            'period_end' => 'required|date|after:period_start',
            'status' => 'required|integer|min:0',
            'total_time' => 'required|integer|min:0',
            'progress_percentage' => 'required|integer|min:0|max:100',
        ]);

        $validated['user_id'] = auth()->id();

        Goal::create($validated);

        return redirect()->route('goals.index')->with('success', '目標が正常に作成されました。');
    }

    public function index()
    {
        $goals = auth()->user()->goals()->latest()->get();
        return Inertia::render('Goals/Index', [
            'goals' => $goals
        ]);
    }
}