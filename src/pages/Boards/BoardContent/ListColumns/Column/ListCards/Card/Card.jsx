import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Card as MuiCard } from '@mui/material/';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IosShareIcon from '@mui/icons-material/IosShare';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function Card({ card }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: card._id, data: { ...card } });
    
        const dndKitCardStyles = {
            // touchAction : 'none',
            transform: CSS.Translate.toString(transform),
            transition,
            opacity: isDragging ? 0.5 : undefined,
            border: isDragging ? '1px solid green' : undefined,
        };
    
    const shouldShowCardAction = ()=>{
        return (
            card?.memberIds?.length ||
            !!card?.attachments?.length ||
            !!card?.comments?.length
        )
    }
    return (
        <MuiCard
            ref={setNodeRef}
            style={dndKitCardStyles}
            {...attributes}
            {...listeners}
            sx={{
                cursor: 'pointer',
                boxShadow: (theme) =>
                    theme.palette.mode === 'light'
                        ? 'inset 0 -1px 3px rgba(0,0,0,0.5)'
                        : '0 1px 3px rgba(0,0,0,0.5)',
                overflow: 'unset',
                display: card?.FE_PlaceholderCard ? 'none' : 'block',
                // border: '1px solid transparent',
                '&:hover': {borderColor: (theme)=>theme.palette.primary.main}
            }}
        >
            {card?.cover && (
                <CardMedia sx={{ height: 140 }} image={card?.cover} />
            )}

            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>{card?.title}</Typography>
            </CardContent>

            {shouldShowCardAction() && (
                <CardActions sx={{ p: '0 4px 8px 4px' }}>
                    {!!card?.memberIds?.length && (
                        <Button startIcon={<IosShareIcon />} size="small">
                            {card?.memberIds?.length}
                        </Button>
                    )}

                    {!!card?.attachments?.length && (
                        <Button startIcon={<AttachFileIcon />} size="small">
                            {card?.attachments?.length}
                        </Button>
                    )}
                    {!!card?.comments?.length && (
                        <Button startIcon={<ChatBubbleIcon />} size="small">
                            {card?.comments?.length}
                        </Button>
                    )}
                </CardActions>
            )}
        </MuiCard>
    );
}

export default Card;
