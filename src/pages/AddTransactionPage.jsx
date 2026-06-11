import React, { useState } from 'react';
import { validateTransaction } from '../utils/validators';
import { getLocalDate } from '../utils/dateHelpers';

export const AddTransactionPage = ({ 
    editingTrans,
    onSave,
    onCancel,
    categoriesList,
    onError
}) => {
    const [type, setType] = useState(editingTrans?.type || 'expense');
    const [amount, setAmount] = useState(editingTrans?.amount.toString() || '');
    const [description, setDescription] = useState(editingTrans?.description || '');
    const [category, setCategory] = useState(editingTrans?.category || (categoriesList[type]?.[0] || ''));
    const [transDate, setTransDate] = useState(editingTrans?.createdAt.split('T')[0] || getLocalDate());
    const [showCatMgmt, setShowCatMgmt] = useState(false);
    const [newCatName, setNewCatName] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleTypeChange = (newType) => {
        setType(newType);
        setCategory(categoriesList[newType]?.[0] || '');
    };

    const handleSave = async (e) => {
        e.preventDefault();
        
        const error = validateTransaction(amount, description, category);
        if (error) {
            onError(error);
            return;
        }

        setIsSaving(true);
        try {
            await onSave({
                type,
                amount: parseFloat(amount),
                description,
                category,
                createdAt: transDate
            });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
            <div className="w-full max-w-sm bg-slate-800 border border-slate-700 shadow-2xl rounded-3xl p-6 relative style-up">
                {/* Header */}
                <h2 className="text-xl font-bold text-center text-slate-100 mb-6">
                    {editingTrans ? 'កែសម្រួលទិន្នន័យ' : 'បន្ថែមប្រតិបត្តិការ'}
                </h2>

                {/* Form */}
                <form onSubmit={handleSave} className="space-y-4">
                    {/* Type Selection */}
                    <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900 rounded-2xl">
                        <button 
                            type="button" 
                            onClick={() => handleTypeChange('income')} 
                            className={`py-2 rounded-xl text-sm font-bold transition-all ${type === 'income' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                            ចំណូល
                        </button>
                        <button 
                            type="button" 
                            onClick={() => handleTypeChange('expense')} 
                            className={`py-2 rounded-xl text-sm font-bold transition-all ${type === 'expense' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                            ចំណាយ
                        </button>
                    </div>

                    {/* Category Selection */}
                    <div className="space-y-2">
                        <label className="text-xs text-slate-400 px-1">ជ្រើសរើសប្រភេទ</label>
                        <select 
                            value={category} 
                            onChange={e => setCategory(e.target.value)} 
                            className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-sm outline-none focus:border-teal-500 transition-all cursor-pointer hover:border-slate-600"
                        >
                            {(categoriesList[type] || []).map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>

                    {/* Amount Input */}
                    <input 
                        type="number" 
                        step="0.01" 
                        min="0" 
                        value={amount} 
                        onChange={e => setAmount(e.target.value)}
                        className="w-full p-4 bg-slate-900 border border-slate-700 rounded-xl text-2xl font-bold text-center outline-none focus:border-teal-500 transition-all" 
                        placeholder="$ 0.00" 
                        required 
                    />

                    {/* Description Input */}
                    <input 
                        type="text" 
                        value={description} 
                        onChange={e => setDescription(e.target.value)}
                        className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-sm outline-none focus:border-teal-500 transition-all" 
                        placeholder="ពិពណ៌នា" 
                        required 
                    />

                    {/* Date Input */}
                    <input 
                        type="date" 
                        value={transDate} 
                        onChange={e => setTransDate(e.target.value)}
                        className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-sm outline-none focus:border-teal-500 transition-all cursor-pointer hover:border-slate-600"
                    />

                    {/* Actions */}
                    <div className="pt-2 grid grid-cols-2 gap-3">
                        <button 
                            type="button" 
                            onClick={onCancel} 
                            className="py-3 rounded-xl bg-slate-700 text-sm font-bold text-slate-300 hover:bg-slate-600 transition-colors active:scale-95"
                        >
                            បោះបង់
                        </button>
                        <button 
                            type="submit" 
                            disabled={isSaving}
                            className="py-3 rounded-xl bg-teal-600 text-sm font-bold text-white hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isSaving ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    រក្សា...
                                </>
                            ) : (
                                'រក្សាទុក'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
