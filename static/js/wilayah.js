// static/js/wilayah.js
document.addEventListener('DOMContentLoaded', function() {
    // Load provinsi saat halaman dimuat
    loadProvinsi();
    
    // Event listener untuk perubahan provinsi
    document.getElementById('provinsi').addEventListener('change', function() {
        const selectedProvinsi = this.value;
        if (selectedProvinsi && selectedProvinsi !== 'Pilih') {
            loadKabupaten(selectedProvinsi);
        } else {
            resetDropdown('kota');
            resetDropdown('kecamatan');
            resetDropdown('kelurahan');
        }
    });
    
    // Event listener untuk perubahan kabupaten
    document.getElementById('kota').addEventListener('change', function() {
        const selectedKabupaten = this.value;
        if (selectedKabupaten && selectedKabupaten !== 'Pilih') {
            loadKecamatan(selectedKabupaten);
        } else {
            resetDropdown('kecamatan');
            resetDropdown('kelurahan');
        }
    });
    
    // Event listener untuk perubahan kecamatan
    document.getElementById('kecamatan').addEventListener('change', function() {
        const selectedKecamatan = this.value;
        if (selectedKecamatan && selectedKecamatan !== 'Pilih') {
            loadKelurahan(selectedKecamatan);
        } else {
            resetDropdown('kelurahan');
        }
    });
});

function loadProvinsi() {
    fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
        .then(response => response.json())
        .then(provinces => {
            const provinsiSelect = document.getElementById('provinsi');
            provinsiSelect.innerHTML = '<option value="">Pilih Provinsi</option>';
            
            provinces.forEach(province => {
                const option = document.createElement('option');
                option.value = province.id;
                option.textContent = province.name;
                provinsiSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error loading provinces:', error);
        });
}

function loadKabupaten(provinceId) {
    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`)
        .then(response => response.json())
        .then(regencies => {
            const kabupatenSelect = document.getElementById('kota');
            kabupatenSelect.innerHTML = '<option value="">Pilih Kabupaten/Kota</option>';
            
            regencies.forEach(regency => {
                const option = document.createElement('option');
                option.value = regency.id;
                option.textContent = regency.name;
                kabupatenSelect.appendChild(option);
            });
            
            // Reset dropdown turunan
            resetDropdown('kecamatan');
            resetDropdown('kelurahan');
        })
        .catch(error => {
            console.error('Error loading regencies:', error);
        });
}

function loadKecamatan(regencyId) {
    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regencyId}.json`)
        .then(response => response.json())
        .then(districts => {
            const kecamatanSelect = document.getElementById('kecamatan');
            kecamatanSelect.innerHTML = '<option value="">Pilih Kecamatan</option>';
            
            districts.forEach(district => {
                const option = document.createElement('option');
                option.value = district.id;
                option.textContent = district.name;
                kecamatanSelect.appendChild(option);
            });
            
            // Reset dropdown turunan
            resetDropdown('kelurahan');
        })
        .catch(error => {
            console.error('Error loading districts:', error);
        });
}

function loadKelurahan(districtId) {
    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${districtId}.json`)
        .then(response => response.json())
        .then(villages => {
            const kelurahanSelect = document.getElementById('kelurahan');
            kelurahanSelect.innerHTML = '<option value="">Pilih Kelurahan</option>';
            
            villages.forEach(village => {
                const option = document.createElement('option');
                option.value = village.id;
                option.textContent = village.name;
                kelurahanSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error loading villages:', error);
        });
}

function resetDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.innerHTML = '<option value="">Pilih</option>';
}
