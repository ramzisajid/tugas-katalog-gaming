// Nama file JSON target fetch
const jsonFile = 'data.json';

async function ambilDataLaptop() {
    const container = document.getElementById('laptop-container');
    
    try {
        // Ambil data menggunakan Fetch API
        const response = await fetch(jsonFile);
        if (!response.ok) throw new Error("Gagal memuat file JSON");

        const daftarLaptop = await response.json();
        
        // Hapus teks "Sedang memuat..."
        container.innerHTML = ''; 

        // Ulangi data untuk dirender menjadi HTML
        daftarLaptop.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            
            card.innerHTML = `
                <div>
                    <div class="card-header">
                        <h2 class="card-title">${item.nama}</h2>
                        <span class="card-badge">${item.harga}</span>
                    </div>
                    
                    <div class="card-image">
                        <img src="${item.gambar}" alt="${item.nama}">
                    </div>

                    <p class="card-desc">${item.deskripsi}</p>
                </div>
            `;

            const button = document.createElement('button');
            button.className = 'btn-detail';
            button.textContent = 'Spesifikasi Detail';
            button.addEventListener('click', () => {
                tampilkanSpesifikasi(item.nama, item.spek, item.gambar);
            });

            card.appendChild(button);
            container.appendChild(card);
        });

    } catch (error) {
        console.error("Kesalahan Fetch:", error);
        container.innerHTML = `
            <div class="status-pesan" style="color: #f87171;">
                Gagal memuat data dari API lokal.
            </div>
        `;
    }
}

function tampilkanSpesifikasi(nama, spek, gambar) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalImage = document.getElementById('modal-image');

    modalTitle.textContent = `Spesifikasi: ${nama}`;
    modalImage.src = gambar;
    modalImage.alt = `Foto ${nama}`;

    // Memecah spesifikasi berdasarkan tanda koma agar rapi berjejer ke bawah
    const arraySpek = spek.split(',');
    let listHtml = '<ul style="padding-left: 1.2rem; margin: 0; text-align: left;">';
    arraySpek.forEach(subSpek => {
        if(subSpek.trim() !== "") {
            listHtml += `<li style="margin-bottom: 0.5rem;">${subSpek.trim()}</li>`;
        }
    });
    listHtml += '</ul>';

    modalBody.innerHTML = listHtml;
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
}

function tutupModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
}

window.addEventListener('DOMContentLoaded', () => {
    ambilDataLaptop();
    const modalClose = document.getElementById('modal-close');
    modalClose.addEventListener('click', tutupModal);
    document.getElementById('modal').addEventListener('click', event => {
        if (event.target.id === 'modal') {
            tutupModal();
        }
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            tutupModal();
        }
    });
});