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
    viewMode: {
      tagsTitle: 'Tagi',
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
      deleteConnectionInfo: 'Jeśli chcesz usunąć połączenie, kliknij na linię lub na ikonę połączonego przystanku',
      deleteConnectionConfirmation: 'Usunąć połączenie?',
      editConnectionInfo: 'Jeśli chcesz edytować połączenie, kliknij na linię lub na ikonę połączonego przystanku',
      editConnectionConfirmation: 'Wybierz akcję',
      mark2Stops: 'Zaznacz 2 przystanki',
      differentTypeError: 'Nie można łączyć przystanków tego samego typu.',
    },
    connectionSidebarHandler: {
      stopName: 'Nazwa przystanku',
      noStopName: 'Brak nazwy przystanku',
      connectedWith: 'Połączony z',
      approve: 'Zatwierdź',
      unapprove: 'Cofnij zatwierdzenie',
      deleteConnection: 'Usuń połączenie',
      placeholder: 'Kliknij na przystanek posiadający połączenie',
    },
    connectionRadioGroup: {
      addLabel: 'Nowe połączenie',
      editLabel: 'Edytuj połączenie dla przystanku',
    },
    visibilityPanel: {
      nameConnected: 'Połączone przystanki',
      nameUnconnected: 'Niepołączone przystanki',
      mapReportActive: 'Aktywne Raporty',
      mapReportApproved: 'Nieaktywne raporty',
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
    mapLink: {
      openInOsmTooltip: 'Otwórz w OSM',
      openInGoogleMapTooltip: 'Otwórz w Google Map',
    },
    legend: {
      title: 'Legenda',
      tileUnsigned: 'Kafelek nie przypisany',
      tileSigned: 'Kafelek przypisany do edytora',
      tileCompleted: 'Wszystkie przystanki ZTM na tym kafelku posiadają połączenia',
      stopOSM: 'Przystanek OSM',
      stopOSMReport: 'Przystanek OSM z zgłoszeniem',
      stopOSMReportApprove: 'Przystanek OSM z zatwierdzonym zgłoszeniem',
      stopZTM: 'Przystanek ZTM',
      stopZTMReport: 'Przystanek ZTM z zgłoszeniem',
      stopZTMReportApprove: 'Przystanek ZTM z zatwierdzonym zgłoszeniem',
      stopOsmOutside: 'Przystanek OSM umiejscowiony poza edytowanym obszarem',
      stopOsmOutsideReport: 'Przystanek OSM ze zgłoszeniem umiejscowiony poza edytowanym obszarem',
      stopOsmOutsideReportApprove: 'Przystanek OSM umiejscowiony poza edytowanym obszarem z zatwierdzonym zgłoszeniem',
      reportNew: 'Pinezka zgłoszenia',
      reportActive: 'Pinezka aktywnego zgłoszenia',
      reportInactive: 'Pinezka nieaktywnego zgłoszenia',
      connectionNotExported: 'Nowe połączenie, nie wysłane do OSM',
      connectionNotCreated: 'Połączenie jeszcze nie utworzone',
      connectionExported: 'Połączenie wysłane do OSM, ale przed pobraniem danych z OSM',
      connectionExportedAndImported: 'Połączone wysłane oraz po pobraniu najnowszej wersji z systemu OSM',
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
      noRoles:
        'Nie posiadasz przypisanej roli. Wyślij wiadomość do kontakt@rozwiazaniadlaniewidomych.org lub napisz wiadomość na Slacku na kanale #problems',
      MVPPlaceholder:
        'Jeśli chcesz zmienić email lub hasło, wyślij wiadomość do kontakt@rozwiazaniadlaniewidomych.org lub napisz wiadomość na Slacku na kanale #problems',
    },
    recover: {
      title: 'Odzyskaj swoje hasło',
      button: 'Zresetuj swoje hasło',
      401: 'Sprawdź czy podany adres email jest poprawny',
      emailSent: 'Na podany adres została wysłana wiadomość z instrukcją odzyskania hasła',
      buttonSent: 'E-mail został przesłany',
      confirm: {
        header: 'Link potrzebny do odzyskania hasła został przesłany!',
        paragraph: 'Wejdź na podany adres e-mail w celu dokończenia procedury.',
      },
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
      user: 'Użytkownik:',
      button: 'Zmień',
      buttonSent: 'Hasło zostało zmienione',
      noParams: {
        first: 'Aby zresetować hasło należy skorzystać z linku wysłanego na wskazany na adres E-mail.',
        second: 'E-mail należy wpisać',
        third: 'tutaj.',
      },
      401: 'Niepoprawny email lub przeterminowany link',
      password: 'Hasło',
      repeatPassword: 'Powtórz hasło',
      invalidPasswords: 'Oba hasła muszą być takie same i mieć min. 8 znaków',
      expiredToken: 'Wygląda na to, że twój token wygasł \n Zresetuj swoje hasło ponownie',
      changedPassword: 'Hasło zostało zmienione! \n Za chwilę nastąpi przekierowanie na stronę logowania',
      confirm: {
        header: 'Hasło zostało zmienione!',
        paragraph: 'Powróć na stronę logowania',
      },
    },
    sidebar: {
      contact: 'Kontakt',
      map: 'Mapa',
      profile: 'Profil',
      managementDashboard: 'Panel administracyjny',
      history: 'Historia',
      viewPlaceholder: 'Kliknij ikonę przystanku lub zgłoszenia, aby wyświetlić szczegóły.',
    },
    sync: {
      importOSM: 'Pobierz z OSM',
      importNotOSM: 'Wgraj przystanki z ZTM',
      exportOSM: 'Wyślij do OSM',
      generateNotOsm: 'Wygeneruj bazę ZTM',
      success: 'Synchronizacja przxebiegła pomyślnie!',
      stopsUpdated: 'Zaktualizowano przystanki',
      changes: 'Poniżej lista zmian:',
      noChanges: 'Brak zmian',
    },
    osmExport: {
      exportTab: {
        title: 'Export',
        dataExported: 'Dane zostały wysłane do OSM',
        comment: {
          header: 'Komentarz',
          required: 'Komentarz jest wymagany',
          min: 'Komentarz musi mieć minimum 3 znaki',
          max: 'Komentarz musi mieć mniej niż 255 znaki',
        },
        credentials: {
          header: 'Wprowadź dane logowania do OpenStreetMap',
          email: {
            label: 'Email lub użytkownik:',
            required: 'Nazwa użytkownika jest wymagana',
            min: 'Nazwa użytkownika musi mieć minimum 3 znaki',
            max: 'Nazwa użytkownika musi mieć mniej niż 255 znaki',
          },
          password: {
            label: 'Hasło:',
            required: 'Hasło jest wymagane',
            min: 'Hasło musi mieć minimum 3 znaki',
            max: 'Hasło musi mieć mniej niż 255 znaki',
          },
        },
        info: 'Zmiany zostaną wysłane do OSM w twoim imieniu. Przeczytaj więcej na temat wysyłania danych do OSM.',
        submit: 'Wyślij',
      },
      changesTab: {
        title: 'Zmiany',
        download: 'Pobierz plik osmchange.osc',
      },
      infoTab: {
        title: 'Info',
        credentials: {
          header: 'Dane logowania',
          description:
            'Twoja nazwa użytkownika i hasło do usługi <a href="https://www.openstreetmap.org">openstreetmap.org</a> nie zostaną zapisane w portalu <a href="https://www.osmintegrator.eu">osmintegrator.eu</a>',
        },
        tags: {
          header: 'Tagi dodane automatycznie',
        },
        wiki: {
          header: 'Wiki Import',
        },
      },
    },
    tileDetails: {
      title: 'Szczegóły kafelka',
      database: 'Baza danych',
      coordinates: 'Współrzędne',
      assignedEditor: 'Przypisany edytor',
      assignedSupervisor: 'Przypisany supervisor',
      zoom: 'Zbliżenie:',
      minLat: 'Min szer:',
      minLong: 'Min dł:',
      maxLat: 'Max szer:',
      maxLong: 'Max dł:',
      userName: 'Użytkownik:',
      tileApproved: 'Kafelek zatwierdzony:',
    },
    tileModePrompts: {
      view: 'Tryb widoku - pokaż szczegóły przystanku lub zgłoszenia',
      report: 'Zarządzanie raportami',
      connection: 'Stwórz nowe połączenie',
      tile: 'Szczegóły kafelka',
      sync: 'Synchronizacja',
      move: 'Przesuwanie przystanków',
      back: 'Ukryj kafelek',
    },
    pan: {
      header: 'Panel przesuwania przystanków',
      selectPrompt: 'Wybierz przystanek GTFS aby zmnienić jego lokalizację',
      updatePosition: 'Aktualizuj pozycję przystanku',
      resetPosition: 'Resetuj pozycję przystanku',
      chosenStop: 'Wybrany przystanek',
      position: 'Pozycja',
      initialPosition: 'Pozycja początkowa',
      stopCannotBeMovedOutsideOfTile: 'Przystanek nie może być przesunięty poza obszar kafelka',
      osmStopCannotBeMoved: 'Wybrany przystanek jest przystankiem OSM i nie może być przesunięty',
      lat: 'Szer:',
      long: 'Dł:',
      initLat: 'Początkowa szer:',
      initLong: 'Początkowa dł:',
      confirmResetText: 'Czy na pewno chcesz zresetować pozycję tego przystanku?',
      stopWasMoved: 'Przystanek został przesunięty',
      stopIsOsm: 'Przystanki OSM mogą być przesuwane wyłącznie za pomocą aplikacji OpenStreetMap',
    },
    error: {
      unrecognizedProblem: 'Coś poszło nie tak. Skontaktuj się z administrator§em.',
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
      title: 'Witam w systemie OsmIntegrator',
      content:
        'Dzięki Twojej pracy osoby niewidome będą mogły lepiej wykorzystać możliwości aplikacji służących do nawigacji \n\nAby zrozumieć zasadę działania systemu zapoznaj się z instrukcją lub filmem instruktażowym dostępnymi poniej.\n\nW przypadku problemów z działaniem aplikacji napisz do nas na adres kontakt@rozwiazaniadlaniewidomych.org.',
      button: 'Instrukcja obsługi',
      movie: 'Film instruktażowy',
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
    footer: {
      userManual: 'Instrukcja obsługi',
    },
    yes: 'Tak',
    no: 'Nie',
    or: 'Lub',
  },
};
