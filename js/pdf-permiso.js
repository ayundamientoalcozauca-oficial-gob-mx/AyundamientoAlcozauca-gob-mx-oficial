// Generador de PDF para permisos - estilo oficial Alcozauca
function formatearFechaPDF(fecha) {
    if (!fecha) return '';
    const d = new Date(fecha);
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const año = d.getFullYear();
    return `${dia}-${mes}-${año}`;
}

function generarHTMLPermisoPDF(permiso) {
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
    
    return `
    <div id="permiso-pdf-content" style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 20px; background: #fff;">
        <!-- Header -->
        <div style="text-align: center; border-bottom: 3px solid #1e3a5f; padding-bottom: 15px; margin-bottom: 20px;">
            <p style="margin: 0; font-size: 11px; color: #333;">TRANSFORMANDO GUERRERO - GOBIERNO DEL ESTADO 2021-2027</p>
            <h2 style="margin: 10px 0; font-size: 18px; color: #1e3a5f;">AYUNTAMIENTO DE ALCOZAUCA 2024-2027</h2>
            <p style="margin: 0; font-size: 11px; color: #666;">El Bienestar es nuestra Prioridad</p>
            <p style="margin: 8px 0 0; font-size: 10px; color: #333;">SECRETARÍA DE SEGURIDAD PÚBLICA DEL ESTADO DE GUERRERO</p>
        </div>
        
        <!-- Título -->
        <div style="text-align: center; margin-bottom: 15px;">
            <h1 style="margin: 0; font-size: 20px; color: #1e3a5f;">PERMISO PROVISIONAL PARA CIRCULAR</h1>
            <p style="margin: 5px 0; font-size: 12px;">SIN PLACAS, SIN TARJETA DE CIRCULACIÓN, SIN ENGOMADO</p>
            <p style="margin: 10px 0; font-size: 16px; font-weight: bold; color: #b8860b;">VÁLIDO POR 30 DÍAS</p>
        </div>
        
        <!-- Texto legal -->
        <p style="font-size: 10px; text-align: justify; line-height: 1.4; margin-bottom: 20px;">
            Con fundamento en los artículos 28 de la Ley de Transporte y Vialidad del Estado de Guerrero, 
            y 26, 119 y 122 de su Reglamento, se expide el presente permiso provisional al vehículo que se describe, 
            para circular sin placas durante el periodo señalado. Se solicita brindar las facilidades necesarias 
            al conductor para circular todos los días y a cualquier hora durante el periodo indicado.
        </p>
        
        <!-- Datos del permiso -->
        <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 25px;">
            <tr><td style="padding: 4px 8px; width: 35%; font-weight: bold;">EXPEDICIÓN:</td><td style="padding: 4px 8px;">${expedicion}</td></tr>
            <tr><td style="padding: 4px 8px; font-weight: bold;">VENCIMIENTO:</td><td style="padding: 4px 8px;">${vencimiento}</td></tr>
            <tr><td style="padding: 4px 8px; font-weight: bold;">MARCA/LÍNEA:</td><td style="padding: 4px 8px;">${permiso.marca} / ${permiso.linea}</td></tr>
            <tr><td style="padding: 4px 8px; font-weight: bold;">NOMBRE:</td><td style="padding: 4px 8px;">${nombre}</td></tr>
            <tr><td style="padding: 4px 8px; font-weight: bold;">AÑO/MODELO:</td><td style="padding: 4px 8px;">${permiso.modelo}</td></tr>
            <tr><td style="padding: 4px 8px; font-weight: bold;">No. DE SERIE:</td><td style="padding: 4px 8px;">${permiso.numeroSerie}</td></tr>
            <tr><td style="padding: 4px 8px; font-weight: bold;">COLOR:</td><td style="padding: 4px 8px;">${permiso.color}</td></tr>
            <tr><td style="padding: 4px 8px; font-weight: bold;">No. DE MOTOR:</td><td style="padding: 4px 8px;">${permiso.numeroMotor}</td></tr>
        </table>
        
        <!-- Folio -->
        <div style="text-align: center; margin: 20px 0;">
            <p style="margin: 0; font-size: 10px;">FOLIO:</p>
            <p style="margin: 5px 0; font-size: 22px; font-weight: bold;">${permiso.folio}</p>
        </div>
        
        <!-- Firmas -->
        <div style="display: flex; justify-content: space-around; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ccc;">
            <div style="text-align: center;">
                <div style="border-bottom: 1px solid #000; width: 150px; height: 40px; margin: 0 auto 5px;"></div>
                <p style="margin: 0; font-size: 9px;">C. CRISPÍN AGUSTÍN MENDOZA</p>
                <p style="margin: 0; font-size: 8px;">PRESIDENTE MUNICIPAL DE ALCOZAUCA DE GUERRERO</p>
            </div>
            <div style="text-align: center;">
                <div style="border-bottom: 1px solid #000; width: 150px; height: 40px; margin: 0 auto 5px;"></div>
                <p style="margin: 0; font-size: 9px;">CMTE. GABRIEL ESPINO BARROS URBANO</p>
                <p style="margin: 0; font-size: 8px;">DIR. TRÁNSITO MUNICIPAL DE ALCOZAUCA DE GUERRERO</p>
            </div>
        </div>
        
        <!-- Footer -->
        <div style="margin-top: 25px; padding: 10px; background: #8b0000; color: white; font-size: 9px; text-align: center;">
            <p style="margin: 2px 0;">Tel: Oficina 747 130 1074, 757 476 9080 | Email: ayuntamientoalcozauca24@gmail.com</p>
            <p style="margin: 2px 0;">Miguel Espinobarros #1 Col. Centro, Alcozauca, Guerrero</p>
        </div>
    </div>
    `;
}

async function descargarPermisoPDF(permiso) {
    if (typeof html2pdf === 'undefined') {
        alert('Cargando generador de PDF... Intente de nuevo en un momento.');
        return;
    }
    
    const contenido = generarHTMLPermisoPDF(permiso);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = contenido;
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    document.body.appendChild(tempDiv);
    
    const element = tempDiv.querySelector('#permiso-pdf-content');
    
    const opt = {
        margin: 10,
        filename: `Permiso_${permiso.folio}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    try {
        await html2pdf().set(opt).from(element).save();
    } catch (err) {
        console.error('Error generando PDF:', err);
        alert('Error al generar el PDF. Intente de nuevo.');
    } finally {
        document.body.removeChild(tempDiv);
    }
}
