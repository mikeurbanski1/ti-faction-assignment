// data = 

const {Graph} = require("./graph");
const {removeFromArray, removeItemFromArray, log, clearLog, shuffle} = require("./utils");
const startRow = 2;
const playerColumn = 'A';
const expColumn = 'B';
const faction1Column = 'D';
const resultsColumn = 'F';

// const spreadsheet = SpreadsheetApp.getActive();
// const selectionSheet = spreadsheet.getSheetByName('Selections');
// const logSheet = spreadsheet.getSheetByName('Log');

// const factionsPerPlayer = selectionSheet.getRange('B13').getValue();
const factionsPerPlayer = 4;

const useFirstChoice = false;

// const factionsRange = spreadsheet.getRangeByName('Factions');
// const allFactions = factionsRange.getValues();
const allFactions = [
  "Sardakk N'orr",
  "The Arborec",
  "The Argent Flight",
  "The Barony of Letnev",
  "The Clan of Saar",
  "The Embers of Muaat",
  "The Emirates of Hacan",
  "The Empyrean",
  "The Federation of Sol",
  "The Ghosts of Creuss",
  "The L1Z1X Mindnet",
  "The Mahact Gene Sorcerers",
  "The Mentak Coalition",
  "The Naalu Collective",
  "The Naaz-Rokha Alliance",
  "The Nekro Virus",
  "The Nomad",
  "The Titans of Ul",
  "The Universities of Jol-Nar",
  "The Vuil'Raith Cabal",
  "The Winnu",
  "The Xxcha Kingdom",
  "The Yin Brotherhood",
  "The Yssaril Tribes"
];

let logRow = 1;

function reset() {
  clearLog();
  selectionSheet.getRange(resultsColumn + '2:' + resultsColumn + '11').clear();
}

function assignFactions(inputPlayers, assignmentFunction) {
  //   reset();
  //   const [errorCells, lastRow] = validate();

  //   if (errorCells.length > 0) {
  //     return;
  //   }

  log('Validation successful; assigning factions');
  const lastRow = 7;
  const numPlayers = lastRow - startRow + 1;

  const players = inputPlayers || getPlayers(numPlayers);
  if (!assignmentFunction) {
    assignmentFunction = assignWithGraph;
  }

  const factionsToPlayers = allFactions.reduce((m, f) => {
    m[f] = [];
    return m;
  }, {});

  players.forEach(p => p.selectedFactions.forEach(f => factionsToPlayers[f].push(p)));

  assignmentFunction(players, factionsToPlayers);

  players.forEach((player, i) => {
    const factionString = player.assignedFactions.join(', ');
    log(`Factions for ${player.name}: ${factionString}`);
    // selectionSheet.getRange(resultsColumn + (i + startRow)).setValue(factionString);
  });
}

function assignWithGraph(players, factionsToPlayers) {

  const graph = new Graph();

  const contestedFactions = [];
  const factionToPlayerAssignments = {};

  // assign unique picks and resolvable contested picks, and build the graph
  allFactions.forEach(faction => {
    const factionPlayers = factionsToPlayers[faction];
    if (!factionPlayers.length) return;
    if (factionPlayers.length === 1) {
      log(`${factionPlayers[0].name} is the only one to select ${faction}`);
      factionPlayers[0].assignedFactions.push(faction);
      removeItemFromArray(factionPlayers[0].selectedFactions, faction);
      removeFromArray(factionPlayers, 0);
      factionToPlayerAssignments[faction] = factionPlayers[0];
    }
    else {
      log(`${faction} is contested by ${factionPlayers.length}`);

      // try to assign it, but still save it for later as a possible rebalance option
      const resolutionPlayer = resolveConflictsPrioritizeLowerExp(faction, factionPlayers)
      if (resolutionPlayer) {
        factionToPlayerAssignments[faction] = resolutionPlayer;
      }

      contestedFactions.push(faction);
      for (let i1 = 0; i1 < factionPlayers.length - 1; i1++) {
        const p1 = factionPlayers[i1];
        for (let i2 = i1 + 1; i2 < factionPlayers.length; i2++) {
          const p2 = factionPlayers[i2];
          graph.addEdge(p1, p2, faction);
        }
      }
    }
  });

  // go through contested factions and try to assign to players who do not have one yet
  for (let index = 0; index < contestedFactions.length; index++) {
    const faction = contestedFactions[index];
    const factionPlayers = factionsToPlayers[faction];

    factionPlayers.sort((p1, p2) => p1.assignedFactions.length - p2.assignedFactions.length);
    if (factionPlayers[0].assignedFactions.length >= 1) {
      log(`Every player for ${faction} already has at least 1 faction, so it will not get assigned`);
    }
    else if (factionPlayers[1].assignedFactions.length >= 1) {
      log(`${factionPlayers[0].name} is the only player in the ${faction} list to have less than 1, so they get them`);
      factionPlayers[0].assignedFactions.push(faction);
      factionPlayers.forEach(p => removeItemFromArray(p.selectedFactions, faction, false));
      if (factionToPlayerAssignments[faction]) {
        removeItemFromArray(factionToPlayerAssignments[faction].assignedFactions, faction);
      }
      factionToPlayerAssignments[faction] = factionPlayers[0];
      // removeFromArray(factionPlayers, 0);
      // removeFromArray(contestedFactions, index--);
      // graph.removeAllEdges(faction, true);
    }
    else {
      log(`Could not find a player to assign ${faction} to`);
    }
  }

  // reduce the graph to only those with the minimum number of assigned picks
  const minCount = graph.vertices.reduce((min, vertex) => Math.min(min, vertex.player.assignedFactions.length), 0);
  graph.vertices.slice().forEach(vertex => {
    if (vertex.player.assignedFactions.length > minCount) {
      graph.removeVertex(vertex, true);
    }
  });

  const draftAssignments = [];

  // try to assign to every player, prioritizing those with fewer factions, and then lower exp
  // but assignments must match within an exp tier (i.e. all tier X players must either get or not get an assignment)
  graph.vertices.sort((v1, v2) => (v1.edges.length - v2.edges.length) || v1.player.exp - v2.player.exp);
  graph.vertices.slice().forEach(vertex => {
    const faction = vertex.edges[0].faction;
    const p1 = vertex.player;
    const p2 = vertex.edgeEndpoints[0].player;
  });
}

function assignWithEqualPicks(players, factionsToPlayers) {
  let factions = allFactions.slice();

  for (let passNum = 1; passNum <= 2; passNum++) {
    log(`Starting pass number ${passNum}`);

    const remainingFactions = [];
    const contestedFactions = [];

    // assign where possible and save contested picks
    factions.forEach(faction => {
      const factionPlayers = factionsToPlayers[faction];
      if (factionPlayers.length === 1) {
        log(`${factionPlayers[0].name} is the only one to select ${faction}`);
        factionPlayers[0].assignedFactions.push(faction);
        removeItemFromArray(factionPlayers[0].selectedFactions, faction);
        removeFromArray(factionPlayers, 0);
      }
      else if (factionPlayers.length > 1) {
        log(`${faction} is contested by ${factionPlayers.length}`);
        if (!resolveConflictsPrioritizeLowerExp(faction, factionPlayers)) {
          contestedFactions.push(faction);
        }
        else {
          removeFromArray(factionPlayers, 0);
        }
      }
      else {
        remainingFactions.push(faction);
      }
    });

    // go through contested factions and try to assign to players who do not have one yet
    for (let index = 0; index < contestedFactions.length; index++) {
      const faction = contestedFactions[index];
      const factionPlayers = factionsToPlayers[faction];

      if (factionPlayers.length === 1) {
        // I do not think this is possible, but I want to catch it
        throw 'Unexpected contested faction with only one selected player';
      }

      factionPlayers.sort((p1, p2) => p1.assignedFactions.length - p2.assignedFactions.length);
      if (factionPlayers[0].assignedFactions.length >= passNum) {
        log(`Every player for ${faction} already has at least ${passNum} factions, so it will not get assigned this round`);
      }
      else if (factionPlayers[1].assignedFactions.length >= passNum) {
        log(`${factionPlayers[0].name} is the only player in the ${faction} list to have less than ${passNum}, so they get them`);
        factionPlayers[0].assignedFactions.push(faction);
        removeItemFromArray(factionPlayers[0].selectedFactions, faction);
        removeFromArray(factionPlayers, 0);
        removeFromArray(contestedFactions, index--);
      }
      else {
        log(`Could not find a player to assign ${faction} to`);
      }
    }
    factions = [...remainingFactions, ...contestedFactions];
  }

  // try to rebalance selections if possible
  const playersWith0 = [];
  const playersWith2 = [];
  players.forEach(p => {
    if (p.assignedFactions.length === 0) {
      playersWith0.push(p);
    }
    else if (p.assignedFactions.length === 2) {
      playersWith2.push(p);
    }
  });
  const possibleTradePlayers = [...playersWith2, ...playersWith0];
  const possibleTradePartners = possibleTradePlayers.reduce((m, p) => {m[p.name] = []; return m}, {});
  playersWith2.forEach(playerWith2 => {
    playersWith0.forEach(playerWith0 => {
      playerWith2.assignedFactions.forEach(faction => {
        if (playerWith0.originalFactions.indexOf(faction) !== -1) {
          possibleTradePartners[playerWith0.name].push([playerWith2, faction]);
          possibleTradePartners[playerWith2.name].push([playerWith0, faction]);
        }
      });
    });
  });

  for (let index = 0; index < possibleTradePlayers.length; index++) {
    const player = possibleTradePlayers[index];
    const partners = possibleTradePartners[player.name];
    if (partners.length === 1) {
      const partner = partners[0][0];
      if (possibleTradePartners[partner.name].length === 1) {
        // these are each others' only two partners, so trade
        const faction = partners[0][1];
        log(`${player.name} and ${partner.name} trading ${faction}`);
        removeFromArray(possibleTradePlayers, index--);
        removeItemFromArray(possibleTradePlayers, partner);
        removeItemFromArray(player.assignedFactions, faction);
        partner.assignedFactions.push(faction);
      }
      else {
        log(`Found an partner with two possible trading partners: ${partner.name}: ${possibleTradePartners[partner.name].map(p => p[0]).join(', ')}`);
      }
    }
    else {
      log(`Found an entry with two possible trading partners: ${player.name}: ${partners.map(p => p[0]).join(', ')}`);
    }
  }
}

function assignNaive(players, factionsToPlayers) {
  const remainingFactions = [];

  // assign uniquely selected factions and factions where one player with the least xp selected them
  // save all factions that do not get assigned to a player
  allFactions.forEach(f => {
    if (factionsToPlayers[f].length === 1) {
      log(`${factionsToPlayers[f][0].name} is the only one to select ${f}`);
      factionsToPlayers[f][0].assignedFactions.push(f);
    }
    else if (factionsToPlayers[f].length > 1) {
      log(`${f} is contested by ${factionsToPlayers[f].length}`);
      if (!resolveConflictsNaive(f, factionsToPlayers[f])) {
        remainingFactions.push(f);
      }
    }
    else {
      remainingFactions.push(f);
    }
  });

  // get each player up to 4
  // players.forEach((player, i) =>
  //   player.assignedFactions = player.assignedFactions.concat(remainingFactions.splice(0, factionsPerPlayer - player.assignedFactions.length))
  // );
}

function validate() {
  clearError(selectionSheet.getRange('A2:F13'));
  const [errorCells, lastRow] = getErrorCells();
  if (errorCells.length) {
    errorCells.forEach(c => setError(c));
    log('Validation failed');
  }
  return [errorCells, lastRow];
}

function resolveConflictsPrioritizeLowerExp(faction, players) {
  players.sort((p1, p2) => p1.exp - p2.exp);
  if (players[0].exp < players[1].exp) {
    log(`${players[0].name} is the lowest exp level and will get the faction ${faction}`);
    players[0].assignedFactions.push(faction);
    players.forEach(p => p.selectedFactions.splice(p.selectedFactions.indexOf(faction), 1));
    return players[0]
  }
  else {
    log(`Multiple players with the same exp level chose ${faction}`);
  }

  return null;
}

function resolveConflictsNaive(faction, players) {
  players.sort((p1, p2) => p1.exp - p2.exp);
  let resolved = false;
  if (players[0].exp < players[1].exp) {
    log(`${players[0].name} is the lowest exp level and will get the faction ${faction}`);
    players[0].assignedFactions.push(faction);
    resolved = true;
  }
  else {
    log(`Multiple players with the same exp level chose ${faction}; nobody gets them`);
  }
  players.forEach(p => removeItemFromArray(p.selectedFactions, faction));
  return resolved;
}

function getPlayers(numPlayers) {
  return readSamplePlayers(numPlayers);
  // const players = readPlayersFromSheet(numPlayers, factionsToPlayers);
}

function readSamplePlayers(numPlayers) {
  const rows = [
    ['Mike', 0, ["Sardakk N'orr", "The Argent Flight"]],
    ['Cole', 0, ["The Arborec", "The Naaz-Rokha Alliance"]],
    ['Mitchell', 0, ["The Arborec", "The Barony of Letnev"]],
    ['Someone', 1, ["Sardakk N'orr", "The Naaz-Rokha Alliance"]],
    ['SomeoneElse', 1, ["The Argent Flight", "The Arborec"]],
  ]

  return rows.map(r => {
    return {
      name: r[0],
      exp: r[1],
      originalFactions: r[2].slice(),
      selectedFactions: r[2],
      assignedFactions: []
    };
  });
}

function readPlayersFromSheet(numPlayers) {
  const players = [];
  for (let pNum = 1; pNum <= numPlayers; pNum++) {
    const row = pNum + startRow - 1;
    const name = selectionSheet.getRange(playerColumn + row).getValue();
    const exp = selectionSheet.getRange(expColumn + row).offset(0, 1).getValue();
    const faction1 = selectionSheet.getRange(faction1Column + row).getValue();
    const faction2 = selectionSheet.getRange(faction1Column + row).offset(0, 1).getValue();
    const selectedFactions = faction1 ? faction2 ? [faction1, faction2] : [faction1] : [];
    players.push({
      name,
      exp,
      selectedFactions,
      originalFactions: selectedFactions.slice(),
      assignedFactions: []
    });
  }
  return players;
}

function getErrorCells() {
  const errorCells = []

  let row = startRow;
  while (true) {
    if (selectionSheet.getRange(playerColumn + row).getValue() === '') {
      log(`Row ${row} is blank; exiting loop`);
      break;
    }

    let r = selectionSheet.getRange(expColumn + row);
    if (r.getValue() === '') {
      log(`Row ${row} has no experience level`);
      errorCells.push(r);
    }

    let r1 = selectionSheet.getRange(faction1Column + row);
    let r2 = r1.offset(0, 1);

    if (r1.getValue() === '' && r2.getValue() !== '') {
      log(`Row ${row} has a faction in slot 2, but not slot 1`);
      errorCells.push(r1);
    }
    else if (r1.getValue() !== '' && r1.getValue() === r2.getValue()) {
      log(`Row ${row} has the same faction selected twice`);
      errorCells.push(r2);
    }

    row++;
  }

  const numPlayers = row - startRow;
  if (numPlayers * factionsPerPlayer > allFactions.length) {
    log('Factions per player is too high for the number of players');
    errorCells.push(selectionSheet.getRange(factionsPerPlayerCell));
  }

  return [errorCells, row - 1];
}

function clearError(cell) {
  cell.setBackground(null);
}

function setError(cell) {
  cell.setBackground('#f4cccc');
}

function generateTestScenarios() {
  for (let i = 0; i < 20; i++) {
    console.log('Player,Exp,Faction 1,Faction 2,Assignment 1,Assignment 2');
    const factionCounts = allFactions.reduce((m, f) => {m[f] = 0; return m}, {});
    const players = [];
    for (let pNum = 1; pNum <= 6; pNum++) {
      const name = 'Player ' + pNum;
      const exp = Math.floor(Math.random() * 3);
      const f1 = allFactions[Math.floor(Math.random() * allFactions.length / 2)];
      factionCounts[f1] += 1;
      let f2 = allFactions[Math.floor(Math.random() * allFactions.length / 2)];
      while (f2 === f1) {
        f2 = allFactions[Math.floor(Math.random() * allFactions.length / 2)];
      }
      factionCounts[f2] += 1;
      players.push([name, exp, f1, f2]);
    }
    players.sort((p1, p2) => p1[1] - p2[1]);
    players.forEach(p => {
      if (factionCounts[p[2]] === 1) {
        p[2] += '*';
      }
      if (factionCounts[p[3]] === 1) {
        p[3] += '*';
      }
      console.info(p.join(','))
    });
  }
}

module.exports = { assignFactions, assignWithGraph, assignWithEqualPicks };
// generateTestScenarios();
// assignFactions();