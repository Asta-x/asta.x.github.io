// main.js — Agridera Vue App (Гіркий перець — варіант 1)

const app = new Vue({
  el: '#app',

  data: {
    products: [
      {
        id: 1,
        title: 'Cayenne Red (TAG-P001)',
        short_text: 'Гострий кайєнський перець, довгі стручки до 15 см, ідеальний для сушіння та соусів.',
        // Тонкі довгі червоні перці кайєн — фото Ryan Quintal
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&auto=format',
        desc: 'Cayenne Red — класичний гострий перець із насиченим червоним кольором. Довгі тонкі стручки досягають 12–15 см. Пекучість 30 000–50 000 SHU. Ідеальний для виготовлення гострих соусів, сушіння та перемелювання на порошок. Стійкий до основних вірусних захворювань. Врожайність висока, цикл вирощування: весна–осінь.'
      },
      {
        id: 2,
        title: 'Red Cluster (TAG-P002)',
        short_text: 'Кластерний гострий перець із компактними гронами яскраво-червоних стручків.',
        // Купа червоних гострих перців — фото Elle Hughes
        image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=400&h=300&fit=crop&auto=format',
        desc: 'Red Cluster — декоративний і смаковий сорт. Стручки ростуть гронами по 5–7 штук, яскраво-червоного кольору, 3–5 см завдовжки. Пекучість 40 000–60 000 SHU. Чудово підходить для маринування та консервації. Рослини компактні, підходять для вирощування у горщиках. Цикл: весна–зима.'
      },
      {
        id: 3,
        title: 'Orange Habanero (TAG-P003)',
        short_text: 'Легендарний хабанеро з фруктовим ароматом та екстремальною пекучістю.',
        // Яскравий помаранчевий перець — фото Mockup Graphics
        image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400&h=300&fit=crop&auto=format',
        desc: 'Orange Habanero — один з найвідоміших сортів гострого перцю. Стручки округлі, 4–6 см, яскраво-помаранчевого кольору при достиганні. Пекучість 100 000–350 000 SHU. Унікальний фруктово-квітковий аромат робить його незамінним у карибській кухні. Стійкий до посухи. Рекомендується для досвідчених виробників.'
      },
      {
        id: 4,
        title: 'Green Serrano (TAG-P004)',
        short_text: 'Мексиканський серрано — універсальний гострий перець для сальси та гуакамоле.',
        // Зелені гострі перці — фото Hari Krishnan
        image: 'https://images.unsplash.com/photo-1599598425947-5202edd56bdb?w=400&h=300&fit=crop&auto=format',
        desc: 'Green Serrano — популярний мексиканський сорт із насиченим свіжим смаком. Стручки циліндричні, 5–8 см, використовуються як у зеленому, так і в червоному вигляді. Пекучість 10 000–23 000 SHU. Ідеальний для приготування сальси, гуакамоле та маринадів. Врожайна рослина висотою до 1 м. Цикл: весна–осінь.'
      },
      {
        id: 5,
        title: 'Scotch Bonnet (TAG-P005)',
        short_text: 'Карибський Scotch Bonnet — фруктовий і надзвичайно гострий, основа карибської кухні.',
        // Різнокольорові гострі перці — фото Rens D
        image: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=400&h=300&fit=crop&auto=format',
        desc: 'Scotch Bonnet — характерний карибський сорт із зморшкуватою поверхнею стручків. Форма нагадує шотландський берет. Колір: від жовтого до червоного. Пекучість 100 000–350 000 SHU. Солодкуватий фруктовий присмак поєднується з інтенсивною пекучістю. Використовується у соусах, джерках та маринадах. Цикл: весна–зима.'
      }
    ],

    product: [],
    btnVisible: 0
  },

  methods: {
    getProduct() {
      const hash = window.location.hash;
      if (hash) {
        const id = parseInt(hash.replace('#', ''));
        const found = this.products.find(p => p.id === id);
        if (found) this.product = found;
      }
    },
    addToCart(id) {
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      if (!cart.includes(id)) {
        cart.push(id);
        localStorage.setItem('cart', JSON.stringify(cart));
      }
      this.btnVisible = 1;
    },
    checkInCart(id) {
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      if (cart.includes(id)) this.btnVisible = 1;
    }
  },

  mounted() {
    this.getProduct();
    if (this.product && this.product.id) {
      this.checkInCart(this.product.id);
    }
  }
});
