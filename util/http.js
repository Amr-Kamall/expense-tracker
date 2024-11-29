import axios from "axios";

const BACKEND_URL =
  "https://react-native-course-7e0c5-default-rtdb.firebaseio.com";

export async function storeData(expenseData) {
  return await axios.post(`${BACKEND_URL}/expenses.json`, expenseData);
}

export async function fetchData() {
  const response = await axios.get(`${BACKEND_URL}/expenses.json`);
  console.log("Raw data from Firebase:", response.data); // Debug here
  const data = response.data;

  const expenses = []; // print data in console to know how to get this data
  for (const key in data) {
    const expenseObj = {
      amount: data[key].amount,
      date: new Date(data[key].date),
      description: data[key].description,
      id: key,
    };
    expenses.push(expenseObj);
    console.log("expenses ahy:", expenses);
  }
  return expenses;
}

export function editExpense(id, updatedExpense) {
  return axios.put(`${BACKEND_URL}/expenses/${id}.json`, updatedExpense);
}

export function deleteExpense(id) {
  return axios.delete(`${BACKEND_URL}/expenses/${id}.json`);
}
