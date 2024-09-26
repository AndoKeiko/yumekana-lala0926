import React from 'react';
import { AuthProvider } from '@/Context/AuthProvider';
import App from './App';

export default function Root() {
    return (
        <AuthProvider>
            <App />
        </AuthProvider>
    );
}