// main.js — Agridera Vue App

document.addEventListener('DOMContentLoaded', function () {

  const app = new Vue({
    el: '#app',

    data: {
      products: [
        {
          id: 1,
          title: 'Cayenne Red (TAG-P001)',
          short_text: 'Гострий кайєнський перець, довгі стручки до 15 см.',
          image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop&auto=format',
          desc: 'Cayenne Red — класичний гострий перець із насиченим червоним кольором. Довгі тонкі стручки досягають 12–15 см. Пекучість 30 000–50 000 SHU. Ідеальний для гострих соусів, сушіння та порошку.'
        },
        {
          id: 2,
          title: 'Red Cluster (TAG-P002)',
          short_text: 'Кластерний перець із гронами яскраво-червоних стручків.',
          image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=600&h=400&fit=crop&auto=format',
          desc: 'Red Cluster — декоративний і смаковий сорт. Стручки ростуть гронами по 5–7 штук, 3–5 см. Пекучість 40 000–60 000 SHU. Підходить для маринування та вирощування у горщиках.'
        },
        {
          id: 3,
          title: 'Orange Habanero (TAG-P003)',
          short_text: 'Хабанеро з фруктовим ароматом та екстремальною пекучістю.',
          image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=600&h=400&fit=crop&auto=format',
          desc: 'Orange Habanero — один з найвідоміших сортів. Стручки 4–6 см, помаранчеві. Пекучість 100 000–350 000 SHU. Унікальний фруктово-квітковий аромат. Незамінний у карибській кухні.'
        },
        {
          id: 4,
          title: 'Green Serrano (TAG-P004)',
          short_text: 'Мексиканський серрано — для сальси та гуакамоле.',
          image: 'https://images.unsplash.com/photo-1599598425947-5202edd56bdb?w=600&h=400&fit=crop&auto=format',
          desc: 'Green Serrano — популярний мексиканський сорт. Стручки 5–8 см, зелені або червоні. Пекучість 10 000–23 000 SHU. Ідеальний для свіжих соусів, сальси та гуакамоле.'
        },
        {
          id: 5,
          title: 'Scotch Bonnet (TAG-P005)',
          short_text: 'Карибський перець — фруктовий і надзвичайно гострий.',
          image: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=600&h=400&fit=crop&auto=format',
          desc: 'Scotch Bonnet — характерний карибський сорт із зморшкуватою поверхнею. Пекучість 100 000–350 000 SHU. Солодкуватий фруктовий присмак. Основа соусів та джерків.'
        }
      ],

      // Модальне вікно (tomato-all)
      modalProduct: null,
      showModal: false,

      // Кошик
      cart: [],
      showCartDropdown: false,

      // Tomato-one (для сторінки товару якщо відкрита напряму)
      product: null,
      btnVisible: 0,

      // Contact форма
      contactFields: {
        name: '', company: '', position: '', city: '',
        country: '', telephone: '', email: '',
        role: 'seed producer', other_role: '', interest: ''
      },
      orderSent: false
    },

    computed: {
      cartCount() {
        return this.cart.length;
      },
      isInCart() {
        if (!this.modalProduct) return false;
        return this.cart.some(p => p.id === this.modalProduct.id);
      }
    },

    methods: {

      // ── Кошик ──
      getCart() {
        const stored = JSON.parse(localStorage.getItem('cart') || '[]');
        this.cart = this.products.filter(p => stored.indexOf(p.id) !== -1);
      },

      addToCart(id) {
        let stored = JSON.parse(localStorage.getItem('cart') || '[]');
        if (stored.indexOf(id) === -1) {
          stored.push(id);
          localStorage.setItem('cart', JSON.stringify(stored));
          this.getCart();
        }
        // Для tomato-one btnVisible
        this.btnVisible = 1;
      },

      removeFromCart(id) {
        let stored = JSON.parse(localStorage.getItem('cart') || '[]');
        stored = stored.filter(i => i !== id);
        localStorage.setItem('cart', JSON.stringify(stored));
        this.getCart();
        // Якщо видалили поточний товар на tomato-one
        if (this.product && this.product.id === id) {
          this.btnVisible = 0;
        }
      },

      toggleCart() {
        this.showCartDropdown = !this.showCartDropdown;
      },

      closeCart() {
        this.showCartDropdown = false;
      },

      makeOrder() {
        this.orderSent = true;
        this.cart = [];
        localStorage.removeItem('cart');
      },

      // ── Модальне вікно ──
      openModal(item) {
        this.modalProduct = item;
        this.showModal = true;
        document.body.style.overflow = 'hidden';
      },

      closeModal() {
        this.showModal = false;
        this.modalProduct = null;
        document.body.style.overflow = '';
      },

      // ── Tomato-one ──
      getProduct() {
        const hash = window.location.hash;
        if (hash && hash.length > 1) {
          const id = parseInt(hash.substring(1));
          if (!isNaN(id)) {
            this.product = this.products.find(p => p.id === id) || null;
          }
        }
      },

      checkInCart(id) {
        const stored = JSON.parse(localStorage.getItem('cart') || '[]');
        if (stored.indexOf(id) !== -1) this.btnVisible = 1;
      },

      // ── Contact ──
      checkInCartContact(id) {
        return this.cart.some(p => p.id === id);
      }
    },

    mounted() {
      this.getCart();
      // Для tomato-one.html
      if (window.location.hash && window.location.hash.length > 1) {
        this.getProduct();
        if (this.product) this.checkInCart(this.product.id);
      }
      // Закрити кошик при кліку поза ним
      document.addEventListener('click', (e) => {
        const cartEl = document.getElementById('cart-dropdown-wrap');
        if (cartEl && !cartEl.contains(e.target)) {
          this.showCartDropdown = false;
        }
      });
    }
  });

});
