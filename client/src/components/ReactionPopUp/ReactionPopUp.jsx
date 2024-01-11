import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="top" ref={ref} {...props} />;
});

const ReactionPopUp = ({ reactPopup, setReactPopup, handleCloseReactPopup }) => {
    return (
        <>
            <Dialog
                open={reactPopup}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <h3>this is the reaction popup</h3>
                        <Button variant="contained" onClick={handleCloseReactPopup}>Close</Button>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ReactionPopUp