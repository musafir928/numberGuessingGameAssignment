const fs = require('fs');

function generateAndSaveRandomNumber() {
    return new Promise((resolve, reject) => {
        const randomNumber = Math.round(Math.random()*101) -1;
        const randomNumberObject = {randomNumber};
      fs.writeFile('./variables.json', JSON.stringify(randomNumberObject), 'utf8', err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
}

function addUserToWinnersList(users) {
    return new Promise((resolve, reject) => {
      fs.writeFile('./users.json', JSON.stringify(users), 'utf8', err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
}

function readFromFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if(data==null) resolve(data);
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

exports.saveRandom =  async function (req, res) {
  try {
    await generateAndSaveRandomNumber();
    const winners = await readFromFile('./users.json');
    res.send(JSON.stringify(winners));
  } catch (err) {
    res.send(err.message);
  }
}

exports.guess =  async function (req, res) {
  try {
    const {user_id, guessedNumber} = req.body;
    const randomValueObject = await readFromFile('./variables.json');
    const randomValue = randomValueObject.randomNumber; 
    const gameInfo = {
        guess: guessedNumber == randomValue ? "Bingo!!!" : 
            guessedNumber < randomValue ? "lower" : "higher",
        win: guessedNumber == randomValue ? true : false,
        user_id: user_id
    }
    if(gameInfo.win){
      const data = await readFromFile('./users.json');
      data.data.push({user_id});
      await addUserToWinnersList(data);
    }
    res.send(gameInfo)
  } catch (err) {
    res.send(err.message);
  }
}