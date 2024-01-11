import React, { useState } from 'react'
import "./CheckOutPopUp.css"

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';




const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CheckOutPopUp = ({ setFacultyCheckout, getDist, checkOutYesBtn }) => {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        setFacultyCheckout(false)
    };

    return (
        <>
            <div>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <span className='checkout_text'>
                                <span>You are now <span className={getDist <= 200 ? "greenClass" : "warningclass"}>{getDist}</span> meters away from office</span>
                                {/* <span><span className={getDist <= 200 ? "greenClass" : "warningclass"}>{getDist}</span> meters away from office</span> */}
                                <span>Are you sure want to check out?</span>
                            </span>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: 'space-between' }}>
                        <Button onClick={() => { handleClose() }} variant="outlined" size="small" sx={{ ml: 2 }}>NO</Button>
                        <Button onClick={() => { handleClose(); checkOutYesBtn() }} variant="contained" size="small" sx={{ mr: 2 }}>YES</Button>
                    </DialogActions>
                </Dialog>
            </div>

        </>
    )
}

export default CheckOutPopUp