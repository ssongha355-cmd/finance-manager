import { useState, useEffect, useCallback } from 'react';
import { getFirestore, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { getFirebaseDb } from './useFirebase';
import { DEFAULT_CATEGORIES, APP_ID } from '../utils/constants';

export const useCategories = () => {
    const [categoriesList, setCategoriesList] = useState(DEFAULT_CATEGORIES);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            const db = getFirebaseDb();
            const unsubscribe = onSnapshot(
                doc(db, 'artifacts', APP_ID, 'settings', 'categories'),
                (snap) => {
                    if (snap.exists()) {
                        setCategoriesList(snap.data().categories);
                    }
                    setIsLoading(false);
                },
                (err) => {
                    console.error('Categories sync error:', err);
                    setError(err.message);
                    setIsLoading(false);
                }
            );

            return () => unsubscribe();
        } catch (err) {
            console.error('useCategories error:', err);
            setError(err.message);
            setIsLoading(false);
        }
    }, []);

    const updateCategories = useCallback(async (newCategories) => {
        try {
            const db = getFirebaseDb();
            await setDoc(doc(db, 'artifacts', APP_ID, 'settings', 'categories'), {
                categories: newCategories
            });
        } catch (err) {
            console.error('Update categories error:', err);
            throw err;
        }
    }, []);

    const addCategory = useCallback(async (type, categoryName) => {
        if (!categoryName.trim()) return;
        const updated = {
            ...categoriesList,
            [type]: [...(categoriesList[type] || []), categoryName]
        };
        await updateCategories(updated);
    }, [categoriesList, updateCategories]);

    const removeCategory = useCallback(async (type, categoryToRemove) => {
        const updated = {
            ...categoriesList,
            [type]: categoriesList[type].filter(c => c !== categoryToRemove)
        };
        await updateCategories(updated);
    }, [categoriesList, updateCategories]);

    return {
        categoriesList,
        isLoading,
        error,
        updateCategories,
        addCategory,
        removeCategory
    };
};
