const Discord = require('discord.js');
const client = new Discord.Client();
var prefix = "="
client.on('ready', () => {
    console.log('I am ready!');
    client.user.setGame(`**type =help**`, 'https://www.twitch.tv/activate')
});
 
client.on('message', message => {
    if (message.content === 'السلام عليكم') {
        message.reply('وعليكم سلام :heart:');
    }
});
client.on('message', message => {
  if(message.content.startsWith(prefix + "voicesetup")) {
  if(!message.guild.member(message.author).hasPermissions('MANAGE_CHANNELS')) return message.reply(':x: **اسف ليس لديك صلاحية كافية لصنع روم**');
  if(!message.guild.member(client.user).hasPermissions(['MANAGE_CHANNELS','MANAGE_ROLES_OR_PERMISSIONS'])) return message.reply(':x: **اسف ليس لدي صلاحية**');
  var args = message.content.split(' ').slice(1).join(' ');
  if(args && !args.includes(0)) return message.channel.send(':negative_squared_cross_mark: » فشل اعداد الروم الصوتي .. __يجب عليك كتابة 0 في اسم الروم__');
  if(!args) args = `VoiceOnline: [ ${message.guild.members.filter(s => s.voiceChannel).size} ]`;
  message.channel.send(':white_check_mark: » تم عمل روم بنجاح ');
  message.guild.createChannel(`${args.replace(0, message.guild.members.filter(s => s.voiceChannel).size)}`, 'voice').then(c => {
    c.overwritePermissions(message.guild.id, {
      CONNECT: false,
      SPEAK: false
    });
    setInterval(() => {
      c.setName(`${args.replace(0, message.guild.members.filter(s => s.voiceChannel).size)}`).catch(err => {
        if(err) return;
      });
    },3000);
  });
  }
});
client.on('message', message => {
   if (message.author.kick) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "kick") {
               if(!message.channel.guild) return;
         
  if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.reply("You Don't Have KICK_MEMBERS Permission").then(msg => msg.delete(5000));
  if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return message.reply("I Don't Have KICK_Members Permission");
  let user = message.mentions.users.first();
  let reason = message.content.split(" ").slice(2).join(" ");

  if (message.mentions.users.size < 1) return message.reply("منشن شخص");
  if(!reason) return message.reply ("اكتب سبب الطرد");
  if (!message.guild.member(user)
  .bannable) return message.reply("لايمكنني طرد شخص اعلى من رتبتي");

  message.guild.member(user).kick(7, user);

  const banembed = new Discord.RichEmbed()
  .setAuthor('Kicked !', user.displayAvatarURL)
  .setColor("RANDOM")
  .setTimestamp()
  .addField("User:",  `[ + ${user.tag} + ]`)
  .addField("By:", `[  + ${message.author.tag} +  ]`)
  .addField("Reason:", `[ + ${reason} +  ]`)
  client.channels.get("492086928397565952").send({embed : banembed})
}
});

  client.on('message', message => {
  if (message.author.codes) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "ban") {
               if(!message.channel.guild) return message.reply('** This command only for servers**');
         
  if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.reply("**انت لا تملك الصلاحيات المطلوبه**");
  if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.reply("**I Don't Have ` BAN_MEMBERS ` Permission**");
  let user = message.mentions.users.first();
  
  if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");
  if (!message.guild.member(user)
  .bannable) return message.reply("**يجب ان تكون رتبة البوت اعلي من رتبه الشخص المراد تبنيدة**");

  message.guild.member(user).ban(7, user);

message.channel.send(`**baneed from this server**`)

}
});
 
 client.on('message' , message => {
  if(message.author.bot) return;
  if(message.content.startsWith(prefix + "ping")) {
message.channel.send('Pong...').then((msg) => {
      msg.edit(`\`\`\`javascript\nTime taken: ${msg.createdTimestamp - message.createdTimestamp} ms.\nDiscord API: ${Math.round(client.ping)} ms.\`\`\``);
})
  }  
});
client.on('message', message => {
              if (!message.channel.guild) return;
      if(message.content ==prefix + 'count')
      var IzRo = new Discord.RichEmbed()
      .setThumbnail(message.author.avatarURL)
      .setFooter(message.author.username, message.author.avatarURL)
      .setTitle('🌍| Members info')
      .addBlankField(true)
      .addField('Mmeber Count',`${message.guild.memberCount}`)
      message.channel.send(IzRo);
    });
    client.on('message', message => {
    var prefix = "-";
              if(!message.channel.guild) return;
    if(message.content.startsWith(prefix + 'bc')) {
    if(!message.channel.guild) return message.channel.send('**This Command Only For Servers**').then(m => m.delete(5000));
  if(!message.member.hasPermission('ADMINISTRATOR')) return      message.channel.send('**You Dont Have perms** `ADMINISTRATOR`' );
    let args = message.content.split(" ").join(" ").slice(2 + prefix.length);
    let copy = "Speed Bot";
    let request = `Requested By ${message.author.username}`;
    if (!args) return message.reply('**Write Some Things To Broadcast**');message.channel.send(`**Are You Sure \nThe Broadcast: ** \` ${args}\``).then(msg => {
    msg.react('✅')
    .then(() => msg.react('❌'))
    .then(() =>msg.react('✅'))
    
    let reaction1Filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
    let reaction2Filter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
    
    let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 12000 });
    let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 12000 });
reaction1.on("collect", r => {
    message.channel.send(`**☑ | Done ... The Broadcast Message Has Been Sent To __${message.guild.members.size}__ Members**`).then(m => m.delete(5000));
    message.guild.members.forEach(m => {
  
  var bc = new
       Discord.RichEmbed()
       .setColor('RANDOM')
       .setTitle('Broadcast')
       .addField('Server', message.guild.name)
       .addField('Sender', message.author.username)
       .addField('Message', args)
       .setThumbnail(message.author.avatarURL)
       .setFooter(copy, client.user.avatarURL);
    m.send({ embed: bc })
    msg.delete();
    })
    })
    reaction2.on("collect", r => {
    message.channel.send(`**Broadcast Canceled.**`).then(m => m.delete(5000));
    msg.delete();
    })
    })
    }
    });
    client.on('message', async message =>{
  if (message.author.boss) return;

if (!message.content.startsWith(prefix)) return;
let command = message.content.split(" ")[0];
command = command.slice(prefix.length);
let args = message.content.split(" ").slice(1);
if (command == "mute") {
if (!message.channel.guild) return;
if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply(":x: You Dont Have Perms `MANAGE_MESSAGES`").then(msg => msg.delete(5000));
if(!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.reply("The Bot Haven't Perms `MANAGE_MESSAGES`").then(msg => msg.delete(5000));;
let user = message.mentions.users.first();
let muteRole = message.guild.roles.find("name", "Muted");
if (!muteRole) return message.reply("**You Should Create A Rank Name `Muted`**").then(msg => {msg.delete(5000)});
if (message.mentions.users.size < 1) return message.reply('**You Have To Mention SomeOne**').then(msg => {msg.delete(5000)});
let reason = message.content.split(" ").slice(2).join(" ");
message.guild.member(user).addRole(muteRole);
const muteembed = new Discord.RichEmbed()
.setColor("RANDOM")
.setAuthor(`Muted!`, user.displayAvatarURL)
.setThumbnail(user.displayAvatarURL)
.addField("**:busts_in_silhouette:  User**",  '**[ ' + `${user.tag}` + ' ]**',true)
.addField("**:hammer:  By**", '**[ ' + `${message.author.tag}` + ' ]**',true)
.addField("**:book:  Reason**", '**[ ' + `${reason}` + ' ]**',true)
.addField("User", user, true)
message.channel.send({embed : muteembed});
var muteembeddm = new Discord.RichEmbed()
.setAuthor(`Muted!`, user.displayAvatarURL)
.setDescription(`      
${user} You Are Muted Because You Broke Rules 
${message.author.tag} By
[ ${reason} ] : Reason
If You Didnt Any Thing GGO To Staff
`)
.setFooter(`Server : ${message.guild.name}`)
.setColor("RANDOM")
user.send( muteembeddm);
  }
if(command === `unmute`) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage(":x: You Dont Have Perms `MANAGE_MESSAGES`").then(m => m.delete(5000));
if(!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.reply("The Bot Haven't Perms `MANAGE_MESSAGES`").then(msg => msg.delete(6000))

  let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!toMute) return message.channel.sendMessage(":x: You Have To Mention SomeOne ");

  let role = message.guild.roles.find (r => r.name === "Muted");
  
  if(!role || !toMute.roles.has(role.id)) return message.channel.sendMessage(":x: This User In Not Muted")

  await toMute.removeRole(role)
  message.channel.sendMessage(":white_check_mark: Succes Has Been Unmuted The User");

  return;

  }

});
var fkk =[
        {f:"فكك بسم الله الرحمن الرحيم",k:"ب س م ا ل ل ه ا ل ر ح م ن ا ل ر ح ي م"},
        {f:"فكك باص",k:"ب ا ص"},
        {f:"فكك عربة ",k:"ع ر ب ة"},
        {f:"فكك سيارة",k:"س ي ا ر ة"},
        {f:"فكك سيرفرنا احلى سيرفر",k:"س ي ر ف ر ن ا ا ح ل ى س ي ر ف ر"},
        {f:"فكك العنود ",k:"ا ل ع ن و د"},
        {f:"فكك المستتكعكبتيه",k:"ا ل م س ت ت ك ع ك ب ت ي ه"},
        {f:"فكك دحوم",k:"د ح و م"},
        {f:"فكك اونرنا احلى اونر",k:"ا و ن ر ن ا ا ح ل ى ا و ن ر"},
        {f:"فكك الحياة حلوة",k:"ا ل ح ي ا ة ح ل و ة"},
        {f:"فكك كازخستان ",k:"ك ا ز خ س ت ا ن"},
        {f:"لحم الحمام حلال ولحم الحمار حرام ",k:"ل ح م ا ل ح م ا م ح ل ا ل و ل ح م ا ل ح م ا ر ح ر ا م"},
        {f:"فكك استونيا ",k:"ا س ت و ن ي ا"},
        {f:"فكك لقمة وجغمه ",k:"ل ق م ة و ج غ م ه"},
        {f:"فكك زنديق  ",k:"ز ن د ي ق"},
        {f:"فكك استراليا ",k:"ا س ت ر ا ل ي ا"},
        {f:"فكك سوريا ",k:"س و ر ي ا"},
        {f:"فكك الاردن ",k:"ا ل ا ر د ن"},
        {f:"فكك طماطم ",k:"ط م ا ط م"},
        {f:"فكك سارة ",k:"س ا ر ة"},
        {f:"فكك دراجون ",k:"د ر ا ج و ن"},
        {f:"فكك سيرفر ",k:"س ي ر ف ر"},
        {n:"فكك الجبل",m:"ا ل ج ب ل"},
        {n:"فكك هضبة",m:"ه ض ب ة"},
        {n:"فكك خواطر",m:"خ و ا ط ر"},
        {n:"فكك ارحبو",m:"ا ر ح ب و"},
        {n:"فكك اطنخ سيرفر",m:"ا ط ن خ س ي ف ر"},
        {n:"فكك احبك",m:"ا ح ب ك"},
        {n:"فكك سبرايز",m:"س ب ر ا ي ز"},
        {n:"فكك ولي على أمتك",m:"و ل ي ع ل ى أ م ت ك"},
        {n:"فكك الو محد",m:"ا ل و م ح م د"},

   ];

   client.on("message", async message => {
        if(message.content == prefix+"فكك"){
        if(UserBlocked.has(message.guild.id)) return message.channel.send("هناك جلسة .")
        UserBlocked.add(message.guild.id)
        var ask = fkk[Math.floor(Math.random() * fkk.length)];
        let embed = new Discord.RichEmbed()
        .setTitle('لعبة فكك')
        .setAuthor(message.author.username, message.author.avatarURL)
        .setColor("RANDOM")
        .setDescription(ask.f);
        message.channel.sendEmbed(embed).then(msg=> msg.delete(200000))
        const msgs = await message.channel.awaitMessages(msg => msg.author.id !== client.user.id ,{maxMatches:1,time:100000});
            UserBlocked.delete(message.guild.id)
        msgs.forEach(result => {
           if(result.author.id == client.user.id) return;
           if(result.content == "فكك") return
           if(result.content == ask.k){

             let embeds = new Discord.RichEmbed()
             .setTitle(':white_check_mark: اجابة صحيحة')
             .setAuthor(message.author.username, message.author.avatarURL)
             .setColor("RANDOM")
             .setDescription(`**${result.author.username}** الإجابة صحيحة`);
                message.channel.sendEmbed(embeds);                return;
           } else {

                               var embedx = new Discord.RichEmbed()
             .setTitle(':x:خطاء')
             .setAuthor(message.author.username, message.author.avatarURL)
             .setColor("RANDOM")
             .setDescription(`**${result.author.username}** الإجابة خاطئة`);

                message.channel.sendEmbed(embedx);
           }
     });
  }
});
client.on("message", async message => {
var aoasm =[
    {q:"ما عاصمة **المغرب**",a:"الرباط"},
    {q:"ما عاصمة **افغانستان**",a:"كبل"},
    {q:"ما عاصمة ** البانيا**",a:"تيران"},
    {q:"ما عاصمة **الجزائر **",a:"الجزائر"},
    {q:"ما عاصمة ** **",a:"الجزائر"},
    {q:"ما عاصمة **اندورا لا فيلا **",a:"اندورا"},
    {q:"ما عاصمة **انجولا**",a:"لواندا"},
    {q:"ما عاصمة **انتيجوا وباربودا**",a:"سان جونز"},
    {q:"ما عاصمة **الارجنتين**",a:"بوينس ايرس"},
    {q:"ما عاصمة **ارمينيا**",a:"يريفان"},
    {q:"ما عاصمة ** مصر**",a:"القاهرة"},
    {q:"ما عاصمة ** استراليا**",a:"كانبرا"},
    {q:"ما عاصمة **النمسا**",a:"فيينا"},
    {q:"ما عاصمة ** اذربيجان**",a:"باكو"},
    {q:"ما عاصمة **جزر البهاما**",a:"ناساو"},
    {q:"ما عاصمة **البحرين**",a:"المنامة"},
    {q:"ما عاصمة ** بنجلاد��ش**",a:"دكـا"},
    {q:"ما عاصمة **باربادوس **",a:"بريدجتاون"},
    {q:"ما عاصمة **بيلا روسيا**",a:"مينسك"},
    {q:"ما عاصمة ** بلجيكا**",a:"بروكسل"},
    {q:"ما عاصمة ** بيليز**",a:"بلوم بان"},
    {q:"ما عاصمة ** بنين**",a:"بورتو نوفو"},
    {q:"ما عاصمة ** بوتان**",a:"ثيمفو"},
    {q:"ما عاصمة **بوليفيا **",a:"لاباز"},
    {q:"ما عاصمة ** البوسنة والهرسك**",a:"سراييفو"},
    {q:"ما عاصمة ** بوتسوانا**",a:"جابورون"},
    {q:"ما عاصمة ** البرازيل**",a:"برازيليا"},
    {q:"ما عاصمة ** بروناى**",a:"بندر سرى بيجاوان"},
    {q:"ما عاصمة ** بلغاريا**",a:"صوفيا"},
    {q:"ما عاصمة ** بوركينا فاسو**",a:"واجادوجو"},
    {q:"ما عاصمة **بوروندى **",a:"بوجومبورا"},
    {q:"ما عاصمة **كمبوديا **",a:"بنوم بنـه"},
    {q:"ما عاصمة ** الكاميرون**",a:"ياوندى"},
    {q:"ما عاصمة ** كندا**",a:"اوتاوا"},
    {q:"ما عاصمة ** الرأس الاخضر**",a:"برايا"},
    {q:"ما عاصمة **تشاد **",a:"نجامينا"},
    {q:"ما عاصمة ** شيلى**",a:"سانتياجو"},
    {q:"ما عاصمة **الصين **",a:"بكين"},
    {q:"ما عاصمة ** **",a:"مورونى"},
    {q:"ما عاصمة **كوستاريكا **",a:"سان خوسيه"},
    {q:"ما عاصمة ** كوت ديفوار**",a:"ابيدجان"},
    {q:"ما عاصمة **كرواتيا **",a:"زغرب"},
    {q:"ما عاصمة ** كوبا**",a:"هافانا"},
    {q:"ما عاصمة ** قبرص**",a:" "},
    {q:"ما عاصمة ** جمهورية التشيك**",a:"براغ"},
    {q:"ما عاصمة **الدنمارك **",a:"كوبنهاجن"},
    {q:"ما عاصمة ** جيبوتى**",a:"جيبوتى"},
    {q:"ما عاصمة ** دومينيكا**",a:"روسيو"},
    {q:"ما عاصمة **الدومينيكان **",a:"سان دومينجو"},
    {q:"ما عاصمة **تيمور الشرقية **",a:"ديلى"},
    {q:"ما عاصمة **قطر  **",a:"الدوحة"},
    {q:"ما عاصمة **السعودية  **",a:"الرياض"},
    {q:"ما عاصمة **سوريا  **",a:"دمشق"},
    {q:"ما عاصمة **تركيا  **",a:"انقرة"},
    {q:"ما عاصمة **العراق  **",a:"بغداد"},
    {q:"ما عاصمة **البنان  **",a:"بيروت"},
    {q:"ما عاصمة **فلسطين  **",a:"القدس"},
    {q:"ما عاصمة **امريكا  **",a:"واشنطن"},
    {q:"ما عاصمة **الاردن  **",a:"عمان"},    
    {q:"ما عاصمة **السودان  **",a:"خرطوم"},
    {q:"ما عاصمة **الما��يا  **",a:"برلين"},
    {q:"ما عاصمة **كندا  **",a:"اوتاوا"},
    {q:"ما عاصمة **البرازيل  **",a:"برازيليا"},
   ];
    if(message.content == prefix+"عواصم"){
        if(UserBlocked.has(message.guild.id)) return message.channel.send("هناك جلسة .")
        UserBlocked.add(message.guild.id)
        var ask = aoasm[Math.floor(Math.random() * aoasm.length)];
        let embed = new Discord.RichEmbed()
        .setTitle('سؤال عواصم')
        .setAuthor(message.author.username, message.author.avatarURL)
        .setColor("RANDOM")
        .setDescription(ask.q);
        message.channel.sendEmbed(embed).then(msg=> msg.delete(20000))
        const msgs = await message.channel.awaitMessages(msg => msg.author.id !== client.user.id ,{maxMatches:1,time:10000});
            UserBlocked.delete(message.guild.id)
        msgs.forEach(result => {
           if(result.author.id == client.user.id) return;
           if(result.content == "عاصمة") return
           if(result.content == ask.a){
             let embeds = new Discord.RichEmbed()
             .setTitle(':white_check_mark: اجابة صحيحة')
             .setAuthor(message.author.username, message.author.avatarURL)
             .setColor("RANDOM")
             .setDescription(`**${result.author.username}** الإجابة صحيحة`);
                message.channel.sendEmbed(embeds);                return;
           } else {

                                  var embedx = new Discord.RichEmbed()
                .setTitle(':x:خطاء')
                .setAuthor(message.author.username, message.author.avatarURL)
                .setColor("RANDOM")
                .setDescription(`**${result.author.username}** الإجابة خاطئة`);
                message.channel.sendEmbed(embedx);
           }
     });
  }
});
client.on('message', message => {
if(message.content.startsWith(prefix + "slots")) {
  let slot1 = ['🍏', '🍇', '🍒', '🍍', '🍅', '🍆', '🍑', '🍓'];
  let slots1 = `${slot1[Math.floor(Math.random() * slot1.length)]}`;
  let slots2 = `${slot1[Math.floor(Math.random() * slot1.length)]}`;
  let slots3 = `${slot1[Math.floor(Math.random() * slot1.length)]}`;
  let we;
  if(slots1 === slots2 && slots2 === slots3) {
    we = "Win!"
  } else {
    we = "Lose!"
  }
  message.channel.send(`${slots1} | ${slots2} | ${slots3} - ${we}`)
}
});
 client.on('message', message => {
    if (message.content.startsWith(prefix + "avatar")) {
if(!message.channel.guild) return;
        var mentionned = message.mentions.users.first();
    var client;
      if(mentionned){
          var client = mentionned; } else {
          var client = message.author;
      }
        const embed = new Discord.RichEmbed()
                           .addField('Requested by:', "<@" + message.author.id + ">")
        .setColor(000000)
        .setImage(`${client.avatarURL}`)
      message.channel.sendEmbed(embed);
    }
});
client.on('message', message => {

  if(!message.channel.guild) return;
if(message.content.startsWith(prefix + 'clear')) {
if(!message.channel.guild) return message.channel.send('**This Command is Just For Servers**').then(m => m.delete(5000));
if(!message.member.hasPermission('MANAGE_MESSAGES')) return      message.channel.send('**You Do not have permission** `MANAGE_MESSAGES`' );
let args = message.content.split(" ").join(" ").slice(2 + prefix.length);
let request = `Requested By ${message.author.username}`;
message.channel.send(`**Are You sure you want to clear the chat?**`).then(msg => {
msg.react('✅')
.then(() => msg.react('❌'))
.then(() =>msg.react('✅'))

let reaction1Filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
let reaction2Filter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;

let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 12000 });
let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 12000 });
reaction1.on("collect", r => {
message.channel.send(`Chat will delete`).then(m => m.delete(5000));
var msg;
        msg = parseInt();

      message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
      message.channel.sendMessage("", {embed: {
        title: "`` Chat Deleted ``",
        color: 0x06DF00,
        footer: {

        }
      }}).then(msg => {msg.delete(3000)});

})
reaction2.on("collect", r => {
message.channel.send(`**Chat deletion cancelled**`).then(m => m.delete(5000));
msg.delete();
})
})
}
});
client.on('message', message => { 
          if (message.content.startsWith(prefix + "id")) {
     var args = message.content.split(" ").slice(1);
     let user = message.mentions.users.first();
     var men = message.mentions.users.first();
        var heg;
        if(men) {
            heg = men
        } else {
            heg = message.author
        }
      var mentionned = message.mentions.members.first();
         var h;
        if(mentionned) {
            h = mentionned
        } else {
            h = message.member
        }
               moment.locale('ar-TN');
      var id = new  Discord.RichEmbed()
      .setAuthor(message.author.username, message.author.avatarURL) 
    .setColor("#707070")
    .addField(': ����� �������� ���', `${moment(heg.createdTimestamp).format('YYYY/M/D HH:mm:ss')} **\n** \`${moment(heg.createdTimestamp).fromNow()}\`` ,true) 
    .addField(': ������� ������ ���', `${moment(h.joinedAt).format('YYYY/M/D HH:mm:ss')} \n \`${moment(h.joinedAt).fromNow()}\``, true)               
    .setFooter(`Witch Bot `, 'https://images-ext-2.discordapp.net/external/JpyzxW2wMRG2874gSTdNTpC_q9AHl8x8V4SMmtRtlVk/https/orcid.org/sites/default/files/files/ID_symbol_B-W_128x128.gif')                              
    .setThumbnail(heg.avatarURL);
    message.channel.send(id)
}       });
client.on('message', message => {
    if(message.content === prefix + "bot") {
        const embed = new Discord.RichEmbed()
    .setTitle('Invite Link')
    .setColor('#000000').setColor('#36393e')
    .addField(':levitate: Users',`${client.users.size}`,true)
    .addField(':earth_africa: Servers',`${client.guilds.size}`,true)
    .addField('Channels',`${client.channels.size}`,true)
    .addField('Username',`${client.user.tag}`,true)
    .addField('My ID',`${client.user.id}`,true)
    .setURL('https://discordapp.com/oauth2/authorize?client_id=496501749926854657&scope=bot&permissions=388160')
    .setFooter(`WitchBot`)
               message.channel.sendEmbed(embed);
           }
});
client.on("message", (message) => {
if (message.content.toLowerCase().startsWith(prefix + `new`)) {
    const reason = message.content.split(" ").slice(1).join(" ");
    if (!message.guild.roles.exists("name", "Support Team")) return message.channel.send(`This server doesn't have a \`Support Team\` role made, so the ticket won't be opened.\nIf you are an administrator, make one with that name exactly and give it to users that should be able to see tickets.`);
    if (message.guild.channels.exists("name", "ticket-" + message.author.id)) return message.channel.send(`You already have a ticket open.`);
    message.guild.createChannel(`ticket-${message.author.id}`, "text").then(c => {
        let role = message.guild.roles.find("name", "Support Team");
        let role2 = message.guild.roles.find("name", "@everyone");
        c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        message.channel.send(`:white_check_mark: Your ticket has been created, #${c.name}.`);
        const embed = new Discord.RichEmbed()
        .setColor(0xCF40FA)
        .addField(`Hey ${message.author.username}!`, `Please try explain why you opened this ticket with as much detail as possible. Our **Support Team** will be here soon to help.`)
        .setTimestamp();
        c.send({ embed: embed });
    }).catch(console.error);
}
if (message.content.toLowerCase().startsWith(prefix + `close`)) {
    if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You can't use the close command outside of a ticket channel.`);

    message.channel.send(`Are you sure? Once confirmed, you cannot reverse this action!\nTo confirm, type \`-confirm\`. This will time out in 10 seconds and be cancelled.`)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === '-confirm', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('Ticket close timed out, the ticket was not closed.').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });
}

});
client.on("message", message => {
    if (message.content === (prefix + "help")) {
     const embed = new Discord.RichEmbed() 
         .setColor("RANDOM")
         .setThumbnail(message.author.avatarURL)
         .setDescription(`**
----------{WhitchBot}
----------prefix[${predix}]
----general command
${prefix}id - لعرض ملفك شخصي
${prefix}avatar - لعرض صورت حسابك
${prefix}bot - لعرض معلومات عن بوت
${prefix}ping - لعرض سرعة اتصال بوت
${prefix}server - لعرض معلومات عن سيرفر
${prefix}new - لعمل تذكرا
${prefix}count - لمعرفة عدد اعضاء سيرفر
----admin command
${prefix}bc - لرسالة رسالة لكل
${prefix}ban - لطرد شخص من سيرفر
${prefix}kick - لطرد شخص من سيرفر بدون تبنيده
${prefix}mute - {muted}لمنع شخص من كتابة لازم رتبة 
${prefix}unmute - لفك ميوت عن شخص
${prefix}clear - لمسح شات
----games command
${prefix}slots - لعبة فواكه
${prefix}فكك 
لعبة فكك
${prefix}عواصم
لعبة عواصم
----------{شكرا لستعمالك بوت}
       **  `)
   message.channel.sendEmbed(embed)
   
   }
   }); 
client.on('message', function(msg) {
    if(msg.content.startsWith (prefix  + 'server')) {
      let embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setThumbnail(msg.guild.iconURL)
      .setTitle(`Showing Details Of  **${msg.guild.name}*`)
      .addField(':globe_with_meridians:** نوع السيرفر**',`[** __${msg.guild.region}__ **]`,true)
      .addField(':medal:** __الرتب__**',`[** __${msg.guild.roles.size}__ **]`,true)
      .addField(':red_circle:**__ عدد الاعضاء__**',`[** __${msg.guild.memberCount}__ **]`,true)
      .addField(':large_blue_circle:**__ عدد الاعضاء الاونلاين__**',`[** __${msg.guild.members.filter(m=>m.presence.status == 'online').size}__ **]`,true)
      .addField(':pencil:**__ الرومات الكتابية__**',`[** __${msg.guild.channels.filter(m => m.type === 'text').size}__** ]`,true)
      .addField(':microphone:**__ رومات الصوت__**',`[** __${msg.guild.channels.filter(m => m.type === 'voice').size}__ **]`,true)
      .addField(':crown:**__ الأونـر__**',`**${msg.guild.owner}**`,true)
      .addField(':id:**__ ايدي السيرفر__**',`**${msg.guild.id}**`,true)
      .addField(':date:**__ تم عمل السيرفر في__**',msg.guild.createdAt.toLocaleString())
      msg.channel.send({embed:embed});
    }
  });
client.login(process.env.BOT_TOKEN);
