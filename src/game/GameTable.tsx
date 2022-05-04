import { Result } from "antd";
import { AimOutlined } from "@ant-design/icons";
import WsClient from "../infrastructure/WsClient";
import * as S from "./styles";

interface Props {
  gameMap: string[];
}

const GameTable = ({ gameMap }: Props) => {
  if (!gameMap.length) {
    return (
      <Result
        icon={<AimOutlined />}
        title="Press START to initiate Minesweeper!"
      />
    );
  }

  return (
    <>
      {gameMap.map((item: any, rowIndex: number) => {
        const squares = item.split("");
        const row = squares.map((square: any, columnIndex: number) => {
          const key = `square-${rowIndex}-${columnIndex}`;
          if (square !== "□") {
            return (
              <S.Cell
                variant="outlined"
                square={square}
                onClick={() => WsClient.clickCell(columnIndex, rowIndex)}
                key={key}
                aria-label={key}
                role="gridcell"
              >
                <S.Text>{square}</S.Text>
              </S.Cell>
            );
          }
          return (
            <S.Cell
              variant="outlined"
              square={square}
              onClick={() => WsClient.clickCell(columnIndex, rowIndex)}
              key={key}
              aria-label={key}
              role="gridcell"
            />
          );
        });
        return <S.Row key={`square-row-${rowIndex}`}>{row}</S.Row>;
      })}
    </>
  );
};

export default GameTable;
