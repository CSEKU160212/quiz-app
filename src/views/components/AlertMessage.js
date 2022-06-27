import React from 'react'
import { Alert } from 'react-bootstrap';

const AlertMessage = ({variant, message}) => {
  return (
    <>
      {message && (
        <div style={{width: "fit-content"}} className="mx-auto">
          <Alert key={variant} variant={variant} className="text-center mb-2">
            {message}
          </Alert>
        </div>
      )}
    </>
  );
}

export default AlertMessage