import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

const members = [
  "Ramesh",
  "Srikanth",
  "Prathap",
  "Ganesh",
];

const paymentTypes = [
  "UPI",
  "Cash",
  "Card",
  "Bank Transfer",
  "Other",
];

const categories = [
  "Travel",
  "Hotel",
  "Food",
  "Temple",
  "Shopping",
  "Local Transport",
  "Tickets",
  "Donations",
  "Other",
];

const emptyForm = {
  description: "",
  amount: "",
  paidBy: "Ramesh",
  paymentType: "UPI",
  category: "Travel",
  date: new Date().toISOString().split("T")[0],
  notes: "",
};

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    member: "",
    paymentType: "",
    category: "",
    minAmount: "",
    maxAmount: "",
  });

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const response = await axios.get(
        `${API}/expenses`
      );

      setExpenses(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `${API}/expenses/${editingId}`,
          form
        );
      } else {
        await axios.post(`${API}/expenses`, form);
      }

      reset();
      loadExpenses();
    } catch (error) {
      console.error(error);
      alert("Unable to save expense");
    }
  };

  const reset = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const edit = (expense) => {
    setForm({
      description: expense.description,
      amount: expense.amount,
      paidBy: expense.paidBy,
      paymentType: expense.paymentType,
      category: expense.category,
      date: expense.date
        ? new Date(expense.date)
            .toISOString()
            .split("T")[0]
        : "",
      notes: expense.notes || "",
    });

    setEditingId(expense._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this expense?")) {
      return;
    }

    try {
      await axios.delete(`${API}/expenses/${id}`);
      loadExpenses();
    } catch (error) {
      console.error(error);
    }
  };

  const filtered = useMemo(() => {
    return expenses.filter((expense) => {
      const search =
        filters.search.toLowerCase();

      return (
        (!search ||
          expense.description
            .toLowerCase()
            .includes(search) ||
          expense.notes
            ?.toLowerCase()
            .includes(search)) &&
        (!filters.member ||
          expense.paidBy === filters.member) &&
        (!filters.paymentType ||
          expense.paymentType ===
            filters.paymentType) &&
        (!filters.category ||
          expense.category === filters.category) &&
        (!filters.minAmount ||
          Number(expense.amount) >=
            Number(filters.minAmount)) &&
        (!filters.maxAmount ||
          Number(expense.amount) <=
            Number(filters.maxAmount))
      );
    });
  }, [expenses, filters]);

  const total = filtered.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <p style={styles.small}>EXPENSE MANAGEMENT</p>

        <h1 style={styles.title}>Trip Expenses</h1>

        <div style={styles.total}>
          <span>Total</span>

          <strong>
            ₹{total.toLocaleString("en-IN")}
          </strong>
        </div>

        <form
          onSubmit={submit}
          style={styles.form}
        >
          <h2>
            {editingId
              ? "Edit Expense"
              : "Add Expense"}
          </h2>

          <div style={styles.grid}>
            <Input
              label="Description"
              name="description"
              value={form.description}
              onChange={change}
              required
            />

            <Input
              label="Amount"
              type="number"
              name="amount"
              value={form.amount}
              onChange={change}
              required
            />

            <Select
              label="Paid By"
              name="paidBy"
              value={form.paidBy}
              onChange={change}
              options={members}
            />

            <Select
              label="Payment Type"
              name="paymentType"
              value={form.paymentType}
              onChange={change}
              options={paymentTypes}
            />

            <Select
              label="Category"
              name="category"
              value={form.category}
              onChange={change}
              options={categories}
            />

            <Input
              label="Date"
              type="date"
              name="date"
              value={form.date}
              onChange={change}
            />
          </div>

          <label style={styles.label}>Notes</label>

          <textarea
            name="notes"
            value={form.notes}
            onChange={change}
            rows="3"
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            {editingId
              ? "Update Expense"
              : "Add Expense"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={reset}
              style={styles.cancel}
            >
              Cancel
            </button>
          )}
        </form>

        <div style={styles.filter}>
          <h3>Filters</h3>

          <div style={styles.grid}>
            <Input
              label="Search"
              name="search"
              value={filters.search}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  search: e.target.value,
                })
              }
            />

            <Select
              label="Member"
              name="member"
              value={filters.member}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  member: e.target.value,
                })
              }
              options={["", ...members]}
            />

            <Select
              label="Payment Type"
              name="paymentType"
              value={filters.paymentType}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  paymentType: e.target.value,
                })
              }
              options={["", ...paymentTypes]}
            />

            <Select
              label="Category"
              name="category"
              value={filters.category}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  category: e.target.value,
                })
              }
              options={["", ...categories]}
            />

            <Input
              label="Min Amount"
              type="number"
              name="minAmount"
              value={filters.minAmount}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  minAmount: e.target.value,
                })
              }
            />

            <Input
              label="Max Amount"
              type="number"
              name="maxAmount"
              value={filters.maxAmount}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  maxAmount: e.target.value,
                })
              }
            />
          </div>

          <button
            style={styles.clear}
            onClick={() =>
              setFilters({
                search: "",
                member: "",
                paymentType: "",
                category: "",
                minAmount: "",
                maxAmount: "",
              })
            }
          >
            Clear Filters
          </button>
        </div>

        <div style={styles.list}>
          {filtered.length === 0 ? (
            <div style={styles.empty}>
              No expenses found.
            </div>
          ) : (
            filtered.map((expense) => (
              <div
                key={expense._id}
                style={styles.card}
              >
                <div>
                  <h3>{expense.description}</h3>

                  <p style={styles.meta}>
                    {expense.paidBy} •{" "}
                    {expense.paymentType} •{" "}
                    {expense.category}
                  </p>

                  <p>
                    {expense.date
                      ? new Date(
                          expense.date
                        ).toLocaleDateString("en-IN")
                      : ""}
                  </p>
                </div>

                <div style={styles.right}>
                  <strong style={styles.amount}>
                    ₹
                    {Number(
                      expense.amount
                    ).toLocaleString("en-IN")}
                  </strong>

                  <button
                    onClick={() => edit(expense)}
                    style={styles.smallButton}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      remove(expense._id)
                    }
                    style={styles.smallButton}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  required = false,
}) {
  return (
    <div>
      <label style={styles.label}>{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        style={styles.input}
      />
    </div>
  );
}

function Select({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label style={styles.label}>{label}</label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        style={styles.input}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option || "All"}
          </option>
        ))}
      </select>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f7f7f7",
    padding: "60px 20px",
  },

  container: {
    maxWidth: "1200px",
    margin: "auto",
  },

  small: {
    fontSize: "12px",
    letterSpacing: "3px",
    fontWeight: "700",
  },

  title: {
    fontSize: "clamp(40px,6vw,70px)",
    margin: "10px 0 30px",
  },

  total: {
    background: "#000",
    color: "#fff",
    padding: "25px",
    borderRadius: "18px",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "25px",
  },

  form: {
    background: "#fff",
    padding: "30px",
    borderRadius: "20px",
    marginBottom: "25px",
  },

  filter: {
    background: "#fff",
    padding: "30px",
    borderRadius: "20px",
    marginBottom: "30px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(200px,1fr))",
    gap: "18px",
  },

  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: "700",
    marginBottom: "7px",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    marginBottom: "15px",
  },

  button: {
    background: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "30px",
    padding: "13px 24px",
    cursor: "pointer",
    fontWeight: "700",
  },

  cancel: {
    marginLeft: "10px",
    padding: "13px 20px",
    borderRadius: "30px",
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
  },

  clear: {
    padding: "10px 18px",
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: "20px",
    cursor: "pointer",
  },

  list: {
    display: "grid",
    gap: "15px",
  },

  card: {
    background: "#fff",
    padding: "22px",
    borderRadius: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
  },

  meta: {
    color: "#777",
    fontSize: "13px",
  },

  right: {
    textAlign: "right",
  },

  amount: {
    display: "block",
    fontSize: "22px",
    marginBottom: "12px",
  },

  smallButton: {
    padding: "7px 12px",
    marginLeft: "5px",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "15px",
    cursor: "pointer",
  },

  empty: {
    background: "#fff",
    padding: "50px",
    textAlign: "center",
    borderRadius: "15px",
  },
};

export default Expenses;