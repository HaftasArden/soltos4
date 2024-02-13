import Alpine from 'https://cdn.jsdelivr.net/npm/alpinejs@3.13.5/dist/module.esm.js';
import AlpinePersist from 'https://cdn.jsdelivr.net/npm/@alpinejs/persist@3.13.5/dist/module.esm.js';

/* ----------- */
/* Alpine Data */
/* ----------- */
Alpine.data('episodes', () => ({
    episodes: [],

    latest: function() {
        return this.episodes[this.episodes.length - 1] ?? {};
    },

    open: function(url, epName) {
        this.$dispatch('open-episode', url)

        if ('umami' in window) {
            umami.track('episode', {
                episode: epName
            })
        }
    }
}));

Alpine.data('cuts', () => ({
    cuts: [],

    open: function(url) {
        this.$dispatch('open-episode', url)
    }
}));

Alpine.data('reality', () => ({
    realities: [],
}));

Alpine.data('navbar', () => ({
    init() {
        window.addEventListener('scroll', (e) => {
            if (window.scrollY <= 250) {
                this.$refs.navbar.style.minHeight = `${101 - (window.scrollY * 0.2)}px`
                this.$refs.navbar.style.background = `rgba(0, 0, 0, ${window.scrollY * 0.002})`
                this.$refs.navbar.style.backdropFilter = `blur(${window.scrollY * 0.04}px)`
            }
        });

        if (window.scrollY > 250) {
            this.$refs.navbar.style.backdropFilter = `blur(${window.scrollY * 0.04}px)`
        }

        window.dispatchEvent(new Event('scroll'))
    },

    goTo: function(id) {
        document.getElementById(id).scrollIntoView({ behavior: 'smooth'});
    }
}));

/* ------- */
/* Plugins */
/* ------- */
Alpine.plugin(AlpinePersist);

window.Alpine = Alpine;
Alpine.start();