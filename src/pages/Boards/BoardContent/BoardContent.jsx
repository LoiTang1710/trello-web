import Box from '@mui/material/Box';
import ListColumns from './ListColumns/ListColumns';
import { mapOrder } from '@/utils/sorts';
import {
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
    MouseSensor,
    TouchSensor,
    DragOverlay,
    defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import Column from './ListColumns/Column/Column';
import Card from './ListColumns/Column/ListCards/Card/Card';

const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
    CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD',
};

function BoardContent({ board }) {
    // const pointerSensor = useSensor(PointerSensor, {activationConstraint: {distance: 10}})
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: { distance: 10 },
    });
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: { delay: 250, tolerance: 500 },
    });
    const sensors = useSensors(mouseSensor, touchSensor);

    const [orderedColums, setOrderedColums] = useState([]);
    const [activeDragItemId, setActiveDragItemId] = useState(null);
    const [activeDragItemType, setActiveDragItemType] = useState(null);
    const [activeDragItemData, setActiveDragItemData] = useState(null);
    const customDropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: '0.5',
                },
            },
        }),
    };

    useEffect(() => {
        setOrderedColums(
            mapOrder(board?.columns, board?.columnOrderIds, '_id')
        );
    }, [board, setOrderedColums]);

    const handleDragStart = (event) => {
        setActiveDragItemId(event?.active?.id);
        setActiveDragItemType(
            event?.active?.data?.current?.columnId
                ? ACTIVE_DRAG_ITEM_TYPE.CARD
                : ACTIVE_DRAG_ITEM_TYPE.COLUMN
        );
        setActiveDragItemData(event?.active?.data?.current);
    };
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
        setActiveDragItemId(null);
        setActiveDragItemType(null);
        setActiveDragItemData(null);
    };
    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            sensors={sensors}
        >
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
                <DragOverlay dropAnimation={customDropAnimation}>
                    {!activeDragItemType && null}
                    {activeDragItemId &&
                        activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
                            <Column column={activeDragItemData} />
                        )}
                    {activeDragItemId &&
                        activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
                            <Card card={activeDragItemData} />
                        )}
                </DragOverlay>
            </Box>
        </DndContext>
    );
}

export default BoardContent;
