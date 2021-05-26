import React, { useState } from 'react';

const Description = ({ descriptionText } : { descriptionText: string }) => {
    const [ showMoreText, setShowMoreText ] = useState(false);
    const [ buttonText, setButtonText ] = useState('More >>');

    const onClickMoreButton = () => {
        setShowMoreText(!showMoreText)
        if (showMoreText) {
            setButtonText('More >>');
        } else {
            setButtonText('<< Less');
        }
    }

    return (
        <div className="description">
            { showMoreText ?
                (
                    <span>{ descriptionText }</span>
                ) : (
                    <span>{ descriptionText.slice(0, 100) }...</span>
                )
            }
            { descriptionText.length > 100 &&
                <button className="description-button" onClick={onClickMoreButton}>
                    {buttonText}
                </button>
            }
        </div>
    )
}

export default Description;