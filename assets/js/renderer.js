/**
 * renderer.js - Data Fetching and UI Rendering
 */

async function initApp() {
    try {
        const [itineraryData, placesData] = await Promise.all([
            fetch('data/itinerary.json').then(res => res.json()),
            fetch('data/places.json').then(res => res.json())
        ]);

        renderPlaces(placesData);
        renderItinerary(itineraryData);
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

function renderPlaces(places) {
    const grid = document.getElementById('places-grid');
    if (!grid) return;

    grid.innerHTML = places.map(place => `
        <article class="place-card ${place.category} group relative overflow-hidden rounded-xl shadow-lg h-72 cursor-pointer ${place.category !== 'pit' ? 'place-hidden' : ''}"
            onclick="openModal('${place.title}', '${place.description.replace(/'/g, "'")}', '${place.image}')">
            <img src="${place.thumbnail}" alt="${place.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
            <div class="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                <span class="text-brand-gold uppercase text-[10px] font-bold tracking-[0.2em] mb-2">${place.subtitle}</span>
                <h3 class="text-xl font-serif text-white leading-tight">${place.title}</h3>
            </div>
        </article>
    `).join('');
}

function renderItinerary(itinerary) {
    const container = document.getElementById('itinerary-tabs-content');
    if (!container) return;

    container.innerHTML = itinerary.map(city => `
        <div id="${city.city}-content" class="city-content ${city.city !== 'pit' ? 'hidden' : ''} animate-fade-in">
            ${city.days.map((day, dIdx) => `
                <section class="${dIdx === city.days.length - 1 ? '' : 'mb-12'}">
                    <h3 class="day-header">${day.date} <span class="text-sm font-sans text-gray-500 ml-2 font-normal">${day.label}</span></h3>
                    <div class="ml-2 md:ml-4">
                        ${day.events.map((event, eIdx) => `
                            <div class="${eIdx === day.events.length - 1 ? 'timeline-item-last' : 'timeline-item'}">
                                <div class="timeline-dot-custom"></div>
                                <div class="timeline-item-content">
                                    <div class="flex-1">
                                        <time class="font-bold text-brand-navy block text-sm mb-1">${event.time}</time>
                                        <h4 class="text-lg font-bold event-title" onclick="openModal('${event.title}', '${event.description.replace(/'/g, "'")}', '${event.image}')">
                                            ${event.title} <i class="fas fa-info-circle"></i>
                                        </h4>
                                        <p class="text-gray-600 text-sm mt-1">${event.description}</p>
                                    </div>
                                    <img src="${event.thumbnail}" alt="${event.title}" class="timeline-img" 
                                        onclick="openModal('${event.title}', '${event.description.replace(/'/g, "'")}', '${event.image}')">
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>
            `).join('')}
        </div>
    `).join('');
}

// Start rendering on load
document.addEventListener('DOMContentLoaded', initApp);
