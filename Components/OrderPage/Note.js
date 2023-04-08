import { Button, Modal } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { headers } from '../../pages/api';

const Note = ({ note, id }) => {
  const [openNote, setOpenNote] = useState(false);
  const handleOpenNote = () => setOpenNote(true);
  const handleCloseNote = () => setOpenNote(false);


  const handleKeyDown = (id, event) => {
    if (event.key === "Enter") {
      let data = {
        note: event.target.value,
        type: "follow_up",
      };

      axios.post(process.env.API_URL + `/client/order/note/${id}/update`, data, {
        headers: headers,
      })
        .then(function (response) {
          toast.success("Note updated for Pending order!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          //   setUpdateData(response.data.msg);
        });
    }
  };
  return (
    <div className="NoteHover">
      <Button onClick={handleOpenNote}>
        View Note
      </Button>
      <Modal
        open={openNote}
        onClose={handleCloseNote}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <div className="NoteHoverBox">

            <h3>View and Update Your Note</h3>

            <div className="CustomeInput TextArea">
              <label>Note</label>
              <textarea
                defaultValue={note}
                onKeyDown={(e) =>
                  handleKeyDown(id, event)
                }
                rows="3"
              ></textarea>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Note;