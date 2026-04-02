declare module 'html2pdf.js' {
  type Html2PdfOptions = {
    margin?: number | [number, number, number, number];
    filename?: string;
    image?: { type?: 'jpeg' | 'png'; quality?: number };
    html2canvas?: { scale?: number; useCORS?: boolean; backgroundColor?: string | null };
    jsPDF?: { unit?: string; format?: string | [number, number]; orientation?: 'portrait' | 'landscape' };
    pagebreak?: { mode?: Array<'css' | 'legacy' | 'avoid-all'> };
  };

  type Html2PdfInstance = {
    set: (options: Html2PdfOptions) => Html2PdfInstance;
    from: (source: HTMLElement) => Html2PdfInstance;
    save: () => Promise<void>;
  };

  type Html2PdfFactory = () => Html2PdfInstance;

  const html2pdf: Html2PdfFactory;
  export default html2pdf;
}
