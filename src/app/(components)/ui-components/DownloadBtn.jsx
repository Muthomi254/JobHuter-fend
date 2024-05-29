import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function DownloadButton({ content }) {
  const handleDownload = async () => {
    const input = document.getElementById(content);

    // Get dimensions of the input element
    const inputWidth = input.offsetWidth;
    const inputHeight = input.offsetHeight;

    // Calculate aspect ratio of the input element
    const aspectRatio = inputWidth / inputHeight;

    // Define the size of the A4 paper
    const a4Width = 210; // in mm
    const a4Height = 297; // in mm

    // Calculate the scale factor for best fit within A4 size
    const widthScale = a4Width / inputWidth;
    const heightScale = a4Height / inputHeight;

    // Determine the scaling factor to maintain aspect ratio and fit within A4 size
    let scale = Math.min(widthScale, heightScale);

    // Create a new PDF document
    const pdf = new jsPDF('p', 'mm', 'a4'); // 'p' for portrait orientation

    // Capture the content as an image using html2canvas
    const canvas = await html2canvas(input, {
      scrollY: -window.scrollY,
      width: inputWidth,
      height: inputHeight,
      scale: 2, // scale factor for better quality
    });

    // Add the captured image to the PDF with appropriate scaling
    pdf.addImage(canvas, 'JPEG', 0, 0, inputWidth * scale, inputHeight * scale);

    // Save the PDF
    pdf.save('job_hunter_resume.pdf');
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
