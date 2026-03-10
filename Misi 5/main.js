var now = new Date();
var SCHEDULE_YEAR = now.getFullYear();
var SCHEDULE_MONTH = now.getMonth() + 1;
var TODAY_STR = now.getFullYear() + '-' +
    String(now.getMonth() + 1).padStart(2, '0') + '-' +
    String(now.getDate()).padStart(2, '0');

var BULAN_NAMES = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

function padMonth(m) {
    return m < 10 ? '0' + m : '' + m;
}

function showStatus(type, message) {
    var el = document.getElementById('imsak-status');
    el.className = 'imsak-status ' + (type === 'loading' ? 'imsak-loading' : 'imsak-error');
    el.textContent = message;
}

function hideStatus() {
    var el = document.getElementById('imsak-status');
    el.className = 'imsak-status hidden';
}

function renderTable(jadwal, lokasi) {
    var tbody = document.getElementById('imsak-tbody');
    var badge = document.getElementById('month-badge');
    badge.textContent = lokasi + ' - ' + BULAN_NAMES[SCHEDULE_MONTH - 1] + ' ' + SCHEDULE_YEAR;

    var fragment = document.createDocumentFragment();
    jadwal.forEach(function(item) {
        var tr = document.createElement('tr');
        if (item.date === TODAY_STR) {
            tr.className = 'today-row';
        }
        var fields = [
            item.tanggal, item.imsak, item.subuh,
            item.dzuhur, item.ashar, item.maghrib, item.isya
        ];
        fields.forEach(function(val) {
            var td = document.createElement('td');
            td.textContent = val != null ? val : '-';
            tr.appendChild(td);
        });
        fragment.appendChild(tr);
    });

    tbody.innerHTML = '';
    tbody.appendChild(fragment);

    var todayRow = tbody.querySelector('.today-row');
    if (todayRow) {
        setTimeout(function() {
            todayRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 200);
    }
}

function loadSchedule(cityId) {
    var tbody = document.getElementById('imsak-tbody');
    tbody.innerHTML = '';
    showStatus('loading', 'Memuat data...');

    var url = 'https://api.myquran.com/v2/sholat/jadwal/' +
        cityId + '/' + SCHEDULE_YEAR + '/' + padMonth(SCHEDULE_MONTH);

    fetch(url)
        .then(function(res) {
            if (!res.ok) {
                throw new Error('HTTP ' + res.status);
            }
            return res.json();
        })
        .then(function(data) {
            if (data.status && data.data && Array.isArray(data.data.jadwal)) {
                hideStatus();
                renderTable(data.data.jadwal, data.data.lokasi);
            } else {
                showStatus('error', 'Gagal memuat data jadwal. Silakan coba lagi.');
            }
        })
        .catch(function() {
            showStatus('error', 'Gagal memuat data. Periksa koneksi internet Anda.');
        });
}

function setPlaceholder() {
    var tbody = document.getElementById('imsak-tbody');
    var tr = document.createElement('tr');
    tr.className = 'imsak-placeholder-row';
    var td = document.createElement('td');
    td.setAttribute('colspan', '7');
    td.textContent = 'Silakan pilih kota untuk melihat jadwal imsakiyah.';
    tr.appendChild(td);
    tbody.innerHTML = '';
    tbody.appendChild(tr);
    document.getElementById('month-badge').textContent = '';
    hideStatus();
}

function loadCities() {
    var select = document.getElementById('city-select');

    fetch('https://api.myquran.com/v2/sholat/kota/semua')
        .then(function(res) {
            if (!res.ok) {
                throw new Error('HTTP ' + res.status);
            }
            return res.json();
        })
        .then(function(data) {
            if (data.status && Array.isArray(data.data)) {
                var defaultOpt = document.createElement('option');
                defaultOpt.value = '';
                defaultOpt.textContent = '-- Pilih Kota --';
                select.innerHTML = '';
                select.appendChild(defaultOpt);

                data.data.forEach(function(city) {
                    var opt = document.createElement('option');
                    opt.value = city.id;
                    opt.textContent = city.lokasi;
                    if (city.id === '1301') {
                        opt.selected = true;
                    }
                    select.appendChild(opt);
                });

                if (select.value) {
                    loadSchedule(select.value);
                }
            } else {
                select.innerHTML = '<option value="">Gagal memuat daftar kota</option>';
            }
        })
        .catch(function() {
            select.innerHTML = '<option value="">Gagal memuat daftar kota</option>';
        });
}

document.getElementById('city-select').addEventListener('change', function() {
    if (this.value) {
        loadSchedule(this.value);
    } else {
        setPlaceholder();
    }
});

loadCities();
