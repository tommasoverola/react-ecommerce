// App.test.tsx
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./redux/store";

const renderWithProviders = () => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

describe("App Component", () => {

  test("renders Page not found for invalid route", () => {
    renderWithProviders();

    // Navigate to a non-existent route and check
    window.history.pushState({}, "Test page", "/non-existent-route");
    renderWithProviders();

    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });
});
