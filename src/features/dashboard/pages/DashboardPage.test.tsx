// src/features/dashbord/pages/DashboardPage.test.tsx
// https://vitest.fr/react/
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./DashboardPage";

// Fonction helper pour le rendu
function renderWithDashboardContext(initialEntries = ["/dashboard"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route
          path="/dashboard/*"
          element={<DashboardPage />}
        />
      </Routes>
    </MemoryRouter>
  );
}

describe("DashboardPage", () => {
  beforeEach(() => {
    renderWithDashboardContext(); // Simule l'arrivée sur '/dashboard'
  });
  // toutes nos fonctions test()
  test("should render 'Laboratoire' title", () => {
    const title = screen.getByText("Laboratoire");
    expect(title).toBeInTheDocument();
  });

  test("should render navigation links, check their destinations, and ensure they are not active", () => {
    // Test pour "Le Jsx"
    const jsxLink = screen.getByRole("link", { name: /le jsx/i });
    expect(jsxLink).toBeInTheDocument(); // Vérifie la présence
    expect(jsxLink).toHaveAttribute("href", "/dashboard/jsxlab"); // Vérifie la destination
    expect(jsxLink).not.toHaveClass("active"); // Vérifie qu'il n'est PAS actif

    // Test pour "Nouveautés ES6+"
    const es6Link = screen.getByRole("link", { name: /nouveautés es6\+/i });
    expect(es6Link).toBeInTheDocument();
    expect(es6Link).toHaveAttribute("href", "/dashboard/es6lab");
    expect(es6Link).not.toHaveClass("active");

    // Test pour "Les hooks"
    const hooksLink = screen.getByRole("link", { name: /les hooks/i });
    expect(hooksLink).toBeInTheDocument();
    expect(hooksLink).toHaveAttribute("href", "/dashboard/hookslab");
    expect(hooksLink).not.toHaveClass("active");
  });
});
