// ⚠️ SECURITY WARNING: Move this to environment variables or server-side proxy
// For now, using a limited-scope API key with Firestore rules
export const DEFAULT_FIREBASE_CONFIG = {
    apiKey: "AIzaSyBtNC28lWSCOx87ALm9s0PSU9SVHciNmhw",
    authDomain: "daily-expense-94e9b.firebaseapp.com",
    projectId: "daily-expense-94e9b",
    storageBucket: "daily-expense-94e9b.firebasestorage.app",
    messagingSenderId: "218712079903",
    appId: "1:218712079903:web:50dbfb1de4b5ede1f5df2a",
    measurementId: "G-MS8D18B83K"
};

export const APP_ID = 'daily-expense-94e9b';

export const ERROR_MESSAGES = {
    invalidAmount: 'សូមបញ្ចូលទឹកប្រាក់ឱ្យបានត្រឹមត្រូវ (ត្រូវតែជាលេខវិជ្ជមាន)',
    emptyDescription: 'សូមបញ្ចូលពិពណ៌នា',
    emptyCategory: 'សូមជ្រើសរើសប្រភេទ',
    confirmDelete: 'តើបងពិតជាចង់លុបប្រតិបត្តិការនេះមែនទេ?',
    networkError: 'បាត់បង់ការតភ្ជាប់អ៊ីនធឺណិត - សូមព្យាយាមម្តងទៀត',
    firebaseError: 'កំហុសពីក្រុមហ៊ុន Firebase:',
    syncError: 'មិនអាចធ្វើសមកាលកម្មទិន្នន័យបានទេ'
};

export const DEFAULT_CATEGORIES = {
    expense: ['🍔 អាហារ', '🚗 ដឹកជញ្ជូន', '🏠 ផ្ទះ', '💡 វិក័យប័ត្រ', '💊 សុខភាព', '🎮 កម្សាន្ត'],
    income: ['💰 ប្រាក់ខែ', '🏪 លក់ដូរ', '📈 ចំណូលផ្សេងៗ']
};
