import React from 'react'
import IconButton from '../Button/IconButtonComponent'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'

const CommonFilters = ({ addButtonLabel, onClick, icon, hideIconButton, addSecondButtonLabel, onClickSecond, iconSecond, hideSecondIconButton, value, onChange }) => {
    const { t } = useTranslation();

    return (
        <div>
            <div className="flex flex-wrap gap-2 mb-2">
                <div className="flex ml-auto" >
                    {!hideIconButton && (
                        <div className="px-2">
                            <IconButton
                                label={addButtonLabel}
                                className="btn-outline-primary w-[140px]"
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
