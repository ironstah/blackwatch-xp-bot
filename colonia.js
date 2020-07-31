const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

//Complete with cookies!
const Discord = require("discord.js");
const CorsairianBot = new Discord.Client();

const PREFIX = "!";
const https = require("https");
const rbx = require("noblox.js");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGOOB_URI, { useNewUrlParser: true });
const data = require("./models/dataBeta.js");
const cookieObj = process.env.ROBLOX_PASS;

var mainGroupId = 6130244;
//var knighthoodGroupId = 4378284;
//var pantheonGroupId = 4465617;
//var royaltyGroupId = 4378280;

var username = "Imperium XP";

var requiredGroupXP = [
  // Rank name, XP amount, role number
  ["[PC] Peacekeeper Initiate", 0, 1],
  ["[PC] Peacekeeper C", 10, 2],
  ["[PC] Peacekeeper Z", 30, 3],
  ["[CC] Combat Unit B", 80, 4],
  ["[CC] Combat Unit D", 120, 5],
  ["[CC] Combat Unit A", 240, 6],
  ["[CC] Combat Unit O", 350, 7],
];



async function startApp() {
  await rbx.setCookie(String(cookieObj));
  let currentUser = await rbx.getCurrentUser();
}

startApp()
  .then(function() {
    console.log("Logged in.");
  })
  .catch(function(error) {
    console.log(`Login error: ${error}`);
  });

CorsairianBot.login(process.env.BOT_TOKEN);

function setGroupRank(groupId, id, role) {
  rbx.setRank(groupId, id, role).then(function(newRank) {
    console.log(newRank);
  });
}

function nextRank(xp) {
  let groupXP = requiredGroupXP;
  for (var i = 0; i < groupXP.length; i++) {
    xp = parseInt(xp);
    console.log("XP is: "+xp);
    if (typeof groupXP[i + 1] == `undefined`) {
      if (groupXP[i][1] <= xp) {
        var data = [
          "0", // Experience for promotion
          "Veteran", // Current rank
          "Lord" // Next rank
        ];
        return data;
      }
    } else {
      if (
        groupXP[i][1] <= xp &&
        xp < groupXP[i + 1][1]
      ) {
        var data = [
          groupXP[i + 1][1] - xp, // Experience for promotion
          groupXP[i][0], // Current rank
          groupXP[i + 1][0] // Next rank name
        ];
        console.log("Data 0: "+data[0]);
        console.log("Data 1:" +data[1]);
        return data;
      }
    }
  }
    
  
}

function checkExperience(id, xp) {
  rbx.getRankInGroup(mainGroupId, id).then(function(currentRole) {
    console.log("Current role: " + currentRole);
    if (currentRole != 0) {
      console.log("Length of array: " + requiredGroupXP.length);
      for (var i = 0; i < requiredGroupXP.length; i++) {
        //Iterates through the array to see if the player's experience is high enough.
        
        //console.log("Array spot: " + requiredKnighthoodXP[i]);
        //console.log("Array spot children 1: " + requiredKnighthoodXP[i][1]);
        if (typeof requiredGroupXP[i + 1] == `undefined`) {
          if (requiredGroupXP[i][1] <= xp) {
            var role = requiredGroupXP[i][2];
            console.log(role);
            setGroupRank(mainGroupId, id, role);
            break;
          }
        } else {
          if (
            requiredGroupXP[i][1] <= xp &&
            xp < requiredGroupXP[i + 1][1]
          ) {
            var role = requiredGroupXP[i][2];
            setGroupRank(mainGroupId, id, role);
            break;
          }
        }
      }
    }
  });
  /*rbx.getRankInGroup(royaltyGroupId, id).then(function(currentRole) {
    console.log("Current role: " + currentRole);
    if (currentRole != 0) {
      console.log("Length of array: " + requiredRoyaltyXP.length);
      for (var i = 0; i < requiredRoyaltyXP.length; i++) {
        //Iterates through the array to see if the player's experience is high enough.
        
        //console.log("Array spot: " + requiredRoyaltyXP[i]);
        //console.log("Array spot children 1: " + requiredRoyaltyXP[i][1]);
        if (typeof requiredRoyaltyXP[i + 1] == `undefined`) {
          if (requiredRoyaltyXP[i][1] <= xp) {
            var role = requiredRoyaltyXP[i][2];
            console.log(role);
            setGroupRank(royaltyGroupId, id, role);
            break;
          }
        } else {
          if (
            requiredRoyaltyXP[i][1] <= xp &&
            xp < requiredRoyaltyXP[i + 1][1]
          ) {
            var role = requiredRoyaltyXP[i][2];
            setGroupRank(royaltyGroupId, id, role);
            break;
          }
        }
      }
    }
  }); 
  rbx.getRankInGroup(pantheonGroupId, id).then(function(currentRole) {
    console.log("Current role: " + currentRole);
    if (currentRole != 0) {
      console.log("Length of array: " + requiredPantheonXP.length);
      for (var i = 0; i < requiredPantheonXP.length; i++) {
        //Iterates through the array to see if the player's experience is high enough.
        
        //console.log("Array spot: " + requiredPantheonXP[i]);
        //console.log("Array spot children 1: " + requiredPantheonXP[i][1]);
        if (typeof requiredPantheonXP[i + 1] == `undefined`) {
          if (requiredPantheonXP[i][1] <= xp) {
            var role = requiredPantheonXP[i][2];
            console.log(role);
            setGroupRank(pantheonGroupId, id, role);
            break;
          }
        } else {
          if (
            requiredPantheonXP[i][1] <= xp &&
            xp < requiredPantheonXP[i + 1][1]
          ) {
            var role = requiredPantheonXP[i][2];
            setGroupRank(pantheonGroupId, id, role);
            break;
          }
        }
      }
    }
  });*/
}

function getId(username, xp, callback) {
  //Function that finds
  
  https
    .get(
      "https://api.roblox.com/users/get-by-username?username=" + username,
      res => {
        let data = "";

        res.on("data", chunk => {
          data += chunk;
        });

        res.on("end", () => {
          
          callback(JSON.parse(data).Id, username, xp);
        });
      }
    )
    .on("error", err => {
      
      console.log("Error: " + err.message);
    });
}

function createDocument(idParam, usernameParam, xpParam) {
  if (!xpParam || xpParam == null || xpParam == "undefined") {
    xpParam = "0";
  }
  const newData = new data({
    //Creates new entry
    _id: mongoose.Types.ObjectId(),
    username: usernameParam,
    userId: idParam,
    experiencePoints: xpParam
  });

  newData.save(); //Saves and then prints the result of the new object.
  checkExperience(idParam, xpParam);
}

CorsairianBot.on("message", message => {
  {
    function getUsers(list) {

      list = list.split(" ");

      if (list[0] == "editXp") { //The command is editXp [username] #
        getId(list[1], list[2], function(result, name, xp) {
          searchAccount(result, name, xp);
        });

        function searchAccount(result, name, xp) {
          data.findOne({ userId: result }, (err, account) => {
            // Looks for the user in the database, if not found creates an account.
            console.log(typeof(xp));
            
            if (err || typeof(result) == "undefined") console.log(err);
            if (!account && typeof(result) != "undefined" && isNaN(xp) == false) {
              createDocument(result, name, xp);
              message.channel.send("Creating account, then adding points.");
            } else if (typeof(result) != "undefined" && isNaN(xp) == false) {
              var newXp = parseInt(account.experiencePoints) + parseInt(xp);

              checkExperience(result, newXp);

              account.experiencePoints = newXp;
              account.save().catch(err => console.log(err));
              message.channel.send("Added successfully.");
            } else {
              message.channel.send("Points were not added. Maybe you mispelt something. Try again.");
            }
          });
        }
        
      }
    }
    var BotUsername = "Imperium XP";
    
    //Ready for action!

    //var guild = CorsairianBot.guilds.get(`459442373517115392`);
    //var allowedRole = guild.roles.find("name", "Moderator");
    //var role = guild.roles.find("name", "Citizen");

    if (message.channel.name == "edit-xp" && message.author.username != BotUsername) {
      getUsers(message.content);
      
    /*} else if (message.content.startsWith(PREFIX + "search")) {
      let searchwords = message.content.split(/\s+/g).slice(1);
      searchwords.join(" + ");
      message.channel.send(
        `https://www.google.com/search?q=${searchwords}&rlz=1C1CHZL-enUS724US724&oq=search&aqs=chrome..69i57j69i60l2j0l3.5044j0j8&sourceid=chrome&ie=UTF-8`
      );
    } else if (message.content.startsWith(PREFIX + "help")) {
      message.author.send("To be remade.");
    } else if (message.content.startsWith(PREFIX + "amount")) {
      const args = message.content.split(/\s+/g).slice(1);
      let role = message.mentions.roles.first();
      var members = message.guild.roles.get(role.id).members;
      message.channel.send(
        `${members.size} is the amount of people in this role.`
      );
    } else if (message.content.startsWith(PREFIX + "repeat")) {
      const args = message.content.split(/\s+/g).slice(1);
      var i = 0;
      message.channel.send(args.join(" "));
    } else if (
      message.content.startsWith(PREFIX + "kick") &&
      message.member.roles.has(allowedRole.id)
    ) {
      //Admin Section
      let member = message.mentions.members.first();
      member.kick();
      message.channel.send("Member has been kicked.");
    } else if (
      message.content.startsWith(PREFIX + "ban") &&
      message.member.roles.has(allowedRole.id)
    ) {
      let member = message.mentions.members.first();
      member.ban();
      message.channel.send("Member has been banned.");
    } else if (
      message.content.startsWith(PREFIX + "purge") &&
      message.member.roles.has(allowedRole.id)
    ) {
      const args = message.content.split(/\s+/g).slice(1);
      let messagecount = parseInt(args[0]) + 1;
      message.channel
        .fetchMessages({ limit: messagecount })
        .then(messages => message.channel.bulkDelete(messages));
      message.channel.send("Messages deleted.");
    } else if (message.content.startsWith(PREFIX + "roll")) {
      message.channel.send("You got a " + Math.floor(Math.random() * 20));
    } else if (message.content.startsWith(PREFIX + "8ball")) {
      const args = message.content.split(/\s+/g).slice(1);
      var Result = Math.floor(Math.random() * 20);
      if (Result == 0) {
        message.channel.send("It is certain.");
      } else if (Result == 1) {
        message.channel.send("It is decidedly so.");
      } else if (Result == 2) {
        message.channel.send("Without a doubt.");
      } else if (Result == 3) {
        message.channel.send("Yes definitely.");
      } else if (Result == 4) {
        message.channel.send("You may rely on it.");
      } else if (Result == 5) {
        message.channel.send("As I see it, yes.");
      } else if (Result == 6) {
        message.channel.send("Most likely.");
      } else if (Result == 7) {
        message.channel.send("Outlook good.");
      } else if (Result == 8) {
        message.channel.send("Yes.");
      } else if (Result == 9) {
        message.channel.send("Signs point to yes.");
      } else if (Result == 10) {
        message.channel.send("Reply hazy try again.");
      } else if (Result == 11) {
        message.channel.send("Ask again later.");
      } else if (Result == 12) {
        message.channel.send("Better not tell you now.");
      } else if (Result == 13) {
        message.channel.send("Cannot predict now.");
      } else if (Result == 14) {
        message.channel.send("Concentrate and ask again.");
      } else if (Result == 15) {
        message.channel.send("Don't count on it.");
      } else if (Result == 16) {
        message.channel.send("My reply is no.");
      } else if (Result == 17) {
        message.channel.send("My sources say no.");
      } else if (Result == 18) {
        message.channel.send("Outlook not so good.");
      } else if (Result == 19) {
        message.channel.send("Very doubtful.");
      } else if (Result == 20) {
        message.channel.send(
          "You got the magic number 20! Also, my reply is no."
        );
      }
    } else if (message.content.startsWith(PREFIX + "either")) {
      const args = message.content.split(/\s+/g).slice(1);
      for (i = 0; i < args.length; i++) {
        if (args[i] == "|") {
          var Border = i;
          var Chance = Math.floor(Math.random() * 2);
          if (Chance == 1) {
            let newargs = args.slice(Border + 1);
            message.channel.send(`I choose, ` + newargs.join(" "));
          } else {
            let newargs = args.slice(0, Border);
            message.channel.send(`I choose, ` + newargs.join(" "));
          }
        }
      }
    } else if (message.content.startsWith(PREFIX + "flip")) {
      var Chance = Math.floor(Math.random() * 2);
      if (Chance == 1) {
        message.channel.send("Tails.");
      } else {
        message.channel.send("Heads.");
      }
    } else if (message.content.startsWith(PREFIX + "newstats")) {
      message.channel.send(
        "Your strength is " +
          Math.floor(Math.random() * 20) +
          ". Your dexerity is " +
          Math.floor(Math.random() * 20) +
          ". Your constituion is " +
          Math.floor(Math.random() * 20) +
          ". Your intelligence is " +
          Math.floor(Math.random() * 20) +
          ". Your wisdom is " +
          Math.floor(Math.random() * 20) +
          ". Your charisma is " +
          Math.floor(Math.random() * 20) +
          ". Your health is " +
          Math.floor(Math.random() * 100)
      );*/
    } else if (message.content.startsWith(PREFIX + "xp") && message.channel.name == "check-xp") {
      var args = message.content.split(" ");
      var player = args[1];
      
      console.log("start");
      console.log(args[0]);
      console.log("====");
      console.log(args[1]);
      console.log("====");
      console.log(args[2]);
      console.log("end");

      getId(player, 0, function(result, name, xp) {
        data.findOne({ userId: result }, (err, account) => {
          if (err || typeof(result) == "undefined")
            message.channel.send(
              "Player not found. Maybe you misspelt something. Try again."
            );
          else if (!account && typeof(result) != "undefined") {
            createDocument(result, name, xp);
            message.channel.send(
              "Account not found. Creating account. Try again."
            );
          } else if (account) {
            let xp = parseInt(account.experiencePoints);
            
            console.log("CURRENT EX: "+account.experiencePoints);
            
            let groupInfo = nextRank(parseInt(account.experiencePoints));
            
            

            message.channel.send({
              embed: {
                color: 0x008080,
                author: {
                  name: player,
                  icon_url: message.author.avatarURL
                },
                title: "*Experience System*",
                fields: [
                  {
                    name: "**CURRENT XP:**",
                    value: String(xp)
                  },
                  {
                    name: `***XP NEEDED FOR PROMOTION***`,
                    value: String(groupInfo[0])+" NEEDED"
                  }
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: CorsairianBot.user.avatarURL,
                  text: "STRENGTH IN TECH, UNION IN STRENGTH"
                }
              }
            });
          }
        });
      });
    }
  }
});
