import Container from '@mui/material/Container';
import AppBar from '@/components/AppBar/AppBar';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';
// import { mockData } from '@/apis/mock-datas';
import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import { fetchBoardDetailsAPI } from '@/apis';
import { useParams } from 'react-router-dom';
import { mockData } from '@/apis/mock-datas';

function Board() {
    //https://react.dev/reference/react/useState
    const [board, setBoard] = useState(null);

    //https://react.dev/reference/react/useEffect
    useEffect(() => {
        //lay id tu url bang react-router-dom
        const boardId = '692b979c341124939784ba36';

        //call api
        // du lieu API tra ve la 1 board
        fetchBoardDetailsAPI(boardId).then((board) => {
            setBoard(board);
        });
    }, []);

    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
            <AppBar />
            <BoardBar board={mockData?.board} />
            <BoardContent board={mockData?.board} />
        </Container>
    );
}

export default Board;
