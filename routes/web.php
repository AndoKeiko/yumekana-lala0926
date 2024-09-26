<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\GoalsController;
use App\Http\Controllers\TaskController;

// 認証不要のルート
Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login']);
Route::get('/register', [RegisterController::class, 'showRegistrationForm'])->name('register');
Route::post('/register', [RegisterController::class, 'register']);

// 認証が必要なルート
Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Users関連のルート
    Route::get('/profile', [UsersController::class, 'show'])->name('profile');
    Route::put('/profile', [UsersController::class, 'update'])->name('profile.update');

    // Goals関連のルート
    Route::get('/goals', [GoalsController::class, 'index'])->name('goals.index');
    Route::get('/goals/create', [GoalsController::class, 'create'])->name('goals.create');
    Route::post('/goals', [GoalsController::class, 'store'])->name('goals.store');
    Route::get('/goals/{goal}', [GoalsController::class, 'show'])->name('goals.show');
    Route::get('/goals/{goal}/edit', [GoalsController::class, 'edit'])->name('goals.edit');
    Route::put('/goals/{goal}', [GoalsController::class, 'update'])->name('goals.update');
    Route::delete('/goals/{goal}', [GoalsController::class, 'destroy'])->name('goals.destroy');

    // Tasks関連のルート
    Route::get('/goals/{goal}/tasks', [TaskController::class, 'index'])->name('tasks.index');
    Route::post('/goals/{goal}/tasks', [TaskController::class, 'store'])->name('tasks.store');
    Route::put('/goals/{goal}/tasks/{task}', [TaskController::class, 'update'])->name('tasks.update');
    Route::delete('/goals/{goal}/tasks/{task}', [TaskController::class, 'destroy'])->name('tasks.destroy');
});

// API用のルート（必要な場合）
Route::prefix('api')->middleware('auth:sanctum')->group(function () {
    Route::put('/tasks/order', [TaskController::class, 'updateOrder']);
    Route::put('/tasks/{task}/elapsed-time', [TaskController::class, 'updateElapsedTime']);
    Route::put('/tasks/{task}/review-interval', [TaskController::class, 'updateReviewInterval']);
});