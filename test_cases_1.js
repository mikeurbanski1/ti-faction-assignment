const test_cases_raw = [
  [
    ['Player 3', 0, ["The Ghosts of Creuss", "The Argent Flight"], ["The Argent Flight"], ''],
    ['Player 4', 0, ["The Federation of Sol", "The Embers of Muaat"], ["The Embers of Muaat"], ''],
    ['Player 5', 0, ["Sardakk N'orr", "The Ghosts of Creuss"], ["Sardakk N'orr"], ''],
    ['Player 6', 0, ["The Barony of Letnev", "The Federation of Sol"], ["The Barony of Letnev"], ''],
    ['Player 1', 2, ["The Arborec", "The Clan of Saar"], ["The Clan of Saar"], ''],
    ['Player 2', 2, ["The Argent Flight", "The Arborec"], ["The Arborec"], '']
  ],
  [
    ['Player 4', 0, ["The Federation of Sol", "The Argent Flight"], ["The Federation of Sol", "The Argent Flight"], ''],
    ['Player 2', 1, ["The Embers of Muaat", "The Arborec"], ["The Embers of Muaat"], '2,5,6 are interchangable'],
    ['Player 5', 1, ["The Empyrean", "The Arborec"], ["The Arborec"], ''],
    ['Player 6', 1, ["The Empyrean", "The Embers of Muaat"], ["The Empyrean"], ''],
    ['Player 1', 2, ["The Emirates of Hacan", "The Empyrean"], ["The Emirates of Hacan"], ''],
    ['Player 3', 2, ["The Emirates of Hacan", "The Ghosts of Creuss"], ["The Ghosts of Creuss"], '']
  ],
  [
    ['Player 3', 0, ["The Embers of Muaat", "The Mahact Gene Sorcerers"], ["The Mahact Gene Sorcerers", "The Embers of Muaat"], ''],
    ['Player 5', 0, ["The Arborec", "Sardakk N'orr"], ["The Arborec", "Sardakk N'orr"], ''],
    ['Player 1', 1, ["The Barony of Letnev", "The Emirates of Hacan"], ["The Barony of Letnev"], ''],
    ['Player 2', 1, ["The Emirates of Hacan", "Sardakk N'orr"], ["The Emirates of Hacan"], ''],
    ['Player 4', 2, ["The Clan of Saar", "The Federation of Sol"], ["The Clan of Saar", "The Federation of Sol"], ''],
    ['Player 6', 2, ["The Empyrean", "The Embers of Muaat"], ["The Empyrean"], '']
  ],
  [
    ['Player 1', 0, ["The Ghosts of Creuss", "The Argent Flight"], ["The Ghosts of Creuss", "The Argent Flight"], ''],
    ['Player 2', 0, ["The Clan of Saar", "The Barony of Letnev"], ["The Clan of Saar", "The Barony of Letnev"], ''],
    ['Player 4', 1, ["The Embers of Muaat", "The Mahact Gene Sorcerers"], ["The Mahact Gene Sorcerers"], ''],
    ['Player 5', 1, ["Sardakk N'orr", "The Emirates of Hacan"], ["Sardakk N'orr"], ''],
    ['Player 6', 1, ["The L1Z1X Mindnet", "The Emirates of Hacan"], ["The L1Z1X Mindnet"], ''],
    ['Player 3', 2, ["The Embers of Muaat", "The L1Z1X Mindnet"], ["The Embers of Muaat"], '']
  ],
  [
    ['Player 1', 0, ["The Mahact Gene Sorcerers", "The Embers of Muaat"], ["The Embers of Muaat"], ''],
    ['Player 2', 1, ["The Emirates of Hacan", "The Embers of Muaat"], ["The Emirates of Hacan"], ''],
    ['Player 3', 1, ["The Emirates of Hacan", "The L1Z1X Mindnet"], ["The L1Z1X Mindnet"], ''],
    ['Player 4', 1, ["The Arborec", "The Barony of Letnev"], ["The Barony of Letnev"], ''],
    ['Player 5', 1, ["The Arborec", "The Empyrean"], ["The Empyrean"], ''],
    ['Player 6', 2, ["The Mahact Gene Sorcerers", "The Empyrean"], ["The Mahact Gene Sorcerers"], '']
  ],
  [
    ['Player 2', 1, ["The Arborec", "The Federation of Sol"], ["The Arborec"], ''],
    ['Player 3', 1, ["The Ghosts of Creuss", "The Embers of Muaat"], ["The Ghosts of Creuss"], ''],
    ['Player 4', 1, ["The Federation of Sol", "The Mahact Gene Sorcerers"], ["The Mahact Gene Sorcerers"], ''],
    ['Player 1', 2, ["The Embers of Muaat", "The Barony of Letnev"], ["The Embers of Muaat"], ''],
    ['Player 5', 2, ["The Clan of Saar", "The Barony of Letnev"], ["The Clan of Saar"], ''],
    ['Player 6', 2, ["The Emirates of Hacan", "The Embers of Muaat"], ["The Emirates of Hacan"], '']
  ],
  [
    ['Player 2', 0, ["The Ghosts of Creuss", "The L1Z1X Mindnet"], ["The L1Z1X Mindnet"], ''],
    ['Player 6', 0, ["The Embers of Muaat", "The Ghosts of Creuss"], ["The Embers of Muaat"], ''],
    ['Player 3', 1, ["The Empyrean", "The Embers of Muaat"], ["The Empyrean"], ''],
    ['Player 4', 1, ["The Barony of Letnev", "The Empyrean"], ["The Barony of Letnev"], ''],
    ['Player 1', 2, ["The Argent Flight", "The Mahact Gene Sorcerers"], ["The Argent Flight", "The Mahact Gene Sorcerers"], ''],
    ['Player 5', 2, ["The Emirates of Hacan", "The Clan of Saar"], ["The Emirates of Hacan", "The Clan of Saar"], '']
  ],
  [
    ['Player 1', 0, ["The Mahact Gene Sorcerers", "Sardakk N'orr"], ["The Mahact Gene Sorcerers"], 'Two equal options (P1 can get either)'],
    ['Player 2', 0, ["The Barony of Letnev", "The Empyrean"], ["The Barony of Letnev", "The Empyrean"], ''],
    ['Player 4', 0, ["The Embers of Muaat", "The Mahact Gene Sorcerers"], ["The Embers of Muaat"], ''],
    ['Player 6', 0, ["The Embers of Muaat", "The Emirates of Hacan"], ["The Emirates of Hacan"], ''],
    ['Player 3', 1, ["Sardakk N'orr", "The Emirates of Hacan"], ["Sardakk N'orr"], ''],
    ['Player 5', 2, ["The Emirates of Hacan", "The Clan of Saar"], ["The Clan of Saar"], '']
  ],
  [
    ['Player 2', 0, ["The Federation of Sol", "The Embers of Muaat"], ["The Federation of Sol", "The Embers of Muaat"], ''],
    ['Player 5', 0, ["The Barony of Letnev", "The Mahact Gene Sorcerers"], ["The Barony of Letnev", "The Mahact Gene Sorcerers"], ''],
    ['Player 3', 1, ["The Embers of Muaat", "The Empyrean"], ["The Empyrean"], ''],
    ['Player 1', 2, ["The Empyrean", "The Argent Flight"], ["The Argent Flight"], ''],
    ['Player 4', 2, ["The Emirates of Hacan", "The Embers of Muaat"], ["The Emirates of Hacan"], ''],
    ['Player 6', 2, ["The Clan of Saar", "The Ghosts of Creuss"], ["The Clan of Saar", "The Ghosts of Creuss"], '']
  ],
  [
    ['Player 4', 0, ["The Clan of Saar", "The Argent Flight"], ["The Argent Flight", "The Clan of Saar"], ''],
    ['Player 5', 0, ["The Federation of Sol", "The Empyrean"], ["The Federation of Sol", "The Empyrean"], ''],
    ['Player 3', 1, ["The L1Z1X Mindnet", "The Federation of Sol"], ["The L1Z1X Mindnet"], ''],
    ['Player 1', 2, ["The Mahact Gene Sorcerers", "The Empyrean"], ["The Mahact Gene Sorcerers"], ''],
    ['Player 2', 2, ["The Barony of Letnev", "The Clan of Saar"], ["The Barony of Letnev"], ''],
    ['Player 6', 2, ["The Arborec", "The Ghosts of Creuss"], ["The Arborec", "The Ghosts of Creuss"], '']
  ],
  [
    ['Player 1', 0, ["The L1Z1X Mindnet", "The Mahact Gene Sorcerers"], ["The L1Z1X Mindnet"], ''],
    ['Player 2', 0, ["Sardakk N'orr", "The Clan of Saar"], ["Sardakk N'orr", "The Clan of Saar"], ''],
    ['Player 6', 0, ["The Mahact Gene Sorcerers", "The Empyrean"], ["The Empyrean"], ''],
    ['Player 3', 1, ["The Mahact Gene Sorcerers", "The Emirates of Hacan"], ["The Mahact Gene Sorcerers"], ''],
    ['Player 4', 1, ["The Emirates of Hacan", "The Argent Flight"], ["The Emirates of Hacan"], ''],
    ['Player 5', 2, ["The L1Z1X Mindnet", "The Argent Flight"], ["The Argent Flight"], '']
  ],
  [
    ['Player 4', 0, ["The Embers of Muaat", "The Ghosts of Creuss"], ["The Ghosts of Creuss", "The Embers of Muaat"], ''],
    ['Player 1', 1, ["The L1Z1X Mindnet", "The Emirates of Hacan"], ["The L1Z1X Mindnet", "The Emirates of Hacan"], ''],
    ['Player 3', 1, ["The Embers of Muaat", "The Arborec"], ["The Arborec"], ''],
    ['Player 2', 2, ["The Empyrean", "The Mahact Gene Sorcerers"], ["The Empyrean", "The Mahact Gene Sorcerers"], ''],
    ['Player 5', 2, ["The Clan of Saar", "The Embers of Muaat"], ["The Clan of Saar"], ''],
    ['Player 6', 2, ["The Argent Flight", "The Emirates of Hacan"], ["The Argent Flight"], '']
  ],
  [
    ['Player 2', 0, ["The Argent Flight", "The Embers of Muaat"], ["The Embers of Muaat", "The Argent Flight"], ''],
    ['Player 4', 1, ["The Ghosts of Creuss", "The L1Z1X Mindnet"], ["The L1Z1X Mindnet", "The Ghosts of Creuss"], ''],
    ['Player 6', 1, ["Sardakk N'orr", "The Argent Flight"], ["Sardakk N'orr"], ''],
    ['Player 1', 2, ["The Federation of Sol", "The Empyrean"], ["The Federation of Sol"], ''],
    ['Player 3', 2, ["The Ghosts of Creuss", "The Mahact Gene Sorcerers"], ["The Mahact Gene Sorcerers"], ''],
    ['Player 5', 2, ["The Empyrean", "The Clan of Saar"], ["The Clan of Saar"], '']
  ],
  [
    ['Player 3', 0, ["Sardakk N'orr", "The Ghosts of Creuss"], ["The Ghosts of Creuss", "Sardakk N'orr"], ''],
    ['Player 1', 1, ["The Emirates of Hacan", "The Embers of Muaat"], ["The Embers of Muaat", "The Emirates of Hacan"], ''],
    ['Player 4', 1, ["Sardakk N'orr", "The Arborec"], ["The Arborec"], ''],
    ['Player 5', 1, ["The Federation of Sol", "The Barony of Letnev"], ["The Federation of Sol"], '5-2 interchangeable'],
    ['Player 2', 2, ["The Barony of Letnev", "The Federation of Sol"], ["The Barony of Letnev"], ''],
    ['Player 6', 2, ["The L1Z1X Mindnet", "The Emirates of Hacan"], ["The L1Z1X Mindnet"], '']
  ],
  [
    ['Player 3', 0, ["The Barony of Letnev", "The Emirates of Hacan"], ["The Emirates of Hacan", "The Barony of Letnev"], ''],
    ['Player 2', 1, ["The Embers of Muaat", "The Arborec"], ["The Arborec"], ''],
    ['Player 4', 1, ["Sardakk N'orr", "The Federation of Sol"], ["Sardakk N'orr", "The Federation of Sol"], ''],
    ['Player 5', 1, ["The Argent Flight", "The Barony of Letnev"], ["The Argent Flight"], ''],
    ['Player 6', 1, ["The Embers of Muaat", "The Empyrean"], ["The Empyrean"], ''],
    ['Player 1', 2, ["The Arborec", "The Ghosts of Creuss"], ["The Ghosts of Creuss"], '']
  ],
  [
    ['Player 2', 0, ["The Embers of Muaat", "Sardakk N'orr"], ["Sardakk N'orr", "The Embers of Muaat"], ''],
    ['Player 1', 1, ["The Arborec", "The Federation of Sol"], ["The Arborec", "The Federation of Sol"], ''],
    ['Player 4', 1, ["The Embers of Muaat", "The Empyrean"], ["The Empyrean"], ''],
    ['Player 5', 1, ["The Clan of Saar", "The Ghosts of Creuss"], ["The Clan of Saar", "The Ghosts of Creuss"], ''],
    ['Player 3', 2, ["The Barony of Letnev", "The Clan of Saar"], ["The Barony of Letnev"], ''],
    ['Player 6', 2, ["The Ghosts of Creuss", "The Mahact Gene Sorcerers"], ["The Mahact Gene Sorcerers"], '']
  ],
  [
    ['Player 4', 0, ["The Clan of Saar", "Sardakk N'orr"], ["The Clan of Saar"], ''],
    ['Player 3', 1, ["The Federation of Sol", "The Ghosts of Creuss"], ["The Federation of Sol", "The Ghosts of Creuss"], ''],
    ['Player 5', 1, ["The Arborec", "The Barony of Letnev"], ["The Arborec", "The Barony of Letnev"], ''],
    ['Player 6', 1, ["The Clan of Saar", "The Mahact Gene Sorcerers"], ["The Mahact Gene Sorcerers"], ''],
    ['Player 1', 2, ["Sardakk N'orr", "The Mahact Gene Sorcerers"], ["Sardakk N'orr"], ''],
    ['Player 2', 2, ["The Argent Flight", "The Emirates of Hacan"], ["The Argent Flight", "The Emirates of Hacan"], '']
  ],
  [
    ['Player 1', 0, ["The Argent Flight", "The Arborec"], ["The Argent Flight", "The Arborec"], ''],
    ['Player 6', 0, ["The Empyrean", "The Barony of Letnev"], ["The Barony of Letnev", "The Empyrean"], ''],
    ['Player 2', 1, ["The Arborec", "The Emirates of Hacan"], ["The Emirates of Hacan"], ''],
    ['Player 4', 1, ["Sardakk N'orr", "The Empyrean"], ["Sardakk N'orr"], ''],
    ['Player 3', 2, ["The Ghosts of Creuss", "Sardakk N'orr"], ["The Ghosts of Creuss"], ''],
    ['Player 5', 2, ["The Mahact Gene Sorcerers", "Sardakk N'orr"], ["The Mahact Gene Sorcerers"], '']
  ],
  [
    ['Player 1', 0, ["The Arborec", "The Barony of Letnev"], ["The Barony of Letnev"], ''],
    ['Player 5', 0, ["The Ghosts of Creuss", "The Emirates of Hacan"], ["The Emirates of Hacan"], ''],
    ['Player 6', 0, ["The Arborec", "The Mahact Gene Sorcerers"], ["The Mahact Gene Sorcerers"], ''],
    ['Player 2', 1, ["The Barony of Letnev", "The Embers of Muaat"], ["The Embers of Muaat"], ''],
    ['Player 3', 2, ["The Clan of Saar", "The Ghosts of Creuss"], ["The Clan of Saar"], ''],
    ['Player 4', 2, ["The Embers of Muaat", "The Arborec"], ["The Arborec"], '']
  ],
  [
    ['Player 2', 0, ["The Barony of Letnev", "The L1Z1X Mindnet"], ["The Barony of Letnev"], ''],
    ['Player 3', 0, ["The Clan of Saar", "The Argent Flight"], ["The Clan of Saar", "The Argent Flight"], ''],
    ['Player 5', 0, ["The Ghosts of Creuss", "The Empyrean"], ["The Ghosts of Creuss", "The Empyrean"], ''],
    ['Player 6', 0, ["The Embers of Muaat", "Sardakk N'orr"], ["The Embers of Muaat", "Sardakk N'orr"], ''],
    ['Player 1', 1, ["The Emirates of Hacan", "The L1Z1X Mindnet"], ["The L1Z1X Mindnet"], ''],
    ['Player 4', 1, ["The Federation of Sol", "The Emirates of Hacan"], ["The Federation of Sol"], '']
  ],
  [
    ['Player 4', 0, ["The Federation of Sol", "The Emirates of Hacan"], ["The Federation of Sol", "The Emirates of Hacan"], ''],
    ['Player 5', 0, ["The L1Z1X Mindnet", "The Empyrean"], ["The L1Z1X Mindnet"], ''],
    ['Player 6', 0, ["The Mahact Gene Sorcerers", "The Ghosts of Creuss"], ["The Ghosts of Creuss", "The Mahact Gene Sorcerers"], ''],
    ['Player 2', 1, ["The Mahact Gene Sorcerers", "The Empyrean"], ["The Empyrean"], 'P2 can get Mahact or Emp'],
    ['Player 1', 2, ["The Barony of Letnev", "The Empyrean"], ["The Barony of Letnev"], ''],
    ['Player 3', 2, ["The Emirates of Hacan", "The Argent Flight"], ["The Argent Flight"], '']]
];

const test_test_cases = [
  [
    ['Mike', 0, ["Sardakk N'orr", "The Argent Flight"], ["The Argent Flight"], 'Some notes'],
    ['Cole', 0, ["The Arborec", "The Naaz-Rokha Alliance"], ["The Naaz-Rokha Alliance"], ''],
    ['Mitchell', 0, ["The Arborec", "The Barony of Letnev"], ["The Barony of Letnev"], ''],
    ['Someone', 1, ["Sardakk N'orr", "The Naaz-Rokha Alliance"], ["Sardakk N'orr"], ''],
    ['SomeoneElse', 1, ["The Argent Flight", "The Arborec"], ["The Arborec"], ''],
  ]
];

function get_test_cases() {
  return test_cases_raw.map((test_case, index) => {
    const testNumber = index + 1;
    const notes = [];

    const assigned = new Set();

    const testData = test_case.map(row => {
      const o = {
        name: row[0],
        exp: row[1],
        selectedFactions: row[2],
        assignedFactions: row[3]
      };
      o.assignedFactions.forEach(f => assigned.add(f));
      if (row[4]) {
        notes.push(row[4]);
      }
      return o;
    });

    // validate that all outputs are unique
    const totalSelected = testData.reduce((count, player) => count + player.assignedFactions.length, 0);
    if (assigned.size !== totalSelected) {
      throw `Test number ${testNumber} has duplicated faction assignments`;
    }

    return {
      notes,
      testData,
      testNumber
    };
  });
}

module.exports = { get_test_cases };