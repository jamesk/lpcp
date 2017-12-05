function appendToDroidOutput(msg) {
  getDroidOutput().value += msg;
}
function setStatus(msg) {
  getStatus().innerHTML = msg;
}

function backgroundProcess() {
  const process = require("child_process"); // The power of Node.JS

  // var ls = process.spawn('ls', ['-l']);
  var ls = process.spawn("./test.sh");

  ls.stdout.on("data", function(data) {
    // console.log('stdout: <' + data+'> ');
    // appendToDroidOutput(data);
    appendToDroidOutput("stdout: <" + data + "> \n");
  });

  ls.stderr.on("data", function(data) {
    console.log("stderr: " + data);
  });

  ls.on("close", function(code) {
    // console.log('child process exited with code ' + code);
    if (code == 0) setStatus("child process complete.");
    else setStatus("child process exited with code " + code);
    getDroidOutput().style.background = "DarkGray";
  });
}

function runCmd(cmd, args) {
  const process = require("child_process"); // The power of Node.JS

  // var ls = process.spawn('ls', ['-l']);
  var ls = process.spawn(cmd, args); //TODO: use windowsHide option?

  ls.stdout.on("data", function(data) {
    // console.log('stdout: <' + data+'> ');
    // appendToDroidOutput(data);
    appendToDroidOutput("stdout: <" + data + "> \n");
  });

  ls.stderr.on("data", function(data) {
    console.log("stderr: " + data);
  });

  ls.on("close", function(code) {
    // console.log('child process exited with code ' + code);
    if (code == 0) setStatus("child process complete.");
    else setStatus("child process exited with code " + code);
    getDroidOutput().style.background = "DarkGray";
  });
}

function searchLP(q) {
  const process = require("child_process"); // The power of Node.JS

  // var ls = process.spawn('ls', ['-l']);
  var ls = process.spawn("lpass", ["ls", "--sync=no"]); //TODO: use windowsHide option?
  var grep = process.spawn("grep", ["-i", q]);

  ls.stdout.pipe(grep.stdin);

  getDroidOutput().value = "";

  grep.stdout.on("data", function(data) {
    // console.log('stdout: <' + data+'> ');
    // appendToDroidOutput(data);
    appendToDroidOutput("<search> stdout: <" + data + "> \n");
  });

  ls.stderr.on("data", function(data) {
    console.log("<ls> stderr: " + data);
  });
  grep.stderr.on("data", function(data) {
    console.log("<grep> stderr: " + data);
  });

  ls.on("close", function(code) {
    // console.log('child process exited with code ' + code);
    if (code == 0) setStatus("ls child process complete.");
    else setStatus("ls child process exited with code " + code);
    getDroidOutput().style.background = "DarkGray";
  });
  grep.on("close", function(code) {
    // console.log('child process exited with code ' + code);
    if (code == 0) setStatus("<grep> child process complete.");
    else setStatus("<grep> child process exited with code " + code);
    getDroidOutput().style.background = "DarkGray";
  });
}
