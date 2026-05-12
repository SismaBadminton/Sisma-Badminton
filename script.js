// Inisialisasi keranjang dari localStorage (biar gak hilang pas pindah halaman)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Fungsi Tambah ke Keranjang
function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateUI();
    
    // Notifikasi simpel pakai alert Bootstrap-style (opsional)
    alert(name + " berhasil ditambah!");
}

// Fungsi Update Tampilan Angka & Modal
function updateUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    
    // Update jumlah angka di icon navbar
    cartCount.innerText = cart.length;

    // Kosongkan list dulu sebelum diisi ulang
    if (cartItems) {
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;
            cartItems.innerHTML += `
                <div class="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2">
                    <div>
                        <small class="fw-bold d-block">${item.name}</small>
                        <small class="text-danger">Rp ${item.price.toLocaleString()}</small>
                    </div>
                    <button class="btn btn-sm btn-outline-danger" onclick="removeItem(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        });

        totalPriceElement.innerText = total.toLocaleString();
    }
}

// Fungsi Hapus Satu Item
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateUI();
}

// Fungsi Kosongkan Semua
function clearCart() {
    if(confirm("Kosongkan semua jemuran eh keranjang?")) {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateUI();
    }
}

// Fungsi Buka/Tutup Modal
function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('active');
}

// FUNGSI CHECKOUT WHATSAPP (Sistem Bayar)
function checkoutWA() {
    // 1. Ambil input dari form
    const name = document.getElementById('cust-name').value;
    const address = document.getElementById('cust-address').value;
    const payment = document.getElementById('payment-method').value;

    // 2. Validasi: Jangan biarkan kosong
    if (cart.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }
    if (name === "" || address === "") {
        alert("Mohon isi Nama dan Alamat dulu ya!");
        return;
    }

    // 3. Susun Pesan
    let phoneNumber = "6282244922880";
    let message = "*PESANAN BARU - SISMA BADMINTON*\n";
    message += "------------------------------------------\n";
    message += `*Nama:* ${name}\n`;
    message += `*Alamat:* ${address}\n`;
    message += `*Pembayaran:* ${payment}\n`;
    message += "------------------------------------------\n";
    message += "*Daftar Produk:*\n";
    
    let total = 0;
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} (Rp ${item.price.toLocaleString()})\n`;
        total += item.price;
    });

    message += "------------------------------------------\n";
    message += `*TOTAL BAYAR: Rp ${total.toLocaleString()}*\n`;
    message += "------------------------------------------\n";
    message += "Mohon segera diproses ya Min! 🔥";

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(waUrl, '_blank');
}

// Jalankan update tampilan setiap halaman dibuka
document.addEventListener('DOMContentLoaded', updateUI);