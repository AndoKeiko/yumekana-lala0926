import React, { useState, useEffect, useCallback } from 'react';
import { AuthContext } from './AuthContext';  // パスを修正

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = useCallback((userData) => {
        setUser(userData);
        // ログイン処理の実装
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        // ログアウト処理の実装
    }, []);

    useEffect(() => {
        // 初期認証状態の確認
        // 例: APIを呼び出して現在のユーザー情報を取得
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};