import Home from "./component";
import { HomePageProps } from "./types";
import { render, screen, within } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const defaultProps: HomePageProps = {
  userName: "choco-bot",
  setUserName: jest.fn(),
  allGists: [
    {
      id: "9d5cb795adee5bebba2e93348ff653e8",
      files: {
        "FilesSnapshot.xml": {
          filename: "FilesSnapshot.xml",
          type: "application/xml",
          language: "XML",
        },
        "Install.txt": {
          filename: "Install.txt",
          type: "text/plain",
          language: "Text",
        },
        "Uninstall.txt": {
          filename: "Uninstall.txt",
          type: "text/plain",
          language: "Text",
        },
        "_Summary.md": {
          filename: "_Summary.md",
          type: "text/markdown",
          language: "Markdown",
        },
      },
      created_at: "2025-07-03T16:22:58Z",
      updated_at: "2025-07-03T16:22:59Z",
      description: "unciv v4.17.2 - Passed - Package Tests Results",
      owner: {
        login: "choco-bot",
      },
    },
    {
      id: "13cdb1fc4651262516907dac42a9c980",
      files: {
        "1.RegistrySnapshot.xml": {
          filename: "1.RegistrySnapshot.xml",
          type: "application/xml",
          language: "XML",
        },
        "FilesSnapshot.xml": {
          filename: "FilesSnapshot.xml",
          type: "application/xml",
          language: "XML",
        },
        "Install.txt": {
          filename: "Install.txt",
          type: "text/plain",
          language: "Text",
        },
        "Uninstall.txt": {
          filename: "Uninstall.txt",
          type: "text/plain",
          language: "Text",
        },
        "UninstallImage.md": {
          filename: "UninstallImage.md",
          type: "text/markdown",
          language: "Markdown",
        },
        "_Summary.md": {
          filename: "_Summary.md",
          type: "text/markdown",
          language: "Markdown",
        },
      },
      created_at: "2025-07-03T16:22:48Z",
      updated_at: "2025-07-03T16:22:48Z",
      description: "python35 v3.5.4 - Passed - Package Tests Results",
      owner: {
        login: "choco-bot",
      },
    },
    {
      id: "8c231bc3781010008bd35e3d626949d6",
      files: {
        "Install.txt": {
          filename: "Install.txt",
          type: "text/plain",
          language: "Text",
        },
        "Uninstall.txt": {
          filename: "Uninstall.txt",
          type: "text/plain",
          language: "Text",
        },
        "_Summary.md": {
          filename: "_Summary.md",
          type: "text/markdown",
          language: "Markdown",
        },
      },
      created_at: "2025-07-03T16:12:55Z",
      updated_at: "2025-07-03T16:12:56Z",
      description: "tome-editor v1.0 - Passed - Package Tests Results",
      owner: {
        login: "choco-bot",
      },
    },
  ],
  handleSearch: jest.fn(),
  isLoading: false,
};

// Helper function to render with router
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

test("should display list of gists", () => {
  renderWithRouter(<Home {...defaultProps} />);

  defaultProps.allGists.forEach(
    ({ id, files, description, created_at, updated_at }) => {
      const gistItem = screen.getByTestId(id);

      expect(within(gistItem).getByText(description)).toBeInTheDocument();
      expect(
        within(gistItem).getByText(
          `Created at: ${new Date(created_at).toLocaleDateString()}`
        )
      ).toBeInTheDocument();
      expect(
        within(gistItem).getByText(
          `Last Updated: ${new Date(updated_at).toLocaleDateString()}`
        )
      ).toBeInTheDocument();
      expect(
        within(gistItem).getByText(`Files: ${Object.keys(files).length}`)
      ).toBeInTheDocument();
    }
  );
});

test("should redirect to Gist Details page when clicked", () => {
  renderWithRouter(<Home {...defaultProps} />);
  const links = screen.getAllByRole("link");

  defaultProps.allGists.forEach(({ id }, index) => {
    expect(links[index]).toHaveAttribute("href", `/${id}`);
  });
});

test("should display loading state", () => {
  const loadingProps = { ...defaultProps, isLoading: true, allGists: [] };
  renderWithRouter(<Home {...loadingProps} />);

  expect(screen.getByText("Loading results...")).toBeInTheDocument();
});

test("should not display results header when no gists", () => {
  const noGistsProps = { ...defaultProps, allGists: [] };
  renderWithRouter(<Home {...noGistsProps} />);

  expect(screen.queryByText(/Results for/)).not.toBeInTheDocument();
});
