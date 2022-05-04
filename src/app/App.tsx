import { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { SelectChangeEvent } from "@mui/material";
import { createGame, initialiazeGame } from "../game/reducers";
import { RootState } from "../store/store";
import GameTable from "../game/GameTable";
import * as S from "./styles";

function App() {
  const dispatch = useDispatch();
  const [level, setLevel] = useState(1);
  const gameState = useSelector((state: RootState) => state.game);

  useEffect(() => {
    dispatch(initialiazeGame());
  }, [dispatch]);

  const onPlayGame = () => {
    dispatch(createGame(level));
  };

  const handleOnLevelChange = (event: SelectChangeEvent) => {
    const newLevel = Number(event?.target?.value);
    setLevel(newLevel);
  };

  const renderMessage = (message: string) => {
    return message !== "OK" ? message : "";
  };

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={S.lightTheme}>
        <S.Layout>
          <S.Item elevation={2}>
            <S.Header>
              <S.HeadText>Minesweeper Test Task</S.HeadText>
              <S.Message>{renderMessage(gameState.message)}</S.Message>
            </S.Header>
            <S.Content mapLength={gameState.map.length}>
              <GameTable gameMap={gameState.map} />
            </S.Content>
            <S.Footer>
              <S.LevelSelector fullWidth>
                <InputLabel id="level-select-label">Level</InputLabel>
                <Select
                  labelId="level-select-label"
                  id="level-select"
                  value={`${level}`}
                  label="Level"
                  onChange={handleOnLevelChange}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                </Select>
              </S.LevelSelector>
              <S.StartButton
                onClick={onPlayGame}
                variant="contained"
                color="success"
                aria-label="start-button"
                role="button"
              >
                {gameState.map.length ? "Play again" : "Start"}
              </S.StartButton>
            </S.Footer>
          </S.Item>
        </S.Layout>
      </ThemeProvider>
    </>
  );
}

export default App;
