export const codition = [
  {
    id: 1,
    label: `Erectile Dysfunction`,
    pathname: "erectileDysfunction",
    price: 25,
  },
  {
    id: 2,
    label: `Premature Ejaculation`,
    pathname: "prematureEjaculation",
    price: 25,
  },
  {
    id: 3,
    label: `STI/STD`,
    pathname: "STISTD",
    price: 80,
  },
  // {
  //   id: 4,
  //   label: `Sexual Pain`,
  //   pathname: "sexualPain",
  // price: " $20"
  // },
  // {
  //   id: 5,
  //   label: `Emergency Contraception | Plan B`,
  //   pathname: "emergencyContraception",
  //  price: " $20"
  // },
  {
    id: 6,
    label: `Thrush / Bacterial Vaginosis`,
    pathname: "thrushBaceterialVaginosis",
    price: 80,
  },
  {
    id: 7,
    label: `Urinary Tract Infection`,
    pathname: "urinanryTractInfection",
    price: 80,
  },
];

export const erectileDysfunctionData = [
  {
    question: `What was your sex at birth?`,
    answer: [
      {
        answerName: `Male`,
        id: 1,
        uniq: "1male",
        next: 3,                                              //check the flow on different fage 
      },
      {
        answerName: `Female`,
        id: 2,
        uniq: "1female",
        next: 2,
      },
      {
        answerName: `Intersex `,
        id: 3,
        uniq: "1female",
        next: 3,
      },
    ],
    key: "option",
    id: 1,
    prev: 0,                                               //prev slide
    nextsub: true                                          //next slide consider on anwser or same to all anwser




  },
  {
    text: "It’s sounds as though you may have selected the wrong screening questionairre",     //  model params 
    heading: 'Finish your consult',
    menu: true,
    key: "model",
    id: 2,
    prev: 1,
    nextsub: false,




  },

  {
    question: `How would you identify your gender?`,
    answer: [
      {
        answerName: `Male`,
        id: 1,
        uniq: "1male",
      },
      {
        answerName: `Female`,
        id: 2,
        uniq: "1female",
      },
      {
        answerName: `Trans Masculine / Trans Male `,
        id: 3,
        uniq: "1female",
      },
      {
        answerName: `Trans Feminine / Trans Female `,
        id: 4,
        uniq: "1female",
      },
      {
        answerName: `I don’t identify with any of the above `,
        id: 5,
        uniq: "1female",
      },
    ],
    key: "option",
    id: 3,
    prev: 1,
    nextsub: false,
    next: 4

  },
  {
    question: `What is your Date of Birth?`,
    id: 4,
    key: "date",
    prev: 3,
    nextsub: false,
    notvalid: 5,                                                        // not valid date when were move 
    next: 6

  },
  {
    text: "We’re sorry, but at this stage as per our terms and conditions we’re only offering our online service to +18 year olds.",     //  model params 
    menu: false,
    key: "model",
    id: 5,
    prev: 1,
    nextsub: false,




  },
  {
    question: `What is your height?`,
    id: 6,
    key: "cm",
    prev: 4,
    nextsub: false,                                                     // not valid date when were move 
    next: 7
  },
  {
    question: `How often do your exercise?`,
    answer: [
      {
        answerName: `Not at all`,
        id: 1,
        uniq: "4not",
      },
      {
        answerName: `1-2 times / Weekly`,
        id: 2,
        uniq: "4week",
      },
      {
        answerName: `3-5 times / Weekly`,
        id: 3,
        uniq: "4time",
      },
      {
        answerName: `Everyday`,
        id: 4,
        uniq: "4every",
      },
    ],
    key: "option",
    id: 7,
    prev: 6,
    nextsub: false,
    next: 8
  },
  {
    question: `Do you drink alcohol?`,
    answer: [
      {
        answerName: `Not at all`,
        id: 1,
        uniq: "5not",
      },
      {
        answerName: `1-2 times / Weekly`,
        id: 2,
        uniq: "5week",
      },
      {
        answerName: `3-5 times / Weekly`,
        id: 3,
        uniq: "5time",
      },
      {
        answerName: `Everyday`,
        id: 4,
        uniq: "5every",
      },
    ],
    key: "option",
    id: 8,
    prev: 7,
    nextsub: false,
    next: 9
  },
  {
    question: `Do you smoke?`,
    answer: [
      {
        answerName: `Yes`,
        id: 2,
        uniq: "6yes",
      },
      {
        answerName: `No`,
        id: 1,
        uniq: "6no",
      },
    ],
    key: "option",
    id: 9,
    prev: 8,
    nextsub: false,
    next: 10
  },
  {
    question: `How would you rate your sleep?`,
    answer: [
      {
        answerName: `★`,
        id: 1,
        uniq: "71",
      },
      {
        answerName: `★ ★`,
        id: 2,
        uniq: "72",
      },
      {
        answerName: `★ ★ ★`,
        id: 3,
        uniq: "73",
      },
      {
        answerName: `★ ★ ★ ★`,
        id: 4,
        uniq: "74",
      },
      {
        answerName: `★ ★ ★ ★ ★`,
        id: 5,
        uniq: "75",
      },
    ],
    key: "option",
    id: 10,
    prev: 9,
    nextsub: false,
    next: 11
  },
  {
    question: `How would you rate your mood lately?`,
    answer: [
      {
        answerName: `★`,
        id: 1,
        uniq: "81",
      },
      {
        answerName: `★ ★`,
        id: 2,
        uniq: "82",
      },
      {
        answerName: `★ ★ ★`,
        id: 3,
        uniq: "83",
      },
      {
        answerName: `★ ★ ★ ★`,
        id: 4,
        uniq: "84",
      },
      {
        answerName: `★ ★ ★ ★ ★`,
        id: 5,
        uniq: "85",
      },
    ],
    key: "option",
    id: 11,
    prev: 10,
    nextsub: false,
    next: 12
  },
  {
    text: "Hang in there, we’re about 1/3 of the way through. Just a few more questions now related to your concern. Remember answers are only shared with your Doctor.",     //  model params 
    menu: false,
    key: "model",
    id: 12,
    prev: 1,
    nextsub: false,
    next: 13




  },
  {
    question: `How often do you have sex per week?`,
    answer: [
      {
        answerName: `Multiple  times per week`,
        id: 1,
        uniq: "91",
        // redirect: 14,
      },
      {
        answerName: `1-2 times per week`,
        id: 2,
        uniq: "92",
      },
      {
        answerName: `Once every week or so`,
        id: 3,
        uniq: "93",
      },
      {
        answerName: `A couple times a month, rarely`,
        id: 4,
        uniq: "94",
      },
      {
        answerName: `Rarely, a few times throughout the year`,
        id: 5,
        uniq: "95",
      },
    ],
    key: "option",
    id: 13,
    prev: 11,
    nextsub: false,
    next: 14,

  },
  {
    question: `So tell us a bit more about your difficulty getting an erection `,
    // subQuestion: `<p style=" color: #18181B;
    // margin-top: 25px;
    // font-weight: bold;
    // font-size: 2.0vh;
    // line-height: 26px;">Select any that apply to you</p>`,
    subQuestion:"Select any that apply to you",
    answer: [
      {
        answerName: `It's difficult to get hard`,
        id: 1,
        uniq: "101",
      },
      {
        answerName: `I lose my erection during sex  `,
        id: 2,
        uniq: "102",
      },
      {
        answerName: `Sometimes hard and other times not`,
        id: 3,
        uniq: "103",
      },
      {
        answerName: `Other`,
        id: 4,
        uniq: "104",
        isFlag: true,
        otherUniqueKey: "SoTellUsaBitMoreAbout",
      },
    ],
    key: "check",
    id: 14,
    prev: 13,
    nextsub: false,
    isother: true,
    next: 15,
    useranwser: []
  },
  {
    question: `Do you ever wake up with an erection?`,
    answer: [
      {
        answerName: `Never`,
        id: 1,
        uniq: "111",
      },
      {
        answerName: `1-2 times per week`,
        id: 2,
        uniq: "112",
      },
      {
        answerName: `3-5 times per week`,
        id: 3,
        uniq: "113",
      },
      {
        answerName: `Everyday`,
        id: 4,
        uniq: "114",
      },
    ],
    key: "option",
    id: 15,
    prev: 14,
    nextsub: false,
    next: 16,
  },
  {
    question: `When are you having trouble getting an erection?`,
    subQuestion: `Select any that apply`,
    answer: [
      {
        answerName: `All the time`,
        id: 1,
        uniq: "121",
      },
      {
        answerName: `When I'm stressed`,
        id: 2,
        uniq: "122",
      },
      {
        answerName: `With alcohol`,
        id: 3,
        uniq: "123",
      },
      {
        answerName: `With a new partner`,
        id: 4,
        uniq: "124",
      },
      {
        answerName: `Other`,
        id: 5,
        uniq: "125",
        isFlag: true,
        otherUniqueKey: "WhenAreEouHavingTrouble",
      },
    ],
    key: "check",
    id: 16,
    prev: 15,
    nextsub: false,
    isother: true,
    next: 17,
    useranwser: []

  },
  {
    question: `Do you have issues getting and staying hard when masturbating?`,
    subQuestion: `Select any that apply`,
    answer: [
      {
        answerName: `Yes, often`,
        id: 1,
        uniq: "131",
      },
      {
        answerName: `Yes, sometimes`,
        id: 2,
        uniq: "132",
      },
      {
        answerName: `Yes, but rarely`,
        id: 1,
        uniq: "133",
      },
      {
        answerName: `Never`,
        id: 2,
        uniq: "134",
      },
    ],
    key: "option",
    id: 17,
    checkBoxKeyname: "issuesGettingAndStayingHard",
    prev: 16,
    nextsub: false,
    next: 18,
  },
  {
    question: `Do you suffer from?`,
    subQuestion: `Select any that apply.`,
    answer: [
      {
        answerName: `Peyronie's disease. A curve in the penis that interferes with sex`,
        id: 1,
        uniq: "181",
      },
      {
        answerName: `Painful erections or ejaculation`,
        id: 2,
        uniq: "182",
      },
      {
        answerName: `Foreskin that is too tight`,
        id: 3,
        uniq: "183",
      },
      {
        answerName: `None of the above`,
        id: 4,
        uniq: "184 ",
        noneflag: true,
      },
    ],
    key: "check",
    id: 18,
    checkBoxKeyname: "doYouSufferFrom",
    prev: 17,
    nextsub: false,
    next: 19,
    isnone: true,
    useranwser: []

  },
  {
    question: `Have you ever taken or used any medications or supplements for erectile dysfunction before?`,
    subQuestion: `Including sildenafil (brand name Viagra), tadalafil (brand name Cialis) or avanafil (brand name Spedra).`,
    answer: [
      {
        answerName: `Yes`,
        id: 2,
        uniq: "192",
        next: 20,
        prev: 21,
      },
      {
        answerName: `No`,
        id: 1,
        uniq: "191",
        next: 22,
        prev: 19,
      },
    ],
    nextsub: true,
    prev: 18,
    key: "option",
    id: 19,
    isAnswerNo: true,
    noAnserRemoveIds: [20, 21]
  },
  {
    question: `What have you taken in the past?`,
    subQuestion: `This will help doctor find the best treatment for you.`,
    answer: [
      {
        answerName: `Numbing cream or gel`,
        id: 1,
        uniq: "191",
        isFlag: false,
      },
      {
        answerName: `SSRI Anti-Depressant (Eg. Paroxetine, Sertraline, Priligy)`,
        id: 2,
        uniq: "192",
        isFlag: false,
      },
      {
        answerName: `Erectile Medications (Sildenfail, Cialis)`,
        id: 3,
        uniq: "193",
        isFlag: false,
      },
      {
        answerName: `Other`,
        id: 4,
        uniq: "194",
        isFlag: true,
        otherUniqueKey: "whatHaveYouTaken",
      },
    ],
    key: "check",
    id: 20,
    prev: 19,
    nextsub: false,
    isother: true,
    next: 21,
    useranwser: []
  },
  {
    question: `Did you Experience and side Effects?`,
    subQuestion: `If no, type "no".`,
    key: "textarea",
    textareaKey: "didYouExperienceAndSideEffects",
    id: 21,
    prev: 20,
    nextsub: false,
    next: 22,
  },
  {
    question: `Have you ever experienced any issues with Premature Ejaculation before?     `,
    subQuestion: `PE (Premature Ejaculation) occurs when one ejaculates sooner during sexual intercourse then them or their partner likes.`,
    answer: [
      {
        answerName: `Yes`,
        id: 2,
        uniq: "192",
        next: 23,
        prev: 25,
      },
      {
        answerName: `No`,
        id: 1,
        uniq: "191",
        next: 26,
        prev: 22,
      },
    ],
    key: "option",
    id: 22,
    doubleflow: true,
    retrunid: 19,
    nextsub: true,
    isnoAnserRemove: true,
    isAnswerNo: true,
    noAnserRemoveIds: [23, 24, 25]
  },
  {
    question: `So tell us, do you have a problem ejaculating sooner than you or your partner would like? `,

    answer: [
      {
        answerName: `Yes, I generally always ejaculate before I want to`,
        id: 1,
        uniq: "191",
      },
      {
        answerName: `Yes, at least more than half the time`,
        id: 2,
        uniq: "192",
      },
      {
        answerName: `Yes, less than half the time`,
        id: 2,
        uniq: "193",
      },
      {
        answerName: `No, rarely`,
        id: 2,
        uniq: "194",
      },
    ],
    key: "option",
    id: 23,
    prev: 22,
    nextsub: false,
    next: 24,
  },
  {
    question: `Do you feel frustrated ejaculating before you want to?`,
    answer: [
      {
        answerName: `Not at all`,
        id: 1,
        uniq: "191",
      },
      {
        answerName: `Slightly`,
        id: 2,
        uniq: "192",
      },
      {
        answerName: `Moderately`,
        id: 2,
        uniq: "193",
      },
      {
        answerName: `Very`,
        id: 2,
        uniq: "194",
      },
      {
        answerName: `Extremely`,
        id: 2,
        uniq: "195",
      },
    ],
    key: "option",
    id: 24,
    prev: 23,
    nextsub: false,
    next: 25,
  },
  {
    question: `When did this become a problem?`,
    answer: [
      {
        answerName: `Recently with a new partner`,
        id: 1,
        uniq: "191",
      },
      {
        answerName: `Recently with an established partner `,
        id: 2,
        uniq: "192",
      },
      {
        answerName: `It has always been an issue for me`,
        id: 2,
        uniq: "193",
      },
      {
        answerName: `Sometime ago, with a new partner`,
        id: 2,
        uniq: "194",
      },
      {
        answerName: `Sometime ago, with an established partner`,
        id: 2,
        uniq: "195",
      },
    ],
    key: "option",
    id: 25,
    prev: 24,
    nextsub: false,
    next: 26,
  },
  {
    text: "Hang in there, we’re about 2/3 way through. Just a few more questions to go until you recieve a custom Treatment plan.",     //  model params 
    menu: false,
    key: "model",
    id: 26,
    prev: 25,
    nextsub: false,
    next: 27




  },

  {
    question: `Are you currently taking any medications or supplements?`,
    subQuestion: `Please consider this one carefully as it's important the doctor is aware of all of your medications.This includes any medications you may be taking be taking for premature ejaculation or any other conditions.`,
    answer: [
      {
        answerName: `Yes`,
        id: 2,
        uniq: "192",
        prev: 29,
        next: 28
      },
      {
        answerName: `No`,
        id: 1,
        uniq: "191",
        prev: 27,
        next: 30
      },
    ],
    key: "option",
    id: 27,
    nextsub: true,
    doubleflow: true,
    retrunid: 22,
    isnoAnserRemove: true,
    isAnswerNo: true,
    noAnserRemoveIds: [28, 29]
  },
  {
    question: `What medications or supplements are you currently taking?`,
    subQuestion: `Please include the name of medication and dosages. If you can't remember right now. Continue and the doctor will follow up later`,

    key: "textarea",
    textareaKey: "whatMedicationsOrSupplements",
    id: 28,
    prev: 27,
    nextsub: false,
    next: 29,
    isCheckbox: true
  },
  {
    question: `Just to make sure, are you taking any of the following medications?`,
    subQuestion: `It's Important that we know as they may interact with the medications your doctor prescribe to you`,
    answer: [
      {
        answerName: `Anti-Depressants (Eg. Zoloft, Lexapro, Endep)`,
        id: 1,
        uniq: "191",
      },
      {
        answerName: `MAO-Inhibitors (Eg. Moclobemide, Phenelzine)`,
        id: 2,
        uniq: "192",
      },
      {
        answerName: `Anti-Seizure Medication (Eg. Sodium Valproate, Carbamazepine)`,
        id: 2,
        uniq: "193",
      },
      {
        answerName: `St John's Wort`,
        id: 2,
        uniq: "194",
      },
      {
        answerName: `Trytophan-containing supplements`,
        id: 2,
        uniq: "195",
      },
      {
        answerName: `Prescription pain-relief (eg. Tramdol, Fentanyl)`,
        id: 2,
        uniq: "193",
      },
      {
        answerName: `Erectile medications (eg. Slidenafil) `,
        id: 2,
        uniq: "194",
      },
      {
        answerName: `None of these`,
        id: 2,
        uniq: "195",
        noneflag: true,
      },
    ],
    key: "check",
    id: 29,
    prev: 28,
    nextsub: false,
    next: 30,
    isnone: true,
    useranwser: []
  },
  {
    question: `Do you have any allergies?`,
    answer: [
      {
        answerName: `Yes`,
        id: 2,
        uniq: "192",
        next: 31,
        prev: 31,
      },
      {
        answerName: `No`,
        id: 1,
        uniq: "191",
        next: 32,
        prev: 30,
      },
    ],
    key: "option",
    id: 30,
    doubleflow: true,
    retrunid: 27,
    nextsub: true,
    isnoAnserRemove: true,
    isAnswerNo: true,
    noAnserRemoveIds: [31]

  },
  {
    question: `What allergies do you have?`,
    key: "textarea",
    id: 31,
    textareaKey: "whatAllergiesDoYouHave",
    qustionType: "allergies",
    prev: 30,
    nextsub: false,
    next: 32,
  },
  {
    question: `Do you use any recreational drugs?`,
    subQuestion: `Only your doctor will see this information and it is important that you are honest to help us decide on safe treatment for you`,
    answer: [
      {
        answerName: `No, I don't use drugs`,
        id: 1,
        uniq: "191",
        next: 36,
        prev: 32,
      },
      {
        answerName: `Sometimes`,
        id: 2,
        uniq: "192",
        next: 33,
        prev: 35,
      },
      {
        answerName: `Yes`,
        id: 2,
        uniq: "193",
        next: 33,
        prev: 35,
        // redirect: 18,
      },
    ],
    key: "option",
    id: 32,
    doubleflow: true,
    retrunid: 30,
    nextsub: true,
    isnoAnserRemove: true,
    isAnswerNo: true,
    noAnserRemoveIds: [33, 34, 35]
  },
  {
    question: `What recreational drugs do you use?`,
    subQuestion: `Only your doctor will see this information and it is important that you are honest to help us decide on safe treatment for you`,
    answer: [
      {
        answerName: `Cocaine`,
        id: 1,
        uniq: "191",
        // redirect: 19,
      },
      {
        answerName: `Marijuana/Cannabis`,
        id: 2,
        uniq: "192",
        // redirect: 18,
      },
      {
        answerName: `Ecstasy`,
        id: 2,
        uniq: "193",
        // redirect: 18,
      },
      {
        answerName: `MDMA`,
        id: 2,
        uniq: "194",
        // redirect: 18,
      },
      {
        answerName: `AmyI Nitrite (Poppers)`,
        id: 2,
        uniq: "195",
        // redirect: 18,
      },
      {
        answerName: `Ketamine`,
        id: 2,
        uniq: "193",
        // redirect: 18,
      },
      {
        answerName: `LSD or Acid`,
        id: 2,
        uniq: "194",
        // redirect: 18,
      },
      {
        answerName: `Other`,
        id: 2,
        uniq: "195",
        isFlag: true,
        otherUniqueKey: "whatRecreationalDrugs",

        // redirect: 18,
      },
    ],
    key: "check",
    id: 33,
    prev: 32,
    nextsub: false,
    isother: true,
    next: 34,
    useranwser: []
  },
  {
    question: `How often do you use these drugs?`,
    answer: [
      {
        answerName: `Most days`,
        id: 1,
        uniq: "191",
        // redirect: 19,
      },
      {
        answerName: `Weekly`,
        id: 2,
        uniq: "192",
        // redirect: 18,
      },
      {
        answerName: `Monthly`,
        id: 2,
        uniq: "193",
        // redirect: 18,
      },
      {
        answerName: `Rarely (a few times a year)`,
        id: 2,
        uniq: "194",
        // redirect: 18,
      },
    ],
    key: "option",
    id: 34,
    prev: 33,
    nextsub: false,
    next: 35,
  },
  {
    question: `A number of the medications that are prescribed through FRENCHIE M.D can interact dangerously with recreational drugs. Do you confirm that if you are prescribed a medication and warned about recreational drugs use that you agree to follow the instructions from your treating doctor about drug use?`,
    answer: [
      {
        answerName: `Yes`,
        id: 2,
        uniq: "192",
        // redirect: 18,
      },
      {
        answerName: `No`,
        id: 1,
        uniq: "191",
        // redirect: 27,
      },
    ],
    key: "option",
    id: 35,
    prev: 34,
    nextsub: false,
    next: 36,
  },
  {
    question: `Have you now or in the past ever suffered from any other medical conditions?`,
    answer: [
      {
        answerName: `No`,
        id: 1,
        uniq: "191",
        next: 38,
        prev: 36,
      },
      {
        answerName: `Yes`,
        id: 2,
        uniq: "192",
        next: 37,
        prev: 37,
      },
    ],
    key: "option",
    id: 36,
    doubleflow: true,
    retrunid: 32,
    nextsub: true,
    isnoAnserRemove: true,
    isAnswerNo: true,
    noAnserRemoveIds: [37]


  },
  {
    question: `Please describe what medical conditions you have suffered from now or in the past?`,
  
    key: "textarea",
    id: 37,
    textareaKey: "pleaseDescribeWhatMedicalConditions",
    prev: 36,
    nextsub: false,
    next: 38,
  },
  {
    question: `Do you have or have you ever had any of the following?`,
    answer: [
      {
        answerName: `Epilepsy or seizures`,
        id: 1,
        uniq: "191",
        next: 39,
        prev: 39,
      },
      {
        answerName: `Fainting`,
        id: 2,
        uniq: "192",
        next: 39,
        prev: 39,
      },
      {
        answerName: `Dizziness when standing up after lying down`,
        id: 2,
        uniq: "193",
        next: 39,
        prev: 39,
      },
      {
        answerName: `Bleeding or clotting disorder`,
        id: 2,
        uniq: "194",
        next: 39,
        prev: 39,
      },
      {
        answerName: `Any mood or psychotic disorders`,
        id: 2,
        uniq: "195",
        next: 39,
        prev: 39,
      },
      {
        answerName: `Any heart conditions or irregularities`,
        id: 2,
        uniq: "193",
        next: 39,
        prev: 39,
      },
      {
        answerName: `Migraines or severe headaches`,
        id: 2,
        uniq: "194",
        next: 39,
        prev: 39,
      },
      {
        answerName: `Narrowing of the arteries in your neck`,
        id: 2,
        uniq: "195",
        next: 39,
        prev: 39,
      },

      {
        answerName: `Peyronie's disease`,
        id: 2,
        uniq: "194",
        next: 39,
        prev: 39,
      },
      {
        answerName: `Surgical procedures on your penis`,
        id: 2,
        uniq: "195",
        next: 39,
        prev: 39,
      },
      {
        answerName: `Thyroid disease`,
        id: 2,
        uniq: "193",
        next: 39,
        prev: 39,
      },
      {
        answerName: `Diabetes`,
        id: 2,
        uniq: "194",
        next: 39,
        prev: 39,
      },
      {
        answerName: `Prostate related conditions`,
        id: 2,
        uniq: "195",
        next: 39,
        prev: 39,
      },
      {
        answerName: `None of the above`,
        id: 2,
        uniq: "195",
        next: 40,
        prev: 38,
        noneflag: true,
      },
    ],
    key: "check",
    id: 38,
    checkBoxKeyname: "qnyOfTheFollowing1",
    doubleflow: true,
    retrunid: 36,
    isnone: true,
    nextsub: true,
    useranwser: [],
    ui: 1,
    isnoAnserRemove: true,
    noAnserRemoveIds: [39]


  },
  {
    question: `Please give the doctor as much information as you can regarding this.`,

    key: "textarea",
    id: 39,
    textareaKey: "pleaseGiveTheDoctorAsMuch",
    prev: 38,
    nextsub: false,
    next: 40,
  },

  {
    question: `Do you ever experience any of the following symptoms when passing urine?`,
    subQuestion: `Select any that apply`,
    answer: [
      {
        answerName: `Problems with starting or stopping your stream`,
        id: 1,
        uniq: "191",
        // redirect: 19,
      },
      {
        answerName: `Going more then you used to, especially at night`,
        id: 2,
        uniq: "192",
        // redirect: 18,
      },
      {
        answerName: `Interrupted stream - stopping/starting/dribbling`,
        id: 2,
        uniq: "193",
        // redirect: 18,
      },
      {
        answerName: `Urge to go more often and less ability to hold on`,
        id: 2,
        uniq: "194",
        // redirect: 18,
      },
      {
        answerName: `None of the above`,
        id: 2,
        uniq: "194",
        noneflag: true,

        // redirect: 18,
      },
    ],
    key: "check",
    id: 40,
    checkBoxKeyname: "experienceWithPassingUrine",
    nextsub: false,
    next: 41,
    isnone: true,
    useranwser: [],
    doubleflow: true,
    retrunid: 38,
    isnoAnserRemove: true,
  },
  {
    question: `Would you prefer an on-demand treatment, needed to be taken a few hours before intercourse, or a daily treatment?`,
    subQuestion: `Please note, daily medication can be more effective and is better if you like to be spontaneous with sex. You will learn more about the medications if a doctor thinks it is suitable`,
    answer: [
      {
        answerName: `Daily`,
        id: 1,
        uniq: "191",
      },
      {
        answerName: `On-demand`,
        id: 2,
        uniq: "192",
      },
      {
        answerName: `Whatever the Doctor thinks is most suitable`,
        id: 3,
        uniq: "193",
      },
    ],
    key: "option",
    id: 41,
    prev: 40,
    nextsub: false,
    next: 42,
  },
  {
    question: `Do you confirm that the information you have given is true and accurate, that this medication is solely for yourself, and that if prescribed a medication, you will review the information supplied regarding the medication and side effects?`,
    answer: [
      {
        answerName: `Yes, I confirm`,
        id: 1,
        uniq: "191",
      },
      {
        answerName: `No, I do not confirm`,
        id: 2,
        uniq: "192",
      },
    ],
    key: "option",
    id: 42,
    prev: 41,
    nextsub: false,
    next: 43,
  },
  {
    question: `Is there anything else you would like to say to the Doctor?`,
    key: "textarea",
    id: 43,
    textareaKey: "doYouConfirmThatTheInformation",
    prev: 42,
    nextsub: false,
    next: 44,
    isCheckbox: true

  },
  {
    question: `Do you have preference for the gender of your treating Doctor?`,
    answer: [
      {
        answerName: `No preference`,
        id: 2,
        uniq: "yes",
      },
      {
        answerName: `Prefer Female`,
        id: 1,
        uniq: "no",
      },
      {
        answerName: `Prefer Male`,
        id: 3,
        uniq: "no",
      },
    ],
    key: "option",
    id: 44,
    prev: 43,
    nextsub: false,
    next: "done",
  },
];

export const STISTDData = [
  {
    question: `Have you ever been sexually active?`,
    answer: [
      {
        answerName: `Yes`,
        id: 1,
        uniq: "yes",
        next: 3
      },
      {
        answerName: `No`,
        id: 2,
        uniq: "No",
        next: 2
      },
    ],
    key: "option",
    id: 1,
    prev: 0,
    nextsub: true,


  },
  {
    text: "If you’re having symptoms try another flow or see your GP",     //  model params 
    menu: false,
    key: "model",
    id: 2,
    prev: 1,
    nextsub: false,
    next: 3
  },
  {
    question: `What was your sex at birth?`,
    answer: [
      {
        answerName: `Male`,
        id: 1,
        uniq: "1male",
      },
      {
        answerName: `Female`,
        id: 2,
        uniq: "1female",
      },
      {
        answerName: "Intersex ",
        id: 3,
        uniq: "1intersex",
      },
    ],
    key: "option",
    id: 3,
    prev: 1,
    next: 4,
    nextsub: false
  },
  {
    question: "How do you identify your gender?",
    answer: [
      {
        answerName: `Male`,
        id: 1,
        uniq: "1male",
        isNestedFlow: true,
        nestedReturnId: 10
      },
      {
        answerName: `Female`,
        id: 2,
        uniq: "1gay",
        highRiskNext: 12,
        prev: 10
        // redirect: 23,
      },
      {
        answerName: `Trans Masculine / Trans Male`,
        id: 2,
        uniq: "1gay",
        highRiskNext: 12,
        prev: 10
        // redirect: 23,
      },
      {
        answerName: `Trans Feminine / Trans Female`,
        id: 2,
        uniq: "1gay",
        isNestedFlow: true,
        nestedReturnId: 10
      },
      {
        answerName: `I don’t Identify with any of the above`,
        id: 2,
        uniq: "1gay",
        isNestedFlow: true,
        nestedReturnId: 10
      },
    ],
    key: "option",
    id: 4,
    prev: 3,
    next: 5,
    nextsub: false,
    isNoNestedAnswer: true,
    noAnserRemoveIds: [11, 13]
  },
  {
    question: `What is your Date of Birth?`,
    id: 5,
    key: "date",
    prev: 4,
    nextsub: false,
    next: 7,
    notvalid: 6,                                                        // not valid date when were move 
  },
  {
    text: "We’re sorry, but at this stage as per our terms and conditions we’re only offering our online service to +18 year olds.",     //  model params 
    menu: false,
    key: "model",
    id: 6,
    prev: 1,
    nextsub: false,
  },
  {
    question: `Do you identify as:`,
    answer: [
      {
        answerName: `Aboriginal`,
        id: 2,
        uniq: "yes",
      },
      {
        answerName: `Torres Strait Islander`,
        id: 1,
        uniq: "no",
      },
      {
        answerName: `Both`,
        id: 1,
        uniq: "no",
      },
      {
        answerName: `Neither`,
        id: 1,
        uniq: "no",
      },
    ],
    key: "option",
    id: 7,
    prev: 5,
    nextsub: false,
    next: 8
  },
  {
    text: "Ok, now for some questions to get to know a bit more about what's going on",     //  model params 
    menu: false,
    key: "model",
    id: 8,
    prev: 7,
    nextsub: false,
    next: 9
  },
  {
    question: `When was your last STI check?`,
    answer: [
      {
        answerName: `Never`,
        id: 2,
        uniq: "yes",
      },
      {
        answerName: `Within the last 3 months`,
        id: 1,
        uniq: "no",
      },
      {
        answerName: `About 3 months ago`,
        id: 1,
        uniq: "no",
      },
      {
        answerName: `3-12 months ago`,
        id: 1,
        uniq: "no",
      },
      {
        answerName: `Over a year ago`,
        id: 1,
        uniq: "no",
      },
    ],
    key: "option",
    id: 9,
    prev: 7,
    nextsub: false,
    next: 10
  },
  {
    question: `What are the sex/gender of your partner/s?`,
    answer: [
      {
        answerName: `Male`,
        id: 2,
        uniq: "yes",
        // redirect: 7,
        showId: 101,
        next: 11,
        nestedPrev: 11
      },
      {
        answerName: `Trans Feminine / Trans Female`,
        id: 1,
        uniq: "no",
        showId: 101,
        next: 11,
        nestedPrev: 11
      },
      {
        answerName: `Female`,
        id: 1,
        uniq: "no",
        showId: 100,
        next: 12
      },
      {
        answerName: `Trans Masculine / Trans Male`,
        id: 1,
        uniq: "no",
        showId: 100,
        next: 12
      },
    ],
    key: "check",
    id: 10,
    prev: 9,
    nextsub: true,
    useranwser: [],
    isNextDouble: true,
    nextReturnId: 4,
    nestedAnswerIds: [11, 13]
    // next:11
  },
  {
    question: `Have you taken PrEP in the last 3 months either on demand or daily? (PrEP is a medication some people take to prevent HIV)`,
    answer: [
      {
        answerName: `Yes`,
        id: 2,
        uniq: "yes",
        redirect: 9,
        next: 12,
        prev: 11
      },
      {
        answerName: `No`,
        id: 1,
        uniq: "no",
        prev: 13,
        next: 13,

      },
    ],
    key: "option",
    id: 11,
    nextsub: true,
    // doubleflow:true,
    prev: 10,
    nestedAnswerIds: [13]

  },
  {
    question: `Have you had condomless sex in the last 72 hours and concerned about HIV?`,
    answer: [
      {
        answerName: `Yes`,
        id: 2,
        uniq: "yes",
        next: 35
      },
      {
        answerName: `No`,
        id: 1,
        uniq: "no",
        next: 12
      },
    ],
    key: "option",
    id: 13,
    prev: 11,
    nextsub: true,
  },
  {
    question: `Safety Check! `,
    answer: [
      {
        answerName: `I feel generally unwell with or without fevers.`,
        id: 2,
        uniq: "yes",
        next: 35
      },
      {
        answerName: `I have moderate to severe testicular or rectal pain.`,
        id: 1,
        uniq: "no",
        next: 35
      },
      {
        answerName: `I have copious discharge (from penis or rectum).`,
        id: 1,
        uniq: "no",
        next: 35
      },
      {
        answerName: `I have new lumps, ulcers, or rashes near my genitals.`,
        id: 1,
        uniq: "no",
        next: 35
      },
      {
        answerName: `I have been told I am a contact of syphilis.`,
        id: 1,
        uniq: "no",
        next: 35
      },
      {
        answerName: `I have been exposed to hepatitis B and I’m not vaccinated.`,
        id: 1,
        uniq: "no",
        next: 35
      },
      {
        answerName: `None of the above, my symptoms are milder in nature or none at all`,
        id: 1,
        uniq: "no",
        noneflag: true,
        next: 14
      },
    ],
    key: "check",
    id: 12,
    isnone: true,
    nextsub: true,
    useranwser: [],
    doubleflow: true,
    retrunid: 4,
    isnoAnserRemove: true
  },
  {
    isVerticle: true,
    heading: 'vertcle',
    menu: true,
    key: "model",
    id: 35,
    nextsub: false,
  },

  {
    question: `Let’s talk about your symptoms`,
    subQuestion: `Please select any that may apply to you`,
    answer: [
      {
        answerName: `Burning or pain with urine`,
        id: 1,
        uniq: "no",
      },
      {
        answerName: `Discharge from urethra/penis`,
        id: 1,
        uniq: "no",
      },
      {
        answerName: `Discharge from rectum`,
        id: 1,
        uniq: "no",
      },
      {
        answerName: `Discharge from vagina`,
        id: 1,
        uniq: "no",
      },
      {
        answerName: `Burning or pain when opening bowels`,
        id: 1,
        uniq: "no",
      },
      {
        answerName: `Mild pain elsewhere (specify)`,
        id: 1,
        uniq: "no",
        isFlag: true,
        otherUniqueKey: { key: "mildPainSymptoms", value: "", answer: `Mild pain elsewhere (specify)` },
      },
      {
        answerName: `Skin changes (specify)`,
        id: 1,
        uniq: "no",
        isFlag: true,
        otherUniqueKey: { key: "mildPainSymptoms", value: "", answer: `Mild pain elsewhere (specify)` },
      },
      {
        answerName: `None`,
        id: 2,
        uniq: "yes",
        noneflag: true,
      },
      {
        answerName: `Other`,
        id: 1,
        uniq: "no",
        isFlag: true,
        otherUniqueKey: { key: "let’sTalkAboutYourSymptoms", value: "", answer: `Other` },
      },
    ],
    key: "check",
    id: 14,
    prev: 12,
    nextsub: false,
    isother: true,
    noneflag: true,
    next: 15,
    useranwser: [],
    nextsub: false,
    isOtherMultiple: true,
    userotheranwser: ""
  },
  {
    question: `A few final questions then we’re done `,
    subQuestion: `Please select any that may apply to you`,
    answer: [
      {
        answerName: `I have taken money for sex in the last 12 months`,
        id: 1,
        uniq: "no",
      },
      {
        answerName: `I have shared injecting equipment in my lifetime`,
        id: 2,
        uniq: "yes",
      },
      {
        answerName: `I have previously been treated for syphilis`,
        id: 2,
        uniq: "yes",
      },
      {
        answerName: `I am living with HIV`,
        id: 2,
        uniq: "yes",
      },
      {
        answerName: `I am living with hepatitis B`,
        id: 2,
        uniq: "yes",
      },
      {
        answerName: `I am living with hepatitis C`,
        id: 2,
        uniq: "yes",
      },
      {
        answerName: `None of the above`,
        id: 2,
        noneflag: true,
        uniq: "yes",
      },
    ],
    key: "check",
    id: 15,
    prev: 14,
    noneflag: true,
    next: 17,
    nextsub: false,
    useranwser: [],

  },
  {
    question: `Are you currently taking any medications or supplements?`,
    subQuestion: `Please consider this one carefully as it's important the doctor is aware of all of your medications.`,
    answer: [
      {
        answerName: `Yes`,
        id: 2,
        uniq: "yes",
        next: 18,
        prev: 18
      },
      {
        answerName: `No`,
        id: 1,
        uniq: "no",
        // redirect: 15,
        prev: 17,
        next: 19
      },
    ],
    key: "option",
    id: 17,
    nextsub: true,
    prev: 15,
    isAnswerNo: true,
    noAnserRemoveIds: [18]
  },
  {
    question: `What medications or supplements are you currently taking?`,
    subQuestion: `Please includes the name of the medication and dosages. If you can't remember right now, Countinue and the doctor will follow up later.`,
    key: "textarea",
    textareaKey: "whatMedicationsOrSupplements",
    id: 18,
    prev: 17,
    nextsub: false,
    next: 19,
    isCheckbox: true

  },
  {
    question: `Do you have any allergies? `,
    answer: [
      {
        answerName: `Yes`,
        id: 2,
        uniq: "yes",
        next: 20,
        prev: 20
      },
      {
        answerName: `No`,
        id: 1,
        uniq: "no",
        // redirect: 17,
        next: 21,
        prev: 19

      },
    ],
    key: "option",
    id: 19,
    prev: 18,
    nextsub: true,
    doubleflow: true,
    retrunid: 17,
    isnoAnserRemove: true,
    isAnswerNo: true,
    noAnserRemoveIds: [20]
  },
  {
    question: `What allergies do you have?`,
    key: "textarea",
    id: 20,
    textareaKey: "whatAllergiesDoYouHave",
    qustionType: "allergies",
    prev: 19,
    next: 21,

  },

  {
    question: `We just want to confirm, no allergies to penicillin or sulfonamides? `,
    answer: [
      {
        answerName: `Yes`,
        id: 2,
        uniq: "yes",
      },
      {
        answerName: `No`,
        id: 1,
        uniq: "no",
      },
    ],
    key: "option",
    id: 21,
    doubleflow: true,
    retrunid: 19,
    nextsub: false,
    next: 22,
    isnoAnserRemove: true,
  },
  {
    question: `Do you confirm that the information you have given is true and accurate, that this medication is solely for yourself, and that if prescribed a medication, you will review the information supplied regarding the medication and side effects? `,
    answer: [
      {
        answerName: `Yes, I confirm`,
        id: 2,
        uniq: "yes",
      },
      {
        answerName: `No, I do not confirm`,
        id: 1,
        uniq: "no",
      },
    ],
    key: "option",
    id: 22,
    prev: 21,
    next: 23,
    nextsub: false
  },
  {
    question:
      "I further agree If i have any symptoms,I will refrain from sexual activity until I recieve my results Follow any instructions with any positive results I may have",
    
    answer: [
      {
        answerName: `Yes, I confirm`,
        id: 2,
        uniq: "yes",
      },
      {
        answerName: `No, I do not confirm`,
        id: 1,
        uniq: "no",
      },
    ],
    key: "option",
    id: 23,
    prev: 22,
    next: 24,
    nextsub: false
  },

  {
    question: `Is there anything else you would like to say to the Doctor?`,
    key: "textarea",
    id: 24,
    textareaKey: "isThereAnythingElseYouWould",
    prev: 23,
    nextsub: false,
    next: 25,
    isCheckbox: true

  },
  {
    question: `Do you have preference for the gender of your treating Doctor?`,
    answer: [
      {
        answerName: `No preference`,
        id: 2,
        uniq: "yes",
      },
      {
        answerName: `Prefer Female`,
        id: 1,
        uniq: "no",
      },
      {
        answerName: `Prefer Male`,
        id: 3,
        uniq: "no",
      },
    ],
    key: "option",
    prev: 24,
    nextsub: false,
    next: "done",
    id: 25,
  },
 
];

export const thrushBaceterialVaginosisData = [
  {
    question: `What was your sex at birth?`,
    answer: [
      {
        answerName: `Male`,
        id: 1,
        uniq: "1male",
        next: 2,
      },
      {
        answerName: `Female`,
        id: 2,
        uniq: "1female",
        next: 3,
      },
      {
        answerName: "Intersex ",
        id: 3,
        uniq: "1intersex",
        next: 3,
      },
    ],
    key: "option",
    id: 1,
    prev: 0,
    nextsub: true,
  },
  {
    text: "It’ sounds as though you may have STI symptoms not thrush or BV. Would you like us to redirect you to our STI treatment questionnaire ? ", //  model params
    heading: "Finish your consult",
    subHeading: "We're almost there.",
    menu: false,
    key: "model",
    id: 2,
    nextsub: false,
    isTwoButton: true,
  },
  {
    question: `How would you identify your gender?`,
    answer: [
      {
        answerName: `Male`,
        id: 1,
        uniq: "1",
      },
      {
        answerName: `Female`,
        id: 2,
        uniq: "2",
      },
      {
        answerName: `Trans-Masculine / Trans-Male`,
        id: 3,
        uniq: "3",
      },
      {
        answerName: `Trans-Feminine / Trans-Female`,
        id: 4,
        uniq: "4",
      },
      {
        answerName: `I don't indentify with any of the above`,
        id: 5,
        uniq: "5",
      },
    ],
    key: "option",
    prev: 1,
    id: 3,
    next: 4,
    nextsub: false,
  },
  {
    question: `What is your Date of Birth?`,
    key: "date",
    prev: 3,
    id: 4,
    next: 5,
    nextsub: false,
    notvalid: 6,
  },
  {
    text: "We’re sorry, but at this stage as per our terms and conditions we’re only offering our online service to +18 year olds.", //  model params
    menu: false,
    key: "model",
    id: 6,
    prev: 1,
    nextsub: false,
  },
  {
    text: "Ok, now for some important questions, they help us better get to know what’s going on.", //  model params
    menu: false,
    key: "model",
    id: 5,
    prev: 1,
    next: 7,
    nextsub: false,
  },
  {
    question: `Have you experienced changes to vaginal discharge?`,
    answer: [
      {
        answerName: `Yes`,
        id: 1,
        uniq: "1",
        prev: 9,
        next: 8,
      },
      {
        answerName: `No`,
        id: 2,
        uniq: "2",
        prev: 7,
        next: 10,
      },
    ],
    key: "option",
    id: 7,
    prev: 4,
    nextsub: true,
    isAnswerNo: true,
    noAnserRemoveIds: [8, 9],
  },
  {
    question: `Let’s talk more about your discharge`,
    subQuestion: `Please select any of the following that apply to your discharge`,
    answer: [
      {
        answerName: `Has a new odour`,
        id: 1,
        uniq: "1",
        // redirect: 10,
      },
      {
        answerName: `Thick and adherant`,
        id: 2,
        uniq: "2",
        // redirect :
      },
      {
        answerName: `Other Changes - please specify`,
        id: 3,
        uniq: "3",
        isFlagss: true,

        // redirect :
      },
    ],
    key: "option",
    id: 8,
    prev: 7,
    next: 9,
    useranwser: []
  },
  {
    question: `Have you recently used any feminine hygiene products or douches?`,
    answer: [
      {
        answerName: `Yes`,
        id: 1,
        uniq: "1",
      },
      {
        answerName: `No`,
        id: 2,
        uniq: "2",
        // redirect :
      },
    ],
    key: "option",
    id: 9,
    prev: 8,
    next: 10,
  },
  {
    question: `Have you experienced any of the following recently`,
    answer: [
      {
        answerName: ` itchiness or irritation to the vulva`,
        id: 1,
        uniq: "1",
      },
      {
        answerName: `pain or burning when passing urine`,
        id: 2,
        uniq: "2",
        // redirect :
      },
    ],
    key: "option",
    id: 10,
    prev: 9,
    next: 11,
    doubleflow: true,
    retrunid: 7,
    isnoAnserRemove: true
  },
  {
    question: `Are you currently sexually active?`,
    answer: [
      {
        answerName: `Yes`,
        id: 1,
        uniq: "1",
        next: 12,
        prev: 13,
      },
      {
        answerName: `No`,
        id: 2,
        uniq: "2",
        next: 16,
        prev: 11,
      },
    ],
    key: "option",
    id: 11,
    prev: 10,
    nextsub: true,
    noAnserRemoveIds: [12, 13, 14],
    isAnswerNo: true
  },
  {
    question: `Do you currently experience pain if having penetrative vaginal sex?`,
    answer: [
      {
        answerName: `Yes`,
        id: 1,
        uniq: "1",
      },
      {
        answerName: `No`,
        id: 2,
        uniq: "2",
        // redirect :
      },
    ],
    key: "option",
    id: 12,
    prev: 11,
    next: 13,
  },
  {
    question: `Do you have unprotected sex with any of these partners?`,
    answer: [
      {
        answerName: `Yes`,
        id: 1,
        uniq: "1",
      },
      {
        answerName: `No`,
        id: 2,
        uniq: "2",
        // redirect :
      },
    ],
    key: "option",
    id: 13,
    prev: 12,
    next: 16,
  },
 
  {
    text: "Hang in there, we’re about 2/3 way through. Just a few more questions to go until you recieve a custom Treatment plan.", //  model params
    menu: false,
    key: "model",
    id: 16,
    nextsub: false,
    next: 17,
  },
  {
    question: `Are you currently taking any medications or supplements?`,
    subQuestion: `Please consider this one carefully as its important the doctor is aware of all your medications. Please include any antibiotics, oral contraception (i.e. the pill) or hormone replacement therapy.`,
    answer: [
      {
        answerName: `Yes`,
        id: 2,
        uniq: "yes",
        next: 19,
        prev: 19,
      },
      {
        answerName: `No`,
        id: 1,
        uniq: "no",
        next: 18,
        prev: 18,
      },
    ],
    key: "option",
    id: 17,
    doubleflow: true,
    retrunid: 11,
    nextsub: true,
    isnoAnserRemove: true,
    isAnswerYes: true,
    yesAnserRemoveIds: [18]
  },

  {
    question: `Just to make sure, are you taking any medication for the condition, like an anti-fungal or an antifungal cream?`,
    answer: [
      {
        answerName: `Yes`,
        id: 2,
        uniq: "yes",
        next: 19,
      },
      {
        answerName: `No`,
        id: 1,
        uniq: "no",
        next: 20,
      },
    ],
    key: "option",
    id: 18,
    nextsub: true,
    prev: 17,
  },
  // MEDICATION YES
  {
    question: `What medications or supplements are you currently taking?`,
    subQuestion: `Please include the name of medication and dosages. If you can't remember right now. Continue and the doctor will follow up later`,

    key: "textarea",
    id: 19,
    textareaKey: "whatMedicationsOrSupplements",
    prev: 17,
    next: 20,
    isCheckbox: true

  },
  {
    question: `Do you have any allergies?`,
    answer: [
      {
        answerName: `Yes`,
        id: 2,
        uniq: "192",
        prev: 21,
        next: 21
      },
      {
        answerName: `No`,
        id: 1,
        uniq: "191",
        next: 22,
        prev: 20

        // redirect: 17,
      },
    ],
    key: "option",
    id: 20,
    doubleflow: true,
    retrunid: 17,
    nextsub: true,
    isnoAnserRemove: true,
    isAnswerNo: true,
    noAnserRemoveIds: [21]
  },
  {
    question: `What allergies do you have?`,
    key: "textarea",
    id: 21,
    prev: 20,
    next: 22,
    textareaKey: "whatAllergiesDoYouHave",
    qustionType: "allergies",
  },

  {
    question: `Have you now or in past ever had any medication conditions? e.g. diabetes, immunosuppression, skin conditions`,
    answer: [
      {
        answerName: `Yes`,
        id: 2,
        uniq: "192",
        prev: 23,
        next: 23
        //
      },
      {
        answerName: `No`,
        id: 1,
        uniq: "191",
        redirect: 19,
        prev: 22,
        next: 24
      },
    ],
    key: "option",
    id: 22,
    doubleflow: true,
    retrunid: 20,
    nextsub: true,
    isnoAnserRemove: true,
    isAnswerNo: true,
    noAnserRemoveIds: [23]

  },
  {
    question: `Please describe what medical conditions you have suffered from now or in the past?`,
    key: "textarea",
    id: 23,
    prev: 22,
    next: 24,
    textareaKey: "pleaseDescribeWhatMedicalConditions",
  },
  {
    question: `Please select any that apply to you`,
    answer: [
      {
        answerName: `I smoke cigarettes or vape`,
        id: 2,
        uniq: "192",
        // prev: 22,
        // redirect: 18,
      },
      {
        answerName: `Currently menstruating`,
        id: 1,
        uniq: "191",
      },
      {
        answerName: `Antibiotic use in the last 2 weeks`,
        id: 1,
        uniq: "191",
      },
      {
        answerName: `Recurrent thrush/candidiasis`,
        id: 1,
        uniq: "191",
      },
      {
        answerName: `STI treated within the last month`,
        id: 1,
        uniq: "191",
      },
      {
        answerName: `Current Pregnancy or Breastfeeding`,
        id: 1,
        uniq: "191",
      },
      {
        answerName: `Currently have an IUD (hormonal or copper)?`,
        id: 1,
        uniq: "191",
      },
      {
        answerName: `None of the above`,
        id: 1,
        uniq: "191 ",
        noneflag: true,
      },
    ],
    key: "check",
    id: 24,
    next: 25,
    retrunid: 22,
    doubleflow: true,
    isnone: true,
    useranwser: [],
    isnoAnserRemove: true,
  },

  {
    question: `Do you confirm that the information you have given is true and accurate, that this medication is solely for yourself, and that if prescribed a medication, you will review the information supplied regarding the medication and side effects?`,
    answer: [
      {
        answerName: `Yes, I confirm`,
        id: 1,
        uniq: "191",
      },
      {
        answerName: `No, I do not confirm`,
        id: 2,
        uniq: "192",
      },
    ],
    key: "option",
    id: 25,
    prev: 24,
    next: 26
  },
  {
    question: `Is there anything else you would like to say to the Doctor?`,
    key: "textarea",
    id: 26,
    prev: 25,
    next: 27,
    textareaKey: "isThereAnythingElseYou",
    isCheckbox: true,
  },
  {
    question: `Do you have preference for the gender of your treating Doctor?`,
    answer: [
      {
        answerName: `No preference`,
        id: 2,
        uniq: "yes",
      },
      {
        answerName: `Prefer Female`,
        id: 1,
        uniq: "no",
      },
      {
        answerName: `Prefer Male`,
        id: 3,
        uniq: "no",
      },
    ],
    key: "option",
    id: 27,
    next: "done",
    prev: 26,
  },
];

export const urinanryTractInfectionData= [
  {
    question: `What was your sex at birth?`,
    answer: [
      {
        answerName: `Male`,
        id: 1,
        uniq: "1",
        next: 2
      },
      {
        answerName: `Female`,
        id: 2,
        uniq: "2",
        next: 3

      },
      {
        answerName: "Intersex ",
        id: 3,
        uniq: "1intersex",
        next: 3

      },
    ],
    key: "option",
    id: 1,
    prev: 0,
    nextsub: true
  },
  {
    text: "UTI’s are extremely rare in Men under 60. If you are under 60 years of age would you like us to redirect you to our STI treatment questionnaire?", //  model params
    heading: "Finish your consult",
    menu: false,
    key: "model",
    id: 2,
    next: 3,
    nextsub: false,
    isTwoButton: true,
  },
  {
    question: `How would you identify your gender?`,
    answer: [
      {
        answerName: `Male`,
        id: 1,
        uniq: "1",
      },
      {
        answerName: `Female`,
        id: 2,
        uniq: "2",
      },
      {
        answerName: `Trans-Masculine / Trans-Male`,
        id: 3,
        uniq: "3",
      },
      {
        answerName: `Trans-Feminine / Trans-Female`,
        id: 4,
        uniq: "4",
      },
      {
        answerName: `I don't indentify with any of the above`,
        id: 5,
        uniq: "5",
      },
    ],
    key: "option",
    id: 3,
    prev: 1,
    next: 4
  },

  {
    question: `What is your Date of Birth?`,
    key: "date",
    id: 4,
    prev: 1,
    next: 5,
    nextsub: false,
    notvalid: 6,
  },
  {
    text: "We’re sorry, but at this stage as per our terms and conditions we’re only offering our online service to +18 year olds.", //  model params
    menu: false,
    key: "model",
    id: 6,
    prev: 1,
    nextsub: false,
  },
  {
    text: "Ok, now for some important questions, they help us better get to know what’s going on.", //  model params
    menu: false,
    key: "model",
    id: 5,
    next: 7,
    nextsub: false,
  },
  {
    question: `Have you experienced frequent passing of urine (going to the toilet often)?`,
    answer: [
      {
        answerName: `Did not have`,
        id: 1,
        uniq: "1",
      },
      {
        answerName: `Mild`,
        id: 2,
        uniq: "2",
      },
      {
        answerName: `Moderate`,
        id: 3,
        uniq: "3",
      },
      {
        answerName: `Severe`,
        id: 4,
        uniq: "4",
      },
    ],
    key: "option",
    id: 7,
    next: 8,
    prev: 4
  },
  {
    question: `Have you experienced a strong urge to suddenly pass urine?`,
    answer: [
      {
        answerName: `Did not have`,
        id: 1,
        uniq: "1",
      },
      {
        answerName: `Mild`,
        id: 2,
        uniq: "2",
      },
      {
        answerName: `Moderate`,
        id: 3,
        uniq: "3",
      },
      {
        answerName: `Severe`,
        id: 4,
        uniq: "4",
      },
    ],
    key: "option",
    id: 8,
    next: 9,
    prev: 7
  },
  {
    question: `Have you experienced pain or burning on passing urine?`,
    answer: [
      {
        answerName: `Did not have`,
        id: 1,
        uniq: "1",
      },
      {
        answerName: `Mild`,
        id: 2,
        uniq: "2",
      },
      {
        answerName: `Moderate`,
        id: 3,
        uniq: "3",
      },
      {
        answerName: `Severe`,
        id: 4,
        uniq: "4",
      },
    ],
    key: "option",
    id: 9,
    next: 10,
    prev: 8
  },
  {
    question: `Have you experienced any of the following`,
    subQuestion: `Select any that apply`,
    answer: [
      {
        answerName: ` New abdominal/pelvic pain`,
        id: 1,
        uniq: "1",
      },
      {
        answerName: `New lower back pain`,
        id: 2,
        uniq: "2",
      },
      {
        answerName: `The sensation of incomplete empyting`,
        id: 3,
        uniq: "3",
      },
      {
        answerName: `Nausea`,
        id: 4,
        uniq: "4",
      },
      {
        answerName: `Vomiting`,
        id: 4,
        uniq: "4",
      },
      {
        answerName: `Fevers, chills, rigors`,
        id: 4,
        uniq: "4",
      },
      {
        answerName: `Changes to discharge`,
        id: 4,
        uniq: "4",
      },
    ],
    key: "check",
    id: 10,
    next: 11,
    prev: 9,
    useranwser: []
  },
  {
    question: `Have you passed any blood in your urine and currently not menstruating? `,
    answer: [
      {
        answerName: `No`,
        id: 1,
        uniq: "1",
      },
      {
        answerName: `Some blood on wiping`,
        id: 2,
        uniq: "2",
      },
      {
        answerName: `Blood in toilet bowl (rose coloured or frank blood)`,
        id: 3,
        uniq: "3",
      },
    ],
    key: "option",
    id: 11,
    next: 12,
    prev: 10,
  },
  {
    text: "Hang in there, we’re about 2/3 way through. Just a few more questions to go until you recieve a custom Treatment plan.", //  model params
    menu: false,
    key: "model",
    id: 12,
    nextsub: false,
    next: 13,
  },
  {
    question: `Are you currently sexually active?`,
    answer: [
      {
        answerName: `Yes`,
        id: 1,
        uniq: "1",
        next: 14,
        prev: 14
      },
      {
        answerName: `No`,
        id: 2,
        uniq: "2",
        next: 17,
        prev: 13

      },
    ],
    key: "option",
    id: 13,
    nextsub: true,
    prev: 11,
    isAnswerNo: true,
    noAnserRemoveIds: [14],
  },
  {
    question: `Do you have unprotected sex with any of these partners?`,
    answer: [
      {
        answerName: `Yes`,
        id: 1,
        uniq: "1",
      },
      {
        answerName: `No`,
        id: 2,
        uniq: "2",
      },
    ],
    key: "option",
    id: 14,
    prev: 13,
    next: 17
  },
  {
    question: `Are you currently taking any medications or supplements?`,
    subQuestion: `Please consider this one carefully as its important the doctor is aware of all your medications. Please include any antibiotics, oral contraception (i.e. the pill) or hormone replacement therapy.`,
    answer: [
      {
        answerName: `Yes`,
        id: 2,
        uniq: "yes",
        next: 18,
        prev: 18
      },
      {
        answerName: `No`,
        id: 1,
        uniq: "no",
        next: 19,
        prev: 17
      },
    ],
    key: "option",
    id: 17,
       doubleflow: true,
    retrunid: 13,
    nextsub: true,
    // prev: 14,
    isnoAnserRemove: true,
    isAnswerNo: true,
    noAnserRemoveIds: [18],
  },
  {
    question: `What medications or supplements are you currently taking?`,
    subQuestion: `Please include the name of medication and dosages.  You can't remember right now. Continue and the doctor will follow up later`,

    key: "textarea",
    id: 18,
    textareaKey: "whatMedicationsOrSupplements",
    isCheckbox: true,
    next: 19,
    prev: 17
  },
  {
    question: `Do you have any allergies?`,
    answer: [
      {
        answerName: `Yes`,
        id: 2,
        uniq: "192",
        prev: 20,
        next: 20
        // redirect: 18,
      },
      {
        answerName: `No`,
        id: 1,
        uniq: "191",
        redirect: 16,
        next: 21,
        prev: 19,

      },
    ],
    key: "option",
    id: 19,
    doubleflow: true,
    retrunid: 17,
    nextsub: true,
    isnoAnserRemove: true,
    isAnswerNo: true,
    noAnserRemoveIds: [20]
  },
  {
    question: `What allergies do you have?`,
    key: "textarea",
    id: 20,
    next: 21,
    prev: 19,
    textareaKey: "whatAllergiesDoYouHave",
    qustionType: "allergies",
  },
  {
    question: `We just want to confirm, no allergies to penicillin or sulfonamides?`,
    answer: [
      {
        answerName: `Yes`,
        id: 2,
        uniq: "192",
        prev: 22,
        // redirect: 18,
      },
      {
        answerName: `No`,
        id: 1,
        uniq: "191",
      },
    ],
    key: "option",
    id: 21,
    next: 22,
    doubleflow: true,
    retrunid: 19,
    isnoAnserRemove: true
  },
  {
    question: `Have you now or in past ever had any medication conditions? `,
    subQuestion: `e.g. diabetes, immunosuppression, skin conditions`,
    answer: [
      {
        answerName: `Yes`,
        id: 2,
        uniq: "192",
        prev: 23,
        next: 23
        // redirect: 18,
      },
      {
        answerName: `No`,
        id: 1,
        uniq: "191",
        redirect: 19,
        prev: 22,
        next: 24
      },
    ],
    key: "option",
    id: 22,
    prev: 21,
    // next: 23
    nextsub:true,
    isAnswerNo: true,
    noAnserRemoveIds: [23]
  },
  {
    question: `Please describe what medical conditions you have suffered from now or in the past?`,
    key: "textarea",
    id: 23,
    prev: 22,
    next: 24,
    textareaKey: "pleaseDescribeWhatMedicalConditions",
  },
  {
    question: `Please select any that apply to you`,
    answer: [
      {
        answerName: `I smoke cigarettes or vape`,
        id: 2,
        uniq: "192",
        // prev: 22,
        // redirect: 18,
      },
      {
        answerName: `Currently menstruating`,
        id: 1,
        uniq: "191",
      },
      {
        answerName: `Antibiotic use in the last 2 weeks`,
        id: 1,
        uniq: "191",
      },
      {
        answerName: `Recurrent thrush/candidiasis`,
        id: 1,
        uniq: "191",
      },
      {
        answerName: `STI treated within the last month`,
        id: 1,
        uniq: "191",
      },
      {
        answerName: `Current Pregnancy or Breastfeeding`,
        id: 1,
        uniq: "191",
      },
      {
        answerName: `Currently have an IUD (hormonal or copper)?`,
        id: 1,
        uniq: "191",
      },
      {
        answerName: `None of the above`,
        id: 1,
        uniq: "191 ",
        noneflag: true
      },
    ],
    key: "check",
    id: 24,
    prev: 23,
    doubleflow: true,
    retrunid: 22,
    isnoAnserRemove: true,
    next: 25,
    isnone: true,
    useranwser: []

  },

  {
    question: `Do you confirm that the information you have given is true and accurate, that this medication is solely for yourself, and that if prescribed a medication, you will review the information supplied regarding the medication and side effects?`,
    answer: [
      {
        answerName: `Yes, I confirm`,
        id: 1,
        uniq: "191",
      },
      {
        answerName: `No, I do not confirm`,
        id: 2,
        uniq: "192",
      },
    ],
    key: "option",
    id: 25,
    prev: 24,
    next: 26,
  },
  {
    question: `Is there anything else you would like to say to the Doctor?`,
    key: "textarea",
    id: 21,
    textareaKey: "isThereAnythingElseYouWould",
    id: 26,
    prev: 25,
    next: 27,
    isCheckbox: true,

  },
  {
    question: `Do you have preference for the gender of your treating Doctor?`,
    answer: [
      {
        answerName: `No preference`,
        id: 2,
        uniq: "yes",
      },
      {
        answerName: `Prefer Female`,
        id: 1,
        uniq: "no",
      },
      {
        answerName: `Prefer Male`,
        id: 3,
        uniq: "no",
      },
    ],
    key: "option",
    id: 27,
    prev: 26,
    next: "done",

  },
 
];

export const prematureEjaculationData = [
  {
    question: `What was your sex at birth?`,
    answer: [
      {
        answerName: `Male`,
        id: 1,
        uniq: "1male",
        next: 2

      },
      {
        answerName: `Female`,
        id: 2,
        uniq: "1female",
        next: 3

      },
      {
        answerName: `Intersex `,
        id: 3,
        uniq: "1Intersex ",
        next: 2
      },
    ],
    key: "option",
    id: 1,
    nextsub: true,
    prev: 0
  },
  {
    text: "It’s sounds as though you may have selected the wrong screening questionairre",     //  model params 
    menu: true,
    heading: 'wrong screening questionairre',
    key: "model",
    id: 3,
    prev: 1,
    nextsub: false,




  },
  {
    question: `How would you identify your gender?`,
    answer: [
      {
        answerName: `Male`,
        id: 1,
        uniq: "1male",
      },
      {
        answerName: `Female`,
        id: 2,
        uniq: "1female",
      },
      {
        answerName: `Trans Masculine / Trans Male `,
        id: 3,
        uniq: "1female",
      },
      {
        answerName: `Trans Feminine / Trans Female `,
        id: 4,
        uniq: "1female",
      },
      {
        answerName: `I don’t identify with any of the above `,
        id: 5,
        uniq: "1female",
      },
    ],
    key: "option",
    id: 2,
    prev: 1,
    next: 4
  },
  {
    question: `What is your Date of Birth?`,
    key: "date",
    id: 4,
    prev: 2,
    next: 5,
    notvalid: 6
  }, {
    text: "We’re sorry, but at this stage as per our terms and conditions we’re only offering our online service to +18 year olds.", //  model params
    menu: false,
    key: "model",
    id: 6,
    prev: 1,
    nextsub: false,
  },
  {
    question: `What is your height?`,
    key: "cm",
    id: 5,
    prev: 4,
    next: 7,
  },
  {
    question: `How often do your exercise?`,
    answer: [
      {
        answerName: `Not at all`,
        id: 1,
        uniq: "4not",
      },
      {
        answerName: `1-2 times / Weekly`,
        id: 2,
        uniq: "4week",
      },
      {
        answerName: `3-5 times / Weekly`,
        id: 3,
        uniq: "4time",
      },
      {
        answerName: `Everyday`,
        id: 4,
        uniq: "4every",
      },
    ],
    key: "option",
    id: 7,
    prev: 5,
    next: 8,
  },
  {
    question: `Do you drink alcohol?`,
    answer: [
      {
        answerName: `Not at all`,
        id: 1,
        uniq: "5not",
      },
      {
        answerName: `1-2 times / Weekly`,
        id: 2,
        uniq: "5week",
      },
      {
        answerName: `3-5 times / Weekly`,
        id: 3,
        uniq: "5time",
      },
      {
        answerName: `Everyday`,
        id: 4,
        uniq: "5every",
      },
    ],
    key: "option",
    id: 8,
    prev: 7,
    next: 9,
  },
  {
    question: `Do you smoke?`,
    answer: [
      {
        answerName: `Yes`,
        id: 2,
        uniq: "6yes",
      },
      {
        answerName: `No`,
        id: 1,
        uniq: "6no",
      },
    ],
    key: "option",
    id: 9,
    prev: 8,
    next: 10,
  },
  {
    question: `How would you rate your sleep?`,
    answer: [
      {
        answerName: `★`,
        id: 1,
        uniq: "71",
      },
      {
        answerName: `★ ★`,
        id: 2,
        uniq: "72",
      },
      {
        answerName: `★ ★ ★`,
        id: 3,
        uniq: "73",
      },
      {
        answerName: `★ ★ ★ ★`,
        id: 4,
        uniq: "74",
      },
      {
        answerName: `★ ★ ★ ★ ★`,
        id: 5,
        uniq: "75",
      },
    ],
    key: "option",
    id: 10,
    prev: 9,
    next: 11,
  },
  {
    question: `How would you rate your mood lately?`,
    answer: [
      {
        answerName: `★`,
        id: 1,
        uniq: "81",
      },
      {
        answerName: `★ ★`,
        id: 2,
        uniq: "82",
      },
      {
        answerName: `★ ★ ★`,
        id: 3,
        uniq: "83",
      },
      {
        answerName: `★ ★ ★ ★`,
        id: 4,
        uniq: "84",
      },
      {
        answerName: `★ ★ ★ ★ ★`,
        id: 5,
        uniq: "85",
      },
    ],
    key: "option",
    id: 11,
    prev: 10,
    next: 12,
  },
  {
    text: "Hang in there, we’re about 1/3 of the way through. Just a few more questions now related to your concern. Remember answers are only shared with your Doctor.",     //  model params 
    menu: false,
    key: "model",
    id: 12,
    nextsub: false,
    next: 13




  },
  {
    question: `How often do you have sex per week?`,
    answer: [
      {
        answerName: `Multiple  times per week`,
        id: 1,
        uniq: "91",
        // redirect: 14,
      },
      {
        answerName: `1-2 times per week`,
        id: 2,
        uniq: "92",
      },
      {
        answerName: `Once every week or so`,
        id: 3,
        uniq: "93",
      },
      {
        answerName: `A couple times a month, rarely`,
        id: 4,
        uniq: "94",
      },
      {
        answerName: `Rarely, a few times throughout the year`,
        id: 5,
        uniq: "95",
      },
    ],
    key: "option",
    id: 13, prev: 11, next: 14
  },
  {
    question: `So tell us, do you have a problem ejaculating sooner than you or your partner would like? `,
    answer: [
      {
        answerName: `Yes, I generally always ejaculate before I want to`,
        id: 1,
        uniq: "101",
      },
      {
        answerName: `Yes, at least more than half the time`,
        id: 2,
        uniq: "102",
      },
      {
        answerName: `Yes, less than half the time`,
        id: 3,
        uniq: "103",
      },
      {
        answerName: `No, rarely`,
        id: 4,
        uniq: "104",
      },
    ],
    key: "option",
    id: 14, prev: 13, next: 15
  },
  {
    question: `Do you feel frustrated ejaculating before you want to?`,
    answer: [
      {
        answerName: `Not at all`,
        id: 1,
        uniq: "191",
        // redirect: 19,
      },
      {
        answerName: `Slightly`,
        id: 2,
        uniq: "192",
        // redirect: 18,
      },
      {
        answerName: `Moderately`,
        id: 2,
        uniq: "193",
        // redirect: 18,
      },
      {
        answerName: `Very`,
        id: 2,
        uniq: "194",
        // redirect: 18,
      },
      {
        answerName: `Extremely`,
        id: 2,
        uniq: "195",
        // redirect: 18,
      },
    ],
    key: "option",
    id: 15, prev: 14, next: 16

  },
  {
    question: `When did this become a problem?`,
    answer: [
      {
        answerName: `Recently with a new partner`,
        id: 1,
        uniq: "191",
        // redirect: 19,
      },
      {
        answerName: `Recently with an established partner `,
        id: 2,
        uniq: "192",
        // redirect: 18,
      },
      {
        answerName: `It has always been an issue for me`,
        id: 2,
        uniq: "193",
        // redirect: 18,
      },
      {
        answerName: `Some time ago, with a new partner`,
        id: 2,
        uniq: "194",
        // redirect: 18,
      },
      {
        answerName: `Some time ago, with an established partner`,
        id: 2,
        uniq: "195",
        // redirect: 18,
      },
    ],
    key: "option",
    id: 16, prev: 15, next: 17

  },
  {
    question: `Do you have issues getting or maintaining an erection? `,
    answer: [
      {
        answerName: `Yes`,
        id: 2,
        uniq: "192",
        redirect: 18,
        next: 18,
        prev: 23,
        isNestedFlow: true,
        nestedReturnId: 23
        // redirect: 18,
      },
      {
        answerName: `No`,
        id: 1,
        uniq: "191",
        redirect: 23,
        next: 51,
        prev: 17
      },
    ],
    key: "option",
    id: 17, prev: 16, nextsub: true,
    isAnswerNo: true,
    noAnserRemoveIds: [18, 19, 20, 21, 22, 23, 26, 50],
    isNestedYesAnswer: true
  },
  {
    question: `So tell us a bit more about your difficulty getting an erection `,
    subQuestion: `Select any that apply to you`,
    answer: [
      {
        answerName: `It's difficult to get hard`,
        id: 1,
        uniq: "191",
        // redirect: 19,
      },
      {
        answerName: `I lose my erection during sex  `,
        id: 2,
        uniq: "192",
        // redirect: 18,
      },
      {
        answerName: `Sometimes hard and other times not`,
        id: 2,
        uniq: "193",
        // redirect: 18,
      },
      {
        answerName: `Other`,
        id: 2,
        uniq: "194",
        isFlag: true,
        otherUniqueKey: "soTellUsaBitMoreAboutYour",
        // redirect: 18,
      },
    ],
    key: "check",
    id: 18, prev: 17, next: 19,
    isother: true,
    useranwser: []
  },
  {
    question: `Do you ever wake up with an erection?`,
    answer: [
      {
        answerName: `Never`,
        id: 1,
        uniq: "191",
        // redirect: 19,
      },
      {
        answerName: `1-2 times per week `,
        id: 2,
        uniq: "192",
        // redirect: 18,
      },
      {
        answerName: `3-5 times per week`,
        id: 2,
        uniq: "193",
        // redirect: 18,
      },
      {
        answerName: `Everyday `,
        id: 2,
        uniq: "194",
        // redirect: 18,
      },
    ],
    key: "option",
    id: 19, prev: 18, next: 20,

  },

  {
    question: `When are you having trouble getting an erection?`,
    subQuestion: `Select any that apply`,
    answer: [
      {
        answerName: `All the time`,
        id: 1,
        uniq: "121",
      },
      {
        answerName: `When I'm stressed`,
        id: 2,
        uniq: "122",
      },
      {
        answerName: `With alcohol`,
        id: 3,
        uniq: "123",
      },
      {
        answerName: `With a new partner`,
        id: 4,
        uniq: "124",
      },
      {
        answerName: `Other`,
        id: 5,
        uniq: "125",
        isFlag: true,
        otherUniqueKey: "whenAreYouHavingTrouble",
      },
    ],
    key: "check",
    id: 20, prev: 19, next: 21,
    isother: true,
    useranwser: []
  },
  {
    question: `Do you have issues getting and staying hard when masturbating?`,
    answer: [
      {
        answerName: `Yes, often`,
        id: 1,
        uniq: "131",
      },
      {
        answerName: `Yes, sometimes`,
        id: 2,
        uniq: "132",
        // redirect: 40,
      },
      {
        answerName: `Yes, but rarely`,
        id: 1,
        uniq: "133",
      },
      {
        answerName: `Never`,
        id: 2,
        uniq: "134",
        // redirect: 40,
      },
    ],
    key: "option",
    id: 21, prev: 20, next: 22,

  },
  {
    question: `Do you suffer from?`,
    subQuestion: `Select any that apply`,
    answer: [
      {
        answerName: `Peyronie's disease. A curve in the penis that interferes with sex`,
        id: 1,
        uniq: "181",
      },
      {
        answerName: `Painful erections or ejaculation`,
        id: 2,
        uniq: "182",
      },
      {
        answerName: `Foreskin that is too tight`,
        id: 3,
        uniq: "183",
      },
      {
        answerName: `None of the above`,
        id: 4,
        uniq: "184 ",
        noneflag: true,
      },
    ],
    key: "check",
    checkBoxKeyname: "doYouSufferFrom",
    id: 22, prev: 21, next: 23,
    isnone: true,
    useranwser: []
  },
  {
    question: `Have you ever taken or used any medications or supplements for erectile dysfunction before?`,
    subQuestion: `Including sildenafil(brand name Viagra),tadalafil(brand name Cialis) or avanafil (brand name Spedra).`,
    answer: [
      {
        answerName: `Yes`,
        id: 2,
        uniq: "192",
        next: 25,
        prev: 50,
        nestedPrev: 50,
      },
      {
        answerName: `No`,
        id: 1,
        uniq: "191",
        next: 24,
        prev: 23,
        nestedPrev: 23,
        isNestedNoAns: true,
        nestedAnswerIds: [26, 50]
      },
    ],
    key: "option",
    id: 23, prev: 22, nextsub: true,

  },
  {
    text: "Hang in there, we’re about 2/3 way through. Just a few more questions to go until you recieve a custom Treatment plan.", //  model params
    menu: false,
    key: "model",
    id: 24,
    nextsub: false,
    next: 27,
  },
  {
    text: "Hang in there, we’re about 2/3 way through. Just a few more questions to go until you recieve a custom Treatment plan.", //  model params
    menu: false,
    key: "model",
    id: 25,
    nextsub: false,
    next: 26,
  },
  {
    question: `What have you taken in the past?`,
    subQuestion: `This will the doctor find the best treatment for you`,
    answer: [
      {
        answerName: `Numbing cream or gel`,
        id: 1,
        uniq: "191",
        isFlag: false,
      },
      {
        answerName: `SSRI Anti-Depressant (Eg. Paroxetine, Sertraline, Priligy)`,
        id: 2,
        uniq: "192",
        isFlag: false,
      },
      {
        answerName: `Erectile Medications (Sildenfail, Cialis)`,
        id: 3,
        uniq: "193",
        isFlag: false,
      },
      {
        answerName: `Other`,
        id: 4,
        uniq: "194",
        isFlag: true,
        otherUniqueKey: "whatHaveYouTakenIn",
      },
    ],
    key: "option",
    prev: 23,
    id: 26,
    next: 50
  },
  {
    question: `Did you Experience and side Effects?`,
   
    key: "textarea",
    prev: 26,
    id: 50,
    next: 27,
    textareaKey: "didYouExperienceAndSideEffects",
  },
  {
    text: "Hang in there, we’re about 2/3 way through. Just a few more questions to go until you recieve a custom Treatment plan.", //  model params
    menu: false,
    key: "model",
    id: 51,
    nextsub: false,
    next: 27,
  },
  {
    question: `Are you currently taking any medications or supplements?`,
    subQuestion: `Please consider this one carefully as it's important the doctor is aware of all of your medications. This includes any medications you may be taking for premature ejaculation or any other conditions.`,

    answer: [
      {
        answerName: `No`,
        id: 1,
        uniq: "191",
        redirect: 26,
        next: 30,
        prev: 27
      },
      {
        answerName: `Yes`,
        id: 2,
        uniq: "192",
        next: 28,
        prev: 29
      },
    ],
    key: "option",
    id: 27,
    nextsub: true,
    doubleflow: true,
    retrunid: 17,
    isnoAnserRemove: true,
    isAnswerNo: true,
    noAnserRemoveIds: [28, 29]
  },
  {
    question: `What medications or supplements are you currently taking?`,
    subQuestion: `Please include the name of medication and dosages. If you can't remember right now. Continue and the doctor will follow up later`,

    key: "textarea",
    textareaKey: "whatMedicationsOrSupplements",
    id: 28,
    prev: 27,
    nextsub: false,
    next: 29,
    isCheckbox: true

  },
  {
    question: `Just to make sure, are you taking any of the following medications?`,
    subQuestion: `It's Important that we know as they may interact with the medications your doctor prescribe to you`,
    answer: [
      {
        answerName: `Anti-Depressants (Eg. Zoloft, Lexapro, Endep)`,
        id: 1,
        uniq: "191",
        // redirect: 19,
      },
      {
        answerName: `MAO-Inhibitors (Eg. Moclobemide, Phenelzine)`,
        id: 2,
        uniq: "192",
        // redirect: 18,
      },
      {
        answerName: `Anti-Seizure Medication (Eg. Sodium Valproate, Carbamazepine)`,
        id: 2,
        uniq: "193",
        // redirect: 18,
      },
      {
        answerName: `St John's Wort`,
        id: 2,
        uniq: "194",
        // redirect: 18,
      },
      {
        answerName: `Trytophan-containing supplements`,
        id: 2,
        uniq: "195",
        // redirect: 18,
      },
      {
        answerName: `Prescription pain-relief (eg. Tramdol, Fentanyl)`,
        id: 2,
        uniq: "193",
        // redirect: 18,
      },
      {
        answerName: `Erectile medications (eg. Slidenafil) `,
        id: 2,
        uniq: "194",
        // redirect: 18,
      },
      {
        answerName: `None of these`,
        id: 2,
        uniq: "195",
        noneflag: true,

        // redirect: 18,
      },
    ],
    key: "check",
    id: 29,
    prev: 28,
    nextsub: false,
    next: 30,
    isnone: true,
    useranwser: []
  },
  {
    question: `Do you have any allergies?`,
    answer: [
      {
        answerName: `Yes`,
        id: 2,
        uniq: "192",
        next: 31,
        prev: 31,
        // redirect: 18,
      },
      {
        answerName: `No`,
        id: 1,
        uniq: "191",
        next: 32,
        prev: 30,
      },
    ],
    key: "option",
    id: 30,
    doubleflow: true,
    retrunid: 27,
    nextsub: true,
    isnoAnserRemove: true,
    isAnswerNo: true,
    noAnserRemoveIds: [31]

  },
  {
    question: `What allergies do you have?`,
    key: "textarea",
    id: 31,
    textareaKey: "whatAllergiesDoYouHave",
    qustionType: "allergies",
    prev: 30,
    nextsub: false,
    next: 32,
  },
  {
    question: `Do you use any recreational drugs?`,
    subQuestion: `Only your doctor will see this information and it is important that you are honest to help us decide on safe treatment for you`,
    answer: [
      {
        answerName: `No, I don't use drugs`,
        id: 1,
        uniq: "191",
        next: 36,
        prev: 32,
      },
      {
        answerName: `Sometimes`,
        id: 2,
        uniq: "192",
        next: 33,
        prev: 35,
      },
      {
        answerName: `Yes`,
        id: 2,
        uniq: "193",
        next: 33,
        prev: 35,
      },
    ],
    key: "option",
    id: 32,
    doubleflow: true,
    retrunid: 30,
    nextsub: true,
    isnoAnserRemove: true,
    isAnswerNo: true,
    noAnserRemoveIds: [33, 34, 35]
  },
  {
    question: `What recreational drugs do you use?`,
    subQuestion: `Only your doctor will see this information and it is important that you are honest to help us decide on safe treatment for you`,
    answer: [
      {
        answerName: `Cocaine`,
        id: 1,
        uniq: "191",
        // redirect: 19,
      },
      {
        answerName: `Marijuana/Cannabis`,
        id: 2,
        uniq: "192",
        // redirect: 18,
      },
      {
        answerName: `Ecstasy`,
        id: 2,
        uniq: "193",
        // redirect: 18,
      },
      {
        answerName: `MDMA`,
        id: 2,
        uniq: "194",
        // redirect: 18,
      },
      {
        answerName: `AmyI Nitrite (Poppers)`,
        id: 2,
        uniq: "195",
        // redirect: 18,
      },
      {
        answerName: `Ketamine`,
        id: 2,
        uniq: "193",
        // redirect: 18,
      },
      {
        answerName: `LSD or Acid`,
        id: 2,
        uniq: "194",
        // redirect: 18,
      },
      {
        answerName: `Other`,
        id: 2,
        uniq: "195",
        isFlag: true,
        otherUniqueKey: "whatRecreationalDrugs",

        // redirect: 18,
      },
    ],
    key: "check",
    id: 33,
    prev: 32,
    nextsub: false,
    isother: true,
    next: 34,
    useranwser: []
  },
  {
    question: `How often do you use these drugs?`,
    answer: [
      {
        answerName: `Most days`,
        id: 1,
        uniq: "191",
        // redirect: 19,
      },
      {
        answerName: `Weekly`,
        id: 2,
        uniq: "192",
        // redirect: 18,
      },
      {
        answerName: `Monthly`,
        id: 2,
        uniq: "193",
        // redirect: 18,
      },
      {
        answerName: `Rarely (a few times a year)`,
        id: 2,
        uniq: "194",
        // redirect: 18,
      },
    ],
    key: "option",
    id: 34,
    prev: 33,
    nextsub: false,
    next: 35,
  },
  {
    question: `A number of the medications that are prescribed through FRENCHIE M.D can interact dangerously with recreational drugs. Do you confirm that if you are prescribed a medication and warned about recreational drugs use that you agree to follow the instructions from your treating doctor about drug use?`,
    answer: [
      {
        answerName: `Yes`,
        id: 2,
        uniq: "192",
        // redirect: 18,
      },
      {
        answerName: `No`,
        id: 1,
        uniq: "191",
        // redirect: 27,
      },
    ],
    key: "option",
    id: 35,
    prev: 34,
    nextsub: false,
    next: 36,
  },
  {
    question: `Have you now or in the past ever suffered from any other medical conditions?`,
    answer: [
      {
        answerName: `No`,
        id: 1,
        uniq: "191",
        next: 38,
        prev: 36,
      },
      {
        answerName: `Yes`,
        id: 2,
        uniq: "192",
        next: 37,
        prev: 37,
      },
    ],
    key: "option",
    id: 36,
    doubleflow: true,
    retrunid: 32,
    nextsub: true,
    isnoAnserRemove: true,
    isAnswerNo: true,
    noAnserRemoveIds: [37]

  },
  {
    question: `Please describe what medical conditions you have suffered from now or in the past?`,
    // answer: [
    //   {
    //     answerName: `No`,
    //     id: 1,
    //     uniq: "191",
    //   },
    //   {
    //     answerName: `Yes`,
    //     id: 2,
    //     uniq: "192",
    //   },
    // ],
    key: "textarea",
    id: 37,
    textareaKey: "pleaseDescribeWhatMedicalConditions",
    prev: 36,
    nextsub: false,
    next: 38,
  },
  {
    question: `Do you have or have you ever had any of the following?`,
    answer: [
      {
        answerName: `Epilepsy or seizures`,
        id: 1,
        uniq: "191",
        next: 39,
        prev: 39,
      },
      {
        answerName: `Fainting`,
        id: 2,
        uniq: "192",
        next: 39,
        prev: 39,
      },
      {
        answerName: `Dizziness when standing up after lying down`,
        id: 2,
        uniq: "193",
        next: 39,
        prev: 39,
      },
      {
        answerName: `Bleeding or clotting disorder`,
        id: 2,
        uniq: "194",
        next: 39,
        prev: 39,
      },
      {
        answerName: `Any mood or psychotic disorders`,
        id: 2,
        uniq: "195",
        next: 39,
        prev: 39,
      },
      {
        answerName: `Any heart conditions or irregularities`,
        id: 2,
        uniq: "193",
        next: 39,
        prev: 39,
      },
      {
        answerName: `Migraines or severe headaches`,
        id: 2,
        uniq: "194",
        next: 39,
        prev: 39,
      },
      {
        answerName: `Narrowing of the arteries in your neck`,
        id: 2,
        uniq: "195",
        next: 39,
        prev: 39,
      },

      {
        answerName: `Peyronie's disease`,
        id: 2,
        uniq: "194",
        next: 39,
        prev: 39,
      },
      {
        answerName: `Surgical procedures on your penis`,
        id: 2,
        uniq: "195",
        next: 39,
        prev: 39,
      },
      {
        answerName: `Thyroid disease`,
        id: 2,
        uniq: "193",
        next: 39,
        prev: 39,
      },
      {
        answerName: `Diabetes`,
        id: 2,
        uniq: "194",
        next: 39,
        prev: 39,
      },
      {
        answerName: `Prostate related conditions`,
        id: 2,
        uniq: "195",
        next: 39,
        prev: 39,
      },
      {
        answerName: `None of the above`,
        id: 2,
        uniq: "195",
        next: 40,
        prev: 38,
        noneflag: true,
      },
    ],
    key: "check",
    id: 38,
    checkBoxKeyname: "qnyOfTheFollowing1",
    doubleflow: true,
    retrunid: 36,
    isnone: true,
    nextsub: true,
    useranwser: [],
    ui: 1,
    isnoAnserRemove: true,
    noAnserRemoveIds: [39]


  },
  {
    question: `Please give the doctor as much information as you can regarding this.`,
 
    key: "textarea",
    id: 39,
    textareaKey: "pleaseGiveTheDoctorAsMuch",
    prev: 38,
    nextsub: false,
    next: 40,
  },

  {
    question: `Do you ever experience any of the following symptoms when passing urine?`,
    subQuestion: `Select any that apply`,
    answer: [
      {
        answerName: `Problems with starting or stopping your stream`,
        id: 1,
        uniq: "191",
        // redirect: 19,
      },
      {
        answerName: `Going more then you used to, especially at night`,
        id: 2,
        uniq: "192",
        // redirect: 18,
      },
      {
        answerName: `Interrupted stream - stopping/starting/dribbling`,
        id: 2,
        uniq: "193",
        // redirect: 18,
      },
      {
        answerName: `Urge to go more often and less ability to hold on`,
        id: 2,
        uniq: "194",
        // redirect: 18,
      },
      {
        answerName: `None of the above`,
        id: 2,
        uniq: "194",
        noneflag: true,

        // redirect: 18,
      },
    ],
    key: "check",
    id: 40,
    checkBoxKeyname: "experienceWithPassingUrine",
    nextsub: false,
    next: 41,
    isnone: true,
    useranwser: [],
    doubleflow: true,
    retrunid: 38,
    isnoAnserRemove: true,
  },
  {
    question: `Would you prefer an on-demand treatment, needed to be taken a few hours before intercourse, or a daily treatment?`,
    subQuestion: `Please note, daily medication can be more effective and is better if you like to be spontaneous with sex. You will learn more about the medications if a doctor thinks it is suitable`,
    answer: [
      {
        answerName: `Daily`,
        id: 1,
        uniq: "191",
      },
      {
        answerName: `On-demand`,
        id: 2,
        uniq: "192",
      },
      {
        answerName: `Whatever the Doctor thinks is most suitable`,
        id: 3,
        uniq: "193",
      },
    ],
    key: "option",
    id: 41,
    prev: 40,
    nextsub: false,
    next: 42,
  },
  {
    question: `Do you confirm that the information you have given is true and accurate, that this medication is solely for yourself, and that if prescribed a medication, you will review the information supplied regarding the medication and side effects?`,
    answer: [
      {
        answerName: `Yes, I confirm`,
        id: 1,
        uniq: "191",
      },
      {
        answerName: `No, I do not confirm`,
        id: 2,
        uniq: "192",
      },
    ],
    key: "option",
    id: 42,
    prev: 41,
    nextsub: false,
    next: 43,
  },
  {
    question: `Is there anything else you would like to say to the Doctor?`,
    key: "textarea",
    id: 43,
    textareaKey: "doYouConfirmThatTheInformation",
    prev: 42,
    nextsub: false,
    next: 44,
    isCheckbox: true

  },
  {
    question: `Do you have preference for the gender of your treating Doctor?`,
    answer: [
      {
        answerName: `No preference`,
        id: 2,
        uniq: "yes",
      },
      {
        answerName: `Prefer Female`,
        id: 1,
        uniq: "no",
      },
      {
        answerName: `Prefer Male`,
        id: 3,
        uniq: "no",
      },
    ],
    key: "option",
    id: 44,
    prev: 43,
    nextsub: false,
    next: "done",
  },
 
];