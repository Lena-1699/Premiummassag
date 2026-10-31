export type Language = 'en' | 'ru';

export interface Translations {
  nav: {
    home: string;
    services: string;
    about: string;
    reviews: string;
    booking: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    badge: string;
  };
  services: {
    title: string;
    subtitle: string;
    items: {
      deepTissue: { title: string; description: string; price: string };
      swedish: { title: string; description: string; price: string };
      sports: { title: string; description: string; price: string };
      aromatherapy: { title: string; description: string; price: string };
    };
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    features: {
      certified: string;
      equipment: string;
      oils: string;
      coverage: string;
    };
  };
  reviews: {
    title: string;
    subtitle: string;
    items: {
      review1: { name: string; text: string };
      review2: { name: string; text: string };
      review3: { name: string; text: string };
      review4: { name: string; text: string };
      review5: { name: string; text: string };
      review6: { name: string; text: string };
    };
  };
  booking: {
    title: string;
    subtitle: string;
  };
  footer: {
    tagline: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
    rights: string;
    adminLink: string;
  };
  admin: {
    title: string;
    loginTitle: string;
    password: string;
    login: string;
    logout: string;
    save: string;
    saved: string;
    reset: string;
    sections: {
      hero: string;
      services: string;
      about: string;
      reviews: string;
      images: string;
    };
    labels: {
      heroTitle: string;
      heroSubtitle: string;
      heroBadge: string;
      servicesTitle: string;
      servicesSubtitle: string;
      aboutTitle: string;
      aboutSubtitle: string;
      aboutDescription: string;
      reviewsTitle: string;
      reviewsSubtitle: string;
      heroImage: string;
      aboutImage: string;
      serviceImage1: string;
      serviceImage2: string;
      serviceImage3: string;
      serviceImage4: string;
    };
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      about: 'About',
      reviews: 'Reviews',
      booking: 'Book Now',
      contact: 'Contact',
    },
    hero: {
      title: 'Premium Mobile Massage in Seattle',
      subtitle: 'Experience the ultimate relaxation without leaving your home. Our licensed massage therapist brings a full spa experience — professional table, premium oils, and expert technique — right to your doorstep.',
      cta: 'Book Your Session',
      badge: 'Licensed & Insured • Serving All Seattle',
    },
    services: {
      title: 'Our Services',
      subtitle: 'Professional massage therapy tailored to your needs, delivered in the comfort of your home',
      items: {
        deepTissue: {
          title: 'Deep Tissue Massage',
          description: 'Target chronic muscle tension and pain with firm, focused pressure on the deepest layers of muscle tissue. Ideal for athletes and those with persistent aches.',
          price: 'From $150',
        },
        swedish: {
          title: 'Swedish Massage',
          description: 'A classic full-body massage using long, flowing strokes to promote relaxation, ease muscle tension, and improve circulation. Perfect for stress relief.',
          price: 'From $130',
        },
        sports: {
          title: 'Sports Massage',
          description: 'Designed for active individuals. Combines stretching, deep pressure, and targeted techniques to enhance performance and speed recovery.',
          price: 'From $160',
        },
        aromatherapy: {
          title: 'Aromatherapy Massage',
          description: 'A sensory journey combining gentle massage with carefully selected essential oils. Promotes deep relaxation, mood enhancement, and holistic healing.',
          price: 'From $145',
        },
      },
    },
    about: {
      title: 'Why Choose Us',
      subtitle: 'A certified professional bringing the spa to you',
      description: 'With over 8 years of experience and a state license in therapeutic massage, I bring more than just technique — I bring a complete wellness experience. Every session includes a portable professional massage table, heated padding, premium organic oils, ambient music, and my full attention to your comfort and recovery.',
      features: {
        certified: 'State-Licensed & Certified Therapist',
        equipment: 'Professional Portable Massage Table',
        oils: 'Premium Organic Oils & Products',
        coverage: 'Serving All of Greater Seattle Area',
      },
    },
    reviews: {
      title: 'Client Testimonials',
      subtitle: 'Hear from our satisfied clients across Seattle',
      items: {
        review1: {
          name: 'Sarah M.',
          text: 'Absolutely incredible experience! The therapist arrived right on time, set up everything perfectly, and gave me the best deep tissue massage I\'ve ever had. I didn\'t have to drive anywhere afterward — just pure relaxation.',
        },
        review2: {
          name: 'James K.',
          text: 'As a marathon runner, I\'ve tried many massage therapists. This mobile service is top-notch. The sports massage helped me recover faster than anything else. Highly recommend!',
        },
        review3: {
          name: 'Emily R.',
          text: 'I booked an aromatherapy session for my birthday and it was heavenly. The essential oils were amazing, the setup was beautiful, and I felt like I was in a five-star spa — in my own living room!',
        },
        review4: {
          name: 'Michael T.',
          text: 'Professional, punctual, and incredibly skilled. The portable table is so comfortable you forget it\'s not a permanent setup. My go-to for monthly massage sessions now.',
        },
        review5: {
          name: 'Lisa P.',
          text: 'After a long week of work, nothing beats having a Swedish massage at home. The therapist is so talented — I was in complete bliss. Already booked my next appointment!',
        },
        review6: {
          name: 'David W.',
          text: 'My wife and I both get regular sessions. The quality rivals any high-end spa in Seattle, and the convenience of having it at home is unbeatable. Worth every penny.',
        },
      },
    },
    booking: {
      title: 'Book Your Session',
      subtitle: 'Choose a time that works for you. We\'ll come to you anywhere in Seattle.',
    },
    footer: {
      tagline: 'Premium Mobile Massage Therapy in Seattle',
      address: 'Serving all of Greater Seattle, WA',
      phone: '(206) 555-0147',
      email: 'hello@serenitymassageseattle.com',
      hours: 'Mon–Sun: 8:00 AM – 9:00 PM',
      rights: '© 2024 Serenity Massage Seattle. All rights reserved.',
      adminLink: 'Admin',
    },
    admin: {
      title: 'Admin Panel',
      loginTitle: 'Admin Login',
      password: 'Password',
      login: 'Sign In',
      logout: 'Sign Out',
      save: 'Save Changes',
      saved: 'Saved!',
      reset: 'Reset to Default',
      sections: {
        hero: 'Hero Section',
        services: 'Services Section',
        about: 'About Section',
        reviews: 'Reviews Section',
        images: 'Images',
      },
      labels: {
        heroTitle: 'Hero Title',
        heroSubtitle: 'Hero Subtitle',
        heroBadge: 'Hero Badge',
        servicesTitle: 'Services Title',
        servicesSubtitle: 'Services Subtitle',
        aboutTitle: 'About Title',
        aboutSubtitle: 'About Subtitle',
        aboutDescription: 'About Description',
        reviewsTitle: 'Reviews Title',
        reviewsSubtitle: 'Reviews Subtitle',
        heroImage: 'Hero Background Image',
        aboutImage: 'About Section Image',
        serviceImage1: 'Deep Tissue Image',
        serviceImage2: 'Swedish Massage Image',
        serviceImage3: 'Sports Massage Image',
        serviceImage4: 'Aromatherapy Image',
      },
    },
  },
  ru: {
    nav: {
      home: 'Главная',
      services: 'Услуги',
      about: 'О нас',
      reviews: 'Отзывы',
      booking: 'Записаться',
      contact: 'Контакты',
    },
    hero: {
      title: 'Премиальный массаж на дому в Сиэтле',
      subtitle: 'Испытайте полный спа-релакс, не выходя из дома. Наш лицензированный массажист привезёт всё необходимое — профессиональный стол, премиальные масла и экспертную технику — прямо к вашей двери.',
      cta: 'Записаться на сеанс',
      badge: 'Лицензированный специалист • Весь Сиэтл',
    },
    services: {
      title: 'Наши услуги',
      subtitle: 'Профессиональный массаж с индивидуальным подходом у вас дома',
      items: {
        deepTissue: {
          title: 'Глубокий массаж тканей',
          description: 'Целенаправленная работа с хроническим напряжением мышц с помощью глубокого давления на самые глубокие слои мышечной ткани. Идеально для спортсменов и тех, кто испытывает постоянные боли.',
          price: 'От $150',
        },
        swedish: {
          title: 'Шведский массаж',
          description: 'Классический массаж всего тела с длинными плавными движениями для расслабления, снятия мышечного напряжения и улучшения кровообращения. Идеально для снятия стресса.',
          price: 'От $130',
        },
        sports: {
          title: 'Спортивный массаж',
          description: 'Разработан для активных людей. Сочетает растяжку, глубокое давление и целевые техники для улучшения результатов и ускорения восстановления.',
          price: 'От $160',
        },
        aromatherapy: {
          title: 'Ароматерапевтический массаж',
          description: 'Сенсорное путешествие, сочетающее мягкий массаж с тщательно подобранными эфирными маслами. Способствует глубокому расслаблению, улучшению настроения и целостному исцелению.',
          price: 'От $145',
        },
      },
    },
    about: {
      title: 'Почему выбирают нас',
      subtitle: 'Сертифицированный профессионал, который привезёт спа к вам',
      description: 'Более 8 лет опыта и государственная лицензия на терапевтический массаж — я приношу не просто технику, а полный опыт оздоровления. Каждый сеанс включает портативный профессиональный массажный стол, подогреваемые подушки, премиальные органические масла, ambient-музыку и полное внимание к вашему комфорту и восстановлению.',
      features: {
        certified: 'Лицензированный и сертифицированный терапевт',
        equipment: 'Профессиональный портативный массажный стол',
        oils: 'Премиальные органические масла и средства',
        coverage: 'Обслуживаем весь Большой Сиэтл',
      },
    },
    reviews: {
      title: 'Отзывы клиентов',
      subtitle: 'Что говорят наши довольные клиенты по всему Сиэтлу',
      items: {
        review1: {
          name: 'Сара М.',
          text: 'Абсолютно невероятный опыт! Терапевт приехал точно вовремя, всё идеально подготовил и сделал лучший глубокий массаж, который у меня когда-либо был. Не нужно было никуда ехать — чистое расслабление.',
        },
        review2: {
          name: 'Джеймс К.',
          text: 'Как марафонец, я перепробовал многих массажистов. Этот мобильный сервис — высшего класса. Спортивный массаж помог мне восстановиться быстрее, чем что-либо другое. Очень рекомендую!',
        },
        review3: {
          name: 'Эмили Р.',
          text: 'Я заказала ароматерапию на день рождения — это было волшебно. Эфирные масла потрясающие, оформление красивое, и я чувствовала себя как в пятизвёздочном спа — в собственной гостиной!',
        },
        review4: {
          name: 'Майкл Т.',
          text: 'Профессионально, пунктуально и невероятно мастерски. Портативный стол настолько удобен, что забываешь, что это не постоянная установка. Теперь мой выбор для ежемесячных сеансов.',
        },
        review5: {
          name: 'Лиза П.',
          text: 'После долгой рабочей недели нет ничего лучше шведского массажа дома. Терапевт так талантлива — я была в полном блаженстве. Уже записалась на следующий сеанс!',
        },
        review6: {
          name: 'Дэвид У.',
          text: 'Мы с женой регулярно заказываем сеансы. Качество не уступает любому премиальному спа в Сиэтле, а удобство домашнего сервиса бесценно. Стоит каждого цента.',
        },
      },
    },
    booking: {
      title: 'Запишитесь на сеанс',
      subtitle: 'Выберите удобное время. Мы приедем к вам в любой район Сиэтла.',
    },
    footer: {
      tagline: 'Премиальный мобильный массаж в Сиэтле',
      address: 'Обслуживаем весь Большой Сиэтл, штат Вашингтон',
      phone: '(206) 555-0147',
      email: 'hello@serenitymassageseattle.com',
      hours: 'Пн–Вс: 8:00 – 21:00',
      rights: '© 2024 Serenity Massage Seattle. Все права защищены.',
      adminLink: 'Админ',
    },
    admin: {
      title: 'Панель администратора',
      loginTitle: 'Вход для администратора',
      password: 'Пароль',
      login: 'Войти',
      logout: 'Выйти',
      save: 'Сохранить',
      saved: 'Сохранено!',
      reset: 'Сбросить',
      sections: {
        hero: 'Главный экран',
        services: 'Услуги',
        about: 'О нас',
        reviews: 'Отзывы',
        images: 'Изображения',
      },
      labels: {
        heroTitle: 'Заголовок героя',
        heroSubtitle: 'Подзаголовок героя',
        heroBadge: 'Бейдж героя',
        servicesTitle: 'Заголовок услуг',
        servicesSubtitle: 'Подзаголовок услуг',
        aboutTitle: 'Заголовок «О нас»',
        aboutSubtitle: 'Подзаголовок «О нас»',
        aboutDescription: 'Описание «О нас»',
        reviewsTitle: 'Заголовок отзывов',
        reviewsSubtitle: 'Подзаголовок отзывов',
        heroImage: 'Фоновое изображение героя',
        aboutImage: 'Изображение «О нас»',
        serviceImage1: 'Изображение Deep Tissue',
        serviceImage2: 'Изображение Swedish Massage',
        serviceImage3: 'Изображение Sports Massage',
        serviceImage4: 'Изображение Aromatherapy',
      },
    },
  },
};
