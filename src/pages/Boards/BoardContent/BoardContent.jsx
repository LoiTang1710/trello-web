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
    closestCorners,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';

import Column from './ListColumns/Column/Column';
import Card from './ListColumns/Column/ListCards/Card/Card';
import ErrorBoundary from '@/components/ErrorBoundary';

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
    const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
        useState(null);
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
    const findColumnById = (cardId) => {
        // tim column theo cardId
        // logic: một mảng chứa card._id của listcards và kiểm tra xem trong mảng có cardID (id cần tìm)
        return orderedColums.find((column) =>
            column?.cards?.map((card) => card._id)?.includes(cardId)
        );
    };

    const handleDragStart = (event) => {
        setActiveDragItemId(event?.active?.id);
        setActiveDragItemType(
            event?.active?.data?.current?.columnId
                ? ACTIVE_DRAG_ITEM_TYPE.CARD
                : ACTIVE_DRAG_ITEM_TYPE.COLUMN
        );

        //keo card thi set State goc
        if (event?.active?.data?.current?.columnId) {
            setOldColumnWhenDraggingCard(findColumnById(event?.active?.id));
        }
        setActiveDragItemData(event?.active?.data?.current);
    };
    const handleDragOver = (event) => {
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;
        const { active, over } = event;
        if (!active || !over) return;

        const {
            id: activeDraggingCardId,
            data: { current: activeDraggingCardData },
        } = active;
        const { id: overCardId } = over;
        //tim 2 colums theo cardId
        const activeColumn = findColumnById(activeDraggingCardId);
        const overColumn = findColumnById(overCardId);

        if (!activeColumn || !overColumn) return;

        if (activeColumn._id || overColumn._id) {
            setOrderedColums((prevColumn) => {
                const overCardIndex = overColumn?.cards?.findIndex(
                    (card) => card._id === overCardId
                );

                let newCardIndex;
                const isBelowOverItem =
                    active.rect.current.translated &&
                    active.rect.current.translated.top >
                        over.rect.top + over.rect.height;

                const modifier = isBelowOverItem ? 1 : 0;

                newCardIndex =
                    overCardIndex >= 0
                        ? overCardIndex + modifier
                        : overColumn?.cards?.length + 1;

                const nextColumns = cloneDeep(prevColumn);
                const nextActiveColumn = nextColumns.find(
                    (column) => column._id === activeColumn._id
                );
                const nextOverColumn = nextColumns.find(
                    (column) => column._id === overColumn._id
                );

                // thao tac column cu
                if (nextActiveColumn) {
                    nextActiveColumn.cards = nextActiveColumn.cards.filter(
                        (card) => card._id !== activeDraggingCardId
                    );
                    nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
                        (card) => card._id
                    );
                }

                // thao tac column moi
                if (nextOverColumn) {
                    nextOverColumn.cards = nextOverColumn.cards.filter(
                        (card) => card._id !== activeDraggingCardId
                    );
                    nextOverColumn.cards = nextOverColumn.cards.toSpliced(
                        newCardIndex,
                        0,
                        activeDraggingCardData
                    );
                    nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
                        (card) => card._id
                    );
                }

                return nextColumns;
            });
        }
    };
    const handleDragEnd = (event) => {
        const { active, over } = event;

        //todo: CARD
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
            const {
                id: activeDraggingCardId,
                data: { current: activeDraggingCardData },
            } = active;
            const { id: overCardId } = over;
            //tim 2 colums theo cardId
            const activeColumn = findColumnById(activeDraggingCardId);
            const overColumn = findColumnById(overCardId);

            if (!activeColumn || !overColumn) return;
            if (oldColumnWhenDraggingCard._id !== overColumn._id) {
                // drag 2 column khac nhau
            } else {
                // drag trong cung 1 column
                const oldCardIndex =
                    oldColumnWhenDraggingCard?.cards?.findIndex(
                        (c) => c._id === activeDragItemId
                    );
                const newCardIndex = overColumn?.cards?.findIndex(
                    (c) => c._id === overCardId
                );
                const dndOrderedCards = arrayMove(
                    oldColumnWhenDraggingCard?.cards,
                    oldCardIndex,
                    newCardIndex
                );

                setOrderedColums((prevColumn) => {
                    const nextColumns = cloneDeep(prevColumn);

                    const targetColumn = nextColumns.find(
                        (c) => c._id === overColumn._id
                    );
                    // cap nhat 2 gia tri moi trong target column
                    targetColumn.cards = dndOrderedCards
                    targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id);
                    
                    return nextColumns;
                });
            }
        }

        //todo: COLUMN
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            if (!active || !over) return;
            if (active.id !== over.id) {
                const oldColumnndex = orderedColums.findIndex(
                    (c) => c._id === active.id
                );
                const newColumnIndex = orderedColums.findIndex(
                    (c) => c._id === over.id
                );
                const dndOrderedColumns = arrayMove(
                    orderedColums,
                    oldColumnndex,
                    newColumnIndex
                );
                // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
                setOrderedColums(dndOrderedColumns);
            }
        }

        //State phai ve default valid
        setActiveDragItemId(null);
        setActiveDragItemType(null);
        setActiveDragItemData(null);
        setOldColumnWhenDraggingCard(null);
    };
    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            collisionDetection={closestCorners}
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
                <ErrorBoundary fallback="Error">
                    <DragOverlay dropAnimation={customDropAnimation}>
                        {!activeDragItemType && null}

                        {activeDragItemId &&
                            activeDragItemType ===
                                ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
                                <Column column={activeDragItemData} />
                            )}
                        {activeDragItemId &&
                            activeDragItemType ===
                                ACTIVE_DRAG_ITEM_TYPE.CARD && (
                                <Card card={activeDragItemData} />
                            )}
                    </DragOverlay>
                </ErrorBoundary>
            </Box>
        </DndContext>
    );
}

export default BoardContent;
