import create from "zustand";
import axios from "axios";
import { User } from "../types/User";

interface UserState {
  users: User[];
  searchTerm: string;
  sortField: keyof User | null;
  sortOrder: "ascend" | "descend" | null;
  filteredUsers: User[];
  fetchUsers: () => void;
  addUser: (user: User) => void;
  updateUser: (id: string, updatedUser: Partial<User>) => void;
  deleteUser: (id: string) => void;
  setSearchTerm: (term: string) => void;
  setSortField: (field: keyof User) => void;
  setSortOrder: (order: "ascend" | "descend") => void;
  getFilteredUsers: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  searchTerm: "",
  sortField: null,
  sortOrder: null,
  filteredUsers: [],
  fetchUsers: async () => {
    const response = await axios.get("http://localhost:3000/users");
    set({ users: response.data, filteredUsers: response.data });
  },
  addUser: async (user: User) => {
    await axios.post("http://localhost:3000/users", user);
    get().fetchUsers();
  },
  updateUser: async (id: string, updatedUser: Partial<User>) => {
    await axios.put(`http://localhost:3000/users/${id}`, updatedUser);
    get().fetchUsers();
  },
  deleteUser: async (id: string) => {
    await axios.delete(`http://localhost:3000/users/${id}`);
    get().fetchUsers();
  },
  setSearchTerm: (term: string) => set({ searchTerm: term }),
  setSortField: (field: keyof User) => set({ sortField: field }),
  setSortOrder: (order: "ascend" | "descend") => set({ sortOrder: order }),
  getFilteredUsers: () => {
    const { users, searchTerm, sortField, sortOrder } = get();

    let filteredUsers = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortField) {
      filteredUsers.sort((a, b) => {
        if (sortOrder === "ascend") {
          return a[sortField] > b[sortField] ? 1 : -1;
        } else if (sortOrder === "descend") {
          return a[sortField] < b[sortField] ? 1 : -1;
        }
        return 0;
      });
    }

    set({ filteredUsers });
  },
}));
