const getAverageAttemptsAtEachSegment = (arrayOfGames) => {
    let arrayOfSegmentAttempts = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    arrayOfGames.forEach(game => {
      let i = 0;
      game.segmentAttempts.forEach(value => {
        arrayOfSegmentAttempts[i] += value;
        i++;
      })
    })
    return arrayOfSegmentAttempts.map(value => Number((value / arrayOfGames.length).toFixed(3)));
}

export default getAverageAttemptsAtEachSegment