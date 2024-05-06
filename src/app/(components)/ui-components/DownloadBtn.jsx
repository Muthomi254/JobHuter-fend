import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function DownloadButton({ content }) {
  const handleDownload = () => {
    const input = document.getElementById(content);
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
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
