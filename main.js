'use strict';

/**
 * Budget Generator - Erica Avalos
 * Generador de presupuestos en PDF
 */

// ============================================
// Theme Toggle
// ============================================

const ThemeToggle = {
    init() {
        const button = document.getElementById('toggleTheme');
        const savedTheme = localStorage.getItem('theme') ||
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

        this.applyTheme(savedTheme);
        button.addEventListener('click', () => {
            const newTheme = savedTheme === 'light' ? 'dark' : 'light';
            this.applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    },

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const button = document.getElementById('toggleTheme');
        button.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
};

// ============================================
// Budget Manager
// ============================================

const BudgetManager = {
    items: [],
    budgetNumber: 1,

    init() {
        this.budgetNumber = parseInt(localStorage.getItem('budgetNumber') || '1');
        document.getElementById('budgetNumber').value = this.budgetNumber;
        document.getElementById('budgetDate').valueAsDate = new Date();

        // Event Listeners
        document.getElementById('addItemBtn').addEventListener('click', () => this.addItem());
        document.getElementById('generateBtn').addEventListener('click', () => this.generatePDF());
        document.getElementById('previewBtn').addEventListener('click', () => this.showPreview());
        document.getElementById('closePreviewBtn').addEventListener('click', () => this.closePreview());
        document.getElementById('clearBtn').addEventListener('click', () => this.clearForm());

        // Add initial item
        this.addItem();

        // Load saved data
        this.loadFromLocalStorage();
    },

    addItem() {
        const itemId = Date.now();
        const item = {
            id: itemId,
            description: '',
            quantity: 1,
            unitPrice: 0
        };

        this.items.push(item);
        this.renderItem(item);
    },

    renderItem(item) {
        const container = document.getElementById('itemsContainer');
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.id = `item-${item.id}`;

        itemDiv.innerHTML = `
            <input type="text" class="item-description" placeholder="Descripción del servicio" value="${item.description}">
            <input type="number" class="item-quantity" placeholder="Cantidad" min="1" value="${item.quantity}">
            <input type="number" class="item-price" placeholder="Precio unitario" min="0" step="0.01" value="${item.unitPrice}">
            <div class="item-total">$${(item.quantity * item.unitPrice).toFixed(2)}</div>
            <button class="item-remove" onclick="BudgetManager.removeItem(${item.id})">Eliminar</button>
        `;

        // Add event listeners for calculations
        itemDiv.querySelector('.item-quantity').addEventListener('change', (e) => {
            item.quantity = parseFloat(e.target.value) || 0;
            this.updateItemTotal(itemDiv, item);
            this.saveToLocalStorage();
        });

        itemDiv.querySelector('.item-price').addEventListener('change', (e) => {
            item.unitPrice = parseFloat(e.target.value) || 0;
            this.updateItemTotal(itemDiv, item);
            this.saveToLocalStorage();
        });

        itemDiv.querySelector('.item-description').addEventListener('change', (e) => {
            item.description = e.target.value;
            this.saveToLocalStorage();
        });

        container.appendChild(itemDiv);
    },

    updateItemTotal(itemDiv, item) {
        const total = item.quantity * item.unitPrice;
        itemDiv.querySelector('.item-total').textContent = `$${total.toFixed(2)}`;
    },

    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        document.getElementById(`item-${itemId}`).remove();
        this.saveToLocalStorage();
    },

    getSubtotal() {
        return this.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    },

    generateBudgetHTML() {
        const clientName = document.getElementById('clientName').value || 'Cliente';
        const clientEmail = document.getElementById('clientEmail').value;
        const clientPhone = document.getElementById('clientPhone').value;
        const clientAddress = document.getElementById('clientAddress').value;
        const budgetDate = document.getElementById('budgetDate').value;
        const validDays = document.getElementById('validDays').value || 30;
        const paymentTerms = document.getElementById('paymentTerms').value;
        const notes = document.getElementById('notes').value;

        const subtotal = this.getSubtotal();
        const iva = subtotal * 0.21;
        const total = subtotal + iva;

        const validDate = new Date(budgetDate);
        validDate.setDate(validDate.getDate() + parseInt(validDays));
        const validDateStr = validDate.toLocaleDateString('es-AR');

        let itemsHTML = '';
        this.items.forEach(item => {
            const itemTotal = item.quantity * item.unitPrice;
            itemsHTML += `
                <tr>
                    <td>${item.description}</td>
                    <td class="text-right">${item.quantity}</td>
                    <td class="text-right">$${item.unitPrice.toFixed(2)}</td>
                    <td class="text-right">$${itemTotal.toFixed(2)}</td>
                </tr>
            `;
        });

        return `
            <div class="budget-header">
                <h1>PRESUPUESTO</h1>
                <p style="color: #8C6C50; margin-top: 8px;">Erica Avalos - Gasista Matriculada & MMO</p>
            </div>

            <div class="budget-info">
                <div class="info-block">
                    <h3>Datos del Cliente</h3>
                    <p><strong>${clientName}</strong></p>
                    ${clientEmail ? `<p>Email: ${clientEmail}</p>` : ''}
                    ${clientPhone ? `<p>Teléfono: ${clientPhone}</p>` : ''}
                    ${clientAddress ? `<p>Dirección: ${clientAddress}</p>` : ''}
                </div>
                <div class="info-block">
                    <h3>Presupuesto</h3>
                    <p>Número: <strong>#${this.budgetNumber}</strong></p>
                    <p>Fecha: <strong>${new Date(budgetDate).toLocaleDateString('es-AR')}</strong></p>
                    <p>Válido hasta: <strong>${validDateStr}</strong></p>
                </div>
            </div>

            <table class="budget-table">
                <thead>
                    <tr>
                        <th>Descripción</th>
                        <th class="text-right">Cantidad</th>
                        <th class="text-right">Precio Unitario</th>
                        <th class="text-right">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHTML}
                </tbody>
            </table>

            <div class="totals">
                <div class="total-row">
                    <div class="total-label">Subtotal:</div>
                    <div class="total-value">$${subtotal.toFixed(2)}</div>
                </div>
                <div class="total-row">
                    <div class="total-label">IVA (21%):</div>
                    <div class="total-value">$${iva.toFixed(2)}</div>
                </div>
                <div class="total-row grand-total">
                    <div class="total-label">TOTAL:</div>
                    <div class="total-value">$${total.toFixed(2)}</div>
                </div>
            </div>

            ${paymentTerms ? `
                <div class="budget-notes">
                    <h3>Términos de Pago</h3>
                    <p>${paymentTerms}</p>
                </div>
            ` : ''}

            ${notes ? `
                <div class="budget-notes">
                    <h3>Notas Adicionales</h3>
                    <p>${notes}</p>
                </div>
            ` : ''}

            <div style="margin-top: 40px; text-align: center; color: #8C6C50; font-size: 0.9rem;">
                <p>Gasista Matriculada TECA00241 • Maestro Mayor de Obras 80229969</p>
                <p>Plottier, Neuquén</p>
            </div>
        `;
    },

    showPreview() {
        const previewSection = document.getElementById('previewSection');
        const previewContent = document.getElementById('previewContent');

        previewContent.innerHTML = this.generateBudgetHTML();
        previewSection.classList.remove('hidden');

        // Scroll to preview
        previewSection.scrollIntoView({ behavior: 'smooth' });
    },

    closePreview() {
        document.getElementById('previewSection').classList.add('hidden');
    },

    generatePDF() {
        const element = document.createElement('div');
        element.innerHTML = this.generateBudgetHTML();

        const opt = {
            margin: 10,
            filename: `presupuesto-erica-avalos-${this.budgetNumber}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
        };

        html2pdf().set(opt).from(element).save();

        // Increment budget number
        this.budgetNumber++;
        localStorage.setItem('budgetNumber', this.budgetNumber);
        document.getElementById('budgetNumber').value = this.budgetNumber;

        alert('✅ Presupuesto descargado exitosamente!');
    },

    clearForm() {
        if (confirm('¿Deseas limpiar el formulario? Esta acción no se puede deshacer.')) {
            document.getElementById('clientName').value = '';
            document.getElementById('clientEmail').value = '';
            document.getElementById('clientPhone').value = '';
            document.getElementById('clientAddress').value = '';
            document.getElementById('paymentTerms').value = '50% al inicio, 50% al finalizar';
            document.getElementById('notes').value = '';

            // Clear items
            document.getElementById('itemsContainer').innerHTML = '';
            this.items = [];
            this.addItem();

            // Reset date
            document.getElementById('budgetDate').valueAsDate = new Date();

            localStorage.removeItem('budgetData');
        }
    },

    saveToLocalStorage() {
        const data = {
            clientName: document.getElementById('clientName').value,
            clientEmail: document.getElementById('clientEmail').value,
            clientPhone: document.getElementById('clientPhone').value,
            clientAddress: document.getElementById('clientAddress').value,
            budgetDate: document.getElementById('budgetDate').value,
            validDays: document.getElementById('validDays').value,
            paymentTerms: document.getElementById('paymentTerms').value,
            notes: document.getElementById('notes').value,
            items: this.items
        };
        localStorage.setItem('budgetData', JSON.stringify(data));
    },

    loadFromLocalStorage() {
        const saved = localStorage.getItem('budgetData');
        if (saved) {
            const data = JSON.parse(saved);
            document.getElementById('clientName').value = data.clientName || '';
            document.getElementById('clientEmail').value = data.clientEmail || '';
            document.getElementById('clientPhone').value = data.clientPhone || '';
            document.getElementById('clientAddress').value = data.clientAddress || '';
            document.getElementById('budgetDate').value = data.budgetDate || new Date().toISOString().split('T')[0];
            document.getElementById('validDays').value = data.validDays || '30';
            document.getElementById('paymentTerms').value = data.paymentTerms || '50% al inicio, 50% al finalizar';
            document.getElementById('notes').value = data.notes || '';

            // Load items
            if (data.items && data.items.length > 0) {
                document.getElementById('itemsContainer').innerHTML = '';
                this.items = data.items;
                this.items.forEach(item => this.renderItem(item));
            }
        }

        // Save on any input change
        document.addEventListener('change', () => this.saveToLocalStorage());
    }
};

// ============================================
// Initialize
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    ThemeToggle.init();
    BudgetManager.init();
});
