import axios, {AxiosResponse} from "axios";

//creating output section
const outSection = document.getElementById("progOutput");

//for handling errors
let errorShow: HTMLParagraphElement | null;
let okShow: HTMLParagraphElement | null;

okShow = document.querySelector("#success");
errorShow = document.querySelector("#error");

//Create the heading for output section
var h2: HTMLHeadingElement = document.createElement("h2");
var h2text: Text = document.createTextNode("NBA Games");
h2.appendChild(h2text);
outSection?.appendChild(h2);

//creating the table
var table = document.createElement('table');

//Creating the header
var header = document.createElement('thead');
var headingRow = document.createElement('tr');

//Creating heading names
var homeHeading = document.createElement('th');
var homeHeadingText = document.createTextNode("Home Team");
homeHeading.appendChild(homeHeadingText);
headingRow.appendChild(homeHeading);

var visitorHeading = document.createElement('th');
var visitorHeadingText = document.createTextNode("Vistitor Team");
visitorHeading.appendChild(visitorHeadingText);
headingRow.appendChild(visitorHeading);

var homeScoreHeading = document.createElement('th');
var homeScoreHeadingText = document.createTextNode("Home Team Score");
homeScoreHeading.appendChild(homeScoreHeadingText);
headingRow.appendChild(homeScoreHeading);

var visitorScoreHeading = document.createElement('th');
var visitorScoreHeadingText = document.createTextNode("Visitor Team Score");
visitorScoreHeading.appendChild(visitorScoreHeadingText);
headingRow.appendChild(visitorScoreHeading);

//use for season selector
let seasonInput: HTMLInputElement | null;
seasonInput = document.querySelector("#season");

//add the teams to the drop down menu
let teamDropDown: HTMLInputElement | null;
teamDropDown = document.querySelector("#teams");

axios
.get('https://www.balldontlie.io/api/v1/teams')
.then((response: AxiosResponse) => {
  const teams = response.data.data;

  for(let i of teams) {
    let addTeam = new Option(i.full_name, i.id);
    teamDropDown?.appendChild(addTeam);
  }
  
}).catch((error: AxiosResponse) => {
  if (error) {
    // client received an error response (5xx, 4xx)
    if(error.status == 400) {
      showMessage(errorShow, "Bad request, your request is invalid.")
    } else if(error.status == 404) {
      showMessage(errorShow, "Not found. The specified resource could not be found.")
    } else if(error.status == 406) {
      showMessage(errorShow, "Not acceptable. You requested a format that isn't json")
    } else if(error.status == 429) {
      showMessage(errorShow, "Too many requests.")
    } else if(error.status == 500) {
      showMessage(errorShow, "Internal service error. Try again later.")
    } else if(error.status == 503) {
      showMessage(errorShow, "Service unavailable due to maintaince. Try again later.")
    } else {
      //showMessage(errorShow, "General error.")
    }
    
  } else if (error.request) {
    showMessage(errorShow, "Client never received a response or request never left.")
  } else {
    //showMessage(errorShow, "General error.")
  }
});

//Adding header to table
header.appendChild(headingRow);
table.appendChild(header);

//Creating table body
var tblBody = document.createElement('tbody');
let searchGameButton: HTMLButtonElement | null;

//create the button
searchGameButton = document.querySelector("#gameSearch");

searchGameButton?.addEventListener("click", () => {


    var myURL = "https://www.balldontlie.io/api/v1/games";

    seasonInput?.value ? myURL += `?seasons[]=${seasonInput.value}` : myURL;
    teamDropDown?.value ? myURL += `&team_ids[]=${teamDropDown.value}`:myURL;
   
    axios
    .get(myURL)
    .then((r: AxiosResponse) => r.data)
    .then((results: any) => {

        //remove old rows
        let oldRows: NodeListOf<HTMLTableRowElement> | undefined;
        oldRows = tblBody?.querySelectorAll("tr");
        if (oldRows) {
            for (let k = 0; k < oldRows?.length; k++) {
                const oldOne = oldRows[k];
                tblBody?.removeChild(oldOne);
            }
        }

        for(let i = 0; results.data.length; i++) {

            //create row
            var row = document.createElement('tr');

            //create home team
            var homeName = document.createElement('td');
            var homeText = document.createTextNode(results.data[i].home_team.full_name);
            homeName.appendChild(homeText);
            row.appendChild(homeName);

            //create visitor team
            var visitorName = document.createElement('td');
            var visitorText = document.createTextNode(results.data[i].visitor_team.full_name);
            visitorName.appendChild(visitorText);
            row.appendChild(visitorName);

            //home team score
            var homeScore = document.createElement('td');
            var homeScoreText = document.createTextNode(results.data[i].home_team_score);
            homeScore.appendChild(homeScoreText);
            row.appendChild(homeScore);

            //visitor team score
            var visitorScore = document.createElement('td');
            var visitorScoreText = document.createTextNode(results.data[i].visitor_team_score);
            visitorScore.appendChild(visitorScoreText);
            row.appendChild(visitorScore);

            //add row to table
            tblBody.appendChild(row);

        }
    })
    .catch((error: AxiosResponse) => {
      if (error) {
        // client received an error response (5xx, 4xx)
        if(error.status == 400) {
          showMessage(errorShow, "Bad request, your request is invalid.")
        } else if(error.status == 404) {
          showMessage(errorShow, "Not found. The specified resource could not be found.")
        } else if(error.status == 406) {
          showMessage(errorShow, "Not acceptable. You requested a format that isn't json")
        } else if(error.status == 429) {
          showMessage(errorShow, "Too many requests.")
        } else if(error.status == 500) {
          showMessage(errorShow, "Internal service error. Try again later.")
        } else if(error.status == 503) {
          showMessage(errorShow, "Service unavailable due to maintaince. Try again later.")
        } else {
         // showMessage(errorShow, "General error.")
        } 
      } else if (error.request) {
        showMessage(errorShow, "Client never received a response or request never left.")
      } else {
       // showMessage(errorShow, "General error.")
      }
    });
});


  //add table body to table
  table.appendChild(tblBody);
  outSection?.appendChild(table);

  //Create the heading for output section
  var playerTitle: HTMLHeadingElement = document.createElement("h2");
  var playerTitleText: Text = document.createTextNode("Player Stats");
  playerTitle.appendChild(playerTitleText);
  outSection?.appendChild(playerTitle);

  //creating the table
  var playerTable = document.createElement('table');

  //Creating the header
  var headerPlayer = document.createElement('thead');
  var headingRowPlayer = document.createElement('tr');

  //Creating heading names
  var playerNameHeading = document.createElement('th');
  var playerHeadingText = document.createTextNode("Game Date");
  playerNameHeading.appendChild(playerHeadingText);
  headingRowPlayer.appendChild(playerNameHeading);

  var positionHeading = document.createElement('th');
  var positionHeadingText = document.createTextNode("Position");
  positionHeading.appendChild(positionHeadingText);
  headingRowPlayer.appendChild(positionHeading);

  var pointsHeading = document.createElement('th');
  var pointsHeadingText = document.createTextNode("Points");
  pointsHeading.appendChild(pointsHeadingText);
  headingRowPlayer.appendChild(pointsHeading);

  var reboundsHeading = document.createElement('th');
  var reboundsHeadingText = document.createTextNode("Rebounds");
  reboundsHeading.appendChild(reboundsHeadingText);
  headingRowPlayer.appendChild(reboundsHeading);

  //use for season selector
  let seasonPlayersInput: HTMLInputElement | null;
  seasonPlayersInput = document.querySelector("#seasonPlayer");

  //add the teams to the drop down menu
  let playersDropDown : HTMLInputElement | null;
  playersDropDown = document.querySelector("#players");

  //get names of 10 players
  axios
  .get('https://www.balldontlie.io/api/v1/players?per_page=100')
  .then((response: AxiosResponse) => {
    const players = response.data.data;

    for(let i of players) {
      let playerName = i.first_name + " " + i.last_name;
      let addPlayer = new Option(playerName, i.id);
      playersDropDown?.appendChild(addPlayer);
    }
    
  }).catch((error: AxiosResponse) => {
    if (error) {
      // client received an error response (5xx, 4xx)
      if(error.status == 400) {
        showMessage(errorShow, "Bad request, your request is invalid.")
      } else if(error.status == 404) {
        showMessage(errorShow, "Not found. The specified resource could not be found.")
      } else if(error.status == 406) {
        showMessage(errorShow, "Not acceptable. You requested a format that isn't json")
      } else if(error.status == 429) {
        showMessage(errorShow, "Too many requests.")
      } else if(error.status == 500) {
        showMessage(errorShow, "Internal service error. Try again later.")
      } else if(error.status == 503) {
        showMessage(errorShow, "Service unavailable due to maintaince. Try again later.")
      } else {
       // showMessage(errorShow, "General error.")
      } 
    } else if (error.request) {
      showMessage(errorShow, "Client never received a response or request never left.")
    } else {
     // showMessage(errorShow, "General error.")
    }
  });

  //Adding header to table
  headerPlayer.appendChild(headingRowPlayer);
  playerTable.appendChild(headerPlayer);

  //create table body
  var playerTblBody = document.createElement('tbody');

  let playerSearch: HTMLButtonElement | null;

  //create the button
  playerSearch = document.querySelector("#playerStatSearch");

  playerSearch?.addEventListener("click", () => {


    var playerUrl = "https://www.balldontlie.io/api/v1/stats";

    seasonPlayersInput?.value ? playerUrl += `?seasons[]=${seasonPlayersInput.value}` : playerUrl;
    playersDropDown?.value ? playerUrl += `&player_ids[]=${playersDropDown.value}`: playerUrl;
   
    axios
    .get(playerUrl)
    .then((r: AxiosResponse) => r.data)
    .then((results: any) => {

        //remove old rows
        let oldRowsPlayer: NodeListOf<HTMLTableRowElement> | undefined;
        oldRowsPlayer = playerTblBody?.querySelectorAll("tr");
        if (oldRowsPlayer) {
            for (let k = 0; k < oldRowsPlayer?.length; k++) {
                const oldOne = oldRowsPlayer[k];
                playerTblBody?.removeChild(oldOne);
            }
        }

        if(results.data.length == 0) {
          var messageStr = `That player did not play during the ${seasonPlayersInput?.value} season.`; 
          showMessage(errorShow, messageStr);
          return;
        }
        for(let i = 0; results.data.length; i++) {
            //create row
            var row = document.createElement('tr');

            //create home team
            var playerName = document.createElement('td');
            var playerText = document.createTextNode(results.data[i].game.date.substring(0,10));
            playerName.appendChild(playerText);
            row.appendChild(playerName);

            //create visitor team
            var positionName = document.createElement('td');
            var positionText = document.createTextNode(results.data[i].player.position);
            positionName.appendChild(positionText);
            row.appendChild(positionName);

            //home team score
            var points = document.createElement('td');
            var checkPoints  = results.data[i].pts;
            if(checkPoints == null) {
              var pointsText = document.createTextNode("N/A");
            } else {
              var pointsText = document.createTextNode(results.data[i].pts);
            }
            points.appendChild(pointsText);
            row.appendChild(points);

            //visitor team score
            var rebounds = document.createElement('td');
            var checkReboumds  = results.data[i].reb;
            if(checkPoints == null) {
              var reboundsText = document.createTextNode("N/A");
            } else {
              var reboundsText = document.createTextNode(results.data[i].reb);
            }
            rebounds.appendChild(reboundsText);
            row.appendChild(rebounds);

            //add row to table
            playerTblBody.appendChild(row);

        }
    })
    .catch(function(error) {
      if (error) {
        // client received an error response (5xx, 4xx)
        if(error.status == 400) {
          showMessage(errorShow, "Bad request, your request is invalid.")
        } else if(error.status == 404) {
          showMessage(errorShow, "Not found. The specified resource could not be found.")
        } else if(error.status == 406) {
          showMessage(errorShow, "Not acceptable. You requested a format that isn't json")
        } else if(error.status == 429) {
          showMessage(errorShow, "Too many requests.")
        } else if(error.status == 500) {
          showMessage(errorShow, "Internal service error. Try again later.")
        } else if(error.status == 503) {
          showMessage(errorShow, "Service unavailable due to maintaince. Try again later.")
        } else {
          //showMessage(errorShow, "General error.")
        } 
      } else if (error.request) {
        showMessage(errorShow, "Client never received a response or request never left.")
      } else {
       // showMessage(errorShow, "General error.")
      }
    });
});

playerTable.appendChild(playerTblBody);
outSection?.appendChild(playerTable);

function showMessage(element: any,  text: string) {
  element?.classList.remove('hide');
  element?.classList.add('show');

  while(element.firstChild) {
    element.removeChild(element.firstChild);
  }
  element?.appendChild(document.createTextNode(text));
  setTimeout(() => {
    element?.classList.remove('show');
    element?.classList.add('hide');
  }, 5000);  
}
