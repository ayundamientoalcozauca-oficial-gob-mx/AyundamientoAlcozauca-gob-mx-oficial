// Generador de PDF para permisos - estilo oficial Alcozauca (jsPDF directo)
function formatearFechaPDF(fecha) {
    if (!fecha) return '';
    const d = new Date(fecha);
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const año = d.getFullYear();
    return `${dia}-${mes}-${año}`;
}

function descargarPermisoPDF(permiso) {
    const jspdfLib = window.jspdf;
    if (!jspdfLib || !jspdfLib.jsPDF) {
        alert('Cargando generador de PDF... Intente de nuevo en un momento.');
        return;
    }
    
    const { jsPDF } = jspdfLib;
    const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
    
    let expedicion;
    if (permiso.fechaExpedicion) {
        expedicion = formatearFechaPDF(permiso.fechaExpedicion);
    } else {
        const v = new Date(permiso.fechaVigencia);
        v.setDate(v.getDate() - 30);
        expedicion = formatearFechaPDF(v.toISOString().split('T')[0]);
    }
    const vencimiento = formatearFechaPDF(permiso.fechaVigencia);
    const nombre = permiso.nombre || 'N/A';
    
    const margin = 15;
    let y = 20;
    
    doc.setDrawColor(30, 58, 95);
    doc.setLineWidth(0.8);
    doc.line(margin, y, 210 - margin, y);
    y += 8;
    
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    doc.text('TRANSFORMANDO GUERRERO - GOBIERNO DEL ESTADO 2021-2027', 105, y, { align: 'center' });
    y += 7;
    
    doc.setFontSize(14);
    doc.setTextColor(30, 58, 95);
    doc.setFont(undefined, 'bold');
    doc.text('AYUNTAMIENTO DE ALCOZAUCA 2024-2027', 105, y, { align: 'center' });
    y += 6;
    
    doc.setFont(undefined, 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text('El Bienestar es nuestra Prioridad', 105, y, { align: 'center' });
    y += 5;
    
    doc.setFontSize(8);
    doc.setTextColor(60, 60, 60);
    doc.text('SECRETARÍA DE SEGURIDAD PÚBLICA DEL ESTADO DE GUERRERO', 105, y, { align: 'center' });
    y += 12;
    
    doc.setDrawColor(30, 58, 95);
    doc.setLineWidth(0.5);
    doc.line(margin, y, 210 - margin, y);
    y += 15;
    
    doc.setFontSize(16);
    doc.setTextColor(30, 58, 95);
    doc.setFont(undefined, 'bold');
    doc.text('PERMISO PROVISIONAL PARA CIRCULAR', 105, y, { align: 'center' });
    y += 8;
    
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    doc.text('SIN PLACAS, SIN TARJETA DE CIRCULACIÓN, SIN ENGOMADO', 105, y, { align: 'center' });
    y += 10;
    
    doc.setFontSize(12);
    doc.setTextColor(184, 134, 11);
    doc.setFont(undefined, 'bold');
    doc.text('VÁLIDO POR 30 DÍAS', 105, y, { align: 'center' });
    y += 15;
    
    doc.setFont(undefined, 'normal');
    doc.setFontSize(8);
    doc.setTextColor(0, 0, 0);
    const textoLegal = 'Con fundamento en los artículos 28 de la Ley de Transporte y Vialidad del Estado de Guerrero, y 26, 119 y 122 de su Reglamento, se expide el presente permiso provisional al vehículo que se describe, para circular sin placas durante el periodo señalado. Se solicita brindar las facilidades necesarias al conductor para circular todos los días y a cualquier hora durante el periodo indicado.';
    const lineas = doc.splitTextToSize(textoLegal, 180);
    doc.text(lineas, margin, y);
    y += lineas.length * 4 + 8;
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    const datos = [
        ['EXPEDICIÓN:', expedicion],
        ['VENCIMIENTO:', vencimiento],
        ['MARCA/LÍNEA:', `${permiso.marca} / ${permiso.linea}`],
        ['NOMBRE:', nombre],
        ['AÑO/MODELO:', permiso.modelo],
        ['No. DE SERIE:', permiso.numeroSerie],
        ['COLOR:', permiso.color],
        ['No. DE MOTOR:', permiso.numeroMotor]
    ];
    
    datos.forEach(([label, value]) => {
        doc.setFont(undefined, 'bold');
        doc.text(label, margin, y);
        doc.setFont(undefined, 'normal');
        const val = String(value).length > 45 ? String(value).substring(0, 42) + '...' : value;
        doc.text(val, margin + 50, y);
        y += 7;
    });
    
    y += 10;
    
    doc.setFont(undefined, 'normal');
    doc.setFontSize(9);
    doc.text('FOLIO:', 105, y, { align: 'center' });
    y += 8;
    
    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.text(permiso.folio, 105, y, { align: 'center' });
    y += 25;
    
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.3);
    doc.line(margin + 20, y, margin + 70, y);
    doc.line(210 - margin - 70, y, 210 - margin - 20, y);
    y += 8;
    
    doc.setFont(undefined, 'normal');
    doc.setFontSize(7);
    doc.text('C. CRISPÍN AGUSTÍN MENDOZA', margin + 45, y, { align: 'center' });
    doc.text('CMTE. GABRIEL ESPINO BARROS URBANO', 210 - margin - 45, y, { align: 'center' });
    y += 4;
    
    doc.setFontSize(6);
    doc.text('PRESIDENTE MUNICIPAL', margin + 45, y, { align: 'center' });
    doc.text('DIR. TRÁNSITO MUNICIPAL', 210 - margin - 45, y, { align: 'center' });
    y += 15;
    
    doc.setFillColor(139, 0, 0);
    doc.rect(0, 277, 210, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7);
    doc.text('Tel: Oficina 747 130 1074, 757 476 9080 | Email: ayuntamientoalcozauca24@gmail.com', 105, 284, { align: 'center' });
    doc.text('Miguel Espinobarros #1 Col. Centro, Alcozauca, Guerrero', 105, 289, { align: 'center' });
    
    doc.save(`Permiso_${permiso.folio}.pdf`);
}
