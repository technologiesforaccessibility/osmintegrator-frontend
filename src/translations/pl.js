// Keep alphabetical order for at least highest level keys to make it easier to work with

export const pl = {
  translation: {
    400: 'Podane wartości muszą być prawidłowe',
    buttons: {
      save: 'Zapisz',
      confirm: 'Zatwierdź',
      cancel: 'Anuluj',
      reset: 'Wyczyść',
      send: 'Wyślij',
      delete: 'Usuń',
      approve: 'Zatwierdź',
    },
    cookies: {
      title: 'Szanowny Kliencie',
      content:
        'Nasza strona internetowa używa plików cookies (tzw. ciasteczka) w celach statystycznych oraz funkcjonalnych. Dzięki nim możemy indywidualnie dostosować stronę do twoich potrzeb. Każdy może zaakceptować pliki cookies albo ma możliwość wyłączenia ich w przeglądarce, dzięki czemu nie będą zbierane żadne informacje.',
      button: 'Akceptuję',
    },
    connection: {
      formTitle: 'Stwórz nowe połączenie:',
      chooseFirstStop: 'Wskaż pierwszy przystanek:',
      chooseSecondStop: 'Wskaż drugi przystanek:',
      createSuccessMessage: 'Stworzono nowe połączenie',
      deleteSuccessMessage: 'Usunięto połączenie',
      deleteConnectionInfo: 'Kliknij na linię, jeśli chcesz usunąć połączenie',
      deleteConnectionConfirmation: 'Usunąć?',
      approveSuccessMessage: 'Zatwierdzono połączenie',
      editConnectionInfo: 'Kliknij na linię, jeśli chcesz edytować połączenie',
      editConnectionConfirmation: 'Wybierz akcję',
      mark2Stops: 'Zaznacz 2 przystanki',
      differentTypeError: 'Nie można łączyć przystanków tego samego typu.',
      unapproveConnectionConfirmation: 'Usunąć zatwierdzenie połączenia?',
      unapproveConnectionInfo: 'Kliknij na linię, jeśli chcesz usunąć zatwierdzenie połączenia',
      unapproveSuccessMessage: 'Usunięto zatwierdzenie połączenia',
    },
    connectionVisibility: {
      nameConnected: 'Połączone przystanki',
      nameUnconnected: 'Niepołączone przystanki',
      nameApproved: 'Zatwierdzone przystanki',
      visible: 'Pełna widoczność',
      semiTransparent: 'Częściowo przeźroczyste',
      hidden: 'Ukryte',
      resetButton: 'Zresetuj ustawienia',
      resetInfo: 'Czy na pewno chcesz przywrócić domyślną widoczność obiektów?',
      header: 'Dostosuj widoczność',
    },
    contactForm: {
      description: 'Problem z logowaniem? Potrzebujesz się skontaktować? Wyślij nam ',
      message: 'wiadomość',
    },
    finishTile: {
      editorMainButton: 'Wyślij kafelek do weryfikacji',
      supervisorMainButton: 'Zatwierdź pracę edytora na wybranym kafelku',
      editorConfirmation:
        'Czy jesteś pewien, że chcesz wysłać kafelek do weryfikacji? Dokonanie późniejszych zmian nie będzie możliwe.',
      supervisorConfirmation: 'Czy jesteś pewien, że chcesz zatwierdzić wszystkie połączenia na wybranym kafelku?',
      successMessage: 'Kafelek został wysłany',
    },
    login: {
      password: 'Hasło',
      loginText: 'Zaloguj się',
      forgotPassword: 'Nie pamiętasz hasła?',
      clickHere: 'Kliknij tutaj',
      401: 'Niepoprawny email lub hasło',
      register: 'Zarejestruj się',
    },
    logout: {
      title: 'Nastąpiło wylogowanie',
      message: 'Za chwilę nastąpi przekierowanie na stronę logowania',
      button: 'Wyloguj',
      loginButton: 'Zaloguj',
    },
    map: {},
    profile: {
      header: 'Profil',
      userName: 'Użytkownik',
      roles: 'Role',
      MVPPlaceholder:
        'Jeśli chcesz zmienić email lub hasło, wyślij wiadomość do kontakt@rozwiazaniadlaniewidomych.org lub napisz wiadomość na Slacku na kanale #problems',
    },
    recover: {
      title: 'Odzyskaj swoje hasło',
      button: 'Zresetuj swoje hasło',
      401: 'Sprawdź czy podany adres email jest poprawny',
      emailSent: 'Na podany adres została wysłana wiadomość z instrukcją odzyskania hasła',
    },
    register: {
      title: 'Rejestracja',
      password: 'Hasło',
      confirmPassword: 'Powtórz hasło',
      button: 'Zarejestruj',
      usernamePlaceholder: 'Nazwa użytkownika',
      usernamePrompt: 'Nazwa użytkownika musi mieć minimum 3 znaki',
      usernameLengthError: 'Nazwa użytkownika musi mieć minimum 3 znaki',
      usernameRequiredError: 'Wpisz nazwę użytkownika',
      emailInvalidError: 'Email nieprawidłowy',
      emailRequiredError: 'Wpisz adres email',
      passwordPlaceholder: 'Wpisz hasło',
      passwordConfirmationPlaceholder: 'Powtórz hasło',
      passwordPrompt: 'Hasło musi mieć minimalnie 8 znaków',
      passwordLengthError: 'Hasło musi mieć minimalnie 8 znaków',
      passwordRequiredError: 'Wpisz hasło',
      passwordConfirmRequiredError: 'Powtórz hasło',
      passwordRefError: 'Wprowadzone hasła nie są takie same',
      login: 'Logowanie',
      loginPage: 'Strona logowania',
      reportPrompt: 'Zgłoś problem',
      fail: 'Wystąpił problem przy rejestracji',
      agreementText: 'Oświadczam, że przeczytałem, zrozumiałem oraz akceptuję regulamin serwisu dostępy pod ',
      agreementThisLink: 'tym linkiem',
      confirm: {
        header: 'Dziękujemy za rejestrację!',
        paragraph: 'Wejdź na podany przy rejestracji e-mail w celu dokończenia rejestracji.',
        sideNote: 'Na skrzynkę została wysłana wiadomość z linkiem aktywującym Twoje konto.',
      },
      activated: {
        header: 'Twoje konto zostało aktywowane!',
        paragraph: 'Możesz teraz zalogować się na swoje konto',
        headerProblem: 'Wystąpił problem podczas aktywacji konta!',
        paragraphProblem: {
          first: 'Kliknij ',
          second: 'tutaj',
          third: ', aby zgłosić ten problem.',
        },
        headerLoading: 'Trwa Ładowanie, prosimy o cierpliwość.',
      },
    },
    report: {
      button: 'Wyślij',
      clear: 'Wyczyść',
      success: 'Zgłoszenie zostało wysłane',
      pinInfo: 'Kliknij w inne miejsce aby przenieść znacznik',
      edit: 'Edytuj raport',
      approve: 'Rozwiąż raport',
      approved: 'Zgłoszenie zatwierdzone!',
      decline: 'Odrzuć',
      closed: 'Zgłoszenie zamknięte',
      approveInfo: 'Zgłoszenie zostało zatwierdzone i będzie wzięte pod uwagę.',
      rejectInfo: 'Zgłoszenie zostało odrzucone i nie będzie rozpatrywane.',
      noTextFound: 'Uzupełnij treść zgłoszenia',
      noPinFound: 'Kliknij na mapie aby zaznaczyć miejsce zgłoszenia',
      noReportFound: 'Brak raportów',
      stopName: 'Nazwa przystanku:',
      coordinatesName: 'Współrzędne raportu:',
      status: 'Status raportu:',
      active: 'Aktywny',
      inactive: 'Nieaktywny',
      placeholder: 'Twój raport...',
      introInfo:
        'Wybierz przystanek lub pinezkę z raportem, aby wyświetlić szczegóły raportu. Kliknij gdziekolwiek na mapie, aby dodać nowy raport.',
      modal: 'Twoje zmiany nie zostaną zapisane. Jesteś pewny?',
    },
    setPassword: {
      title: 'Ustaw nowe hasło',
      button: 'Zmień',
      401: 'Niepoprawny email lub przeterminowany link',
      password: 'Hasło',
      repeatPassword: 'Powtórz hasło',
      invalidPasswords: 'Oba hasła muszą być takie same i mieć min. 8 znaków',
      expiredToken: 'Wygląda na to, że twój token wygasł \n Zresetuj swoje hasło ponownie',
      changedPassword: 'Hasło zostało zmienione! \n Za chwilę nastąpi przekierowanie na stronę logowania',
    },
    sidebar: {
      contact: 'Kontakt',
      map: 'Mapa',
      profile: 'Profil',
      managementDashboard: 'Panel administracyjny',
      history: 'Historia',
      viewPlaceholder: 'Kliknij ikonę przystanku lub zgłoszenia, aby wyświetlić szczegóły.',
    },
    tileModePrompts: {
      view: 'Tryb widoku - pokaż szczegóły przystanku lub zgłoszenia',
      report: 'Stwórz nowe zgłoszenie na mapie',
      connection: 'Stwórz nowe połączenie',
      back: 'Ukryj kafelek',
    },
    error: {
      unrecognizedProblem: 'Coś poszło nie tak. Skontaktuj się z administratorem.',
      unknownStatusError: 'Nieznany status błędu. Skontaktuj się z administratorem.',
      unableToShowErrorMessage: 'Problem z wyświetleniem informacji o błędzie. Skontaktuj się z administratorem.',
      validationError: 'Problem z walidacją. Skontaktuj się z administratorem.',
      errorIsNull: 'Brak odpowiedzi z serwera. Skontaktuj się z administratorem.',
      authentication: 'Problem z autentykacją. Wyloguj się i zaloguj ponownie.',
      authorization: 'Nie masz uprawnień do wykonania tej operacji. Skontaktuj się z administratorem.',
      internalServerError: 'Błąd serwera. Skontaktuj się z administratorem.',
      exception: 'Nieobsługiwany wyjątek. Skontaktuj się z administratorem.',
    },
    version: 'Wersja: ',
    welcomeModal: {
      title: 'Witam w systemie Osm Integrator',
      content:
        'Dzięki Twojej pracy osoby niewidome będą mogły lepiej wykorzystać możliwości aplikacji służących do nowigacji. \n \n Obecnie nie masz przypisanego żadnego obszaru do edycji. Aby uzyskać dostęp do obszaru napisz do nas wiadomość na email kontakt@rozwiazaniadlaniewidomych.org. \n \n Aby zrozumieć zasadę działania systemu zapoznaj się z instrukcją dostępną pod linkiem poniżej.',
      button: 'Instrukcja obsługi',
      checkbox: 'Nie pokazuj więcej',
      hide: 'Ukryj',
    },
    managementPanel: {
      assignRoleTitle: 'Przypisz rolę do użytkownika',
      chooseUser: 'Wybierz użytkownika',
      save: 'Zapisz',
      selectUserMessage: 'Wybierz użytkownika, aby wyświetlać jego role oraz nimi zarządzać',
      selectTile: 'Wybierz kafelek',
      assignUserToTile: 'Przypisz użytkownika do kafelka',
      assigned: 'Przypisany',
      noUser: 'Brak',
      editor: 'Edytor',
      supervisor: 'Supervisor',
    },
    yes: 'Tak',
    no: 'Nie',
    or: 'Lub',
  },
};
