import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function DownloadButton({ content }) {
  const handleDownload = () => {
    const input = document.getElementById(content);
    const inputWidth = input.offsetWidth;
    const inputHeight = input.offsetHeight;

    html2canvas(input, {
      scale: 2,
      width: inputWidth,
      height: inputHeight,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4'); // 'p' for portrait orientation
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const ratio = Math.min(pdfWidth / inputWidth, pdfHeight / inputHeight);
      pdf.addImage(
        imgData,
        'JPEG',
        0,
        0,
        inputWidth * ratio,
        inputHeight * ratio
      );
      pdf.save('job_hunter_resume.pdf');
    });
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Download as PDF
    </button>
  );
}

export default DownloadButton;
