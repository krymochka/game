document.addEventListener('DOMContentLoaded', (event) => {
    const userId = localStorage.getItem('userId') || generateUserId();
    localStorage.setItem('userId', userId);

    const balance = localStorage.getItem(`balance_${userId}`) || 0;
    document.getElementById('balance').innerText = balance;

    const referralLink = `https://t.me/your_bot?start=${userId}`;
    document.getElementById('referral-link-display').innerText = referralLink;

    const referrals = JSON.parse(localStorage.getItem(`referrals_${userId}`)) || [];
    updateReferralsList(referrals);

    const mainLink = document.getElementById('main-link');
    const tasksLink = document.getElementById('tasks-link');
    const friendsLink = document.getElementById('friends-link');

    mainLink.addEventListener('click', () => {
        setActivePage('main-page');
    });

    tasksLink.addEventListener('click', () => {
        setActivePage('tasks-page');
    });

    friendsLink.addEventListener('click', () => {
        setActivePage('referral-page');
    });

    function setActivePage(pageId) {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(pageId).classList.add('active');
    }

    document.querySelector('.tasks a').addEventListener('click', function() {
        alert('Task completed! You earned 10 coins.');
        let balance = localStorage.getItem(`balance_${userId}`) || 0;
        balance = parseInt(balance) + 10;
        localStorage.setItem(`balance_${userId}`, balance);
        document.getElementById('balance').innerText = balance;
    });

    const urlParams = new URLSearchParams(window.location.search);
    const referralCode = urlParams.get('start');

    if (referralCode) {
        let referrerBalance = localStorage.getItem(`balance_${referralCode}`) || 0;
        referrerBalance = parseInt(referrerBalance) + 5;
        localStorage.setItem(`balance_${referralCode}`, referrerBalance);

        let referrals = JSON.parse(localStorage.getItem(`referrals_${referralCode}`)) || [];
        if (!referrals.includes(userId)) {
            referrals.push(userId);
        }
        localStorage.setItem(`referrals_${referralCode}`, JSON.stringify(referrals));
    }

    function updateReferralsList(referrals) {
        const referralsList = document.getElementById('referrals-list');
        referralsList.innerHTML = '';
        referrals.forEach(referral => {
            const listItem = document.createElement('li');
            listItem.innerText = `User ID: ${referral}`;
            referralsList.appendChild(listItem);
        });
    }

    function generateUserId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
});
