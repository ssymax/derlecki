export const bioIntro =
  'Nazywam się Mateusz Derlecki. Jestem fizjoterapeutą oraz naturopatą z kilkunastoletnim doświadczeniem.';

export interface HelpService {
  title: string;
  content: string[];
  list?: string[];
  image: string;
}

interface HelpSectionCopy {
  panel: {
    title: string;
    intro: string;
  };
  services: HelpService[];
}

export const help: HelpSectionCopy = {
  panel: {
    title: 'W czym mogę pomóc?',
    intro:
      'Poniżej znajdziesz wszystkie obszary pracy, w których wspieram pacjentów na co dzień. Każdą terapię dobieram indywidualnie – do Twojego stanu, potrzeb i celów.',
  },
  services: [
    {
      title: 'Terapia bólu',
      content: [
        'Fizjoterapia jest skuteczną metodą walki z bólem ostrym i przewlekłym. Pracuję m.in. technikami: terapii manualnej, suchego igłowania, akupunktury.',
        'Celem terapii jest natychmiastowa i długotrwała redukcja bólu oraz edukacja w zakresie autoterapii.',
      ],
      list: [
        'kręgosłupa (szyjnego, piersiowego, lędźwiowego, krzyżowego, rwa kulszowa, rwa barkowa, dyskopatie)',
        'barków, łokci, nadgarstków',
        'bioder, kolan, stóp',
        'miednicy (bóle menstruacyjne, kości ogonowej)',
        'głowy (migreny, napięciowe bóle, zawroty głowy)',
        'mięśniowych i psychosomatycznych',
        'czynnościowych zaburzeniach układu trawiennego',
      ],
      image: '/img/o-mnie.jpg',
    },
    {
      title: 'Fizjoterapia ortopedyczna',
      content: [
        'Pierwsza wizyta obejmuje wywiad, analizę dokumentacji i badanie manualne. Na tej podstawie tworzę indywidualny plan terapii.',
      ],
      list: [
        'zespoły bólowe i dysfunkcje kręgosłupa',
        'bóle mięśniowo-powięziowe',
        'migreny i napięcia psychosomatyczne',
        'dyskopatie, rwa kulszowa, rwa barkowa',
        'urazy stawów (kolano, bark, skokowy, biodro, nadgarstek)',
        'urazy więzadeł (ACL, MCL), łąkotek, ścięgna Achillesa',
        'pacjenci pooperacyjni',
        'zmiany przeciążeniowe (tendinopatie, entezopatie, zwyrodnienia)',
      ],
      image: '/img/o-mnie-2.jpg',
    },
    {
      title: 'Terapia manualna',
      content: [
        'Terapia oparta na badaniu i leczeniu ręcznym. Jej celem jest zmniejszenie bólu oraz przywrócenie prawidłowej ruchomości.',
      ],
      list: [
        'mobilizacje i manipulacje stawowe',
        'rozluźnianie mięśniowo-powięziowe',
        'masaż tkanek głębokich',
        'techniki rozciągające',
        'terapię narzędziową',
      ],
      image: '/img/o-mnie.jpg',
    },
    {
      title: 'Rehabilitacja sportowa',
      content: [
        'Pomagam sportowcom zawodowym i amatorom w rehabilitacji urazów ostrych, leczeniu przeciążeń i prewencji urazów.',
        'W razie potrzeby analizuję technikę ruchu (np. biegową) i dobieram ćwiczenia korygujące biomechanikę.',
      ],
      list: [
        'rehabilitacja urazów ostrych (skręcenia, operacje, zerwania)',
        'leczenie przeciążeń (tendinopatie, bóle przewlekłe)',
        'prewencja urazów (pre-rehab)',
      ],
      image: '/img/o-mnie-2.jpg',
    },
    {
      title: 'Rehabilitacja wad postawy',
      content: [
        'Pracuję z dziećmi i dorosłymi, oferując kompleksową ocenę i korekcję wad postawy.',
      ],
      list: [
        'ocena postawy i testy funkcjonalne',
        'korekcja wad: plecy okrągłe, wklęsłe, skoliozy, koślawość/szpotawość kolan, płaskostopie',
        'indywidualne ćwiczenia oraz edukacja ergonomiczna',
      ],
      image: '/img/o-mnie.jpg',
    },
    {
      title: 'Fizjoterapia stomatologiczna (TMJ)',
      content: [
        'Terapia zaburzeń w obrębie stawu skroniowo-żuchwowego. W terapii wykorzystuję techniki wewnątrzustne oraz pracę na mięśniach żucia i szyi.',
      ],
      list: [
        'bóle żuchwy i twarzy',
        'zaciskanie zębów, bruksizm',
        'bóle głowy pochodzenia stomatologicznego',
        'trzaski i ograniczenie otwierania ust',
      ],
      image: '/img/o-mnie-2.jpg',
    },
    {
      title: 'Trening medyczny i zdrowotny',
      content: [
        'Indywidualne zajęcia ukierunkowane na poprawę funkcjonowania i przygotowanie do aktywności.',
      ],
      list: [
        'poprawa stabilizacji i mobilności',
        'odbudowa siły po urazach',
        'bezpieczne przygotowanie do aktywności fizycznej',
        'wsparcie dla osób z bólem przewlekłym i wadami postawy',
      ],
      image: '/img/o-mnie.jpg',
    },
    {
      title: 'Akupunktura',
      content: [
        'Naturalna metoda wspierająca leczenie bólu i zaburzeń funkcjonalnych. Może być stosowana samodzielnie lub jako element złożonej terapii.',
      ],
      list: [
        'bóle kręgosłupa i stawów',
        'napięcia mięśniowe',
        'stres, bezsenność',
        'migreny',
        'zaburzenia trawienia',
      ],
      image: '/img/o-mnie-2.jpg',
    },
  ],
};

export const methods = {
  title: 'Metody pracy',
  intro:
    'W pracy z pacjentem korzystam z pełnej wiedzy, doświadczenia oraz szerokiego wachlarza metod fizjoterapeutycznych. Każdy plan terapii dobieram indywidualnie, zawsze przy pełnej komunikacji i za zgodą pacjenta.',

  methods: [
    {
      id: 'terapia-manualna',
      name: 'Terapia manualna',
      shortDescription:
        'Jedna z kluczowych metod leczenia zaburzeń funkcjonalnych narządu ruchu, oparta na manualnym badaniu i terapii.',
      description:
        'Terapia manualna jest jedną z kluczowych metod leczenia zaburzeń funkcjonalnych narządu ruchu. Podstawą tej metody jest dokładne, manualne badanie oraz terapia wykonywana dłońmi terapeuty. Jej celem jest redukcja bólu, poprawa zakresu ruchu i przywrócenie prawidłowej funkcji stawów, mięśni oraz powięzi. Dzięki obserwacji reakcji pacjenta podczas sesji terapia może być na bieżąco modyfikowana, co czyni ją jedną z najskuteczniejszych metod leczenia zespołów bólowych.',
      techniques: [
        'mobilizacje uciskowe (kompresja)',
        'techniki mięśniowo-powięziowe',
        'manipulacje i mobilizacje stawowe',
        'techniki rozciągające',
        'masaż głęboki',
        'terapia narzędziowa',
      ],
    },

    {
      id: 'igloterapia-sucha',
      name: 'Igłoterapia sucha (Dry Needling)',
      shortDescription:
        'Precyzyjne nakłuwanie punktów spustowych w napiętych mięśniach w celu redukcji bólu i napięcia.',
      description:
        'Igłoterapia sucha polega na precyzyjnym nakłuwaniu punktów spustowych w nadmiernie napiętych mięśniach przy użyciu cienkich, sterylnych igieł. Metoda ta zmniejsza ból mięśniowo-powięziowy, poprawia ukrwienie i przyspiesza regenerację tkanek. Jest szczególnie skuteczna w terapii przewlekłych napięć, przeciążeń, dolegliwości bólowych kręgosłupa oraz w rehabilitacji sportowej. Zabieg wykonywany jest w pełnej komunikacji z pacjentem i jest dobrze tolerowany.',
    },

    {
      id: 'akupunktura',
      name: 'Akupunktura',
      shortDescription:
        'Metoda wywodząca się z medycyny chińskiej, wykorzystująca cienkie igły do stymulacji określonych punktów na ciele.',
      description:
        'Akupunktura jest metodą terapeutyczną wywodzącą się z medycyny chińskiej. Polega na wprowadzaniu bardzo cienkich igieł w odpowiednio dobrane punkty na ciele. Reguluje napięcie tkanek, wspiera pracę układu nerwowego i stymuluje naturalne procesy regeneracyjne organizmu. Stosowana jest m.in. w leczeniu migren, bólów kręgosłupa, napięć stresowych, zaburzeń snu oraz w przewlekłych dolegliwościach bólowych. Stanowi doskonałe uzupełnienie terapii manualnej.',
    },

    {
      id: 'rehabilitacja-ruchowa',
      name: 'Rehabilitacja ruchowa',
      shortDescription:
        'Indywidualnie dobrane ćwiczenia lecznicze, trening medyczny i funkcjonalny przywracające prawidłowe wzorce ruchowe.',
      description:
        'Rehabilitacja ruchowa opiera się na indywidualnie dobranych ćwiczeniach leczniczych, które są podstawą skutecznego procesu rehabilitacji. Celem jest przywrócenie prawidłowych wzorców ruchowych, poprawa stabilizacji, siły, koordynacji oraz przygotowanie do pełnego funkcjonowania w życiu codziennym i aktywności fizycznej. Szczególne znaczenie ma odpowiednia rehabilitacja po urazach i zabiegach ortopedycznych. Końcowym etapem jest często trening medyczny lub funkcjonalny, ukierunkowany na utrzymanie sprawności i równowagi posturalnej.',
      focusAreas: [
        'przywracanie wzorców ruchowych',
        'trening medyczny i funkcjonalny',
        'stabilizacja i siła mięśniowa',
        'edukacja pacjenta i profilaktyka',
      ],
    },

    {
      id: 'fizjoterapia-stomatologiczna',
      name: 'Fizjoterapia stomatologiczna',
      shortDescription:
        'Terapia dysfunkcji stawu skroniowo-żuchwowego oraz mięśni żucia, często związanych ze stresem i nieprawidłowym napięciem.',
      description:
        'Fizjoterapia stomatologiczna zajmuje się diagnostyką i leczeniem dysfunkcji stawu skroniowo-żuchwowego, mięśni żucia oraz powiązanych struktur szyi i głowy. Jest pomocna w terapii bruksizmu, bólów głowy i twarzy, trzasków i przeskakiwania w stawie, a także dolegliwości wynikających ze stresu czy wad zgryzu. W trakcie terapii wykorzystuję techniki manualne, pracę na mięśniach żucia, mobilizacje stawowe, ćwiczenia oraz edukację pacjenta, dążąc do przywrócenia prawidłowej funkcji narządu żucia i zmniejszenia napięć.',
    },

    {
      id: 'terapia-wisceralna',
      name: 'Terapia wisceralna',
      shortDescription:
        'Delikatna praca manualna na narządach wewnętrznych i ich powiązaniach z układem mięśniowo-szkieletowym.',
      description:
        'Terapia wisceralna jest delikatną formą pracy manualnej ukierunkowaną na narządy wewnętrzne oraz ich połączenia z układem mięśniowo-szkieletowym. Celem jest poprawa ruchomości narządów względem siebie i otaczających je struktur, co wspiera prawidłowe funkcjonowanie układu trawiennego, oddechowego i wpływa na postawę ciała. Może przynieść korzyści w bólach brzucha, zaburzeniach trawienia, refluksie, zaparciach, bólach kręgosłupa (zwłaszcza lędźwiowego) oraz w stanach pooperacyjnych.',
    },

    {
      id: 'klawiterapia',
      name: 'Klawiterapia',
      shortDescription:
        'Nieinwazyjna stymulacja punktów na skórze za pomocą tępo zakończonych narzędzi (klawików).',
      description:
        'Klawiterapia polega na stymulowaniu odpowiednich punktów na skórze przy użyciu specjalnych, tępo zakończonych narzędzi zwanych klawikami. Pobudzanie tych punktów poprawia krążenie, zmniejsza napięcia mięśniowe oraz wspiera naturalne procesy regeneracyjne organizmu. Metoda ta sprawdza się w terapii przewlekłego bólu, przeciążeń, bólów głowy oraz w redukcji skutków stresu. Jest nieinwazyjna, dobrze tolerowana i może być alternatywą dla technik z użyciem igieł.',
    },

    {
      id: 'kinesiotaping',
      name: 'Kinesiotaping',
      shortDescription:
        'Elastyczne plastry wspierające pracę mięśni, powięzi i układu limfatycznego, często używane jako uzupełnienie terapii.',
      description:
        'Kinesiotaping wykorzystuje elastyczne plastry naklejane na skórę zgodnie z przebiegiem tkanek oraz łańcuchów mięśniowo-powięziowych. Aplikacje są poprzedzone badaniem funkcjonalnym, co pozwala dobrać optymalny sposób plastrowania. Kinesiotaping wspiera naturalne mechanizmy adaptacji i kompensacji organizmu, pomaga normalizować napięcie mięśniowe, zwiększa przestrzeń międzypowięziową i usprawnia przepływ limfy, dlatego często stosuję go w procedurach przeciwobrzękowych. Wykorzystuję go również w przebiegu rehabilitacji, aby skrócić czas poprawy funkcji oraz utrwalić efekty terapii manualnej.',
    },
  ],
};
