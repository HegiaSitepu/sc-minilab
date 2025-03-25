// ===== LOGIN SYSTEM =====
document.addEventListener("DOMContentLoaded", function () {
    const loginContainer = document.querySelector(".login-container");
    const loginForm = document.querySelector("#loginForm");
    const usernameInput = document.querySelector("#username");
    const passwordInput = document.querySelector("#password");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const username = usernameInput.value;
            const password = passwordInput.value;

            if (username === "admin" && password === "12345") {
                localStorage.setItem("loggedIn", "true");
                window.location.href = "dashboard.html";
            } else {
                alert("Username atau password salah!");
            }
        });
    }

    // Cek status login saat membuka halaman dashboard
    if (window.location.pathname.includes("dashboard.html")) {
        if (localStorage.getItem("loggedIn") !== "true") {
            window.location.href = "index.html";
        }
    }
});

// ===== NAVIGASI MENU SIDEBAR =====
function tampilkanHalaman(id) {
    document.querySelectorAll(".content > div").forEach(div => div.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");

    document.querySelectorAll(".sidebar a").forEach(a => a.classList.remove("active"));
    document.querySelector(`[href="#${id}"]`).classList.add("active");
}

// ===== SISTEM MANAJEMEN BUKU =====
let daftarBuku = [];

function updateTabel() {
    const tabelManajemen = document.querySelector("#tabelManajemen");
    const tabelBuku = document.querySelector("#tabelBuku");
    let totalBuku = 0, bukuDipinjam = 0, bukuTersedia = 0;

    tabelManajemen.innerHTML = "";
    tabelBuku.innerHTML = "";

    daftarBuku.forEach((buku, index) => {
        totalBuku++;
        if (buku.status === "Dipinjam") bukuDipinjam++;
        else bukuTersedia++;

        tabelManajemen.innerHTML += `<tr>
            <td>${buku.judul}</td>
            <td>${buku.penulis}</td>
            <td>${buku.status}</td>
            <td><button onclick="hapusBuku(${index})">Hapus</button></td>
        </tr>`;

        tabelBuku.innerHTML += `<tr>
            <td>${buku.judul}</td>
            <td>${buku.penulis}</td>
            <td>${buku.status}</td>
        </tr>`;
    });

    document.getElementById("totalBuku").innerText = totalBuku;
    document.getElementById("bukuDipinjam").innerText = bukuDipinjam;
    document.getElementById("bukuTersedia").innerText = bukuTersedia;
}

document.querySelector("#formBuku").addEventListener("submit", function (e) {
    e.preventDefault();
    const judul = document.querySelector("#judul").value;
    const penulis = document.querySelector("#penulis").value;
    const status = document.querySelector("#status").value;

    daftarBuku.push({ judul, penulis, status });
    updateTabel();
});

function hapusBuku(index) {
    daftarBuku.splice(index, 1);
    updateTabel();
}

// ===== SISTEM PEMINJAMAN =====
document.querySelector("#formPeminjaman").addEventListener("submit", function (e) {
    e.preventDefault();
    const namaPeminjam = document.querySelector("#namaPeminjam").value;
    const judulPinjam = document.querySelector("#judulPinjam").value;
    const tabelPeminjaman = document.querySelector("#tabelPeminjaman");

    let buku = daftarBuku.find(b => b.judul === judulPinjam);
    if (buku && buku.status === "Tersedia") {
        buku.status = "Dipinjam";
        tabelPeminjaman.innerHTML += `<tr>
            <td>${namaPeminjam}</td>
            <td>${judulPinjam}</td>
            <td>Dipinjam</td>
        </tr>`;
        updateTabel();
    } else {
        alert("Buku tidak tersedia atau sudah dipinjam.");
    }
});

// ===== SISTEM PENGEMBALIAN =====
document.querySelector("#formPengembalian").addEventListener("submit", function (e) {
    e.preventDefault();
    const judulKembali = document.querySelector("#judulKembali").value;
    const tabelPengembalian = document.querySelector("#tabelPengembalian");

    let buku = daftarBuku.find(b => b.judul === judulKembali);
    if (buku && buku.status === "Dipinjam") {
        buku.status = "Tersedia";
        tabelPengembalian.innerHTML += `<tr>
            <td>${judulKembali}</td>
            <td>Dikembalikan</td>
        </tr>`;
        updateTabel();
    } else {
        alert("Buku tidak ditemukan atau belum dipinjam.");
    }
});

// ===== LOGOUT SYSTEM =====
document.querySelector(".logout").addEventListener("click", function () {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
});