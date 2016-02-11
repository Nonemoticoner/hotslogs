/**
 * hotslogs
 * https://github.com/Nonemoticoner/hotslogs
 *
 * Copyright (c) 2016 Nonemoticoner
 * Licensed under the MIT license.
 */
var request = require('request');

module.exports = {

	// get unique ID (integer) that is assigned to player in HOTS Logs
	getID: function (battletag, region, callback) {
		var name = battletag.replace('#', '_').trim(),
			region_no = 0;

		switch(region){
			case "US":
				region_no = 1;
				break;
			case "EU":
				region_no = 2;
				break;
			case "KR":
				region_no = 3;
				break;
			case "CN":
				region_no = 5;
				break;
		}

		var address = 'https://www.hotslogs.com/API/Players/' + region_no.toString() + '/' + name;

		request(address, function (error, response, body) {
			if(!error && response.statusCode == 200){
				var data = JSON.parse(body);

				if(data != null && typeof data.PlayerID == "number"){
					callback(data.PlayerID);
				}
				else{
					callback(null);
				}
			}
			else{
				throw error;
			}
		});
	},

	// get basic data about player
	getData: function (id, callback) {
		var address = 'https://www.hotslogs.com/API/Players/' + id.toString();

		request(address, function (error, response, body) {
			if(!error && response.statusCode == 200){
				var data = JSON.parse(body);

				if(data != null){
					var player = {};

					player.id = data.PlayerID;
					player.name = data.Name;
					player.rankings = {};
					player.rankings.quickMatch = {
						MMR: null,
						rank: null
					};
					player.rankings.heroLeague = {
						MMR: null,
						rank: null
					};
					player.rankings.teamLeague = {
						MMR: null,
						rank: null
					};

					for (var i = data.LeaderboardRankings.length - 1; i >= 0; i--) {
						switch(data.LeaderboardRankings[i].GameMode){
							case "QuickMatch":
								player.rankings.quickMatch.MMR = data.LeaderboardRankings[i].CurrentMMR;
								player.rankings.quickMatch.rank = data.LeaderboardRankings[i].LeagueRank;
								break;
							case "HeroLeague":
								player.rankings.heroLeague.MMR = data.LeaderboardRankings[i].CurrentMMR;
								player.rankings.heroLeague.rank = data.LeaderboardRankings[i].LeagueRank;
								break;
							case "TeamLeague":
								player.rankings.teamLeague.MMR = data.LeaderboardRankings[i].CurrentMMR;
								player.rankings.teamLeague.rank = data.LeaderboardRankings[i].LeagueRank;
								break;
						}
					}

					callback(player);
				}
				else{
					callback(null);
				}
			}
			else{
				throw error;
			}
		});
	}
	
};
