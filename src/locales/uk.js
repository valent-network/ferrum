export default {
  listNotFound: 'Нічого не знайдено',
  nav: {
    titles: {
      feed: 'Стрічка',
      chats: 'Чати',
      myAds: 'Мої оголошення',
      inviteFriends: 'Запросити друзів',
      language: 'Налаштування мови',
      createAd: 'Нове оголошення',
      ads: 'Оголошення',
    },
  },
  actions: {
    cancel: 'Скасувати',
    accept: 'Прийняти',
    delete: 'Видалити',
    edit: 'Редагувати',
    invite: 'Запросити',
    back: 'Назад',
    choose: 'Оберіть',
    create: 'Створити',
    archive: 'Сховати',
    unarchive: 'Опублікувати',
    update: 'Оновити',
  },
  buttons: {
    invite: 'Запросити',
    listNotfoundInviteFriends: 'Запросити Друзів',
  },
  feed: {
    permissionBoxText:
      'Нам потрібен дозвіл на доступ до вашої контактної книг, щоб показувати, хто з вашіх друзів та знайомих наразі продає автомобіль',
    permissionBoxSubmit: 'Надати дозвіл',
    contactsProcessingText: 'Контактна книга обробляється...',
    search: {
      placeholder: 'Назва оголошення',
    },
    filters: {
      headers: {
        knowThrough: 'Знаю через',
        main: 'Критерії пошуку',
        reset: 'Прибрати',
        price: 'Вартість',
        category: 'Категорія',
      },
      from: 'від',
      to: 'до',
      submit: 'Шукати',
    },
  },
  ad: {
    shareText: 'Привіт! Можливо, ти знаєш продавця за посиланням?',
    invitationText: 'Вітаю, я знайшов твоє авто тут, подивись — https://recar.io/get',
    discussWithFriend: 'Обговорити з другом',
    postedBy: 'Розмістив(ла)',
    options: { source: 'Джерело' },
    deleted: 'Сховано',
    restore: 'Відновити',
    addImages: 'Додати фото',
    assign_as_main_image: 'Зробити головним',
    alerts: {
      confirm_delete: 'Ви впевнені, що хочете видалити це оголошення? Після цього, оголошення не можна будет повернути',
      confirm_archive:
        'Ви впевнені, що хочете сховати це оголошення? Його не можна будет знайти через пошук, але воно залишиться у чатах, улюблених та відвіданих',
    },
    formErrors: {
      required: 'Обовʼязково до заповнення',
      minLength: 'Занадто коротко, мінімально символів:',
      maxLength: 'Занадто довго, максимально символів:',
      max: 'Занадто велике число, максимально:',
      pattern: 'Помилковий формат',
    },
    params: {
      title: 'Назва',
      description: 'Опис',
      short_description: 'Короткий опис',
      price: 'Ціна',
      category_id: 'Категорія',
      region: 'Область',
      city_id: 'Місто',
      ad_images: 'Фото',
      notes: {
        title: 'Головна назва оголошення',
        description: 'Повний текст оголошення',
        short_description: 'Короткий опис оголошення, що буде показаний у стрічці',
        ad_images: 'Перше за списком фото будет головним',
        ad_images_non_native: 'Будь ласка, перезавантажте фото, що були знайдені у сторонніх джерелах',
      },
      placeholders: {
        title: 'Наприклад, iPhone 15 з гарантією',
        description: 'Наприклад, тут можна описати детальні умови доставки або повернення',
        short_description: 'Цей текст буде показано у списках оголошень, наприклад, у головній стрічці',
        category_id: 'Оберіть',
        region: 'Оберіть',
        city_id: 'Оберіть',
        price: '1000',
      },
    },
    errors: {
      imageNotLoaded: 'Не вдалося завантажити фото',
      imageProcessing: 'Фото оброблюється, будь ласка, спробуйте пізніше',
    },
    buttons: {
      selectFriend: 'Обрати',
      inviteFriend: 'Запросити',
      askFriend: 'Запитати',
      continueChat: 'Продовжити',
    },
  },
  ads: {
    visited: 'Відвідані',
    favorite: 'Улюблені',
    myAds: 'Мої',
    knows: 'Знає',
    knowsMore: 'та ще',
    knowsMorePostfix: '',
  },
  chat: {
    systemChatTitle: 'Рекаріо',
    you: 'Ви',
    introHeader: "Ім'я вашого друга для інших:",
    nameYourselfText: 'Будь ласка, щоб розпочати чат, вкажіть, як інші можуть звертатися до вас:',
    oneMember: 'учасник',
    twoMembers: 'учасника',
    threeMembers: 'учасників',
    settings: {
      more: 'Детальніше',
      members: 'Учасники',
      mayKnow: 'Друзі, що можуть знати продавця',
      leaveChat: 'Залишити чат',
      leaveChatTitle: 'Ви втратите доступ до всіх повідомлень цього чату, доки хтось не запросить вас назад',
    },
    actions: {
      leave: 'Залишити',
      cancel: 'Скасувати',
      copyMessage: 'Копіювати повідомлення',
      deleteMessage: 'Видалити повідомлення',
      systemChatHeader: 'Системний чат\nВи можете повернутися будь-якої миті',
    },
    buttons: {
      addFriend: 'Додати',
      setMyName: 'Зберегти',
    },
    placeholders: {
      introduceFriend: 'Імʼя друга для інших',
      yourName: "Ваше ім'я для інших",
      message: 'Повідомлення',
      loadMore: 'Завантажити ще',
    },
    system: {
      init: 'цікавиться цим оголошенням',
      left: 'більше не в чаті',
      add: 'відтепер у чаті',
    },
  },
  profile: {
    shareTitle: 'Рекаріо — купуй та продавай автівки через друзів та знайомих',
    shareMessage: 'Завантажити Рекаріо: https://recar.io/get',
    inviteFriendSMSText:
      'Вітаю! Дивись, що знайшлося — тут дуже зручно продати чи купити авто через друзів та знайомих — https://recar.io/get',
    deleteContactsNote:
      'Увага! Не забудьте заборонити доступ до контактної книги в налаштуваннях телефона, щоб уникнути синхронізації наступного разу як повернетесь до Рекаріо',
    inviteFriendsNote:
      'Чим більше друзів у Рекаріо, тим краще для вас. Навіть, якщо ніхто з ваших друзів наразі не зацікавлений у купівлі чи продажі авто, вони можуть знати тих, кому це потрібно',
    nameNotPresent: 'Без імені',
    contactsSuccessfullyDeleted: 'Контактна книга була успішно видалена',
    actions: {
      changeAvatarTitle: 'Змінити фото',
      deleteContactsTitle:
        'Ви впевнені, що хочете видалити вашу контактну книгу з серверів Рекаріо? Щоб завантажити їх знову, вийдіть з додатку та зайдіть знову',
      pickFromGallery: 'Обрати з галереї...',
      signOut: 'Вийти',
      signOutTitle: 'Ви впевнені, що хочете вийти?',
      enterRefCode: 'Введіть Код-Запрошення',
      searchAds: 'Шукати оголошення',
      block: 'Заблокувати',
      unblock: 'Розблокувати',
    },
    placeholders: {
      userContactsSearch: 'Імʼя чи назва контакту',
    },
    labels: {
      name: "Ім'я",
      refCode: 'Код-запрошення',
      phoneNumber: 'Номер телефону',
      contactsBook: 'Контактна книга',
      friends: 'Друзі',
      inviteFriends: 'Запросити друзів',
      support: 'Написати у підтримку',
      tos: 'Правила користування',
      privacy: 'Політика приватності',
      signOut: 'Вийти',
      referrer: 'Запросив',
    },
    referrer: {
      callToAction: 'Запроси друга',
      friendInvitesYou: 'запрошує вас до Рекаріо',
      buttons: {
        accepting: 'Приймаю запрошення',
      },
      actions: {
        titleConfirmP1: 'Увага, ви погоджуєтеся бути запрошеним',
        titleNoChangeP2: 'Цей вибір не можна буде змінити у майбутньому.',
      },
      errors: {
        selfInvitation: 'Неможна запрошувати самого себе',
        userNotFound: 'Користувача не знайдено',
      },
    },
  },
  login: {
    companyName: 'Р Е К А Р І О',
    agreeTos: 'Погоджуюсь з',
    tos: 'Правилами користування',
    changeNumber: 'Змінити номер телефону',
    didntReceive: 'Не отримали код?',
    tryAgain: 'Відправити знову',
    buttons: {
      getCode: 'Отримати Код',
      signIn: 'Увійти',
    },
    headers: {
      main: 'Увійти за допомогою номера мобільного телефону',
      secondary: 'Ми відправимо вам код у SMS, щоб ви не вигадували черговий пароль',
      smsWasSent: 'SMS з кодом було відправлено на номер',
      enterSms: 'Введіть код з SMS',
    },
  },
  wizzard: {
    buyPros1: 'Розпитайте їх стосовно продавця товару чи виконавця послуги',
    buyPros2: 'Отримайте найкращі умови та максимум впевненності',
    buyPros3: 'Допоможіть знайомому бізнесу навколо себе зростати та приносити вам ще більше користі',
    buyH1: 'Придбайте товари та послуги через друзів та знайомих',
    buySubmit: 'Гарна ідея',
    sellPros1: 'Знайте, що до вас звертаються по рекомендації — значить, ви «все робите правильно»',
    sellPros2:
      'Відчуйте комфорт роботи з тими, до кого ви не байдужі та задоволення з того, що робите їх життя кращим. Не витрачайте час та сили на тих, хто цього не вартий',
    sellPros3: 'Будуйте довготривалі відносини з клієнтами, які переживуть будь-які напасті',
    sellH1: 'Продавайте свої товари та послуги тим, кого знаєте',
    sellSubmit: 'Отакої',
    connectPros1: 'Допоможіть двом своїм друзям водночас, вони будуть вам вдячні',
    connectPros2: 'Станьте важливою ланкою в житті ваших друзів та знайомих, адже ви знаєте багато корисних людей',
    connectPros3: 'Виконуйте мрії друзів та знайомих просто стоячи поряд',
    connectH1: 'Знайомте своїх друзів, коли вони в пошуках чогось важливого',
    connectSubmit: 'Чому б і ні',
    contactsPros1: 'Час від часу ми будемо синхронізувати вашу контактну книгу',
    contactsPros2: 'Це необхідно задля того, щоб показувати актуальні оголошення від ваших друзів та знайомих',
    contactsPros3: 'Ви можете видалити свою контактну книгу з наших серверів будь-якої миті',
    contactsH1: 'Зберіть усіх друзів',
    contactsSubmit: 'Зрозумів',
    notificationsPros1: 'Відправляємо тільки найважливіші повідомлення та не турбуємо вас без потреби',
    notificationsH1: 'Стеж за найсвіжішими подіями разом з нами',
    notificationsSubmit: 'Згоден, починаймо',
  },
  notifications: {
    profile: {
      copyRefcode: 'Код-запрошення успішно скопійовано',
    },
  },
  errors: {
    title: 'Вибачте, якась халепа :(',
    connectionErrorMessage: 'Біда с доступом до інтернету',
    connectionErrorSecondMessage: 'Не вдалося встановити звʼязок з сервером',
  },
  session: {
    errors: {
      authPhoneInvalidFormat: 'Номер телефону має складатися з 9 цифр',
      authCodeInvalidFormat: 'Код має складатися з 4 цифр',
    },
  },
};
