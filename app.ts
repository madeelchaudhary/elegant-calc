import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

let userName: string;

const sleep = (ms: number = 750) =>
  new Promise((reslove) => setTimeout(reslove, ms));

async function askName() {
  const answers = await inquirer.prompt({
    name: "user_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Stranger";
    },
  });
  userName = answers.user_name;
}

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    `Hello, ${userName}!\nThank you for exploring.`
  );

  rainbowTitle.start();
  await sleep();
  rainbowTitle.stop();
}

function calculateResults(operator: string, number1: number, number2: number) {
  if (isNaN(number1) || isNaN(number2)) {
    throw "Enter a valid number.";
  }

  switch (operator) {
    case "+":
      return number1 + number2;
      break;
    case "-":
      return number1 - number2;
      break;
    case "x":
      return number1 * number2;
      break;
    case "÷":
      if (number2 === 0) {
        throw "Division by zero is invalid";
      }
      return number1 / number2;
      break;
    default:
      throw "Operation is invalid";
      break;
  }
}

async function askOperation() {
  const answers = await inquirer.prompt([
    {
      name: "operation",
      type: "list",
      message: "Oeration you want to perform?\n",
      choices: ["+", "-", "x", "÷"],
    },
    {
      name: "num1",
      type: "number",
      message: "Enter the first number: ",
    },
    {
      name: "num2",
      type: "number",
      message: "Enter the second number: ",
    },
  ]);

  return answers;
}

async function calculator() {
  let continueCalculation = true;

  do {
    const calculationInfo = await askOperation();
    try {
      const calculationResult = calculateResults(
        calculationInfo.operation,
        calculationInfo.num1,
        calculationInfo.num2
      );
      console.log(
        `${chalk.bold.blue(
          "The result of your calculation is"
        )}: ${chalk.bold.hex("#29AB87")(
          chalk.bgWhite(" " + calculationResult + " ")
        )}`
      );
    } catch (error) {
      console.log(`${chalk.bold.red(chalk.bgWhite(error))}`);
    }

    const answers = await inquirer.prompt([
      {
        name: "userChoice",
        type: "confirm",
        message: "Do you want to perform further calculation",
      },
    ]);

    continueCalculation = answers.userChoice;
    if (!continueCalculation) {
      const karaokeTitle = chalkAnimation.karaoke("Have a good day!");
      karaokeTitle.start();
      await sleep(850);
      karaokeTitle.stop();
    }
  } while (continueCalculation);
  process.exit(0);
}

await askName();
await welcome();
calculator();
