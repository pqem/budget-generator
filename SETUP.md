# 🚀 Setup del Generador de Presupuestos

## Estado Actual

✅ **Proyecto inicializado en GitHub:** https://github.com/pqem/budget-generator

## Próximos Pasos

### 1. Conectar a Vercel (2 minutos)

**Opción A: Automático**
```bash
npm i -g vercel
vercel --prod
```

**Opción B: Manual (Recomendado)**
1. Ve a https://vercel.com
2. Conecta tu cuenta de GitHub
3. Haz clic en "New Project"
4. Selecciona "budget-generator"
5. Vercel auto-detectará la configuración
6. Haz clic en "Deploy"

### 2. URL Esperada

Una vez deployado en Vercel:
- `https://budget-generator.vercel.app`
- O tu dominio personalizado

## Estructura del Proyecto

```
budget-generator/
├── index.html          # Aplicación principal
├── style.css           # Estilos (Paleta 2026)
├── main.js             # Lógica de negocio
├── vercel.json         # Configuración Vercel
├── README.md           # Documentación
├── SETUP.md            # Este archivo
└── .gitignore          # Archivos ignorados
```

## Características Implementadas

### UI/UX
- ✅ Formulario intuitivo en español
- ✅ Tema oscuro/claro
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Paleta 2026: Tierra y Herencia
- ✅ Vista previa antes de descargar

### Funcionalidad
- ✅ Agregar/eliminar items ilimitados
- ✅ Cálculos automáticos (subtotal, IVA 21%, total)
- ✅ Numeración automática de presupuestos
- ✅ Almacenamiento local (localStorage)
- ✅ Generación de PDF profesional
- ✅ Validez de presupuesto calculada

### Datos en PDF
- Número y fecha de presupuesto
- Datos del cliente (nombre, email, teléfono, dirección)
- Tabla de servicios/productos
- Cálculos financieros
- Términos de pago
- Notas adicionales
- Datos de contacto y matrículas de Erica

## Cómo Usar

### Para Erica (Usuario Final)

1. **Abrir la aplicación:**
   - Ir a https://budget-generator.vercel.app

2. **Crear presupuesto:**
   - Ingresar datos del cliente
   - Agregar servicios/productos
   - Revisar términos de pago
   - Ver previsualización

3. **Descargar PDF:**
   - Hacer clic en "Descargar PDF"
   - El archivo se llama: `presupuesto-erica-avalos-[número].pdf`
   - El número se incrementa automáticamente

### Datos Guardados Automáticamente

- Todos los datos se guardan en localStorage
- Se recuperan al recargar la página
- El contador de presupuestos persiste
- Limpiar botón elimina todo

## Tecnología

- **Frontend:** HTML5, CSS3, JavaScript Vanilla
- **PDF:** html2pdf.js (CDN)
- **Almacenamiento:** localStorage (navegador)
- **Hosting:** Vercel
- **Versionamiento:** Git + GitHub

## Futuros Mejoras (Opcionales)

- [ ] Copiar datos de cliente anterior
- [ ] Templates de presupuestos guardados
- [ ] Descuento por porcentaje
- [ ] Múltiples monedas
- [ ] Exportar a Excel
- [ ] Base de datos en backend
- [ ] Envío de presupuestos por email
- [ ] Firmas digitales

## Soporte

Para cambios, mejoras o problemas:
- Contactar al desarrollador (Claude Code)
- Editar directamente los archivos en GitHub
- Las actualizaciones se despliegan automáticamente en Vercel

## Licencia

© 2025 Erica Avalos. Todos los derechos reservados.
