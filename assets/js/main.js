/**
 * main.js - Shared UI Logic
 * Handles Modals, Tab Switching, and Filters
 */

// Tab switching logic
function showCity(city) {
    document.querySelectorAll('.city-content').forEach(el => {
        el.classList.add('hidden');
    });
    document.querySelectorAll('button[id^="btn-"]').forEach(el => {
        el.classList.remove('tab-active', 'text-brand-navy');
        el.classList.add('text-gray-400');
    });

    const content = document.getElementById(city + '-content');
    if (content) content.classList.remove('hidden');

    const activeBtn = document.getElementById('btn-' + city);
    if (activeBtn) {
        activeBtn.classList.remove('text-gray-400');
        activeBtn.classList.add('tab-active', 'text-brand-navy');
    }

    setTimeout(() => {
        const itinerarySection = document.getElementById('itinerary');
        if (itinerarySection) itinerarySection.scrollIntoView({ behavior: 'smooth' });
    }, 10);
}

// Filter Places Logic
function filterPlaces(category, btn) {
    // Update filter buttons
    document.querySelectorAll('.place-filter-btn').forEach(el => {
        el.classList.remove('filter-btn-active');
    });
    if (btn) btn.classList.add('filter-btn-active');

    // Filter cards
    const cards = document.querySelectorAll('.place-card');
    cards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
            card.classList.remove('place-hidden');
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 10);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.classList.add('place-hidden');
            }, 400);
        }
    });
}

// Modal Logic
function openModal(title, desc, imageSrc) {
    const modal = document.getElementById('details-modal');
    const content = document.getElementById('modal-content');

    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-desc').innerText = desc;

    const imgEl = document.getElementById('modal-image');
    if (imageSrc && imageSrc !== 'null' && imageSrc !== '') {
        imgEl.src = imageSrc;
        imgEl.classList.remove('hidden');
    } else {
        imgEl.classList.add('hidden');
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        modal.classList.remove('opacity-0');
        content.classList.remove('scale-95');
        content.classList.add('scale-100');
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('details-modal');
    const content = document.getElementById('modal-content');

    if (!modal) return;

    modal.classList.add('opacity-0');
    content.classList.remove('scale-100');
    content.classList.add('scale-95');
    document.body.style.overflow = 'auto';

    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }, 300);
}

// Global Listeners
document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        closeModal();
    }
});
