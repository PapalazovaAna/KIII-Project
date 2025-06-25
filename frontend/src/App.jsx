// import { useEffect, useState } from 'react';
// import axios from 'axios';
//
// function App() {
//     const [expenses, setExpenses] = useState([]);
//     const [form, setForm] = useState({
//         title: '',
//         amount: '',
//         category: '',
//         date: ''
//     });
//
//     useEffect(() => {
//         axios.get('http://localhost:8080/api/expenses')
//             .then(res => setExpenses(res.data));
//     }, []);
//
//     const handleChange = e => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };
//
//     const handleSubmit = async e => {
//         e.preventDefault();
//         await axios.post('http://localhost:8080/api/expenses', form);
//         const res = await axios.get('http://localhost:8080/api/expenses');
//         setExpenses(res.data);
//         setForm({ title: '', amount: '', category: '', date: '' });
//     };
//
//     return (
//         <div className="container">
//             <h1>Expense Tracker</h1>
//
//             <form onSubmit={handleSubmit}>
//                 <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
//                 <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} required />
//                 <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
//                 <input type="date" name="date" value={form.date} onChange={handleChange} required />
//                 <button type="submit">Add Expense</button>
//             </form>
//
//             <ul>
//                 {expenses.map((e) => (
//                     <li key={e.id}>
//                         {e.date} - <strong>{e.title}</strong>: ${e.amount} ({e.category})
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }
//
// export default App;
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [expenses, setExpenses] = useState([]);
    const [form, setForm] = useState({
        title: '',
        amount: '',
        category: '',
        date: ''
    });
    const [editingId, setEditingId] = useState(null);

    const fetchExpenses = async () => {
        const res = await axios.get('http://localhost:8080/api/expenses');
        setExpenses(res.data);
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (editingId) {
            await axios.put(`http://localhost:8080/api/expenses/${editingId}`, form);
        } else {
            await axios.post('http://localhost:8080/api/expenses', form);
        }
        setForm({ title: '', amount: '', category: '', date: '' });
        setEditingId(null);
        fetchExpenses();
    };

    const handleEdit = expense => {
        setForm({
            title: expense.title,
            amount: expense.amount,
            category: expense.category,
            date: expense.date
        });
        setEditingId(expense.id);
    };

    const handleDelete = async id => {
        await axios.delete(`http://localhost:8080/api/expenses/${id}`);
        fetchExpenses();
    };

    return (
        <div className="container">
            <h1>Expense Tracker</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
                <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} required />
                <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
                <input type="date" name="date" value={form.date} onChange={handleChange} required />
                <button type="submit">{editingId ? 'Update' : 'Add'} Expense</button>
            </form>

            <ul>
                {expenses.map((e) => (
                    <li key={e.id}>
                        {e.date} – <strong>{e.title}</strong>: ${e.amount} ({e.category})
                        <button onClick={() => handleEdit(e)}>Edit</button>
                        <button onClick={() => handleDelete(e.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;