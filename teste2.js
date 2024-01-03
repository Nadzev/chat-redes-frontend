const { spawn } = require('child_process');

function encryptWithCamellia(text) {
  // Spawn the OpenSSL process
  const openssl = spawn('openssl', ['enc', '-camellia-128-cbc', '-e', '-a', '-pass', 'pass:yourpassword']);

  let encrypted = '';

  // Send the text to the OpenSSL process
  openssl.stdin.write(text);
  openssl.stdin.end();

  // Handle the data as it's returned
  openssl.stdout.on('data', (data) => {
    encrypted += data.toString();
  });

  // Handle the process closing
  openssl.on('close', (code) => {
    if (code !== 0) {
      console.log(`OpenSSL process exited with code ${code}`);
    } else {
      console.log('Encrypted text:', encrypted);
    }
  });
}

// Example usage
encryptWithCamellia("Hello, World!");