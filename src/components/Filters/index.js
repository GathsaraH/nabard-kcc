import React from 'react'
import IconButton from '../Button/IconButtonComponent'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'


const CommonFilters = ({addButtonLabel , onClick , icon , hideIconButton }) => {
    const {t} = useTranslation();
  return (
    <div>
          <div className="flex flex-wrap  gap-1 mb-4">
        <div className="px-2">
          <TextField
            id="outlined-basic"
            label={t("Search user")}
            name="Search User"
            required
            variant="outlined"
            size="small"
          />
        </div>

        <div className="px-2">
          <TextField
            id="outlined-basic"
            label={t("Date")}
            name="Date"
            required
            variant="outlined"
            size="small"
          />
        </div>

        <div className="px-2">
          <TextField
            id="outlined-basic"
            label={t("Start Date")}
            name="Start Date"
            required
            variant="outlined"
            size="small"
          />

        </div>

        <div className="px-2">
          <TextField
            id="outlined-basic"
            label={t("End Date")}
            name="End Date"
            required
            variant="outlined"
            size="small"
          />
        </div>

        <div className="px-2">
          <TextField
            id="outlined-basic"
            label={t("Select Header column")}
            name="select header column"
            required
            variant="outlined"
            size="small"
          />
        </div>
        <div className="px-2">
        {!hideIconButton && (
          <div className="px-2">
            <IconButton
              label={addButtonLabel}
              className="btn-outline-primary"
              icon={icon}
              onClick={onClick}
            />
          </div>
        )}
        </div>
      </div>
    </div>
  )
}

export default CommonFilters;