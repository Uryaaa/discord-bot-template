module.exports = (player, queue, error) => {
    console.error('Player error:', error);
    queue.metadata?.send('❌ Playback error occurred');
};
