import { useState, useEffect, useCallback } from 'react';
import { getFirestore, collection, addDoc, onSnapshot, doc, setDoc, deleteDoc, updateDoc, query, orderBy } from 'firebase/firestore';
import { getFirebaseDb } from './useFirebase';
import { APP_ID } from '../utils/constants';

export const useTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            const db = getFirebaseDb();
            const transactionsQuery = query(
                collection(db, 'artifacts', APP_ID, 'transactions'),
                orderBy('createdAt', 'desc')
            );

            const unsubscribe = onSnapshot(
                transactionsQuery,
                (snap) => {
                    try {
                        const data = snap.docs.map(d => {
                            const raw = d.data();
                            const createdAt = raw.createdAt && raw.createdAt.toDate
                                ? raw.createdAt.toDate().toISOString()
                                : raw.createdAt;
                            return { id: d.id, ...raw, createdAt };
                        });
                        setTransactions(data);
                        setIsLoading(false);
                    } catch (err) {
                        console.error('Transaction sync error:', err);
                        setError(err.message);
                    }
                },
                (error) => {
                    console.error('Firestore error:', error);
                    setError(error.message);
                }
            );

            return () => unsubscribe();
        } catch (err) {
            console.error('useTransactions error:', err);
            setError(err.message);
            setIsLoading(false);
        }
    }, []);

    const addTransaction = useCallback(async (transactionData) => {
        try {
            const db = getFirebaseDb();
            const docRef = await addDoc(
                collection(db, 'artifacts', APP_ID, 'transactions'),
                { ...transactionData, createdAt: new Date(transactionData.createdAt) }
            );
            return docRef.id;
        } catch (err) {
            console.error('Add transaction error:', err);
            throw err;
        }
    }, []);

    const updateTransaction = useCallback(async (transId, transactionData) => {
        try {
            const db = getFirebaseDb();
            await updateDoc(
                doc(db, 'artifacts', APP_ID, 'transactions', transId),
                { ...transactionData, createdAt: new Date(transactionData.createdAt) }
            );
        } catch (err) {
            console.error('Update transaction error:', err);
            throw err;
        }
    }, []);

    const deleteTransaction = useCallback(async (transId) => {
        try {
            const db = getFirebaseDb();
            await deleteDoc(doc(db, 'artifacts', APP_ID, 'transactions', transId));
        } catch (err) {
            console.error('Delete transaction error:', err);
            throw err;
        }
    }, []);

    return {
        transactions,
        isLoading,
        error,
        addTransaction,
        updateTransaction,
        deleteTransaction
    };
};
