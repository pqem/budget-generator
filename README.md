# Generador de Presupuestos - Erica Avalos

Aplicación web para generar presupuestos en PDF. Diseñada específicamente para Erica Avalos (Gasista Matriculada & MMO) en Plottier, Neuquén.

## Características

✨ **Funcionalidades principales:**
- ✅ Generación de presupuestos personalizados
- ✅ Descarga en formato PDF
- ✅ Vista previa antes de descargar
- ✅ Almacenamiento local de datos (localStorage)
- ✅ Numeración automática de presupuestos
- ✅ Cálculo automático de subtotales e IVA
- ✅ Modo oscuro/claro
- ✅ Diseño responsivo
- ✅ Interfaz intuitiva en español

## Tecnología

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **PDF:** html2pdf.js
- **Hosting:** Vercel
- **Paleta de Colores:** Tierra y Herencia (2026)

## Estructura del Proyecto

```
budget-generator/
├── index.html      # Página principal
├── style.css       # Estilos (Paleta 2026)
├── main.js         # Lógica de aplicación
├── README.md       # Esta documentación
└── .gitignore      # Archivos a ignorar en git
```

## Uso

1. **Ingresar datos del cliente:**
   - Nombre, email, teléfono, dirección

2. **Datos del presupuesto:**
   - Número (automático)
   - Fecha
   - Validez (días)

3. **Agregar servicios/productos:**
   - Descripción
   - Cantidad
   - Precio unitario
   - El total se calcula automáticamente

4. **Términos de pago:**
   - Notas adicionales
   - Condiciones específicas

5. **Descargar:**
   - Vista previa para verificar
   - Descargar como PDF
   - El número de presupuesto se incrementa automáticamente

## Funcionalidades Técnicas

### localStorage
- Guardado automático de todos los datos
- Persistencia entre sesiones
- Contador de número de presupuestos

### Dark Mode
- Respeta preferencia del sistema
- Alternancia manual con botón
- Guardado en localStorage

### Cálculos Automáticos
- Subtotal de items
- IVA (21%)
- Total general
- Fecha de validez

## Paleta de Colores

Utiliza la **Paleta 2026: Tierra y Herencia** de Erica Avalos:

- **Primario (Arcilla):** #B66E41
- **Secundario (Raíz Olivo):** #A79874
- **Acento (Ocre):** #C59A6B
- **Highlight (Óxido):** #9B372E
- **Dark Mode Base:** #1A1714

## Datos Incluidos en PDF

El PDF generado incluye:

- Número de presupuesto
- Fecha de emisión
- Datos del cliente (nombre, email, teléfono, dirección)
- Tabla de servicios/productos
- Subtotal, IVA y total
- Términos de pago
- Notas adicionales
- Datos de contacto de Erica Avalos
- Matrículas (TECA00241, 80229969)

## Desarrollo

### Requisitos
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Sin dependencias externas (excepto html2pdf.js desde CDN)

### Instalación Local

```bash
# Clonar repositorio
git clone https://github.com/pqem/budget-generator.git
cd budget-generator

# Servir localmente (Python)
python -m http.server 8000

# O usar cualquier otro servidor web local
# El archivo index.html abre directamente en el navegador
```

### Deployment en Vercel

```bash
# Vercel detecta automáticamente y despliega
# Solo requiere git push
git push origin main
```

## Contacto

**Erica Avalos**
- Email: eriavalos85@gmail.com
- Teléfono: +54-299-594-3751
- Ubicación: Plottier, Neuquén, Argentina

**Matrículas:**
- Gasista: TECA00241
- Maestro Mayor de Obras: 80229969

---

© 2025 Erica Avalos. Todos los derechos reservados.
