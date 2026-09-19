// 1. Control de Seguridad: Verificar si el usuario inició sesión
if (localStorage.getItem('admin_session') !== 'active') {
    window.location.href = 'index.html';
}

// Botón de Cerrar Sesión
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('admin_session');
    window.location.href = 'index.html';
});

// 2. Elementos del DOM
const productForm = document.getElementById('product-form');
const productIdInput = document.getElementById('product-id');
const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const productCategoryInput = document.getElementById('product-category');
const productImageInput = document.getElementById('product-image');
const tableBody = document.getElementById('products-table-body');
const formTitle = document.getElementById('form-title');
const saveBtn = document.getElementById('save-btn');
const cancelBtn = document.getElementById('cancel-btn');

// 3. Obtener o inicializar productos desde localStorage
function getProducts() {
    return JSON.parse(localStorage.getItem('catalogo_productos')) || [];
}

function saveProductsToStorage(products) {
    localStorage.setItem('catalogo_productos', JSON.stringify(products));
}

// 4. Renderizar productos en la tabla
function renderProducts() {
    const products = getProducts();
    tableBody.innerHTML = '';

    if (products.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No hay productos cargados.</td></tr>`;
        return;
    }

    products.forEach((product) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${product.imagen}" alt="${product.nombre}" class="product-img-preview" onerror="this.src='https://via.placeholder.com/45'"></td>
            <td><strong>${product.nombre}</strong></td>
            <td>${product.categoria}</td>
            <td>$${product.precio.toLocaleString('es-AR')}</td>
            <td>
                <button class="action-btn btn-edit" onclick="editProduct(${product.id})">Editar</button>
                <button class="action-btn btn-delete" onclick="deleteProduct(${product.id})">Borrar</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

// 5. Guardar o Editar Producto
productForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const products = getProducts();
    const id = productIdInput.value;
    const nombre = productNameInput.value.trim();
    const precio = Number(productPriceInput.value);
    const categoria = productCategoryInput.value;
    const imagen = productImageInput.value.trim();

    if (id) {
        // Modo Edición
        const index = products.findIndex(p => p.id == id);
        if (index !== -1) {
            products[index] = { id: Number(id), nombre, precio, categoria, imagen };
        }
    } else {
        // Modo Creación
        const newProduct = {
            id: Date.now(), // ID único usando timestamp
            nombre,
            precio,
            categoria,
            imagen
        };
        products.push(newProduct);
    }

    saveProductsToStorage(products);
    resetForm();
    renderProducts();
});

// 6. Cargar datos en el formulario para Editar
window.editProduct = function(id) {
    const products = getProducts();
    const product = products.find(p => p.id === id);

    if (product) {
        productIdInput.value = product.id;
        productNameInput.value = product.nombre;
        productPriceInput.value = product.precio;
        productCategoryInput.value = product.categoria;
        productImageInput.value = product.imagen;

        formTitle.textContent = "Editar Producto";
        saveBtn.textContent = "Actualizar Producto";
        cancelBtn.hidden = false;
    }
};

// 7. Borrar Producto
window.deleteProduct = function(id) {
    if (confirm('¿Estás seguro de que querés eliminar este producto?')) {
        let products = getProducts();
        products = products.filter(p => p.id !== id);
        saveProductsToStorage(products);
        renderProducts();
    }
};

// 8. Cancelar Edición
cancelBtn.addEventListener('click', resetForm);

function resetForm() {
    productForm.reset();
    productIdInput.value = '';
    formTitle.textContent = "Agregar Nuevo Producto";
    saveBtn.textContent = "Guardar Producto";
    cancelBtn.hidden = true;
}

// Inicializar la tabla al cargar la página
renderProducts();