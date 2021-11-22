const {get_test_cases} = require("./test_cases_1");
const {assignFactions, assignWithGraph, assignWithEqualPicks} = require("./factions");

const stopOnFailure = true;
let failureEncountered = false;

const testsToRun = [];

const test_cases = get_test_cases().filter(t => !testsToRun.length || testsToRun.indexOf(t.testNumber) >= 0);

const results = [];

test_cases.forEach((testCase) => {
  if (failureEncountered) {
    return;
  }
  const { notes, testData, testNumber } = testCase;
  if (testsToRun.length && testsToRun.indexOf(testNumber) === -1) {
    return;
  }
  console.info(`Running test case #${testNumber}`);
  console.info(`------------------------`);

  const playerMap = testData.reduce((m, p) => {m[p.name] = p; return m}, {});

  const players = testData.map(r => {
    return {
      name: r.name,
      exp: r.exp,
      originalFactions: r.selectedFactions.slice(),
      selectedFactions: r.selectedFactions,
      assignedFactions: []
    };
  });

  assignFactions(players, assignWithGraph);

  const violations = [];

  players.forEach(player => {
    const player_test_data = playerMap[player.name];
    player_test_data.assignedFactions.sort();
    player.assignedFactions.sort();
    const errorMessage = `Test failed for ${player.name}. Actual assigned factions: ${player.assignedFactions.join(', ')}; Expected: ${player_test_data.assignedFactions.join(', ')}`;
    if (player.assignedFactions.length !== player_test_data.assignedFactions.length) {
      violations.push(errorMessage);
    }
    else {
      for (let index in player_test_data.assignedFactions) {
        if (player_test_data.assignedFactions[index] !== player.assignedFactions[index]) {
          violations.push(errorMessage);
        }
      }
    }
  });

  results.push(violations);
  console.info(`------------------------\n`);
  if (stopOnFailure && violations.length) {
    console.info('Test case has errors and stopOnFailure is true');
    failureEncountered = true;
  }
});

console.info('Results:');
console.info(`------------------------\n`);

let passed = 0;
let failed = 0;

results.forEach((violations, index) => {
  const test_case = test_cases[index];
  const { notes, testNumber } = test_case;
  console.info(`Test ${testNumber}`);
  console.info(`------------------------`);
  if (violations.length) {
    console.info(`Result: failed:`);
    violations.forEach(v => console.info(v));
    console.info(`Notes: ${notes}`);
    failed++;
  }
  else {
    console.info(`Result: passed`);
    passed++;
  }
  console.info(`------------------------\n`);
});

console.info(`Passed: ${passed}`);
console.info(`Failed: ${failed}`);