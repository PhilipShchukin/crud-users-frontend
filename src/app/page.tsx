"use client";
import { Provider } from "react-redux";
import store from "@/store/store";
import { Dashboard } from "@/components/user/dashboard";

export default function Home() {
  return (
    <Provider store={store}>
      <main className="">
        <div>
          <Dashboard />
        </div>
      </main>
    </Provider>
  );
}
