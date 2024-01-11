import Lottie from "lottie-react";
import React, { useState, useEffect } from 'react';

const TransactionSuccess = ({success, onClose }) => {
    return (
        <div>
            <Lottie 
                options={defaultOptions}
                height={400}
                width={400}
            />
        </div>
    )
}

export default TransactionSuccess