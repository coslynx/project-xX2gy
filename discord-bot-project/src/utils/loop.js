const loop = (queue) => {
    const currentSong = queue[0];
    queue.push(currentSong);
    queue.shift();
    return queue;
};