const bruteForceSolutionBtn = document.getElementById("brute-force-visual-btn");
const bruteForceNumbersOutput = document.querySelector(
  "#brute-force-output > .numbers-array"
);
const bruteForceTextOutput = document.querySelector(
  "#brute-force-output > .result-text"
);
const optimalSolutionBtn = document.getElementById("optimal-visual-btn");
const currentValueOutput = document.getElementById("current-value-output");
const finalOptimalSolutionResult = document.getElementById(
  "final-optimal-result"
);
const table = document.getElementById("table-output");
const tableBodyOutput = document.getElementById("map-table-body");

const testCaseArray = [11, 15, 2, 7];
const target = 9;
let currentNum;
let currentCompliment;

const getClassName = (num) => {
  switch (num) {
    case currentNum:
      return "class='current-num'";
    case currentCompliment:
      return "class='compliment-num'";
    default:
      return "";
  }
};

const bruteForceApproach = async () => {
  bruteForceSolutionBtn.setAttribute("disabled", "");

  for (let i = 0; i < testCaseArray.length; ++i) {
    currentNum = testCaseArray[i];
    for (let j = i + 1; j < testCaseArray.length; ++j) {
      currentCompliment = testCaseArray[j];
      await new Promise((resolve) => setTimeout(resolve, 1000));

      bruteForceNumbersOutput.innerHTML = testCaseArray
        .map(
          (num, index) =>
            `
              <span ${getClassName(num)}>
              ${testCaseArray[index]}
              </span>
            `
        )
        .join("");

      bruteForceTextOutput.textContent = `Does the sum of ${currentNum} + ${currentCompliment} equal ${target}? NO!`;

      if (currentNum + currentCompliment === target) {
        bruteForceTextOutput.textContent = `Final indices: [${i}, ${j}]`;
        bruteForceSolutionBtn.removeAttribute("disabled");
        return;
      }
    }
  }
};

const resetTable = () => {
  tableBodyOutput.innerHTML = "";
  finalOptimalSolutionResult.textContent = "";
};

const optimalApproach = async () => {
  resetTable();
  optimalSolutionBtn.setAttribute("disabled", "");
  table.style.display = "block";
  currentValueOutput.innerHTML = "";
  const map = new Map();

  for (let i = 0; i < testCaseArray.length; ++i) {
    const difference = target - testCaseArray[i];

    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (map.has(difference)) {
      finalOptimalSolutionResult.textContent = `Final indices: [${map.get(
        difference
      )}, ${i}]`;
      currentValueOutput.innerHTML = `
      <p>Difference(${difference}) = target(${target}) - current number(${testCaseArray[i]})</p>
      <p>Is the difference(${difference}) in our map? YES, we found that pair of numbers that add up to the target.</p>
    `;
      optimalSolutionBtn.removeAttribute("disabled");
      return;
    } else {
      currentValueOutput.innerHTML = `
        <p>Difference(${difference}) = target(${target}) - current number(${testCaseArray[i]})</p>
        <p>Is the difference(${difference}) in our map? No.</p>
        <p>Add the current number ${testCaseArray[i]} to our map.</p>
      `;
      tableBodyOutput.innerHTML += `
        <tr>
          <td>${testCaseArray[i]}</td>
          <td>${i}</td>
        </tr>
      `;
      map.set(testCaseArray[i], i);
    }
  }
};

bruteForceSolutionBtn.addEventListener("click", bruteForceApproach);
optimalSolutionBtn.addEventListener("click", optimalApproach);
