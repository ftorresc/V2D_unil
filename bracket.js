$(document).ready(function(){
    var apiKey = "dde45198d6d14d5b8bb0775f1eb4d9ed";
  
    $.ajax({
      headers: {'X-Auth-Token' : apiKey},
      url: 'https://api.football-data.org/v2/competitions/EC/standings',
      dataType: 'json',
      type: 'GET'
    }).done( function(data) {
      var standings = data.standings;
      var standingsLength = standings.length;
  
      if(standingsLength > 1) {
        var groupTournament = {};
        var groupTournament2 = {};
        var groupTournament3 = {};
        var groupTournament4 = {};
        $.each(standings, function(groupIdx, groupInfo) {
          var groupName = groupInfo.group;
          var standingTable = groupInfo.table;
  
          $.each(standingTable, function(standingIdx, standingInfo){
            if(standingInfo.position == 1){
              if(groupName == "GROUP_A") {
                groupTournament[6] = standingInfo;
                groupTournament2[3] = standingInfo;
                groupTournament3[1] = standingInfo;
                groupTournament4[0] = standingInfo;
              } else if(groupName == "GROUP_B") {
                groupTournament[4] = standingInfo;
                groupTournament2[2] = standingInfo;
              } else if(groupName == "GROUP_C") {
                groupTournament[8] = standingInfo;
              } else if(groupName == "GROUP_D") {
                groupTournament[14] = standingInfo;
                groupTournament2[7] = standingInfo;
                groupTournament3[3] = standingInfo;
                groupTournament4[1] = standingInfo;
              } else if(groupName == "GROUP_E") {
                groupTournament[12] = standingInfo;
              } else if(groupName == "GROUP_F") {
                groupTournament[2] = standingInfo;
              }
            }
  
            if(standingInfo.position == 2){
              if(groupName == "GROUP_A") {
                groupTournament[10] = standingInfo;
              } else if(groupName == "GROUP_B") {
                groupTournament[11] = standingInfo;
                groupTournament2[5] = standingInfo;
                groupTournament3[2] = standingInfo;
              } else if(groupName == "GROUP_C") {
                groupTournament[7] = standingInfo;
              } else if(groupName == "GROUP_D") {
                groupTournament[0] = standingInfo;
              } else if(groupName == "GROUP_E") {
                groupTournament[1] = standingInfo;
                groupTournament2[0] = standingInfo;
                groupTournament3[0] = standingInfo;
              } else if(groupName == "GROUP_F") {
                groupTournament[15] = standingInfo;
              }
            }
  
            if(standingInfo.position == 3){
              if(groupName == "GROUP_A") {
                groupTournament[3] = standingInfo;
                groupTournament2[1] = standingInfo;
              } else if(groupName == "GROUP_C") {
                groupTournament[13] = standingInfo;
                groupTournament2[6] = standingInfo;
              } else if(groupName == "GROUP_D") {
                groupTournament[9] = standingInfo;
                groupTournament2[4] = standingInfo;
              } else if(groupName == "GROUP_F") {
                groupTournament[5] = standingInfo;
              }
            }
          });
        });
  
  
        $.each(groupTournament, function(tourIdx, tourInfo){
            var matchTeamInfo = '<div class="team-info">';
            matchTeamInfo += '<div class="team-flag"><img src="' + tourInfo.team.crestUrl + '" alt=""></div>';
            matchTeamInfo += '<div class="team-name">' + tourInfo.team.name + '</div>';
            matchTeamInfo += '</div>';
            $("section.round").eq(0).find(".match").eq(tourIdx).html(matchTeamInfo);
        });
  
  
        $.each(groupTournament2, function(tourIdx, tourInfo){
            var matchTeamInfo = '<div class="team-info">';
            matchTeamInfo += '<div class="team-flag"><img src="' + tourInfo.team.crestUrl + '" alt=""></div>';
            matchTeamInfo += '<div class="team-name">' + tourInfo.team.name + '</div>';
            matchTeamInfo += '</div>';
            $("section.round").eq(1).find(".match").eq(tourIdx).html(matchTeamInfo);
        });
  
  
        $.each(groupTournament3, function(tourIdx, tourInfo){
            var matchTeamInfo = '<div class="team-info">';
            matchTeamInfo += '<div class="team-flag"><img src="' + tourInfo.team.crestUrl + '" alt=""></div>';
            matchTeamInfo += '<div class="team-name">' + tourInfo.team.name + '</div>';
            matchTeamInfo += '</div>';
            $("section.round").eq(2).find(".match").eq(tourIdx).html(matchTeamInfo);
        });
  
  
        $.each(groupTournament4, function(tourIdx, tourInfo){
            var matchTeamInfo = '<div class="team-info">';
            matchTeamInfo += '<div class="team-flag"><img src="' + tourInfo.team.crestUrl + '" alt=""></div>';
            matchTeamInfo += '<div class="team-name">' + tourInfo.team.name + '</div>';
            matchTeamInfo += '</div>';
            $("section.round").eq(3).find(".match").eq(tourIdx).html(matchTeamInfo);
        });
          
        $("#tournament").removeClass("hide");
      }
  
    });
  })