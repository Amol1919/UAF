import React, { useRef, useState } from 'react';
import './SignaturePad.css';

function SignaturePad({ onSave }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signature, setSignature] = useState(null);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    ctx.beginPath();
    ctx.moveTo(
      e.clientX - rect.left,
      e.clientY - rect.top
    );
    
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    ctx.lineTo(
      e.clientX - rect.left,
      e.clientY - rect.top
    );
    
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    ctx.closePath();
    setIsDrawing(false);
    setSignature(canvas.toDataURL());
  };

  const handleSave = () => {
    if (signature) {
      onSave(signature);
      alert('Signature saved successfully!');
    } else {
      alert('Please provide a signature first');
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignature(null);
  };

  return (
    <div className="signature-pad">
      <canvas
        ref={canvasRef}
        width={400}
        height={150}
        className="signature-canvas"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
      
      <div className="signature-actions">
        <button type="button" onClick={clearSignature} className="clear-btn">
          Clear
        </button>
        <button type="button" onClick={handleSave} className="save-btn">
          Save Signature
        </button>
      </div>
    </div>
  );
}

export default SignaturePad;