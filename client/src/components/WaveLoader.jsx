import React from 'react'

const Wave = ({size="large"}) => {

    const sizeObj = {
        'small': {
            size: "h-2 w-2",
            bg_size: "h-6"
        },
        "large": {
            size: "h-4 w-4",
            bg_size: "h-10"
        },

    }

    const classes = sizeObj[size].size + ' rounded-full bg-primary animate-wave-stretch'

    return (
        <div className={`flex ${sizeObj[size].bg_size} w-full gap-2 justify-center items-center`}>
            <div className={classes} />
            <div className={classes} style={{'animationDelay': '0.2s' }} />
            <div className={classes} style={{'animationDelay': '0.4s' }} />
            <div className={classes} style={{'animationDelay': '0.6s' }} />
            <div className={classes} style={{'animationDelay': '0.8s' }} />
        </div>
    )
}

export default Wave
