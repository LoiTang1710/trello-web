import Box from '@mui/material/Box';
import ListColumns from './ListColumns/ListColumns';
import { mapOrder } from '@/utils/sorts';
import {
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
    MouseSensor,
    TouchSensor
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';

function BoardContent({ board }) {
    // const pointerSensor = useSensor(PointerSensor, {activationConstraint: {distance: 10}})
    const mouseSensor = useSensor(MouseSensor, {activationConstraint: {distance: 10}})
    const touchSensor = useSensor(TouchSensor, {activationConstraint: {delay: 250, tolerance: 500}})
    const sensors = useSensors(mouseSensor, touchSensor)


    const [orderedColums, setOrderedColums] = useState([]);

    useEffect(() => {
        setOrderedColums(
            mapOrder(board?.columns, board?.columnOrderIds, '_id')
        );
    }, [board, setOrderedColums]);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;
        if (active.id !== over.id) {
            const oldIndex = orderedColums.findIndex(
                (c) => c._id === active.id
            );
            const newIndex = orderedColums.findIndex((c) => c._id === over.id);
            const dndOrderedColumns = arrayMove(
                orderedColums,
                oldIndex,
                newIndex
            );
            // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
            setOrderedColums(dndOrderedColumns);
        }
    };
    return (
        <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
            <Box
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light' ? '#fafafa' : '#3f3f46',
                    width: '100%',
                    height: (theme) => theme.trello.boardContentHeight,
                    p: '10px 0',
                }}
            >
                <ListColumns columns={orderedColums} />
            </Box>
        </DndContext>
    );
}

export default BoardContent;
