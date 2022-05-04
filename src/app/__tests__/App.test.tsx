import { Provider } from "react-redux";
import App from "../App";
import { screen, render } from "@testing-library/react";
import configureStore from "redux-mock-store";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureStore([sagaMiddleware]);

const renderComp = (map = [] as string[], message = "") => {
  const initialState = {
    game: {
      map,
      message,
    },
  };
  const store = mockStore(initialState);
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

describe("<App />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders correctly and to match snapshot", () => {
    renderComp();
    expect(screen).toMatchSnapshot();
  });
  it("Start button appears in first render", () => {
    renderComp();
    expect(
      screen.getByText("Press START to initiate Minesweeper!")
    ).toBeTruthy();
    expect(screen.getByText("Start")).toBeTruthy();
  });
  it("Play agaom button appears with the initial map", async () => {
    renderComp([
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
    ]);
    expect(screen.getByText("Play again")).toBeTruthy();
  });
});
