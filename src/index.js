`use strict`;
(function () {
  const account1 = {
    name: `John Doe`,
    pin: 1111,
    movements: [150, 1500, -1300, 2000, 500, -2000],
    interestRate: 1.2,
  };
  const account2 = {
    name: `Williams Robinson`,
    pin: 2222,
    movements: [150, 50000, -13647, -2900, -5000, -2000, 1700, 3457],
    interestRate: 4,
  };
  const account3 = {
    name: `Jane Boe`,
    pin: 3333,
    movements: [10050, -1750, -1305, -3700, 5000, -2000],
    interestRate: 2,
  };
  const account4 = {
    name: `Michael Philip Terry`,
    pin: 4444,
    movements: [1567, 1500, -1300, 2000, 58700, -4657],
    interestRate: 1.5,
  };
  const account5 = {
    name: `Jonathan Goodluck`,
    pin: 5555,
    movements: [15000, -1500, -1300, 47600, -50, -1860, -40000],
    interestRate: 3.3,
  };

  const accounts = [
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    account1,
    account2,
    account3,
    account4,
    account5,
  ];

  //SELECTORS
  const summaryinDeposits = document.querySelector(".summary_in");
  const summaryinWithdrawal = document.querySelector(".summary_out");
  const summaryInterests = document.querySelector(".summary_interest");
  const summaryBalance = document.querySelector(".cb_balance");
  //INPUT
  const inputuserName = document.querySelector(".userName");
  const inputuserPin = document.querySelector(".userPin");
  const inputtransferUserName = document.querySelector(".transfer_username");
  const inputtransferAmount = document.querySelector(".transfer_amount");
  const inputcloseusername = document.querySelector(".close_username");
  const inputclosePin = document.querySelector(".close_pin");
  const inputloanUserName = document.querySelector(".loan_username");
  const inputLoanAmount = document.querySelector(".loan_amount");

  const Opacity = document.querySelector("main");
  //BUTTONS
  const loginBtn = document.querySelector(".login_btn");
  const tansferBtn = document.querySelector(".transfer_btn");
  const loanBtn = document.querySelector(".loan_btn");
  const closeBtn = document.querySelector(".close_btn");
  const sortBtn = document.querySelector(".btn_sort");

  // BANK APP
  const bankApp = (account) => {
    //CREATE USERNAME
    const createUserName = (account) => {
      account.map((acc) => {
        acc.username = acc.name
          .toLowerCase()
          .slice()
          .split(" ")
          .map((name) => name[0])
          .join("");
      });
    };
    createUserName(account);

    // DISPLAY MOVEMENTS

    const displayMovements = (account) => {
      document.querySelector(".movements").innerHTML = "";
      account?.movements.forEach((move, i) => {
        const weigh = move > 0 ? "deposit" : "withdrawal";

        const html = `
      <div class="movements_row">
              <div class="mov_spacing">
                <div class="mov_${weigh}">${i + 1} ${weigh}</div>
                <div class="mov_date">today</div>
              </div>
              <div class="mov_amount">${move.toFixed(2)}€</div>
            </div>
      `;
        document
          .querySelector(".movements")
          .insertAdjacentHTML("afterbegin", html);
      });
    };

    // DISPLAY BALANCE AND SUMMARY
    const displaySummary = (account) => {
      document.querySelector(".greet").textContent = `Good day, ${
        account.name.split(" ")[0]
      }!`;
      account.deposits = account?.movements
        .filter((move) => move > 0)
        .reduce((mov, cur) => (mov += cur));
      account.withdrawals = account?.movements
        .filter((move) => move < 0)
        .reduce((mov, cur) => (mov += cur));
      account.balance = account?.movements.reduce((mov, cur) => (mov += cur));
      const interest =
        (account?.movements
          .filter((move) => move > 50)
          .reduce((move, cur) => (move += cur), 0) /
          100) *
        account?.interestRate;
      summaryinDeposits.innerHTML = `<p class="summary_in"><span class="sum_in"> IN</span> ${account.deposits.toFixed(
        2
      )}€</p>
`;
      summaryinWithdrawal.innerHTML = ` <p class="summary_out"><span class="sum_out"> OUT</span> ${Math.abs(
        account.withdrawals
      ).toFixed(2)}€</p>`;
      summaryInterests.innerHTML = `<p class="summary_interest">
              <span class="sum_int"> INTEREST</span> ${interest.toFixed(2)}€
            </p>`;
      summaryBalance.textContent = `${account?.balance.toFixed(2)}€`;
    };

    // AUTHENTICATE USER
    let currentUser;
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // find user
      account.find((acc) => {
        if (
          acc?.username === inputuserName.value &&
          acc?.pin == Number(inputuserPin.value)
        ) {
          currentUser = acc;
          Opacity.style.opacity = `100`;
          displayMovements(currentUser);
          displaySummary(currentUser);
          inputuserName.value = "";
          inputuserPin.value = "";
          console.log(acc);
        }
      });
    });

    // TRANSFER MONEY
    tansferBtn.addEventListener("click", (e) => {
      e.preventDefault();

      if (currentUser) {
        account?.find((acc) => {
          if (
            inputtransferUserName.value === acc?.username &&
            currentUser.username !== inputtransferUserName.value &&
            Number(inputtransferAmount.value) < currentUser.balance
          ) {
            acc?.movements.push(Number(inputtransferAmount.value));
            currentUser.movements.push(-Number(inputtransferAmount.value));
            displayMovements(currentUser);
            displaySummary(currentUser);
            inputtransferUserName.value = "";
            inputtransferUserName.value;
          }
        });
      }
    });

    // GET LOAN
    loanBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (currentUser) {
        if (
          currentUser.username === inputloanUserName.value &&
          currentUser.deposits > 50000 &&
          Number(inputLoanAmount.value) < 10000
        ) {
          currentUser.movements.push(Number(inputLoanAmount.value));
          displayMovements(currentUser);
          displaySummary(currentUser);
          inputLoanAmount.value = "";
          inputloanUserName.value = "";
        }
      }
    });

    // CLOSE ACCOUNT

    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      account.find((acc, i) => {
        if (
          currentUser.username === inputcloseusername.value &&
          currentUser.pin == Number(inputclosePin.value)
        ) {
          account.splice(i, 1);
          Opacity.style.opacity = `0`;
          document.querySelector(
            ".greet"
          ).textContent = `Log in to get started`;
          inputcloseusername.value = "";
          inputclosePin.value = "";
        }
      });
    });

    // SORT
    let sorted = false;
    sortBtn.addEventListener("click", (e) => {
      e.preventDefault();

      if (currentUser && sorted === false) {
        currentUser.movements.sort((a, b) => a - b);
        displayMovements(currentUser);
        displaySummary(currentUser);
        sorted = true;
      } else {
        currentUser.movements.sort((a, b) => b - a);
        displayMovements(currentUser);
        displaySummary(currentUser);
        sorted = false;
      }
    });
    /*  let minutes = 0;
    let seconds = 60;
    const setLogOutTime = () => {
      if (seconds !== 0) {
        seconds = seconds - 1;
        document.querySelector(
          ".timer"
        ).textContent = `You will be logged out in ${minutes}:${seconds}`;
        console.log(`You will be logged out in ${minutes}:${seconds}`);
      } else {
        minutes = minutes - 1;
        seconds = 60;
      }
      if (minutes === 0 && seconds === 0) {
        currentUser = false;
        Opacity.style.opacity = `0`;
        document.querySelector(".greet").textContent = `Log in to get started`;
      }
    }; */
  };
  bankApp(accounts);
})();
