// copy the content of the file rsa_4096_pub.pem into a variable 
var publicKey = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDBruO3Fdkt8asCV/CXhJmb9OEod9kjfbpXF6AHCoJ3FckluZjf62Alr3XNXZfgJj3w0r8oB3JkWqRyc+Ej50aG2HyLaW+oU+2WAsDaXrHfc0a5l9ahYUbLpgRIC6llyX3FtorqOoLGFmC5Km82Y23dzxDHy+tF9X5MqrCZqvoLxWqrlQS7EGwJRCY+5z2pVVHQUxWpIE1Yt6H6hE+RJAYiXiM5eHjvpqWqktjeBbFPOjnz0S78bvbLo1Zxrt0urIwTb6l3sZbbjJ+lQKD/9OZCiYhtZu/CPL2I5Mxsp4oM+a8FB1vHcS6YECD0ISvjtoPNTg8YrTRVxE0GWGNaEV6n alan@alan-VirtualBox";

// encrypt a javascript object into a payload to be sent
// to a server or stored on the client
var encrypt = function encrypt(dataObject, publicKey) {
 
  // Create a new encryption key (with a specified length)
  var key = generateKey(50);

  // convert data to a json string
  var dataAsString = JSON.stringify(data);

  // encrypt the data symmetrically 
  // (the cryptojs library will generate its own 256bit key!!)
  var aesEncrypted = CryptoJS.AES.encrypt(dataAsString, key);

  // get the symmetric key and initialization vector from
  // (hex encoded) and concatenate them into one string
  var aesKey = aesEncrypted.key + ":::" + aesEncrypted.iv;

  // the data is base64 encoded 
  var encryptedMessage = aesEncrypted.toString();


  // we create a new JSEncrypt object for rsa encryption
  var rsaEncrypt = new JSEncrypt();
  
  // we set the public key (which we passed into the function)
  rsaEncrypt.setPublicKey(publicKey);

  // now we encrypt the key & iv with our public key
  var encryptedKey = rsaEncrypt.encrypt(aesKey);

  // and concatenate our payload message
  var payload = encryptedKey + ":::" + encryptedMessage;

  return encrypted;

};