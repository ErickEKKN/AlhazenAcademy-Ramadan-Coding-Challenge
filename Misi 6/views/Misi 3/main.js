(() => {
    const zakatType      = document.getElementById('zakat-type');
    const formPenghasilan = document.getElementById('form-penghasilan');
    const formEmas       = document.getElementById('form-emas');
    const goldPriceInput = document.getElementById('gold-price');
    const salaryInput    = document.getElementById('salary');
    const otherInput     = document.getElementById('other-income');
    const goldAmtInput   = document.getElementById('gold-amount');
    const calcBtn        = document.getElementById('calculate-btn');
    const resetBtn       = document.getElementById('reset-btn');
    const errorBox       = document.getElementById('form-error');

    const resultSection  = document.getElementById('result-section');
    const resultTypeBadge = document.getElementById('result-type-badge');
    const resultTotal    = document.getElementById('result-total');
    const resultNisab    = document.getElementById('result-nisab');
    const resultStatus   = document.getElementById('result-status');
    const resultZakat    = document.getElementById('result-zakat');
    const resultNote     = document.getElementById('result-note');

    function rupiah(n) {
        return 'Rp ' + Math.round(n).toLocaleString('id-ID');
    }

    function showError(msg) {
        errorBox.textContent = msg;
        errorBox.style.display = 'block';
    }

    function clearError() {
        errorBox.textContent = '';
        errorBox.style.display = 'none';
    }

    function val(el) {
        const v = parseFloat(el.value.trim().replace(/,/g, '.'));
        return isNaN(v) ? null : v;
    }

    function updateForm() {
        const type = zakatType.value;
        clearError();
        resultSection.style.display = 'none';

        if (type === 'penghasilan') {
            formPenghasilan.style.display = 'block';
            formEmas.style.display = 'none';
            goldAmtInput.value = '';
        } else {
            formPenghasilan.style.display = 'none';
            formEmas.style.display = 'block';
            salaryInput.value = '';
            otherInput.value = '';
        }
    }

    zakatType.addEventListener('change', updateForm);

    calcBtn.addEventListener('click', () => {
        clearError();

        const type      = zakatType.value;
        const goldPrice = val(goldPriceInput);

        if (!goldPrice || goldPrice <= 0) {
            showError('⚠️ Mohon masukkan harga emas per gram yang valid.');
            goldPriceInput.focus();
            return;
        }

        const nisab = goldPrice * 85;
        let total   = 0;
        let typeName = '';

        if (type === 'penghasilan') {
            const salary = val(salaryInput);
            const other  = val(otherInput);

            if (salary === null || salary < 0) {
                showError('⚠️ Mohon masukkan nilai gaji yang valid (minimal 0).');
                salaryInput.focus();
                return;
            }
            if (other === null || other < 0) {
                showError('⚠️ Mohon masukkan nilai penghasilan lain yang valid (minimal 0).');
                otherInput.focus();
                return;
            }

            total    = salary + other;
            typeName = 'Zakat Penghasilan';

        } else {
            const goldAmt = val(goldAmtInput);

            if (!goldAmt || goldAmt <= 0) {
                showError('⚠️ Mohon masukkan jumlah emas yang valid (lebih dari 0).');
                goldAmtInput.focus();
                return;
            }

            total    = goldAmt * goldPrice;
            typeName = 'Zakat Emas';
        }

        const wajib = total >= nisab;
        const zakat = wajib ? total * 0.025 : 0;

        resultTypeBadge.textContent = typeName;
        resultTotal.textContent     = rupiah(total);
        resultNisab.textContent     = rupiah(nisab);

        if (wajib) {
            resultStatus.textContent  = 'Wajib Zakat';
            resultStatus.className    = 'status-badge status-wajib';
            resultZakat.textContent   = rupiah(zakat);
            resultNote.textContent    =
                'Total harta Anda telah mencapai nisab (setara 85 gram emas). ' +
                'Zakat yang wajib dibayarkan sebesar 2,5% dari total harta.';
        } else {
            resultStatus.textContent  = 'Tidak Wajib';
            resultStatus.className    = 'status-badge status-tidak';
            resultZakat.textContent   = 'Rp 0';
            resultNote.textContent    =
                'Total harta Anda belum mencapai nisab (setara 85 gram emas), ' +
                'sehingga belum wajib membayar zakat saat ini.';
        }

        resultSection.style.display = 'flex';
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    resetBtn.addEventListener('click', () => {
        goldPriceInput.value = '';
        salaryInput.value    = '';
        otherInput.value     = '';
        goldAmtInput.value   = '';
        clearError();
        resultSection.style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    updateForm();
})();
