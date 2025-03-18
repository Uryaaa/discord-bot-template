module.exports = (player, queue, track) => {
    queue.metadata.send(`🎶 Now playing **${track.title}**!`);
};