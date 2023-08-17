import React from 'react'
import IconButton from '../Button/IconButtonComponent'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'

const CommonFilters = ({ addButtonLabel, onClick, icon, hideIconButton,addSecondButtonLabel, onClickSecond, iconSecond,hideSecondIconButton, value ,onChange}) => {
    const { t } = useTranslation();

    return (
        <div>
            <div className="flex flex-wrap gap-2 mb-2">
                <div >
                    <TextField
                        label={t("Search user")}
                        name={"search"}
                        value={value?.search || ''}
                        onChange={onChange}
                        variant="outlined"
                        size="small"
                        style={{ width: '100%', maxWidth: '120px' }}
                    />
                </div>

                <div >
                    <TextField
                        label={t("Date")}
                        name={"date"}
                        value={value?.date || ""}
                        onChange={onChange}
                        variant="outlined"
                        size="small"
                        style={{ width: '100%', maxWidth: '120px' }} // Set maximum width for small screens
                    />
                </div>

                <div >
                    <TextField
                        label={t("Start Date")}
                        name={"startDate"}
                        value={value?.startDate || ""}
                        onChange={onChange}
                        variant="outlined"
                        size="small"
                        style={{ width: '100%', maxWidth: '140px' }} // Set maximum width for small screens
                    />
                </div>

                <div >
                    <TextField
                        label={t("End Date")}
                        name={"endDate"}
                        value={value?.endDate || ""}
                        onChange={onChange}
                        variant="outlined"
                        size="small"
                        style={{ width: '100%', maxWidth: '140px' }} // Set maximum width for small screens
                    />
                </div>
                <div className="flex ml-auto" >
                    {!hideIconButton && (
                        <div className="px-2">
                            <IconButton
                                label={addButtonLabel}
                                className="btn-outline-primary w-[200px]"
                                icon={icon}
                                onClick={onClick}
                            />
                        </div>
                    )}
                    {!hideSecondIconButton && (
                        <div className="px-2">
                            <IconButton
                                label={addSecondButtonLabel}
                                className="btn-outline-primary w-[200px]"
                                icon={iconSecond}
                                onClick={onClickSecond}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CommonFilters;
