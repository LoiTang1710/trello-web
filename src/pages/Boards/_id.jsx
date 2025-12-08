import Container from '@mui/material/Container';
import AppBar from '@/components/AppBar/AppBar';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';
// import { mockData } from '@/apis/mock-datas';
import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import {
    fetchBoardDetailsAPI,
    createNewColumnAPI,
    createNewCardAPI,
} from '@/apis';
import { useParams } from 'react-router-dom';

import { generatePlaceholderCard } from '@/utils/formatters';
import { isEmpty } from 'lodash';

function Board() {
    //https://react.dev/reference/react/useState
    const [board, setBoard] = useState(null);

    //https://react.dev/reference/react/useEffect
    useEffect(() => {
        //lay id tu url bang react-router-dom
        const boardId = '6934dd66e4afc393aa5374de';

        //call api
        // du lieu API tra ve la 1 board
        fetchBoardDetailsAPI(boardId).then((board) => {
            // xu ly drag and drop vao mot column rong
            board.columns.forEach((c) => {
                if (isEmpty(c.cards)) {
                    c.cards = [generatePlaceholderCard(c)];
                    c.cardOrderIds = [generatePlaceholderCard(c)._id];
                }
            });
            setBoard(board);
        });
    }, []);
    const createNewColumn = async (newColumnData) => {
        const createdColumn = await createNewColumnAPI({
            ...newColumnData,
            boardId: board._id,
        });
        createdColumn.cards = [generatePlaceholderCard(createdColumn)];
        createdColumn.cardOrderIds = [
            generatePlaceholderCard(createdColumn)._id,
        ];
        // cap nhat state board
        const newBoard = { ...board };
        newBoard.columns.push(createdColumn);
        newBoard.columnOrderIds.push(createdColumn._id);
        setBoard(newBoard);
    };

    const createNewCard = async (newCardData) => {
        const createdCard = await createNewCardAPI({
            ...newCardData,
            boardId: board._id,
        });
        const newBoard = { ...board };
        const columnToUpdate = newBoard.columns.find(
            (c) => c._id === createdCard.columnId
        );
        if (columnToUpdate) {
            columnToUpdate.cards.push(createdCard);
            columnToUpdate.cardOrderIds.push(createdCard._id);
        }
        setBoard(newBoard);
    };

    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
            <AppBar />
            <BoardBar board={board} />
            <BoardContent
                board={board}
                createNewColumn={createNewColumn}
                createNewCard={createNewCard}
            />
        </Container>
    );
}

export default Board;
