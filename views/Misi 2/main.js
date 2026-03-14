(() => {
    let count = 0;
    let target = 100;
    let notifiedTargets = new Set();

    const countEl       = document.getElementById('count');
    const targetEl      = document.getElementById('target');
    const progressBar   = document.getElementById('progress-bar');
    const notification  = document.getElementById('notification');
    const btnIncrement  = document.getElementById('increment');
    const btnReset      = document.getElementById('reset');
    const targetOpts    = document.querySelectorAll('.target-opt');

    const notifBtn      = document.getElementById('notif-btn');
    const notifPanel    = document.getElementById('notif-panel');
    const notifOverlay  = document.getElementById('notif-overlay');
    const notifClose    = document.getElementById('notif-close');
    const notifCount    = document.getElementById('notif-count');
    const notifEmpty    = document.getElementById('notif-empty');
    const toastContainer = document.getElementById('toast-container');

    let unreadCount = 0;

    function setUnread(n) {
        unreadCount = n;
        notifCount.textContent = n;
        notifCount.style.display = n > 0 ? 'flex' : 'none';
    }

    function openPanel() {
        notifPanel.classList.add('open');
        notifOverlay.classList.add('visible');
        setUnread(0);
    }

    function closePanel() {
        notifPanel.classList.remove('open');
        notifOverlay.classList.remove('visible');
    }

    notifBtn.addEventListener('click', () => {
        notifPanel.classList.contains('open') ? closePanel() : openPanel();
    });
    notifClose.addEventListener('click', closePanel);
    notifOverlay.addEventListener('click', closePanel);

    function updateDOM() {
        countEl.textContent = count;
        const pct = Math.min((count / target) * 100, 100);
        progressBar.style.width = pct + '%';
    }

    function triggerBump() {
        countEl.classList.remove('bump');
        void countEl.offsetWidth;
        countEl.classList.add('bump');
    }

    function showToast(msg) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = '\uD83C\uDF19 ' + msg;
        toastContainer.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    function addBadge(msg) {
        notifEmpty.style.display = 'none';
        const badge = document.createElement('div');
        badge.className = 'badge';
        const text = document.createElement('span');
        text.textContent = '\uD83C\uDF19 ' + msg;
        badge.appendChild(text);
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-btn';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', () => {
            badge.remove();
            if (notification.children.length === 0) {
                notifEmpty.style.display = '';
            }
        });
        badge.appendChild(closeBtn);
        notification.appendChild(badge);

        showToast(msg);

        if (!notifPanel.classList.contains('open')) {
            setUnread(unreadCount + 1);
        }
    }

    function checkTarget() {
        if (count > 0 && count % target === 0) {
            const times = count / target;
            const key = `${target}x${times}`;
            if (!notifiedTargets.has(key)) {
                notifiedTargets.add(key);
                const label = times === 1
                    ? `Target Dzikir ${target}x tercapai!`
                    : `Target Dzikir ${target}x ke-${times} tercapai!`;
                addBadge(label);
            }
        }
    }

    btnIncrement.addEventListener('click', () => {
        count++;
        updateDOM();
        triggerBump();
        checkTarget();
    });

    btnReset.addEventListener('click', () => {
        count = 0;
        notifiedTargets.clear();
        notification.innerHTML = '';
        notifEmpty.style.display = '';
        setUnread(0);
        updateDOM();
    });

    targetOpts.forEach(btn => {
        btn.addEventListener('click', () => {
            targetOpts.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            target = parseInt(btn.dataset.val, 10);
            targetEl.textContent = target;

            count = 0;
            notifiedTargets.clear();
            notification.innerHTML = '';
            notifEmpty.style.display = '';
            setUnread(0);
            updateDOM();
        });
    });

    notifCount.style.display = 'none';
    updateDOM();
})();
