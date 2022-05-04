import GameTable from "../GameTable";
import { render, screen } from "@testing-library/react";

describe("<GameTable />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders correctly and to match snapshot", () => {
    const gameMap: string[] = [];
    render(<GameTable gameMap={gameMap} />);
    expect(screen).toMatchSnapshot();
  });

  it("should render empty state correctly", () => {
    const gameMap: string[] = [];
    render(<GameTable gameMap={gameMap} />);
    expect(
      screen.getByText("Press START to initiate Minesweeper!")
    ).toBeTruthy();
  });
  it("should find at least 1 square cell", () => {
    const gameMap: string[] = [
      "□□□□□□□□□□",
      "□□□□□□□□□□",
      "□□□□□□□□□□",
      "□□□□□□□□□□",
      "□□□□□□□□□□",
      "□□□□□□□□□□",
      "□□□□□□□□□□",
      "□□□□□□□□□□",
      "□□□□□□□□□□",
      "□□□□□□□□□□",
    ];
    render(<GameTable gameMap={gameMap} />);
    expect(screen.getByRole("gridcell", { name: "square-1-1" })).toBeTruthy();
  });
});
