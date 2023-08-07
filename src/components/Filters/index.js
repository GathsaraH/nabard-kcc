import React from 'react'
import IconButton from '../Button/IconButtonComponent'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'

const CommonFilters = ({ addButtonLabel, onClick, icon, hideIconButton }) => {
    const { t } = useTranslation();

    return (
        <div>
            <div className="flex flex-wrap gap-1 mb-4">
                <div className="px-2">
                    <TextField
                        label={t("Search user")}
                        name="Search User"
                        required
                        variant="outlined"
                        size="small"
                        style={{ width: '100%', maxWidth: '200px' }} // Set maximum width for small screens
                    />
                </div>

                <div className="px-2">
                    <TextField
                        label={t("Date")}
                        name="Date"
                        required
                        variant="outlined"
                        size="small"
                        style={{ width: '100%', maxWidth: '300px' }} // Set maximum width for small screens
                    />
                </div>

                <div className="px-2">
                    <TextField
                        label={t("Start Date")}
                        name="Start Date"
                        required
                        variant="outlined"
                        size="small"
                        style={{ width: '100%', maxWidth: '300px' }} // Set maximum width for small screens
                    />
                </div>

                <div className="px-2">
                    <TextField
                        label={t("End Date")}
                        name="End Date"
                        required
                        variant="outlined"
                        size="small"
                        style={{ width: '100%', maxWidth: '300px' }} // Set maximum width for small screens
                    />
                </div>

                <div className="px-2">
                    <TextField
                        label={t("Select Header column")}
                        name="select header column"
                        required
                        variant="outlined"
                        size="small"
                        style={{ width: '100%', maxWidth: '300px' }} // Set maximum width for small screens
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
